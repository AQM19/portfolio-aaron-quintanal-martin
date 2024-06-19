'use server'

import { searchLocale } from "..";
import { searchProjectDocumentation } from "./search-project-document";

export const updateProjectDocumentation = async (projectId: string, documentation: string, locale: string = 'es') => {

    const searchedLocale = await searchLocale(locale);

    if (!searchedLocale) return null;

    const searchedProjectDocumentation = await searchProjectDocumentation(projectId, searchedLocale);

    if (!searchedProjectDocumentation) return null;

    try {

        const { id, ...rest } = searchedProjectDocumentation;

        await prisma?.projectDocumentation.update({
            where: { id: id },
            data: {
                ...rest,
                file: documentation
            }
        })

    } catch (error) {
        console.log('No se pudo actualizar la documentación del proyecto: ', error);
    }
}