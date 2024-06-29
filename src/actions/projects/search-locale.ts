'use server'

import prisma from "@/lib/prisma";

export const searchLocale = async (locale: string = 'es') => {

    try {
        const prismaLocale = await prisma.locales.findUnique({
            where: { locale: locale },
            select: {
                id: true,
                locale: true
            }
        });

        if (!prismaLocale) {
            console.log('No se ha podido obtener el locale');
            return null
        }

        return prismaLocale

    } catch (error) {
        console.log('No se pudo obtener el locale');
        return null
    }
}