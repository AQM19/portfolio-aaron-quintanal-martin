/**
 * Exports the web's static content (src/core/config + messages) as the local seed of the desktop admin.
 *
 *   npx tsx scripts/export-seed.ts [output]
 *
 * Default output: ../AQPortfoil/db/seed/local-seed.json. The admin imports it on an empty Local database and
 * publishes version 1, so `npm run dev:local` shows the same content as today. Images keep their web paths
 * (/png/…, /webp/…): the web still serves them.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { AboutMeDetails } from '../src/core/config/about-me-details/about-me-details.config';
import { CareerConfig } from '../src/core/config/career/career.config';
import { CertificationConfig } from '../src/core/config/certifications/certification.config';
import { ProjectsConfig } from '../src/core/config/projects/projects.config';
import { SkillConfig } from '../src/core/config/skills/skill.config';
import { SocialLinksConfig } from '../src/core/config/social-media/social-media.config';

const LANGS = ['es', 'en'] as const;
type Lang = (typeof LANGS)[number];
type PerLang<T> = Partial<Record<Lang, T>>;

const SUMMARY_MAX = 200;

const messages: Record<Lang, Record<string, Record<string, string>>> = {
    es: JSON.parse(readFileSync(resolve(__dirname, '../messages/es.json'), 'utf8')),
    en: JSON.parse(readFileSync(resolve(__dirname, '../messages/en.json'), 'utf8')),
};

// Project status in the web (lifecycle) -> admin catalogs.
const STATUS_TO_STAGE: Record<string, string> = {
    investigation: 'research',
    planification: 'planning',
    designing: 'design',
    developping: 'development',
    deploying: 'deployment',
    manteinance: 'maintenance',
    finished: 'finished',
};

// The career config has no job titles except CIC's promotions: inferred from each description. Review them in the admin.
const POSITIONS: Record<string, { es: string; en: string; employmentType: string }> = {
    'Indole Studio': { es: 'Becario de desarrollo web', en: 'Web development intern', employmentType: 'internship' },
    DAM: { es: 'Estudiante de Desarrollo de Aplicaciones Multiplataforma', en: 'Multiplatform Application Development student', employmentType: 'other' },
    'LKS Next': { es: 'Desarrollador en prácticas', en: 'Developer intern', employmentType: 'internship' },
    CEIABD: { es: 'Estudiante de la especialización en IA y Big Data', en: 'AI and Big Data specialisation student', employmentType: 'other' },
    CIC: { es: 'Desarrollador junior', en: 'Junior developer', employmentType: 'fulltime' },
};

const SPANISH_MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

const escapeHtml = (text: string) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const paragraphs = (texts: string[]) =>
    texts.map((t) => t.trim()).filter(Boolean).map((t) => `<p>${escapeHtml(t)}</p>`).join('') || null;

const isoDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/** Cuts at a word boundary so the summary fits the admin's limit. */
function summary(text: string | undefined): string | null {
    const value = text?.trim();
    if (!value) return null;
    if (value.length <= SUMMARY_MAX) return value;
    const cut = value.slice(0, SUMMARY_MAX - 1);
    return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/** "Julio 2023" -> 2023-07-01; "Actualidad" -> null. */
function parseMonthYear(text: string): string | null {
    const match = /^([a-záéíóú]+)\s+(\d{4})$/i.exec(text.trim());
    if (!match) return null;
    const month = SPANISH_MONTHS.indexOf(match[1].toLowerCase());
    if (month < 0) throw new Error(`Unknown month in "${text}"`);
    return isoDate(new Date(Number(match[2]), month, 1));
}

function perLang<T>(map: Map<string, T> | undefined, pick: (value: T) => unknown): PerLang<unknown> {
    const result: PerLang<unknown> = {};
    for (const lang of LANGS) {
        const value = map?.get(lang);
        if (value !== undefined) result[lang] = pick(value);
    }
    return result;
}

const projects = ProjectsConfig.map((p) => {
    const stage = STATUS_TO_STAGE[p.status] ?? 'development';
    const endDate = p.dateEnd ? isoDate(p.dateEnd) : null;
    return {
        slug: p.slug,
        title: p.title,
        // "Closed" needs an end date in the admin; finished projects without one stay active.
        status: stage === 'finished' && endDate ? 'closed' : 'active',
        stage,
        category: p.category,
        startDate: isoDate(p.dateStart),
        endDate: stage === 'finished' ? endDate : null,
        image: p.logo,
        images: p.images,
        demoUrl: p.productionLink ?? null,
        tags: p.tags,
        collaborators: p.developers.map((d) => ({
            name: `${d.name} ${d.surname}`.trim(),
            username: d.username,
            profileUrl: d.github ?? null,
            avatarUrl: d.avatar ?? null,
        })),
        translations: Object.fromEntries(LANGS.map((lang) => [lang, {
            summary: summary(p.shortDescription.get(lang)),
            description: paragraphs(p.description.get(lang) ?? []),
            documentation: p.documentation?.get(lang) || null,
        }])),
    };
});

const experience = CareerConfig.map((c) => {
    const [start, end] = (c.dateRange.get('es') ?? '').split(' - ');
    const position = POSITIONS[c.empress];
    if (!position) throw new Error(`No position for ${c.empress}: add it to POSITIONS`);
    return {
        company: c.empress,
        logo: c.empressImage,
        employmentType: position.employmentType,
        startDate: parseMonthYear(start),
        endDate: parseMonthYear(end),
        translations: Object.fromEntries(LANGS.map((lang) => [lang, {
            position: position[lang],
            description: paragraphs([c.description.get(lang) ?? '']),
            milestones: (c.progression ?? []).map((m) => ({
                date: isoDate(m.promotionDate),
                title: m.position,
                description: m.evaluation.get(lang) ?? null,
            })),
        }])),
    };
});

const certifications = CertificationConfig.map((c) => ({
    issuer: c.organization,
    issuedOn: isoDate(c.date),
    grade: c.calification ?? null,
    credentialUrl: c.link ?? null,
    instructor: c.professor ?? null,
    translations: Object.fromEntries(LANGS.map((lang) => [lang, {
        name: c.title,
        description: paragraphs([c.description.get(lang) ?? '']),
    }])),
}));

const SKILL_CATEGORY: Record<string, string> = { language: 'language', framework: 'frontend', library: 'other', tool: 'tools' };

const skills = SkillConfig.map((s) => ({
    slug: s.nemonic,
    name: s.name,
    category: SKILL_CATEGORY[s.type] ?? 'other',
    visible: s.isEnabled,
    featured: s.isFavourite,
    translations: perLang(s.alt, (alt) => ({ description: alt })),
}));

const index = (lang: Lang) => messages[lang].Index;

const settings = {
    ownerName: 'Aarón Quintanal Martín',
    location: 'Cantabria, España',
    birthDate: '1996-03-15',
    avatar: '/png/mapache-ladron.png',
    ogImage: '/png/aaron-quintanal-martin.png',
    translations: Object.fromEntries(LANGS.map((lang) => [lang, {
        taglines: AboutMeDetails[lang],
        // "Tengo {age} años, residente…": the web replaces {age} with the age computed from birthDate.
        bio: paragraphs([`${index(lang)['I have']} {age} ${index(lang)['first-part-presentation']}`, index(lang)['second-part-presentation']]),
        seoTitle: lang === 'es' ? 'Aarón Quintanal Martín - Desarrollador Full Stack' : 'Aarón Quintanal Martín - Full Stack Developer',
        seoDescription: lang === 'es'
            ? 'Aarón Quintanal Martín es un desarrollador full stack especializado en Angular, Next.js y .NET, ubicado en Cantabria.'
            : 'Aarón Quintanal Martín is a full stack developer specialised in Angular, Next.js and .NET, based in Cantabria (Spain).',
        seoKeywords: ['Aarón Quintanal Martín', 'Cantabria', lang === 'es' ? 'desarrollador' : 'developer', 'full stack', 'Angular', 'Next.js', '.NET'],
    }])),
};

const seed = {
    $comment: 'Generado por portfolio-aaron-quintanal-martin/scripts/export-seed.ts. Solo para el entorno Local.',
    settings,
    socialLinks: SocialLinksConfig.map((s) => ({ platform: s.platform, url: s.href })),
    skills,
    projects,
    experience,
    certifications,
};

const output = resolve(process.cwd(), process.argv[2] ?? '../AQPortfoil/db/seed/local-seed.json');
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(seed, null, 2)}\n`, 'utf8');
console.log(`Seed written to ${output}: ${projects.length} projects, ${experience.length} experience, ` +
    `${certifications.length} certifications, ${skills.length} skills, ${seed.socialLinks.length} social links.`);
