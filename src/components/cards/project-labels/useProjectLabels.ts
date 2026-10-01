import { useTranslations } from 'next-intl';
import { Project } from '@/core/interfaces';

/**
 * Display texts of a project's catalog fields. Remote projects bring the names from the admin catalogs;
 * local ones only have keys, translated with messages.
 */
export const useProjectLabels = (project: Project) => {
    const c = useTranslations('Category');
    const s = useTranslations('Status');
    const e = useTranslations('Tags');

    return {
        category: project.categoryLabel ?? (project.category ? c(project.category) : undefined),
        status: project.statusLabel ?? s(project.status),
        statusColor: project.statusColor,
        tags: project.tagLabels ?? project.tags.map((tag) => e(tag)),
    };
}
