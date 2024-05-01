import { CenterMenu } from "@/interfaces";
import { MdOutlineManageHistory } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { MdOutlineGTranslate } from "react-icons/md";

export const authMenu: CenterMenu[] = [
    { name: 'Gestionar proyectos', href: '/manage-projects', icon: MdOutlineManageHistory },
    { name: 'Estadísticas', href: '/statistics', icon: VscGraphLine }
];

export const editorMenu: CenterMenu[] = [
    { name: 'Gestionar traducciones', href: 'manage-translations', icon: MdOutlineGTranslate }
]