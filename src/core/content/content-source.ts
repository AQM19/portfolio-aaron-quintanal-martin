import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { getTranslations } from 'next-intl/server';
import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';
import type { Career } from '@/core/interfaces/career/career.interface';
import type { Certification } from '@/core/interfaces/certification/certification.interface';
import type { Project, SocialLink } from '@/core/interfaces';
import type { Profile } from '@/core/interfaces/profile/profile.interface';
import type { Skill } from '@/core/interfaces/skills/skill.interface';
import { AboutMeData, AboutMeDetails } from '@/core/config/about-me-details/about-me-details.config';
import { CareerConfig } from '@/core/config/career/career.config';
import { CertificationConfig } from '@/core/config/certifications/certification.config';
import { ProfileConfig } from '@/core/config/profile/profile.config';
import { ProjectsConfig } from '@/core/config/projects/projects.config';
import { SkillConfig } from '@/core/config/skills/skill.config';
import { SocialLinksConfig } from '@/core/config/social-media/social-media.config';
import { routing } from '@/i18n/routing';
import { parsePortfolioContent, PortfolioContent } from './contract';
import { toCareer, toCertifications, toProfile, toProjects, toSkills, toSocialLinks } from './adapters';
import { ageFrom } from './rich-text';

/**
 * Where the published content comes from (env `CONTENT_SOURCE`):
 * - `neon`: reads `public_api.published_content` with the read-only role (`PORTFOLIO_READ_DATABASE_URL`) over
 *   Neon's HTTP driver (production).
 * - `postgres`: same query over a regular Postgres connection: the local Docker database of the admin
 *   (`npm run dev:local`). Neon's HTTP driver cannot talk to a plain Postgres.
 * - `json`: fetches the exported `content.<lang>.json` files (`CONTENT_JSON_URL`, with a `{lang}` placeholder).
 * - `local`: uses the static config in `src/core/config` (default, and fallback when the source fails).
 *
 * The published content is authoritative: an empty list published by the admin renders empty. The local
 * config is only used when the source is unavailable or returns a payload that breaks the contract.
 */
export type ContentSource = 'local' | 'json' | 'neon' | 'postgres';

export const DEFAULT_CONTENT_SOURCE: ContentSource = 'local';

const CACHE_TAG = 'portfolio-content';

const revalidateSeconds = (): number => {
    const value = Number(process.env.CONTENT_REVALIDATE_SECONDS);
    return Number.isFinite(value) && value > 0 ? value : 60;
};

export const getContentSource = (): ContentSource => {
    const source = process.env.CONTENT_SOURCE?.trim().toLowerCase();

    if (source === 'json' || source === 'neon' || source === 'postgres') {
        return source;
    }

    return DEFAULT_CONTENT_SOURCE;
};

const readUrl = (): string => {
    const url = process.env.PORTFOLIO_READ_DATABASE_URL;
    if (!url) {
        throw new Error('PORTFOLIO_READ_DATABASE_URL is not configured');
    }
    return url;
};

/** One row per language; if the locale has no document, the default language row is returned. */
const readFromNeon = unstable_cache(
    async (locale: string): Promise<unknown | null> => {
        const sql = neon(readUrl());
        const rows = await sql`
            SELECT content
            FROM public_api.published_content
            WHERE lang = ${locale} OR is_default
            ORDER BY (lang = ${locale}) DESC
            LIMIT 1`;

        return rows[0]?.content ?? null;
    },
    [`${CACHE_TAG}-neon`],
    { revalidate: revalidateSeconds(), tags: [CACHE_TAG] }
);

// A single small pool per server process (dev server or `next start`), reused across requests.
let pool: Pool | undefined;

/** Same query as Neon, over a regular connection (local Docker database with the web_reader role). */
const readFromPostgres = unstable_cache(
    async (locale: string): Promise<unknown | null> => {
        pool ??= new Pool({ connectionString: readUrl(), max: 3, idleTimeoutMillis: 30_000 });
        const { rows } = await pool.query<{ content: unknown }>(
            `SELECT content
             FROM public_api.published_content
             WHERE lang = $1 OR is_default
             ORDER BY (lang = $1) DESC
             LIMIT 1`,
            [locale]);

        return rows[0]?.content ?? null;
    },
    [`${CACHE_TAG}-postgres`],
    { revalidate: revalidateSeconds(), tags: [CACHE_TAG] }
);

/**
 * The resolved document is cached, not each request: caching fetches one by one would keep serving a
 * language file after it is removed from the host (a 404 does not replace the cached response).
 */
const readFromJson = unstable_cache(
    async (locale: string): Promise<unknown | null> => {
        const template = process.env.CONTENT_JSON_URL;
        if (!template) {
            throw new Error('CONTENT_JSON_URL is not configured');
        }

        for (const lang of [locale, routing.defaultLocale]) {
            const response = await fetch(template.replace('{lang}', lang), { cache: 'no-store' });

            if (response.ok) {
                return response.json();
            }
            if (response.status !== 404) {
                throw new Error(`CONTENT_JSON_URL answered ${response.status} for "${lang}"`);
            }
        }

        return null;
    },
    [`${CACHE_TAG}-json`],
    { revalidate: revalidateSeconds(), tags: [CACHE_TAG] }
);

/**
 * Published content for a locale, validated against the contract. `null` means "use the local config".
 * Memoized per request, so every section of a page shares one read.
 */
export const getPortfolioContent = cache(async (locale: string): Promise<PortfolioContent | null> => {
    const source = getContentSource();

    if (source === 'local') {
        return null;
    }

    try {
        const raw = source === 'neon'
            ? await readFromNeon(locale)
            : source === 'postgres' ? await readFromPostgres(locale) : await readFromJson(locale);

        if (raw === null) {
            console.warn(`[content] No published content for "${locale}" in "${source}"; using local config.`);
            return null;
        }

        return parsePortfolioContent(raw);
    } catch (error) {
        console.error(`[content] Could not load content from "${source}"; using local config.`, error);
        return null;
    }
});

export async function loadProjects(locale: string): Promise<Project[]> {
    const content = await getPortfolioContent(locale);
    return content ? toProjects(content, locale) : ProjectsConfig;
}

export async function loadCareer(locale: string, presentLabel: string): Promise<Career[]> {
    const content = await getPortfolioContent(locale);
    return content ? toCareer(content, locale, presentLabel) : CareerConfig;
}

export async function loadCertifications(locale: string): Promise<Certification[]> {
    const content = await getPortfolioContent(locale);
    return content ? toCertifications(content, locale) : CertificationConfig;
}

export async function loadSkills(locale: string): Promise<Skill[]> {
    const content = await getPortfolioContent(locale);
    return content ? toSkills(content, locale) : SkillConfig;
}

export async function loadSocialLinks(locale: string): Promise<SocialLink[]> {
    const content = await getPortfolioContent(locale);
    return content ? toSocialLinks(content) : SocialLinksConfig;
}

/** Local fallback profile: the texts that lived in messages and the static config. */
async function localProfile(locale: string): Promise<Profile> {
    const t = await getTranslations({ locale, namespace: 'Index' });
    const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const age = ageFrom(ProfileConfig.birthDate);
    const seo = ProfileConfig.seo[locale] ?? ProfileConfig.seo[routing.defaultLocale];

    return {
        ownerName: ProfileConfig.ownerName,
        taglines: AboutMeDetails[locale as keyof AboutMeData] ?? AboutMeDetails.es,
        bioHtml: `<p>${escape(`${t('I have')} ${age} ${t('first-part-presentation')}`)}</p>` +
            `<p>${escape(t('second-part-presentation'))}</p>`,
        avatarUrl: ProfileConfig.avatarUrl,
        cvUrl: process.env.CV_LINK || undefined,
        seo: { ...seo, ogImageUrl: ProfileConfig.ogImageUrl },
    };
}

export async function loadProfile(locale: string): Promise<Profile> {
    const [content, fallback] = await Promise.all([getPortfolioContent(locale), localProfile(locale)]);
    return content ? toProfile(content, fallback) : fallback;
}
