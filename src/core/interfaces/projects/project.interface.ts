import { Category, Status, Tag } from "..";
import { Developer } from "./developer.interface";

export interface Project {
    slug: string;
    title: string;
    description: Map<string, string>;
    shortDescription: Map<string, string>;
    logo: string;
    dateStart: Date;
    dateEnd: Date | null;
    documentation?: Map<string, string>;
    productionLink?: string;
    images: string[];
    status: Status;
    category: Category;
    tags: Tag[];
    developers: Developer[];
};