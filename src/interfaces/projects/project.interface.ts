import { Developer } from "../developer/developer.interface";

export interface Project {
    id: string;
    title: string;
    description: string | null;
    shortDescription: string | null;
    logo: string;
    dateStart: Date;
    dateEnd: Date | null;
    documentation?: Uint8Array;
    link: string | null;
    slug: string;
    images: string[];
    Status: string;
    Category: string;
    tags: string[];
    developers: Developer[];
}