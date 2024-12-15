import { EmpressProgression } from "./empress-progression.interface";

export interface Career {
    dateRange: Map<string, string>;
    empress: string;
    empressImage: string;
    description: Map<string, string>;
    progression?: EmpressProgression[];
}