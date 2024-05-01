import { CenterMenu } from "@/interfaces";
import { MdOutlineManageHistory } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";

export const authMenu: CenterMenu[] = [
    { name: 'Gestionar proyectos', href: '/manage-projects', icon: MdOutlineManageHistory },
    { name: 'Estadísticas', href: '/statistics', icon: VscGraphLine }
]