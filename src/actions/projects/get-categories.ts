'use server'

import prisma from "@/lib/prisma";

export const getCategories = async () => {
    try {

        const categories = await prisma.category.findMany({
            select: {
                id: true,
                nemonic: true
            },
            where: {
                isDeleted: false
            }
        });

        if (!categories) return null;

        return {
            categories
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener las categorías');
    }
}