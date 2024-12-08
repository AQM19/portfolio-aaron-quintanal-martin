import { IconType } from "react-icons";
import { HTMLAttributeAnchorTarget } from "react";

export interface RRSSMenu {
    href: string;
    icon: IconType;
    class?: string;
    target?: HTMLAttributeAnchorTarget;
}