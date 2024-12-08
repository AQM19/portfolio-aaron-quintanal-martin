export interface GridProject {
    id: string;
    title: string;
    logo: string;
    dateStart: Date;
    dateEnd: Date | null;
    link: string | null;
    slug: string;
    images: string[];
    shortDescription: string;
    tags: string[];
}