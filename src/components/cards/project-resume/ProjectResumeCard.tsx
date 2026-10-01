'use client'

import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link as I18Link } from '@/i18n/routing';
import { Project } from '@/core/interfaces';
import { useTranslations } from 'next-intl';
import Chip from '@/components/chip/Chip';
import { useProjectLabels } from '../project-labels/useProjectLabels';

interface Props {
    project: Project;
    index?: number;
    localeActive: string;
}

/** Compact card of the projects list: logo, catalog chips, author, short description and link. */
const ProjectResumeCard = ({ project, localeActive, index }: Props) => {

    const t = useTranslations("Resume projects");
    const { category, status, statusColor } = useProjectLabels(project);

    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5, delay: index
                    ? index * 0.15
                    : 0.1
            }}
            className="card flex flex-col h-full overflow-hidden hover:shadow-xl">

            {/* Logo on an inset well, so the card keeps the same height whatever the logo proportions */}
            <div className="relative aspect-[16/9] bg-background border-b border-line">
                <Image
                    src={project.logo}
                    alt={t('cover', { title: project.title })}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                    className="logo-outline object-contain p-6"
                />
            </div>

            <div className='flex flex-col flex-grow gap-3 p-4'>

                <div className='flex flex-wrap gap-2'>
                    {category && <Chip value={category} />}
                    <Chip value={status} color={statusColor} />
                </div>

                <div>
                    <h3 className="line-clamp-2 font-bold text-xl text-pretty text-accent-fg">{project.title}</h3>
                    <p className="text-sm text-muted">{t('by')} <span className='font-semibold'>{project.creator}</span></p>
                </div>

                <p className="text-sm leading-relaxed text-justify hyphens-auto line-clamp-4">{project.shortDescription.get(localeActive)}</p>

                <I18Link
                    href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
                    className='btn btn-secondary w-full text-sm mt-auto'>
                    {t('read more')}
                </I18Link>

            </div>

        </motion.article>
    )
}

export default ProjectResumeCard
