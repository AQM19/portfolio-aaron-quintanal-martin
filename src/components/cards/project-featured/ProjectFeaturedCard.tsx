'use client'

import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoIosLink } from 'react-icons/io';
import { Link as I18Link } from '@/i18n/routing';
import { Project } from '@/core/interfaces';
import Chip from '@/components/chip/Chip';
import { useProjectLabels } from '../project-labels/useProjectLabels';

interface Props {
    project: Project;
    index?: number;
    localeActive: string;
}

/** Tags shown before collapsing the rest into "+N". */
const MAX_TAGS = 4;

/** Home card of a featured project: horizontal from tablet up, with its catalog chips, years and tags. */
const ProjectFeaturedCard = ({ project, localeActive, index = 0 }: Props) => {

    const t = useTranslations('Resume projects');
    const p = useTranslations('Project');
    const { category, status, statusColor, tags } = useProjectLabels(project);

    const visibleTags = tags.slice(0, MAX_TAGS);
    const hiddenTags = tags.length - visibleTags.length;
    const years = `${project.dateStart.getFullYear()} – ${project.dateEnd ? project.dateEnd.getFullYear() : p('actual')}`;

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card overflow-hidden grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] hover:shadow-xl">

            <div className="relative aspect-[16/9] md:aspect-auto md:min-h-[16rem] bg-background border-b md:border-b-0 md:border-r border-line">
                <Image
                    src={project.logo}
                    alt={t('cover', { title: project.title })}
                    fill
                    sizes="(min-width: 768px) 24rem, 90vw"
                    className="logo-outline object-contain p-8"
                />
            </div>

            <div className="flex flex-col gap-3 p-5 md:p-6">

                <div className="flex flex-wrap items-center gap-2">
                    {category && <Chip value={category} />}
                    <Chip value={status} color={statusColor} />
                    <span className="ml-auto inline-flex items-center gap-1 text-sm text-muted">
                        <IoCalendarOutline size={16} aria-hidden />
                        {years}
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-pretty text-accent-fg">{project.title}</h3>

                <p className="leading-relaxed md:text-justify hyphens-auto line-clamp-4">{project.shortDescription.get(localeActive)}</p>

                <ul className="flex flex-wrap gap-2" aria-label={p('tags')}>
                    {
                        visibleTags.map((tag) => (
                            <li key={tag}><Chip value={tag} variant="outline" /></li>
                        ))
                    }
                    {
                        hiddenTags > 0 && (
                            <li><Chip value={`+${hiddenTags}`} variant="outline" /></li>
                        )
                    }
                </ul>

                <div className="flex flex-wrap gap-3 mt-auto pt-2">
                    <I18Link
                        href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
                        className="btn btn-primary text-sm">
                        {t('read more')}
                    </I18Link>

                    {
                        project.productionLink && (
                            <a
                                href={project.productionLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary text-sm">
                                <IoIosLink size={18} aria-hidden />
                                {p('view page')}
                            </a>
                        )
                    }
                </div>

            </div>

        </motion.article>
    )
}

export default ProjectFeaturedCard
