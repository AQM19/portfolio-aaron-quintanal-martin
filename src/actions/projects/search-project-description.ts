'use server'

import { Locales } from "@prisma/client";
import prisma from "@/lib/prisma";

export const searchProjectDescription = async (projectId: string, locale: Locales) => {

    try {

        const prismaProjectDescription = await prisma.projectDescription.findFirstOrThrow({
            where: { localesId: locale.id, projectId: projectId }
        });

        return prismaProjectDescription;

    } catch (error) {

        console.log('No se pudo obtener la descripción del proyecto');
        return null;

    }

}