import { NavMenu } from "@/core/interfaces/nav-menu/nav-menu.interface";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoCodeWorking, IoHomeOutline } from "react-icons/io5";

export const NavConfig: NavMenu[] = [
    { name: 'home', href: '/', icon: IoHomeOutline },
    { name: 'projects', href: '/projects', icon: FaProjectDiagram },
    { name: 'contact', href: '/contact', icon: IoMdContact },
    { name: 'career', href: '/career', icon: IoCodeWorking }
];