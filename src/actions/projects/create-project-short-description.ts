'use server'

import { searchLocale } from "..";

export const createProjectShortDescription = async (projectId: string, shortDescription: string, locale: string = 'es') => {

    const searchedLocale = await searchLocale(locale);

    if (!searchedLocale) return null;

    try {

        await prisma?.shortProjectDescription.create({
            data: {
                localesId: searchedLocale.id,
                projectId: projectId,
                value: shortDescription
            }
        })

    } catch (error) {
        console.log('No se pudo crear el resuen del proyecto: ', error)
    }
}