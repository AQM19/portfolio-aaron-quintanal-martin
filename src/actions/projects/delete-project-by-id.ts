'use server'

export const deleteProjectById = async (id: string) => {
    try {

        deleteProjectDescriptionsByProjectId(id);
        deleteProjectDocumentationsByProjectId(id);
        deleteProjectImagesByProjectId(id);
        deleteShortProjectDescriptionsByProjectId(id);
        deleteTagsOnProjectsByProjectId(id);
        deleteDevelopersOnProjectByProjectId(id);

        await prisma?.project.delete({
            where: { id: id }
        })

    } catch (error) {
        console.log('No se pudo borrar el poroyecto: ', error);
    }
}

const deleteProjectDescriptionsByProjectId = async (id: string) => {
    try {

        await prisma?.projectDescription.deleteMany({
            where: { projectId: id }
        });

    } catch (error) {
        console.log('No se pudieron borrar las descripciones del proyecto: ', error);
    }
}

const deleteProjectDocumentationsByProjectId = async (id: string) => {
    try {

        await prisma?.projectDocumentation.deleteMany({
            where: { projectId: id }
        });

    } catch (error) {
        console.log('No se pudieron borrar las documentaciones del proyecto: ', error);
    }
}

const deleteProjectImagesByProjectId = async (id: string) => {
    try {

        await prisma?.projectImage.deleteMany({
            where: { projectId: id }
        });

    } catch (error) {
        console.log('No se pudieron borrar las imágenes del proyecto: ', error);
    }
}

const deleteShortProjectDescriptionsByProjectId = async (id: string) => {
    try {

        await prisma?.shortProjectDescription.deleteMany({
            where: { projectId: id }
        });

    } catch (error) {
        console.log('No se pudieron borrar los resúmenes del proyecto: ', error);
    }
}

const deleteTagsOnProjectsByProjectId = async (id: string) => {
    try {

        await prisma?.tagsOnProjects.deleteMany({
            where: { projectId: id }
        });

    } catch (error) {
        console.log('No se pudieron borrar las etiquetas del proyecto: ', error);
    }
}

const deleteDevelopersOnProjectByProjectId = async (id: string) => {
    try {

        await prisma?.developersOnProject.deleteMany({
            where: { projectId: id }
        });

    } catch (error) {
        console.log('No se pudieron borrar los desarrolladores del proyecto: ', error);
    }
}