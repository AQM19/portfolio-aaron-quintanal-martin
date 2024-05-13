'use server'

export const getRoleName = async (roleId: number) => {
    try {

        const role = await prisma?.role.findUnique({
            where: {
                id: roleId
            },
            select: {
                name: true
            }
        });

        if (!role) return null;

        return {
            role
        }

    } catch (error) {
        return {
            ok: false,
            message: `No se pudo obtener un rol con el id ${roleId}`
        }
    }
}