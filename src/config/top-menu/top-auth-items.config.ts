import { CenterMenu } from "@/interfaces";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdOutlineGTranslate } from "react-icons/md";
import { Paths } from "@/interfaces/paths/paths.enum";

export const authMenu: CenterMenu[] = [
    { name: 'Gestionar proyectos', href: Paths.ADMIN_PROJECTS, icon: MdOutlineManageHistory },
];

export const editorMenu: CenterMenu[] = [
    { name: 'Gestionar traducciones', href: Paths.ADMIN_TRANSLATIONS, icon: MdOutlineGTranslate }
]