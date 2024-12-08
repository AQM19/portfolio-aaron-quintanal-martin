import { CenterMenu } from "@/core/interfaces/top-menu/center-menu.interface";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoCodeWorking } from "react-icons/io5";

export const centerMenu: CenterMenu[] = [
    { name: 'projects', href: '/projects', icon: FaProjectDiagram },
    { name: 'contact', href: '/contact', icon: IoMdContact },
    { name: 'my career', href: '/career', icon: IoCodeWorking }
];