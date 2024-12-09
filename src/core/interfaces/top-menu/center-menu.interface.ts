import { IconType } from "react-icons";
import { UrlObject } from "url";

export interface NavMenu {
    name: string;
    icon: IconType;
    class?: string;
    href:
    | "/"
    | "/projects"
    | "/contact"
    | "/career"
    | ({ pathname: "/"; } & Omit<UrlObject, "pathname">)
    | ({ pathname: "/projects"; } & Omit<UrlObject, "pathname">)
    | ({ pathname: "/contact"; } & Omit<UrlObject, "pathname">)
    | ({ pathname: "/career"; } & Omit<UrlObject, "pathname">)
}