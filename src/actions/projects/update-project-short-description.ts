'use server'

import { searchLocale } from "..";
import { searchProjectShortDescription } from "./search-project-short-description";

export const updateProjectShortDescription = async (projectId: string, shortDescription: string, locale: string = 'es') => {

    const searchedLocale = await searchLocale(locale);

    if (!searchedLocale) return null;

    const searchedProjectShortDescription = await searchProjectShortDescription(projectId, searchedLocale);

    if (!searchedProjectShortDescription) return null;

    try {

        await prisma?.shortProjectDescription.update({
            where: { id: searchedProjectShortDescription.id },
            data: {
                ...searchedProjectShortDescription,
                value: shortDescription
            }
        })

    } catch (error) {
        console.log('No se pudo actualizar el resumen del proyecto: ', error);
    }

}