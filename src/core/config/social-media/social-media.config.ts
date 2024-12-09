import { SocialMedia } from "@/core/interfaces/social-media/social-media.interface";
import { FaDiscord, FaFacebook, FaGithub, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { FaGitlab, FaXTwitter } from "react-icons/fa6";

export const SocialMediaMenuConfig: SocialMedia[] = [
    {
        href: 'https://www.facebook.com/profile.php?id=61558620634892',
        icon: FaFacebook,
        target: '_blank',
        isEnabled: true
    },
    {
        href: 'https://x.com/AQuintanalMDev',
        icon: FaXTwitter,
        target: '_blank',
        isEnabled: true
    },
    {
        href: 'https://www.tiktok.com/@aquintanalmdev',
        icon: FaTiktok,
        target: '_blank',
        isEnabled: true
    },
    {
        href: 'https://discord.gg/Ha62am3h',
        icon: FaDiscord,
        target: '_blank',
        isEnabled: false
    }
];

export const WorkMediaMenuConfig: SocialMedia[] = [
    {
        href: 'https://www.linkedin.com/in/aar%C3%B3n-quintanal-mart%C3%ADn-6116b5270/',
        target: "_blank",
        icon: FaLinkedinIn,
        isEnabled: true
    },
    {
        href: 'https://github.com/AQM19',
        target: "_blank",
        icon: FaGithub,
        isEnabled: true
    },
    {
        href: 'https://gitlab.com/AQM19',
        target: "_blank",
        icon: FaGitlab,
        isEnabled: true
    },
];