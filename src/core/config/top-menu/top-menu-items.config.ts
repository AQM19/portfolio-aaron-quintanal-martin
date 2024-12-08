import { Paths } from "@/config";
import { CenterMenu } from "@/core/interfaces/top-menu/center-menu.interface";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoCodeWorking, IoNewspaperOutline } from "react-icons/io5";

export const centerMenu: CenterMenu[] = [
    { name: 'projects', href: Paths.PROJECTS, icon: FaProjectDiagram },
    { name: 'contact', href: Paths.CONTACT, icon: IoMdContact },
    { name: 'my career', href: Paths.MY_CAREER, icon: IoCodeWorking }
];