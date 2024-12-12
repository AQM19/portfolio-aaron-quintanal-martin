'use client'

import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link as I18Link } from '@/i18n/routing';
import Link from 'next/link';
import { Project } from '@/core/interfaces';
import { useTranslations } from 'next-intl';

interface Props {
    project: Project;
    index?: number;
    localeActive: string;
}

const ProjectResumeCard = ({ project, localeActive, index }: Props) => {

    const t = useTranslations("Resume projects");

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5, delay: index
                    ? index * 0.4
                    : 0.2
            }}
            className="flex flex-col h-full bg-silver-900 dark:bg-night rounded-md border-4 border-aero dark:border-emerald shadow-md">

            <div className="flex-grow">

                <div className="aspect-w-2 aspect-h-3 w-full mt-4">
                    <Image
                        src={`/png/${project.logo}.png`}
                        alt={`Cover of ${project.title}`}
                        width={300}
                        height={450}
                        className="object-fill h-full mx-auto max-h-96 rounded hover:scale-105 transition-all cursor-pointer"
                    />
                </div>

            </div>

            <div className='px-4'>
                <h3 className="line-clamp-2 font-bold text-2xl pretty text-aero dark:text-emerald">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{t('by')} <Link href={project.developers[0].github || '#'} target='_blank'><span className='dark:text-raisin_black-800 text-fluorescent_cyan-300 hover:underline hover:cursor-pointer'>{project.developers[0].name} {project.developers[0].surname}</span></Link></p>
                <p className="text-sm line-clamp-3">{project.shortDescription.get(localeActive)}</p>

                <div className='flex flex-row items-center justify-center my-4'>
                    <I18Link
                        href={{ pathname: '/projects/[slug]', params: { slug: project.slug } }}
                        className='w-full text-center font-semibold text-sm border-solid border-4 px-1 py-4 rounded border-aero dark:border-emerald text-aero dark:text-emerald hover:border-aero-300 hover:text-aero-300 dark:hover:text-emerald-300 dark:hover:border-emerald-300  transition-colors duration-300' >
                        {t('read more')}
                    </I18Link>
                </div>

            </div>

        </motion.div>
    )
}

export default ProjectResumeCard