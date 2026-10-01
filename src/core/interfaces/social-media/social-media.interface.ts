/**
 * Serializable social link: it crosses from server components to the client layout, so it carries the
 * platform name instead of the icon component (see `getSocialIcon`).
 */
export interface SocialLink {
    platform: string;
    href: string;
    label?: string;
    /** `work` links (LinkedIn, GitHub…) are shown apart from the personal ones. */
    group: 'social' | 'work';
}
