'use server'

import { searchLocale } from "..";
import { searchProjectDescription } from "./search-project-description";

export const updateProjectDescription = async (projectId: string, description: string, locale: string = 'es') => {

    const searchedLocale = await searchLocale(locale);

    if (!searchedLocale) return null;

    const searchedProjectDescription = await searchProjectDescription(projectId, searchedLocale);

    if (!searchedProjectDescription) return null;

    try {
        await prisma?.projectDescription.update({
            where: { id: searchedProjectDescription.id },
            data: {
                ...searchedProjectDescription,
                value: description
            }
        });
    } catch (error) {
        console.log('No se pudo actualizar la descripción del proyecto: ', error);
    }
}
