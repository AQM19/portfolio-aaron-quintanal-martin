import type { Career } from '@/core/interfaces/career/career.interface';
import type { Certification } from '@/core/interfaces/certification/certification.interface';
import type { Developer, Project, SocialLink } from '@/core/interfaces';
import type { Profile } from '@/core/interfaces/profile/profile.interface';
import type { Skill } from '@/core/interfaces/skills/skill.interface';
import { CATEGORIES, Status, TAGS, Tag } from '@/core/types';
import { WORK_PLATFORMS } from '@/core/config/social-media/social-icons';
import { isRenderableImage } from './image-hosts';
import { sanitizeRichText, withAge } from './rich-text';
import {
    CatalogDto, CertificationDto, CollaboratorDto, ExperienceDto, parseContractDate, PortfolioContent, ProjectDto,
    SkillDto, SocialLinkDto
} from './contract';

// The UI components were written for multilingual local config (Map<locale, text>). The contract already comes
// resolved to one language, so each adapter returns maps with a single entry keyed by the locale the page is
// rendering. That key is the requested locale, not `content.lang`: when the admin has no document for it, the
// loader serves the default language and the components still look the text up by their own locale.

// Placeholders for items published without an image (existing assets in /public).
const DEFAULT_PROJECT_LOGO = '/png/mapache-ladron.png';
const DEFAULT_CAREER_IMAGE = '/png/mapache-ladron.png';
const DEFAULT_AVATAR = '/png/mapache-ladron.png';

const STAGE_TO_STATUS: Record<string, Status> = {
    research: 'investigation',
    planning: 'planification',
    design: 'designing',
    development: 'developping',
    deployment: 'deploying',
    maintenance: 'manteinance',
    finished: 'finished',
};

/** Catalog lookups by slug, built once per document. */
interface Catalogs {
    statuses: Map<string, CatalogDto>;
    stages: Map<string, CatalogDto>;
    categories: Map<string, CatalogDto>;
    tags: Map<string, CatalogDto>;
}

export function toProjects(content: PortfolioContent, locale: string): Project[] {
    const bySlug = (items: CatalogDto[]) => new Map(items.map((item) => [item.slug, item]));
    const catalogs: Catalogs = {
        statuses: bySlug(content.projectStatuses),
        stages: bySlug(content.projectStages),
        categories: bySlug(content.projectCategories),
        tags: bySlug(content.tags),
    };

    return content.projects.map((project) => toProject(project, locale, content.settings.ownerName, catalogs));
}

export function toCareer(content: PortfolioContent, locale: string, presentLabel: string): Career[] {
    return content.experience.map((item) => toCareerItem(item, locale, presentLabel));
}

export function toCertifications(content: PortfolioContent, locale: string): Certification[] {
    return content.certifications.map((item) => toCertification(item, locale));
}

export function toSkills(content: PortfolioContent, locale: string): Skill[] {
    return content.skills.map((item) => toSkill(item, locale));
}

export function toSocialLinks(content: PortfolioContent): SocialLink[] {
    return content.socialLinks.map(toSocialLink);
}

/** Missing values are completed with the local fallback, so the home never shows an empty presentation. */
export function toProfile(content: PortfolioContent, fallback: Profile): Profile {
    const s = content.settings;
    return {
        ownerName: s.ownerName || fallback.ownerName,
        taglines: s.taglines.length > 0 ? s.taglines : fallback.taglines,
        bioHtml: sanitizeRichText(s.bio ? withAge(s.bio, s.birthDate) : null) ?? fallback.bioHtml,
        avatarUrl: isRenderableImage(s.avatarUrl) ? s.avatarUrl : fallback.avatarUrl,
        cvUrl: s.cvUrl ?? undefined,
        seo: {
            title: s.seoTitle ?? fallback.seo.title,
            description: s.seoDescription ?? fallback.seo.description,
            keywords: s.seoKeywords.length > 0 ? s.seoKeywords : fallback.seo.keywords,
            ogImageUrl: s.ogImageUrl ?? fallback.seo.ogImageUrl,
        },
    };
}

function toProject(dto: ProjectDto, lang: string, ownerName: string, catalogs: Catalogs): Project {
    const images = dto.images.filter(isRenderableImage);
    const cover = [dto.imageUrl, ...images].find(isRenderableImage) ?? DEFAULT_PROJECT_LOGO;

    return {
        slug: dto.slug,
        title: dto.title,
        creator: ownerName,
        logo: cover,
        description: new Map([[lang, []]]),
        descriptionHtml: htmlMap(lang, dto.description),
        shortDescription: new Map([[lang, dto.summary ?? '']]),
        documentation: dto.documentationUrl ? new Map([[lang, dto.documentationUrl]]) : undefined,
        dateStart: parseContractDate(dto.startDate),
        dateEnd: dto.endDate ? parseContractDate(dto.endDate) : undefined,
        productionLink: dto.demoUrl ?? undefined,
        repoUrl: dto.repoUrl ?? undefined,
        featured: dto.featured,
        images: images.length > 0 ? images : [cover],
        status: (dto.stage && STAGE_TO_STATUS[dto.stage]) || 'developping',
        // `category` and `tags` keep the typed keys used by the local config; what is displayed are the labels,
        // which come from the admin catalogs, so categories and tags created there show up without code changes.
        category: dto.category && isOneOf(CATEGORIES, dto.category) ? dto.category : undefined,
        tags: dto.tags.filter((tag): tag is Tag => isOneOf(TAGS, tag)),
        categoryLabel: dto.category ? catalogs.categories.get(dto.category)?.name : undefined,
        statusLabel: dto.status ? catalogs.statuses.get(dto.status)?.name : undefined,
        stageLabel: dto.stage ? catalogs.stages.get(dto.stage)?.name : undefined,
        tagLabels: dto.tags.map((slug) => catalogs.tags.get(slug)?.name ?? slug),
        developers: dto.collaborators.map(toDeveloper),
    };
}

function toDeveloper(dto: CollaboratorDto): Developer {
    const [name, ...surname] = dto.name.trim().split(/\s+/);

    return {
        username: dto.username ?? dto.name,
        name,
        surname: surname.join(' '),
        github: dto.profileUrl ?? undefined,
        // The Avatar component always renders an image.
        avatar: isRenderableImage(dto.avatarUrl) ? dto.avatarUrl : DEFAULT_AVATAR,
    };
}

function toCareerItem(dto: ExperienceDto, lang: string, presentLabel: string): Career {
    const start = formatMonthYear(dto.startDate, lang);
    const end = dto.endDate ? formatMonthYear(dto.endDate, lang) : presentLabel;

    return {
        empress: dto.company,
        empressImage: isRenderableImage(dto.logoUrl) ? dto.logoUrl : DEFAULT_CAREER_IMAGE,
        dateRange: new Map([[lang, `${start} - ${end}`]]),
        description: new Map([[lang, '']]),
        descriptionHtml: htmlMap(lang, dto.description),
        progression: dto.milestones.length > 0
            ? dto.milestones.map((milestone) => ({
                promotionDate: parseContractDate(milestone.date),
                position: milestone.title,
                evaluation: new Map([[lang, milestone.description ?? '']]),
            }))
            : undefined,
    };
}

function toCertification(dto: CertificationDto, lang: string): Certification {
    return {
        title: dto.name,
        organization: dto.issuer,
        date: parseContractDate(dto.issuedOn),
        description: new Map([[lang, '']]),
        descriptionHtml: htmlMap(lang, dto.description),
        calification: dto.grade ?? undefined,
        link: dto.credentialUrl ?? undefined,
        professor: dto.instructor ?? undefined,
    };
}

function toSkill(dto: SkillDto, lang: string): Skill {
    return {
        nemonic: dto.slug,
        name: dto.name,
        alt: new Map([[lang, dto.description ?? dto.name]]),
        isEnabled: true,
        isFavourite: dto.featured,
        type: dto.category === 'language' ? 'language' : dto.category === 'tools' ? 'tool' : 'framework',
        iconUrl: isRenderableImage(dto.iconUrl) ? dto.iconUrl : undefined,
    };
}

function toSocialLink(dto: SocialLinkDto): SocialLink {
    return {
        platform: dto.platform,
        href: dto.url,
        label: dto.label ?? undefined,
        group: WORK_PLATFORMS.includes(dto.platform) ? 'work' : 'social',
    };
}

/** Sanitized HTML for the page locale, or undefined when there is no text. */
function htmlMap(lang: string, html: string | null): Map<string, string> | undefined {
    const clean = sanitizeRichText(html);
    return clean ? new Map([[lang, clean]]) : undefined;
}

/** "Julio 2023" / "July 2023" */
function formatMonthYear(date: string, lang: string): string {
    const text = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' }).format(parseContractDate(date));
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function isOneOf<T extends string>(values: readonly T[], value: string): value is T {
    return (values as readonly string[]).includes(value);
}
