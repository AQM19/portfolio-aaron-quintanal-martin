import { FaProjectDiagram } from "react-icons/fa";
import { IoCodeWorking, IoHomeOutline } from "react-icons/io5";
import { IoMdContact } from "react-icons/io";
import { NavMenu } from "@/core/interfaces/nav-menu/nav-menu.interface";

export const NavConfig: NavMenu[] = [
    { name: 'home', href: '/', icon: IoHomeOutline },
    { name: 'projects', href: '/projects', icon: FaProjectDiagram },
    { name: 'contact', href: '/contact', icon: IoMdContact },
    { name: 'career', href: '/career', icon: IoCodeWorking },
];
// The privacy policy is linked from the footer and the contact form, not from the menus.