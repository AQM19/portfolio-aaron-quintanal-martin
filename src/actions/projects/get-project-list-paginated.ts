'use server'

interface PaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedProjectList = async ({ page = 1, take = 10 }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 10;
    if (take < 1) take = 10;

    try {

        const projects = await prisma!.project.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                Status: {
                    select: {
                        nemonic: true
                    }
                },
                Category: {
                    select: {
                        nemonic: true
                    }
                },
                shortDescription: {
                    take: 1,
                    where: {
                        Locale: {
                            locale: 'es'
                        }
                    },
                    select: {
                        value: true
                    }
                },
            }
        });

        const totalCount = await prisma!.project.count({});

        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            totalCount: totalCount,
            projects: projects.map(project => ({
                id: project.id,
                title: project.title,
                dateStart: project.dateStart,
                dateEnd: project.dateEnd,
                description: project.shortDescription[0]?.value,
                category: project.Category.nemonic,
                status: project.Status.nemonic,
            }))
        };

    } catch (error) {
        return {
            ok: false,
            projects: [],
            totalCount: 0,
            totalPages: 1,
            message: 'No se pudieron listar los proyectos'
        }
    }

}