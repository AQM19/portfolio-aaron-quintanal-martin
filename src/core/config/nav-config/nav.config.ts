import { NavMenu } from "@/core/interfaces/nav-menu/nav-menu.interface";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoCodeWorking, IoHomeOutline } from "react-icons/io5";

export const NavConfig: NavMenu[] = [
    { name: 'Home', href: '/', icon: IoHomeOutline },
    { name: 'Projects', href: '/projects', icon: FaProjectDiagram },
    { name: 'Contact', href: '/contact', icon: IoMdContact },
    { name: 'Career', href: '/career', icon: IoCodeWorking }
];