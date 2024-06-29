'use server'

import { searchLocale } from "..";
import prisma from "@/lib/prisma";

export const createProjectDocumentation = async (projectId: string, documentation: string, locale: string = 'es') => {

    const searchedLocale = await searchLocale(locale);

    if (!searchedLocale) return null;

    try {

        await prisma.projectDocumentation.create({
            data: {
                localesId: searchedLocale.id,
                projectId: projectId,
                file: documentation
            }
        })

    } catch (error) {
        console.log('No se pudo crear la documentación del proyecto: ', error);
    }
}