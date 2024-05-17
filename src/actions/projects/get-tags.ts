'use server'

export const getTags = async () => {

    try {

        const tags = await prisma?.tag.findMany({
            select: {
                nemonic: true
            },
            where: {
                isDeleted: false
            }
        });

        if (!tags) return null;

        return {
            tags: tags.map(tag => tag.nemonic)
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener las tags');
    }

}