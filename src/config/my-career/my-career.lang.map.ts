import { MyCareer } from "@/interfaces/my-career/career.interface";
import { myCareerEsConfig } from "./my-career.es.config";
import { myCareerEnConfig } from "./my-career.en.config";

export const MyCareerLangMap: Record<string, MyCareer[]> = {
    'es': myCareerEsConfig,
    'en': myCareerEnConfig
}