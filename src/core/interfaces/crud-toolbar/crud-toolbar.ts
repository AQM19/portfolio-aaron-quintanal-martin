import { IconType } from "react-icons";

export interface CrudToolbar {
    icon: IconType;
    label?: string;
    disabled?: boolean;
    size: "small" | "large" | "medium";
    function: () => void;
}