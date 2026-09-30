import { Category, Status, Tag } from "@/core/types";
import { Developer } from "./developer.interface";

export interface Project {
    slug: string;
    title: string;
    /** Paragraphs (local config). Published content uses descriptionHtml instead. */
    description: Map<string, string[]>;
    /** Sanitized HTML from the admin. */
    descriptionHtml?: Map<string, string>;
    shortDescription: Map<string, string>;
    logo: string;
    creator: string;
    dateStart: Date;
    dateEnd?: Date;
    documentation?: Map<string, string>;
    productionLink?: string;
    repoUrl?: string;
    featured?: boolean;
    /** Names from the admin catalogs; when absent (local config) the keys are translated with messages. */
    categoryLabel?: string;
    statusLabel?: string;
    stageLabel?: string;
    tagLabels?: string[];
    images: string[];
    status: Status;
    category?: Category;
    tags: Tag[];
    developers: Developer[];
};