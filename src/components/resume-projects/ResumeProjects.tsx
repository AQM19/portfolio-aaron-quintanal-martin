import { Project } from '@/core/interfaces';
import { useLocale, useTranslations } from 'next-intl';
import { Link as I18Link } from '@/i18n/routing';
import React from 'react'
import ProjectFeaturedCard from '../cards/project-featured/ProjectFeaturedCard';

interface Props {
    projects: Project[];
}

const ResumeProjects = ({ projects }: Props) => {

    const t = useTranslations("Resume projects");
    const localeActive = useLocale();

    return (
        <section aqm-data="resume-projects" className='flex flex-col items-center gap-10 sm:gap-16 py-16 px-4 sm:px-8 text-foreground'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

            <div className="flex flex-col gap-6 w-full max-w-5xl">

                {
                    // Featured projects first; the sort is stable, so the published order is kept inside each group.
                    [...projects]
                    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
                    .slice(0, 3)
                    .map((project, index) => (
                        <ProjectFeaturedCard
                            key={`${project.title}-${index}`}
                            project={project}
                            localeActive={localeActive}
                            index={index}
                        />
                    ))

                }

            </div>

            <I18Link href='/projects' className='btn btn-secondary'>
                {t('view all')}
            </I18Link>

        </section>
    )
}

export default ResumeProjects
