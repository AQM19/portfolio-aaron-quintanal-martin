import bcryptjs from 'bcryptjs';

interface SeedProject {
    title: string;
    description: SeedProjectDescription[];
    shortDescription: SeedShortProjectDescription[];
    logo: string;
    dateStart: Date;
    dateEnd?: Date;
    documentation: SeedProjectDocumentation[];
    link?: string;
    statusId: string;
    categoryId: string;
    slug: string;
    tags: SeedTag[];
    images: string[];
}

interface SeedProjectDescription {
    locale: string;
    value: string;
}

interface SeedShortProjectDescription {
    locale: string;
    value: string;
}

interface SeedProjectDocumentation {
    locale: string;
    file: Buffer;
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

type SeedTag = 'humor' | 'tools' | 'gaming' | 'terror'

interface SeedData {
    users: SeedUser[];
    categories: string[];
    status: string[],
    roles: string[],
    tags: string[],
    locales: string[],
    developers: SeedDeveloper[];
    projects: SeedProject[];
}

const fs = require('fs'); // Para leer los documentos

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
    locales: ['es', 'en'],
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
            description: [
                { locale: 'es', value: 'Descripcion en español' },
                { locale: 'en', value: 'English description' }
            ],
            shortDescription: [
                { locale: 'es', value: 'Descripción pequeña en español' },
                { locale: 'en', value: 'English short description' }
            ],
            logo: '',
            dateStart: new Date(),
            statusId: '',
            categoryId: '',
            images: [],
            documentation: [
                // { locale: 'es', file: Buffer.from(fs.readFileSync('/home/aquintanal/Descargas/Proyecto DAM2 Aaron Quintanal Martin.pdf')) }
                { locale: 'es', file: Buffer.from(fs.readFileSync('C:/Users/aaron/Desktop/Proyecto DAM2 Aaron Quintanal Martin.pdf')) }
            ],
            slug: 'auto-terra',
            tags: ['tools'],
        }
    ]
}