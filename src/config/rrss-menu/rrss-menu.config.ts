import { RRSSMenu } from "@/interfaces/rrss-menu/rrss-menu.interface";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoLogoLinkedin, IoLogoGitlab, IoLogoFacebook, IoLogoTiktok } from "react-icons/io5";

export const rrssMenu: RRSSMenu[] = [
    { href: 'https://github.com/AQM19', class: 'text-[#ed4709] dark:text-[#e2b5fd]', icon: IoLogoGithub, target: '_blank' },
    { href: 'https://www.linkedin.com/in/aar%C3%B3n-quintanal-mart%C3%ADn-6116b5270/', icon: IoLogoLinkedin, class: 'text-[#ed4709] dark:text-[#e2b5fd]', target: '_blank' },
    { href: 'https://gitlab.com/AQM19', class: 'text-[#ed4709] dark:text-[#e2b5fd]', icon: IoLogoGitlab, target: '_blank' },
    { href: 'https://www.facebook.com/profile.php?id=61558620634892', class: 'text-[#ed4709] dark:text-[#e2b5fd]', icon: IoLogoFacebook, target: "_blank" },
    { href: 'https://twitter.com/AQuintanalMDev', class: 'text-[#ed4709] dark:text-[#e2b5fd]', icon: FaXTwitter, target: "_blank" },
    { href: 'https://www.tiktok.com/@aquintanalmdev', class: 'text-[#ed4709] dark:text-[#e2b5fd]', icon: IoLogoTiktok, target: '_blank' }
];