import { IoLogoGithub, IoLogoLinkedin, IoSearchOutline } from "react-icons/io5";

import { CenterMenu } from "@/interfaces/top-menu/center-menu.interface";
import { RRSSMenu } from "@/interfaces/top-menu/rrss-menu.interface";

export const centerMenu: CenterMenu[] = [
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
    { name: 'Colaborate', href: '/colaborate' }
];

export const rrssMenu: RRSSMenu[] = [
    { href: 'https://github.com/AQM19', icon: IoLogoGithub, class: 'text-purple-600', target: '_blank' },
    { href: 'https://www.linkedin.com/in/aar%C3%B3n-quintanal-mart%C3%ADn-6116b5270/', icon: IoLogoLinkedin, class: 'text-blue-700', target: '_blank' }
];