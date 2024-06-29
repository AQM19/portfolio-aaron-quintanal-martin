'use server'

import prisma from "@/lib/prisma";

export const getTags = async () => {

    try {

        const tags = await prisma.tag.findMany({
            select: {
                id: true,
                nemonic: true
            },
            where: {
                isDeleted: false
            }
        });

        if (!tags) return null;

        return {
            tags: tags
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener las tags');
    }

}