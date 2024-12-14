import { IconType } from "react-icons";
import { EmpressProgression } from "./empress-progression.interface";

export interface Career {
    dateRange: Map<string, string>;
    dotIcon: IconType;
    empress: string;
    empressImage: string;
    description: Map<string, string>;
    progression?: EmpressProgression[];
}