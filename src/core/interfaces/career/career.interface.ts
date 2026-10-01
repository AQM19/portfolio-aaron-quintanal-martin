import { EmpressProgression } from "./empress-progression.interface";

/** `education` covers studies and courses; everything else is work experience. */
export type CareerKind = 'job' | 'education';

export interface Career {
    dateRange: Map<string, string>;
    /** Start of the stage, to sort the timeline; entries without it keep their order. */
    startDate?: Date;
    empress: string;
    /** Role (jobs) or programme name (education). */
    position?: string;
    /** Defaults to `job`. */
    kind?: CareerKind;
    /** One of the admin employment types (`fulltime`, `internship`...), shown as a badge. */
    employmentType?: string;
    isCurrent?: boolean;
    location?: string;
    companyUrl?: string;
    /** Technologies used (skill names). */
    skills?: string[];
    empressImage: string;
    description: Map<string, string>;
    /** Sanitized HTML from the admin; takes precedence over description. */
    descriptionHtml?: Map<string, string>;
    progression?: EmpressProgression[];
}