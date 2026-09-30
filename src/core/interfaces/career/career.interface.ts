import { EmpressProgression } from "./empress-progression.interface";

export interface Career {
    dateRange: Map<string, string>;
    empress: string;
    empressImage: string;
    description: Map<string, string>;
    /** Sanitized HTML from the admin; takes precedence over description. */
    descriptionHtml?: Map<string, string>;
    progression?: EmpressProgression[];
}