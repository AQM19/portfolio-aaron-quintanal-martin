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
    await prisma.locales.deleteMany();
    await prisma.developer.deleteMany();
    await prisma.project.deleteMany();
    await prisma.category.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.status.deleteMany();

    // desestructuración de initialData
    const { roles, users, status, tags, categories, developers, projects, locales } = initialData;

    // mapeo de strings
    const categoriesData = categories.map(category => ({ nemonic: category }));
    const statusData = status.map(status => ({ nemonic: status }));
    const rolesData = roles.map(role => ({ name: role }));
    const tagsData = tags.map(tag => ({ nemonic: tag }));
    const localesData = locales.map(intl => ({ locale: intl }));

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

    await prisma.locales.createMany({
        data: localesData
    });

    // Creación del usuario por defecto
    // Búsqueda del rol de admin
    const adminRole = await prisma.role.findUnique({
        where: {
            name: 'admin'
        }
    });

    const editorRole = await prisma.role.findUnique({
        where: {
            name: 'editor'
        }
    });

    // Creación del usuario Admin
    const { roleId: roleIdUser, ...restAdmin } = users[0];
    await prisma.user.create({
        data: {
            ...restAdmin,
            roleId: adminRole!!.id
        }
    });

    // Creación del usuario Editor
    const { roleId: roleIdEditor, ...restEditor } = users[1];
    await prisma.user.create({
        data: {
            ...restEditor,
            roleId: editorRole!!.id
        }
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

        locales.forEach(async (locale) => {
            const dbLocale = await prisma.locales.findUnique({
                where: {
                    locale: locale
                }
            });

            const descriptionsData = description.map(desc => ({
                value: desc.value,
                projectId: dbProject.id,
                localesId: dbLocale!!.id
            }));

            await prisma.projectDescription.createMany({
                data: descriptionsData
            });

            const shortDescriptionsData = shortDescription.map(shortDesc => ({
                value: shortDesc.value,
                projectId: dbProject.id,
                localesId: dbLocale!!.id
            }));

            await prisma.shortProjectDescription.createMany({
                data: shortDescriptionsData
            });

            const documentationData = documentation.map(doc => ({
                file: doc.file,
                projectId: dbProject.id,
                localesId: dbLocale!!.id
            }));

            await prisma.projectDocumentation.createMany({
                data: documentationData
            });
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