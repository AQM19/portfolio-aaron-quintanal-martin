/** Personal information and SEO of the site, already resolved for one locale. */
export interface Profile {
    ownerName: string;
    /** Rotating headlines of the home presentation. */
    taglines: string[];
    /** Sanitized HTML, with the age already filled in. */
    bioHtml: string;
    /** URL or site path of the presentation picture. */
    avatarUrl: string;
    /** PDF opened by the "Download CV" button; the button is hidden without one. */
    cvUrl?: string;
    seo: {
        title: string;
        description: string;
        keywords: string[];
        /** URL or site path of the social card image. */
        ogImageUrl?: string;
    };
}
