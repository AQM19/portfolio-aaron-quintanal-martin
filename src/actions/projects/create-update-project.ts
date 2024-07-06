'use server'

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Project } from "@prisma/client";
import { createProjectDescription, createProjectDocumentation, createProjectShortDescription, searchTags, updateProjectDescription, updateProjectDocumentation, updateProjectShortDescription, uploadImages } from "..";
import prisma from "@/lib/prisma";
import { Paths } from "@/config";

const projectSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    dateStart: z.string(),
    dateEnd: z.string().optional(),
    logo: z.string(),
    documentation: z.string().optional(),
    link: z.string().optional(),
    slug: z.string(),
    status: z.string(),
    category: z.string()
});

interface UpdateData {
    id: string;
    title: string;
    logo: string;
    link?: string;
    slug: string;
    dateStart: Date;
    dateEnd?: Date;
    categoryId: string;
    statusId: string;
}

interface CreateData {
    title: string;
    logo: string;
    link?: string;
    slug: string;
    dateStart: Date;
    dateEnd?: Date;
    categoryId: string;
    statusId: string;
}

export const createUpdateProject = async (formData: FormData) => {

    const data = Object.fromEntries(formData);
    const projectParsed = projectSchema.safeParse(data);

    if (!projectParsed.success) {
        console.log(projectParsed.error);
        return {
            ok: false
        }
    }

    const project = projectParsed.data;
    if (!project) {
        return {
            ok: false,
            message: 'Project parsing failed.'
        };
    }

    // Asegurarse de que el slug está todo en minusculas, sin espacios, y con un trim
    project.slug = project.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, description, shortDescription, documentation, ...rest } = project;

    try {

        const statusId = await prisma.status.findUnique({
            where: { nemonic: rest.status }
        });

        if (!statusId) {
            throw new Error('Status not found');
        }

        const categoryId = await prisma.category.findUnique({
            where: { nemonic: rest.category }
        });

        if (!categoryId) {
            throw new Error('Category not found');
        }

        const prismaTx = await prisma.$transaction(async (tx) => {

            let prismaProject: Project | undefined

            if (id) {

                // Actualizar
                try {

                    const updateData: UpdateData = {
                        id: id,
                        title: rest.title,
                        logo: rest.logo,
                        link: rest.link,
                        slug: rest.slug,
                        dateStart: new Date(rest.dateStart),
                        categoryId: categoryId.id,
                        statusId: statusId.id
                    };

                    if (rest.dateEnd !== undefined) {
                        updateData.dateEnd = new Date(rest.dateEnd);
                    }

                    prismaProject = await prisma.project.update({
                        where: { id },
                        data: updateData
                    });
                } catch (error) {
                    console.log('Algo ha fallado: ', error)
                }

                if (prismaProject) {

                    if (formData.get('description')) {
                        await updateProjectDescription(prismaProject.id, description!);
                    }

                    if (formData.get('shortDescription')) {
                        await updateProjectShortDescription(prismaProject.id, shortDescription!);
                    }

                    if (formData.get('documentation')) {
                        await updateProjectDocumentation(prismaProject.id, documentation!);
                    }

                }

            } else {

                const createData: CreateData = {
                    title: rest.title,
                    logo: rest.logo,
                    link: rest.link,
                    slug: rest.slug,
                    dateStart: new Date(rest.dateStart),
                    categoryId: categoryId.id,
                    statusId: statusId.id
                };

                if (rest.dateEnd !== undefined) {
                    createData.dateEnd = new Date(rest.dateEnd);
                }

                // Crear
                prismaProject = await prisma.project.create({
                    data: createData
                });

                if (prismaProject) {

                    if (formData.get('description')) {
                        await createProjectDescription(prismaProject?.id, description!);
                    }

                    if (formData.get('shortDescription')) {
                        await createProjectShortDescription(prismaProject.id, shortDescription!);
                    }

                    if (formData.get('documentation')) {
                        await createProjectDocumentation(prismaProject.id, documentation!);
                    }

                }

            }

            if (formData.getAll('deleteTags')) {

                const tags: string[] = formData.getAll('deleteTags').map(item => item.toString());

                await prisma.tagsOnProjects.deleteMany({
                    where: {
                        projectId: prismaProject?.id,
                        tagId: {
                            in: tags
                        }
                    }
                });

            }

            if (formData.getAll('createTags')) {

                const tags: string[] = formData.getAll('createTags').map(item => item.toString());

                await prisma.tagsOnProjects.createMany({
                    data: tags.map(tagId => ({
                        tagId: tagId,
                        projectId: prismaProject!.id
                    }))
                });

            }

            if (formData.getAll('deleteDevelopers')) {

                const devs: string[] = formData.getAll('deleteDevelopers').map(item => item.toString());

                await prisma.developersOnProject.deleteMany({
                    where: {
                        projectId: prismaProject?.id,
                        developerId: {
                            in: devs
                        }
                    }
                });

            }

            if (formData.getAll('createDevs')) {

                const devs: string[] = formData.getAll('createDevs').map(item => item.toString());

                await prisma.developersOnProject.createMany({
                    data: devs.map(devId => ({
                        developerId: devId,
                        projectId: prismaProject!.id
                    }))
                });

            }

            // Proceso de carga y guardado de imagenes
            // Recorrer las imágenes y guardarlas
            if (formData.getAll('images')) {
                // [https://url.jpg]
                const images = await uploadImages(formData.getAll('images') as File[]);

                if (!images) {
                    throw new Error('No se pudieron cargar las imagenes, rolling-back');
                }

                await prisma.projectImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        projectId: prismaProject!.id
                    }))
                })
            }

            return {
                prismaProject
            }
        });

        //TODO Relavidate paths
        revalidatePath(Paths.ADMIN_PROJECTS);
        revalidatePath(`${Paths.ADMIN_PROJECT}/${project.slug}`);
        revalidatePath(`${Paths.PROJECT}/${project.slug}`);

        return {
            ok: true,
            project: prismaTx?.prismaProject
        }

    } catch (error) {

        console.log('Error: ', error);

        return {
            ok: false,
            message: 'Revisar los logs, no se pudo actualizar'
        }
    }

};



















