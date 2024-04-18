import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {

    // eliminación de todos los datos
    await prisma.role.deleteMany();
    await prisma.user.deleteMany();
    await prisma.status.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.tagsOnProjects.deleteMany();
    await prisma.category.deleteMany();
    await prisma.developer.deleteMany();
    await prisma.projectImage.deleteMany();
    await prisma.project.deleteMany();

    // desestructuración de initialData
    const { roles, users, status, tags, categories, developers, projects } = initialData;

    // mapeo de strings
    const categoriesData = categories.map(category => ({ name: category }));
    const statusData = status.map(status => ({ name: status }));
    const rolesData = roles.map(role => ({ name: role }));
    const tagsData = tags.map(tag => ({ name: tag }));

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
                roleId: adminRole?.id // Override del id del rol
            }
        })

    });

    console.log('Seed ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();