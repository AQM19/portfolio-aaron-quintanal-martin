'use server'

import prisma from "@/lib/prisma";

export const searchTags = async (tagIds: string[]) => {
    try {

        const prismaTags = await prisma.tag.findMany({
            where: {
                id: {
                    in: tagIds
                }
            }
        });

        return prismaTags;

    } catch (error) {
        console.log(error);
        return null;
    }
}