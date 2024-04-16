import { Developer } from "../developer/developer.interface";
import { Status } from "../status/status.interface";
import { Tag } from "../tag/tag.interface";
import { Category } from '../category/category.interface';

export interface Project {
    id: string;
    title: string;
    description: string;
    logo: string;
    dateStart: Date;
    dateEnd?: Date;
    documentation?: string;
    link?: string;
    status: Status;
    slug: string;
    tags: Tag[];
    authors: Developer[];
    images: string[];
    category: Category;
}