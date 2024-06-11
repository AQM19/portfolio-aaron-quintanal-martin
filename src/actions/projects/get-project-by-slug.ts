'use server'

export const getProjectBySlug = async (slug: string, lang: string) => {

    try {

        const project = await prisma?.project.findFirst({
            include: {
                description: {
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
                    select: {
                        url: true
                    }
                },
                tags: {
                    select: {
                        tag: true
                    }
                },
                Category: {
                    select: {
                        nemonic: true
                    }
                },
                documentation: {
                    where: {
                        Locale: {
                            locale: lang
                        }
                    },
                    select: {
                        file: true
                    }
                },
                Status: {
                    select: {
                        nemonic: true
                    }
                },
                developers: {
                    select: {
                        developer: true
                    }
                }
            },
            where: {
                slug: slug
            }
        });

        if (!project) return null;

        return {
            id: project.id,
            title: project.title,
            logo: project.logo,
            dateStart: project.dateStart,
            dateEnd: project.dateEnd,
            link: project.link,
            slug: project.slug,
            images: project.images?.map(img => img.url),
            documentation: project.documentation[0]?.file,
            description: project.description[0]?.value,
            shortDescription: project.shortDescription[0]?.value,
            tags: project.tags.map(tag => tag.tag.nemonic),
            Category: project.Category.nemonic,
            Status: project.Status.nemonic,
            developers: project.developers.map(dev => dev.developer)
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener proyecto por slug')
    }

}