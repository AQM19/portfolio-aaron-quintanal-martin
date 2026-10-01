export interface Certification {
    title: string;
    organization: string;
    date: Date;
    description: Map<string, string>;
    /** Sanitized HTML from the admin; takes precedence over description. */
    descriptionHtml?: Map<string, string>;
    calification?: number;
    link?: string;
    professor?: string;
}