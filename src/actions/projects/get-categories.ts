'use server'

export const getCategories = async () => {
    try {

        const categories = await prisma?.category.findMany({
            select: {
                nemonic: true
            },
            where: {
                isDeleted: false
            }
        });

        if (!categories) return null;

        return {
            categories: categories.map(category => category.nemonic)
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener las categorías');
    }
}