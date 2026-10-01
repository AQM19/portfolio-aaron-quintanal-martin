import { SocialLink } from "@/core/interfaces/social-media/social-media.interface";

/** Local fallback used when the published content is not available. */
export const SocialLinksConfig: SocialLink[] = [
    { platform: 'facebook', href: 'https://www.facebook.com/profile.php?id=61558620634892', group: 'social' },
    { platform: 'x', href: 'https://x.com/AQuintanalMDev', group: 'social' },
    { platform: 'tiktok', href: 'https://www.tiktok.com/@aquintanalmdev', group: 'social' },
    // Disabled: { platform: 'discord', href: 'https://discord.gg/Ha62am3h', group: 'social' },
    { platform: 'linkedin', href: 'https://www.linkedin.com/in/aar%C3%B3n-quintanal-mart%C3%ADn-6116b5270/', group: 'work' },
    { platform: 'github', href: 'https://github.com/AQM19', group: 'work' },
    { platform: 'gitlab', href: 'https://gitlab.com/AQM19', group: 'work' },
];
