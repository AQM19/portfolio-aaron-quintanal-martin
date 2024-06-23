'use server'

export const getAllLocales = async () => {

    try {

        const locales = await prisma?.locales.findMany({
            select: { id: true, locale: true }
        });

        if (!locales) {
            throw new Error('No locales found');
        }

        return locales;

    } catch (error) {

        console.log('No se pudieron obtener los idiomas de traducción: ', error);

        return []
    }

}