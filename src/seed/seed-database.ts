import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {

    // eliminación de todos los datos
    await prisma.role.deleteMany();
    await prisma.user.deleteMany();
    await prisma.tagsOnProjects.deleteMany();
    await prisma.developersOnProject.deleteMany();
    await prisma.projectImage.deleteMany();
    await prisma.projectDescription.deleteMany();
    await prisma.shortProjectDescription.deleteMany();
    await prisma.projectDocumentation.deleteMany();
    await prisma.developer.deleteMany();
    await prisma.project.deleteMany();
    await prisma.category.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.status.deleteMany();

    // desestructuración de initialData
    const { roles, users, status, tags, categories, developers, projects } = initialData;

    // mapeo de strings
    const categoriesData = categories.map(category => ({ nemonic: category }));
    const statusData = status.map(status => ({ nemonic: status }));
    const rolesData = roles.map(role => ({ name: role }));
    const tagsData = tags.map(tag => ({ nemonic: tag }));

    // creación de modelos simples
    await prisma.category.createMany({
        data: categoriesData
    });

    await prisma.status.createMany({
        data: statusData
    });

    await prisma.role.createMany({
        data: rolesData
    });

    await prisma.tag.createMany({
        data: tagsData
    });

    // Creación del usuario por defecto
    // Búsqueda dle rol de admin
    const adminRole = await prisma.role.findUnique({
        where: {
            name: 'admin'
        }
    });

    // Creación del usuario
    users.forEach(async (user) => {

        // Desestructuración del objeto user
        const { roleId, ...rest } = user;

        const dbUser = await prisma.user.create({
            data: {
                ...rest, // Asignación del scope del objeto
                roleId: adminRole!!.id // Override del id del rol
            }
        });

    });

    // Creación de los desarrolladores
    await prisma.developer.createMany({
        data: developers
    });

    // Creación de los proyectos

    const statusFinished = await prisma.status.findUnique({
        where: {
            nemonic: 'finished'
        }
    });

    const categoryPersonal = await prisma.category.findUnique({
        where: {
            nemonic: 'personal'
        }
    });

    projects.forEach(async (project) => {

        const { categoryId, statusId, images, tags, description, shortDescription, documentation, ...rest } = project;

        const dbProject = await prisma.project.create({
            data: {
                ...rest,
                categoryId: categoryPersonal!!.id,
                statusId: statusFinished!!.id
            }
        });

        const descriptionsData = description.map(desc => ({
            locale: desc.locale,
            value: desc.value,
            projectId: dbProject.id
        }));

        await prisma.projectDescription.createMany({
            data: descriptionsData
        });

        const shortDescriptionsData = shortDescription.map(shortDesc => ({
            locale: shortDesc.locale,
            value: shortDesc.value,
            projectId: dbProject.id
        }));

        await prisma.shortProjectDescription.createMany({
            data: shortDescriptionsData
        });

        const documentationData = documentation.map(doc => ({
            locale: doc.locale,
            file: doc.file,
            projectId: dbProject.id
        }));

        await prisma.projectDocumentation.createMany({
            data: documentationData
        });

        const imagesData = images.map(image => ({
            url: image,
            projectId: dbProject.id
        }));

        await prisma.projectImage.createMany({
            data: imagesData
        });

        tags.forEach(async (tag) => {
            const dbTag = await prisma.tag.findUnique({
                where: {
                    nemonic: tag
                }
            });

            await prisma.tagsOnProjects.create({
                data: {
                    projectId: dbProject.id,
                    tagId: dbTag!!.id
                }
            });
        });

        developers.forEach(async (dev) => {
            const dbDev = await prisma.developer.findFirst({
                where: {
                    name: dev.name
                }
            });

            await prisma.developersOnProject.create({
                data: {
                    projectId: dbProject.id,
                    developerId: dbDev!!.id
                }
            })
        });

    });

    console.log('Seed ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();