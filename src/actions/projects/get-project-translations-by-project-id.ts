'use server'

import { getAllLocales } from "..";
import prisma from "@/lib/prisma";

export interface ProjectTranslation {
    locale: string;
    file?: string;
    shortDescription?: string;
    description?: string
}

export const getProjectTranslationsByProjectId = async (projectId: string) => {

    try {

        const locales = await getAllLocales();
        const projectDescriptions = await getProjectDescriptions(projectId);
        const projectShortDescription = await getProjectShortDescription(projectId);
        const projectDocumentations = await getProjectDocumentation(projectId);

        const handleProjectLocales: ProjectTranslation[] = locales.map(locale => {

            const projectDescriptionTranslation = projectDescriptions?.find(desc => desc.Locale?.locale == locale.locale)?.value;
            const projectShortDescriptionTranslation = projectShortDescription?.find(shortDesc => shortDesc.Locale?.locale == locale.locale)?.value;
            const projectDocumentationTrenslation = projectDocumentations?.find(doc => doc.Locale?.locale == locale.locale)?.file;

            return {
                locale: locale.locale,
                file: projectDocumentationTrenslation,
                shortDescription: projectShortDescriptionTranslation,
                description: projectDescriptionTranslation
            } as ProjectTranslation
        });

        return handleProjectLocales

    } catch (error) {
        console.log('No se pudieron obtener las traducciones: ', error);
        return []
    }

}

const getProjectDescriptions = async (projectId: string) => {

    try {

        return await prisma.projectDescription.findMany({
            where: { projectId: projectId },
            select: {
                Locale: {
                    select: {
                        locale: true
                    }
                },
                value: true
            }
        });

    } catch (error) {
        console.log('No se pudieron obtener las descripciones del proyecto: ', error)
        return null;
    }

}

const getProjectShortDescription = async (projectId: string) => {

    try {

        return await prisma.shortProjectDescription.findMany({
            where: { projectId: projectId },
            select: {
                Locale: {
                    select: {
                        locale: true
                    }
                },
                value: true
            }
        });

    } catch (error) {
        console.log('No se pudieron obtener los resúmenes del proyecto: ', error)
        return null;
    }

}

const getProjectDocumentation = async (projectId: string) => {

    try {

        return await prisma.projectDocumentation.findMany({
            where: { projectId: projectId },
            select: {
                Locale: {
                    select: {
                        locale: true
                    }
                },
                file: true
            }
        });

    } catch (error) {
        console.log('No se pudieron obtener las documentaciones del proyecto: ', error)
        return null;
    }

}