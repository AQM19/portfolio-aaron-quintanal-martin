import { CenterMenu } from "@/interfaces/top-menu/center-menu.interface";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { IoCodeWorking, IoNewspaperOutline } from "react-icons/io5";

export const centerMenu: CenterMenu[] = [
    { name: 'Proyectos', href: '/projects', icon: FaProjectDiagram },
    { name: 'Contacto', href: '/contact', icon: IoMdContact },
    { name: 'Noticias', href: '/news', icon: IoNewspaperOutline },
    { name: 'Mi Carrera', href: '/my career', icon: IoCodeWorking }
];