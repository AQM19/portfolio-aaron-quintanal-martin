import bcryptjs from 'bcryptjs';

interface SeedProject {
    title: string;
    description: string;
    logo: string;
    dateStart: Date;
    dateEnd?: Date;
    documentation?: string;
    link?: string;
    status: SeedStatus;
    slug: string;
    tags: SeedTag[];
    authors: SeedDeveloper[];
    images: string[];
    category: string;
}

interface SeedUser {
    email: string;
    password: string;
    name: string;
    role: 'admin' | 'user'
}

interface SeedDeveloper {
    name: string;
    surname: string;
    github?: string;
    portfoil?: string;
}

type SeedStatus = 'investigation' | 'planification' | 'designing' | 'developping' | 'deploying' | 'manteinance' | 'finished'
type SeedTag = 'humor' | 'tools' | 'gaming' | 'terror'

interface SeedData {
    users: SeedUser[];
    categories: string[];
    status: string[],
    role: string[],
    tag: string[],
    developers: SeedDeveloper[];
    projects: SeedProject[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'aquintanalm.dev@gmail.com',
            name: 'Aarón',
            password: bcryptjs.hashSync('6e499d18ed86'),
            role: 'admin'
        }
    ],
    categories: ['personal', 'freelance', 'private', 'employee'],
    status: ['investigation', 'planification', 'designing', 'developping', 'deploying', 'manteinance', 'finished'],
    role: ['admin', 'user'],
    tag: ['humor', 'terror', 'gaming', 'tools'],
    developers: [
        {
            name: 'Aarón',
            surname: 'Quintanal Martín',
            github: 'https://github.com/AQM19'
        }
    ],
    projects: [
        {
            authors: [
                {
                    name: 'Aarón',
                    surname: 'Quintanal Martín',
                    github: 'https://github.com/AQM19'
                }
            ],
            category: 'personal',
            dateStart: new Date(),
            description: 'Descripción',
            images: [],
            logo: '',
            slug: 'auto-terra',
            status: 'developping',
            tags: ['tools'],
            title: 'Auto-Terra',
        }
    ]
}