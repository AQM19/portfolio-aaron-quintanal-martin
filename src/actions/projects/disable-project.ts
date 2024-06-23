'use server'

export const disableProjectBySlug = async (slug: string) => {
    try {

        await prisma?.project.update({
            where: { slug: slug },
            data: {
                isDeleted: true
            }
        })

    } catch (error) {
        console.log('No se pudo deshabilitar el poroyecto');
    }
}