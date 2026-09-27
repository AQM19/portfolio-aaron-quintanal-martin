
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { neon } from '@neondatabase/serverless';
import type { Career } from '@/core/interfaces/career/career.interface';
import type { Certification } from '@/core/interfaces/certification/certification.interface';
import type { Project, SocialLink } from '@/core/interfaces';
import type { Skill } from '@/core/interfaces/skills/skill.interface';
import { CareerConfig } from '@/core/config/career/career.config';
import { CertificationConfig } from '@/core/config/certifications/certification.config';
import { ProjectsConfig } from '@/core/config/projects/projects.config';
import { SkillConfig } from '@/core/config/skills/skill.config';
import { SocialLinksConfig } from '@/core/config/social-media/social-media.config';
import { routing } from '@/i18n/routing';
import { parsePortfolioContent, PortfolioContent } from './contract';
import { toCareer, toCertifications, toProjects, toSkills, toSocialLinks } from './adapters';

/**
 * Where the published content comes from (env `CONTENT_SOURCE`):
 * - `neon`: reads `public_api.published_content` with the read-only role (`PORTFOLIO_READ_DATABASE_URL`).
 * - `json`: fetches the exported `content.<lang>.json` files (`CONTENT_JSON_URL`, with a `{lang}` placeholder).
 * - `local`: uses the static config in `src/core/config` (default, and fallback when the source fails).
 *
 * The published content is authoritative: an empty list published by the admin renders empty. The local
 * config is only used when the source is unavailable or returns a payload that breaks the contract.
 */
export type ContentSource = 'local' | 'json' | 'neon';

export const DEFAULT_CONTENT_SOURCE: ContentSource = 'local';

const CACHE_TAG = 'portfolio-content';

const revalidateSeconds = (): number => {
    const value = Number(process.env.CONTENT_REVALIDATE_SECONDS);
    return Number.isFinite(value) && value > 0 ? value : 60;
};

export const getContentSource = (): ContentSource => {
    const source = process.env.CONTENT_SOURCE?.trim().toLowerCase();

    if (source === 'json' || source === 'neon') {
        return source;
    }

    return DEFAULT_CONTENT_SOURCE;
};

/** One row per language; if the locale has no document, the default language row is returned. */
const readFromNeon = unstable_cache(
    async (locale: string): Promise<unknown | null> => {
        const url = process.env.PORTFOLIO_READ_DATABASE_URL;
        if (!url) {
            throw new Error('PORTFOLIO_READ_DATABASE_URL is not configured');
        }

        const sql = neon(url);
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
        const raw = source === 'neon' ? await readFromNeon(locale) : await readFromJson(locale);

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

/** CV published by the admin; `CV_LINK` remains as fallback. */
export async function loadCvUrl(locale: string): Promise<string | undefined> {
    const content = await getPortfolioContent(locale);
    return content?.settings.cvUrl ?? process.env.CV_LINK ?? undefined;
}

export async function loadSocialLinks(locale: string): Promise<SocialLink[]> {
    const content = await getPortfolioContent(locale);
    return content ? toSocialLinks(content) : SocialLinksConfig;
}
