'use server'

import { getAllLocales } from '..';

interface PaginationOptions {
    page?: number;
    take?: number;
}

export interface ProjectWithLocales {
    id: string;
    title: string;
    [key: string]: boolean | string; // Permite propiedades adicionales de cualquier nombre
}

export const getPaginatedProjectsWithTranslations = async ({ page = 1, take = 10 }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 10;
    if (take < 1) take = 10;

    try {

        const locales = await getAllLocales();        

        const projects = await prisma?.project.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                description: {
                    select: {
                        localesId: true
                    }
                },
                shortDescription: {
                    select: {
                        localesId: true
                    }
                },
                documentation: {
                    select: {
                        localesId: true
                    }
                }
            }
        });

        if (!projects) {
            throw new Error('No projects found');
        }

        // Crear una lista de proyectos con la información solicitada
        const projectData: ProjectWithLocales[] = projects.map(project => {
            const localesStatus: { [key: string]: boolean } = {};

            // Inicializar cada locale como true o false dependiendo de si está presente en todas las descripciones
            locales.forEach(locale => {
                const hasProjectDescription = project.description.some(desc => desc.localesId === locale.id);
                const hasShortDescription = project.shortDescription.some(shortDesc => shortDesc.localesId === locale.id);
                const hasDocumentation = project.documentation.some(doc => doc.localesId === locale.id);

                localesStatus[locale.locale] = hasProjectDescription && hasShortDescription && hasDocumentation;
            });

            return {
                id: project.id,
                title: project.title,
                ...localesStatus
            };
        });

        const totalCount = await prisma!.project.count({});
        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalCount: totalCount,
            projects: projectData
        }

    } catch (error) {

        console.log('No se pudieron listar los proyectos: ', error);

        return {
            ok: false,
            projects: [],
            totalCount: 0,
            totalPages: 1,
            message: 'No se pudieron listar los proyectos'
        }
    }

}