/**
 * Local fallback for the personal information and SEO, used when the published content is not available.
 * The presentation texts come from messages (Index) and the taglines from about-me-details.config.ts.
 */
export const ProfileConfig = {
    ownerName: 'Aarón Quintanal Martín',
    birthDate: '1996-03-15',
    avatarUrl: '/png/mapache-ladron.png',
    ogImageUrl: '/png/aaron-quintanal-martin.png',
    seo: {
        es: {
            title: 'Aarón Quintanal Martín - Desarrollador Full Stack',
            description: 'Aarón Quintanal Martín es un desarrollador full stack especializado en Angular, Next.js y .NET, ubicado en Cantabria.',
            keywords: ['Aarón Quintanal Martín', 'Cantabria', 'programador', 'desarrollador', 'full stack', 'Angular', 'Next.js', '.NET'],
        },
        en: {
            title: 'Aarón Quintanal Martín - Full Stack Developer',
            description: 'Aarón Quintanal Martín is a full stack developer specialised in Angular, Next.js and .NET, based in Cantabria (Spain).',
            keywords: ['Aarón Quintanal Martín', 'Cantabria', 'developer', 'full stack', 'Angular', 'Next.js', '.NET'],
        },
    } as Record<string, { title: string; description: string; keywords: string[] }>,
};
