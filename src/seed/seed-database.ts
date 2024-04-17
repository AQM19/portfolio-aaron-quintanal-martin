import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {

    // eliminación de todos los datos
    await prisma.user.deleteMany();
    await prisma.category.deleteMany();
    await prisma.developer.deleteMany();
    await prisma.projectImage.deleteMany();
    await prisma.project.deleteMany();

    const { categories, developers, projects, users } = initialData;

    await prisma.user.createMany({
        data: users
    });

    const categoriesData = categories.map(category => ({
        name: category
    }));

    await prisma.category.createMany({
        data: categoriesData
    });

    await prisma.developer.createMany({
        data: developers
    });

    // await prisma.project.createMany({
    //     data: projects
    // });

    console.log('Seed ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();