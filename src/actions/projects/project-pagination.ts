'use server'

interface PaginationOptions {
    page?: number;
    take?: number;
    lang: string;
}

export const getPaginatedProjectsWithImages = async ({
    page = 1,
    take = 12,
    lang = 'es'
}: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    if (isNaN(Number(take))) take = 12;
    if (take < 1) take = 12;

    try {

        const projects = await prisma!.project.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                shortDescription: {
                    take: 1,
                    where: {
                        Locale: {
                            locale: lang
                        }
                    },
                    select: {
                        value: true
                    }
                },
                images: {
                    take: 1,
                    select: {
                        url: true
                    }
                },
                tags: {
                    select: {
                        tag: true
                    }
                }
            }
        });

        const totalCount = await prisma!.project.count({});

        const totalPages = Math.ceil(totalCount / take);

        return {
            currentPage: page,
            totalPages: totalPages,
            projects: projects.map(project => ({
                id: project.id,
                title: project.title,
                logo: project.logo,
                dateStart: project.dateStart,
                dateEnd: project.dateEnd,
                link: project.link,
                slug: project.slug,
                images: project.images?.map(img => img.url),
                shortDescription: project.shortDescription[0]?.value,
                tags: project.tags.map(tag => tag.tag.nemonic),
            }))
        };

    } catch (error) {
        console.log('No se pudieron obtener los proyectos: ', error);
        return {
            currentPage: page,
            totalPages: 1,
            projects: []
        }
    }
}