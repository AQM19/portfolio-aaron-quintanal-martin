'use server'

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import prisma from "@/lib/prisma";
import { Paths } from '@/config';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProjectImage = async (imageId: number, imageUrl: string) => {


    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            error: 'No se pueden borrar imagene de filesystem'
        }
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';

    try {

        await cloudinary.uploader.destroy(imageName);
        const deletedImage = await prisma.projectImage.delete({
            where: {
                id: imageId
            },
            select: {
                Project: {
                    select: {
                        slug: true
                    }
                }
            }
        });

        // Revalidar paths
        revalidatePath(Paths.PROJECTS)
        revalidatePath(`${Paths.ADMIN_PROJECT}/${deletedImage?.Project!.slug}`)
        revalidatePath(`${Paths.PROJECT}/${deletedImage?.Project!.slug}`)

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            error: 'No se pudo eliminar la imagen'
        }
    }


}