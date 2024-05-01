import { CenterMenu } from "@/interfaces/top-menu/center-menu.interface";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoCodeWorking, IoNewspaperOutline } from "react-icons/io5";

export const centerMenu: CenterMenu[] = [
    { name: 'projects', href: '/projects', icon: FaProjectDiagram },
    { name: 'contact', href: '/contact', icon: IoMdContact },
    { name: 'my career', href: '/my-career', icon: IoCodeWorking }
];