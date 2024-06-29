'use server'

import { Locales } from "@prisma/client";
import prisma from "@/lib/prisma";

export const searchProjectShortDescription = async (projectId: string, locale: Locales) => {

    try {

        const prismaProjectShortDescription = await prisma.shortProjectDescription.findFirstOrThrow({
            where: { localesId: locale.id, projectId: projectId }
        });

        return prismaProjectShortDescription;

    } catch (error) {
        console.log('No se pudo obtener el resumen del proyecto');
        return null;
    }
}