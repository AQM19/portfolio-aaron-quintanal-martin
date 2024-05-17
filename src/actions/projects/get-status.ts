'use server'

export const getStatus = async () => {
    try {

        const status = await prisma?.status.findMany({
            select: {
                nemonic: true
            },
            where: {
                isDeleted: false
            }
        });

        if (!status) return null;

        return {
            status: status.map(status => status.nemonic)
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener los estados');
    }
}