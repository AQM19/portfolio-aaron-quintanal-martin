'use server'

import { Locales } from "@prisma/client";
import prisma from "@/lib/prisma";

export const searchProjectDocumentation = async (projectId: string, locale: Locales) => {
    try {

        const prismaProjectDocumentation = await prisma.projectDocumentation.findFirstOrThrow({
            where: { localesId: locale.id, projectId: projectId }
        });

        return prismaProjectDocumentation;

    } catch (error) {
        console.log('No se pudo obtener la documentación del proyecto');
        return null;
    }
}