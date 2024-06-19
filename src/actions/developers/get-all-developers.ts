'use server'

export const getAllDevelopers = async () => {

    try {

        const developers = await prisma?.developer.findMany({
            select: {
                id: true,
                name: true,
                surname: true,
                github: true,
                portfoil: true,
                avatar: true
            }
        });

        return {
            developers: developers?.map(dev => dev)
        }

    } catch (error) {
        return {
            ok: false,
            projects: [],
            totalCount: 0,
            totalPages: 1,
            message: 'No se pudieron listar los desarrolladores'
        }
    }

}