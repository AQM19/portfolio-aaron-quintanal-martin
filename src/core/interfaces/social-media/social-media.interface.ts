import { IconType } from "react-icons";
import { HTMLAttributeAnchorTarget } from "react";

export interface SocialMedia {
    href: string;
    icon: IconType;
    target?: HTMLAttributeAnchorTarget;
    isEnabled: boolean;
}