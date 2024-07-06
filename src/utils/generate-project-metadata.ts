import { Project } from "@/interfaces";
import { getLocaleFormattedDate } from "@/utils/date-format";

export const generateProjectMetadata = (project: Project, locale: string, t: any) => {
    return {
        title: project.title,
        description: project.description,
        category: t(project.Category),
        dateStart: getLocaleFormattedDate(project.dateStart, locale),
        dateEnd: project.dateEnd ? getLocaleFormattedDate(project.dateEnd, locale) : 'Actualidad',
        tags: project.tags.map(tag => t(tag.nemonic)),
        developers: project.developers.map(dev => ({
            name: `${dev.name} ${dev.surname}`,
            avatar: dev.avatar,
            github: dev.github,
        })),
    };
};
