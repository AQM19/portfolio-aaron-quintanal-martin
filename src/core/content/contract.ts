/**
 * Contract for the content published by the desktop admin (AQPortfoil).
 *
 * This file mirrors `Models/Public/PortfolioContentDto.cs` and `docs/WEB_CONTRACT.md` in the admin
 * repository. The admin's `ContractShapeTests` freezes the JSON shape: when that test changes, this file
 * must change with it.
 *
 * Rules of the payload:
 * - One document per language, already resolved (missing translations fall back to the default language).
 * - Optional fields are always present as `null`, never omitted. Lists are never `null`.
 * - Dates are `YYYY-MM-DD`; `publishedAt` is ISO 8601 UTC.
 * - Lists come filtered (only visible / published items) and sorted as they must be displayed.
 * - `description` and `bio` are sanitized HTML (see rich-text.ts). `bio` may contain `{age}`.
 * - Image and document fields are public URLs, or web paths (`/png/…`) for assets served by this site.
 * - Enum values are lowercase. New values may be added without bumping `schemaVersion`, so consumers
 *   must tolerate values they do not know.
 * - Project statuses, stages, categories and tags are catalogs managed in the admin. They come translated in
 *   `projectStatuses`, `projectStages`, `projectCategories` and `tags`; projects reference them by slug.
 */

/**
 * 2: managed catalogs (statuses, stages, categories, tags) and optional slug references in projects.
 * 3: one title per project, HTML long texts, settings with taglines, birth date, SEO keywords and a CV per language.
 */
export const SUPPORTED_SCHEMA_VERSION = 3;

export const SOCIAL_PLATFORMS = [
    'github', 'linkedin', 'x', 'bluesky', 'mastodon', 'youtube', 'instagram', 'email', 'website', 'other',
    'facebook', 'tiktok', 'discord', 'gitlab',
] as const;

export const SKILL_CATEGORIES = [
    'language', 'frontend', 'backend', 'database', 'devops', 'cloud', 'mobile', 'testing', 'tools', 'softskill', 'other',
] as const;

export const EMPLOYMENT_TYPES = [
    'fulltime', 'parttime', 'freelance', 'contract', 'internship', 'volunteer', 'other',
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

/** `YYYY-MM-DD` */
export type IsoDate = string;

export interface PortfolioContent {
    schemaVersion: number;
    version: number;
    publishedAt: string;
    lang: string;
    availableLanguages: LanguageDto[];
    settings: SettingsDto;
    socialLinks: SocialLinkDto[];
    skills: SkillDto[];
    projectStatuses: CatalogDto[];
    projectStages: CatalogDto[];
    projectCategories: CatalogDto[];
    tags: CatalogDto[];
    projects: ProjectDto[];
    experience: ExperienceDto[];
    certifications: CertificationDto[];
}

export interface LanguageDto {
    code: string;
    name: string;
    isDefault: boolean;
}

export interface SettingsDto {
    ownerName: string;
    email: string | null;
    location: string | null;
    /** Used to replace `{age}` in the bio. */
    birthDate: IsoDate | null;
    avatarUrl: string | null;
    /** Image for social cards (Open Graph / Twitter). */
    ogImageUrl: string | null;
    /** CV in this language (PDF); falls back to the default language's. */
    cvUrl: string | null;
    /** Rotating headlines of the home presentation, in order. */
    taglines: string[];
    /** Sanitized HTML with `{age}`. */
    bio: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    seoKeywords: string[];
}

export interface SocialLinkDto {
    /** One of {@link SOCIAL_PLATFORMS}; unknown values are possible. */
    platform: string;
    url: string;
    label: string | null;
    icon: string | null;
}

export interface SkillDto {
    slug: string;
    name: string;
    description: string | null;
    /** One of {@link SKILL_CATEGORIES}; unknown values are possible. */
    category: string;
    /** 1-5 */
    level: number | null;
    iconUrl: string | null;
    featured: boolean;
}

/** Catalog item already translated. Only visible items are published. */
export interface CatalogDto {
    slug: string;
    name: string;
    description: string | null;
    /** `#RRGGBB` */
    color: string | null;
}

export interface CollaboratorDto {
    name: string;
    username: string | null;
    profileUrl: string | null;
    avatarUrl: string | null;
}

export interface ProjectDto {
    slug: string;
    title: string;
    summary: string | null;
    description: string | null;
    /** Slug in `projectStatuses`, or null if unassigned/hidden. */
    status: string | null;
    /** Slug in `projectStages`, or null if unassigned/hidden. */
    stage: string | null;
    /** Slug in `projectCategories`, or null if unassigned/hidden. */
    category: string | null;
    /** Cover image (URL or site path such as `/png/x.png`). */
    imageUrl: string | null;
    /** Detail page gallery, in order. */
    images: string[];
    repoUrl: string | null;
    demoUrl: string | null;
    documentationUrl: string | null;
    featured: boolean;
    startDate: IsoDate;
    /** Only set when the project status is a closing one; null means "in progress". */
    endDate: IsoDate | null;
    /** Slugs referencing `skills[].slug`. */
    skills: string[];
    /** Slugs in `tags`, in catalog order. */
    tags: string[];
    collaborators: CollaboratorDto[];
}

export interface MilestoneDto {
    date: IsoDate;
    title: string;
    description: string | null;
}

export interface ExperienceDto {
    company: string;
    companyUrl: string | null;
    location: string | null;
    logoUrl: string | null;
    /** One of {@link EMPLOYMENT_TYPES}; unknown values are possible. */
    employmentType: string;
    position: string;
    description: string | null;
    startDate: IsoDate;
    endDate: IsoDate | null;
    isCurrent: boolean;
    /** Slugs referencing `skills[].slug`. */
    skills: string[];
    milestones: MilestoneDto[];
}

export interface CertificationDto {
    name: string;
    issuer: string;
    description: string | null;
    credentialId: string | null;
    credentialUrl: string | null;
    imageUrl: string | null;
    grade: number | null;
    instructor: string | null;
    issuedOn: IsoDate;
    expiresOn: IsoDate | null;
}

export class ContractError extends Error {
    constructor(message: string) {
        super(`Invalid portfolio content: ${message}`);
        this.name = 'ContractError';
    }
}

/**
 * Checks that an unknown payload honours the contract before the app trusts it. It validates the fields the
 * web depends on; extra fields are allowed so the admin can add fields without breaking the web.
 */
export function parsePortfolioContent(raw: unknown): PortfolioContent {
    const root = asObject(raw, '$');

    const schemaVersion = asNumber(root.schemaVersion, '$.schemaVersion');
    if (schemaVersion !== SUPPORTED_SCHEMA_VERSION) {
        throw new ContractError(`schemaVersion ${schemaVersion} is not supported (expected ${SUPPORTED_SCHEMA_VERSION})`);
    }

    asNumber(root.version, '$.version');
    asString(root.publishedAt, '$.publishedAt');
    asString(root.lang, '$.lang');

    eachItem(root.availableLanguages, '$.availableLanguages', (item, path) => {
        asString(item.code, `${path}.code`);
        asBoolean(item.isDefault, `${path}.isDefault`);
    });

    const settings = asObject(root.settings, '$.settings');
    asString(settings.ownerName, '$.settings.ownerName');
    asOptionalDate(settings.birthDate, '$.settings.birthDate');
    asArray(settings.taglines, '$.settings.taglines');
    asArray(settings.seoKeywords, '$.settings.seoKeywords');

    eachItem(root.socialLinks, '$.socialLinks', (item, path) => {
        asString(item.platform, `${path}.platform`);
        asString(item.url, `${path}.url`);
    });

    eachItem(root.skills, '$.skills', (item, path) => {
        asString(item.slug, `${path}.slug`);
        asString(item.name, `${path}.name`);
        asBoolean(item.featured, `${path}.featured`);
    });

    for (const catalog of ['projectStatuses', 'projectStages', 'projectCategories', 'tags'] as const) {
        eachItem(root[catalog], `$.${catalog}`, (item, path) => {
            asString(item.slug, `${path}.slug`);
            asString(item.name, `${path}.name`);
        });
    }

    eachItem(root.projects, '$.projects', (item, path) => {
        asString(item.slug, `${path}.slug`);
        asString(item.title, `${path}.title`);
        asOptionalString(item.status, `${path}.status`);
        asOptionalString(item.stage, `${path}.stage`);
        asOptionalString(item.category, `${path}.category`);
        asDate(item.startDate, `${path}.startDate`);
        asOptionalDate(item.endDate, `${path}.endDate`);
        asArray(item.images, `${path}.images`);
        asArray(item.tags, `${path}.tags`);
        asArray(item.skills, `${path}.skills`);
        eachItem(item.collaborators, `${path}.collaborators`, (c, cPath) => asString(c.name, `${cPath}.name`));
    });

    eachItem(root.experience, '$.experience', (item, path) => {
        asString(item.company, `${path}.company`);
        asString(item.position, `${path}.position`);
        asDate(item.startDate, `${path}.startDate`);
        asOptionalDate(item.endDate, `${path}.endDate`);
        asArray(item.skills, `${path}.skills`);
        eachItem(item.milestones, `${path}.milestones`, (m, mPath) => {
            asDate(m.date, `${mPath}.date`);
            asString(m.title, `${mPath}.title`);
        });
    });

    eachItem(root.certifications, '$.certifications', (item, path) => {
        asString(item.name, `${path}.name`);
        asString(item.issuer, `${path}.issuer`);
        asDate(item.issuedOn, `${path}.issuedOn`);
        asOptionalDate(item.expiresOn, `${path}.expiresOn`);
    });

    return raw as PortfolioContent;
}

/** Parses a contract date (`YYYY-MM-DD`) as a local date, so it never shifts a day with the time zone. */
export function parseContractDate(value: IsoDate): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
}

type JsonObject = Record<string, unknown>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function asObject(value: unknown, path: string): JsonObject {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new ContractError(`${path} must be an object`);
    }
    return value as JsonObject;
}

function asArray(value: unknown, path: string): unknown[] {
    if (!Array.isArray(value)) {
        throw new ContractError(`${path} must be an array`);
    }
    return value;
}

function eachItem(value: unknown, path: string, check: (item: JsonObject, itemPath: string) => void): void {
    asArray(value, path).forEach((item, index) => {
        const itemPath = `${path}[${index}]`;
        check(asObject(item, itemPath), itemPath);
    });
}

function asString(value: unknown, path: string): string {
    if (typeof value !== 'string') {
        throw new ContractError(`${path} must be a string`);
    }
    return value;
}

function asOptionalString(value: unknown, path: string): string | null {
    return value === null ? null : asString(value, path);
}

function asNumber(value: unknown, path: string): number {
    if (typeof value !== 'number') {
        throw new ContractError(`${path} must be a number`);
    }
    return value;
}

function asBoolean(value: unknown, path: string): boolean {
    if (typeof value !== 'boolean') {
        throw new ContractError(`${path} must be a boolean`);
    }
    return value;
}

function asDate(value: unknown, path: string): IsoDate {
    if (typeof value !== 'string' || !ISO_DATE.test(value)) {
        throw new ContractError(`${path} must be a YYYY-MM-DD date`);
    }
    return value;
}

function asOptionalDate(value: unknown, path: string): IsoDate | null {
    return value === null ? null : asDate(value, path);
}
