'use server'

import { searchLocale } from "..";
import prisma from "@/lib/prisma";

export const createProjectDescription = async (projectId: string, description: string, locale: string = 'es') => {

    const searchedLocale = await searchLocale(locale);

    if (!searchedLocale) return null;

    try {
        await prisma.projectDescription.create({
            data: {
                localesId: searchedLocale.id,
                projectId: projectId,
                value: description
            }
        });
    } catch (error) {
        console.log('No se pudo crear la descripción del proyecto: ', error);
    }

}