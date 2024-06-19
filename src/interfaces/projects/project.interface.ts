import { ProjectImage, Tag } from "..";
import { Developer } from "../developer/developer.interface";

export interface Project {
    id: string;
    title: string;
    description: string | null;
    shortDescription: string | null;
    logo: string;
    dateStart: Date;
    dateEnd: Date | null;
    documentation?: string;
    link: string | null;
    slug: string;
    images: ProjectImage[];
    Status: string;
    Category: string;
    tags: Tag[];
    developers: Developer[];
}