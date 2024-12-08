import { Paths } from "@/config";
import { CenterMenu } from "@/core/interfaces";
import { MdOutlineManageHistory } from "react-icons/md";
import { MdOutlineGTranslate } from "react-icons/md";

export const authMenu: CenterMenu[] = [
    { name: 'Gestionar proyectos', href: Paths.ADMIN_PROJECTS, icon: MdOutlineManageHistory },
];

export const editorMenu: CenterMenu[] = [
    { name: 'Gestionar traducciones', href: Paths.ADMIN_TRANSLATIONS, icon: MdOutlineGTranslate }
]