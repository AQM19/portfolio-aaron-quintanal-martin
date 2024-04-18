import bcryptjs from 'bcryptjs';
import { Project } from '../interfaces/projects/project.interface';

interface SeedProject {
    title: string;
    description: string;
    logo: string;
    dateStart: Date;
    dateEnd?: Date;
    documentation?: string;
    link?: string;
    statusId: string;
    categoryId: string;
    slug: string;
    tags: SeedTag[];
    images: string[];
}

interface SeedUser {
    email: string;
    password: string;
    name: string;
    roleId: number;
}

interface SeedDeveloper {
    name: string;
    surname: string;
    github?: string;
    portfoil?: string;
}

interface SeedTagsOnProjects {
    project: SeedProject;
    tag: SeedTag;
}

type SeedStatus = 'investigation' | 'planification' | 'designing' | 'developping' | 'deploying' | 'manteinance' | 'finished'
type SeedTag = 'humor' | 'tools' | 'gaming' | 'terror'

interface SeedData {
    users: SeedUser[];
    categories: string[];
    status: string[],
    roles: string[],
    tags: string[],
    developers: SeedDeveloper[];
    projects: SeedProject[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'aquintanalm.dev@gmail.com',
            name: 'Aarón',
            password: bcryptjs.hashSync('6e499d18ed86'),
            roleId: 0
        }
    ],
    categories: ['personal', 'freelance', 'private', 'employee'],
    status: ['investigation', 'planification', 'designing', 'developping', 'deploying', 'manteinance', 'finished'],
    roles: ['admin', 'user', 'editor'],
    tags: ['humor', 'terror', 'gaming', 'tools'],
    developers: [
        {
            name: 'Aarón',
            surname: 'Quintanal Martín',
            github: 'https://github.com/AQM19'
        }
    ],
    projects: [
        {
            title: 'Auto-Terra',
            description: 'Descripción',
            logo: '',
            dateStart: new Date(),
            statusId: '',
            categoryId: '',
            images: [],
            slug: 'auto-terra',
            tags: ['tools'],
        }
    ]
}