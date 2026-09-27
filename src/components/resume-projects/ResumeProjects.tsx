import { Project } from '@/core/interfaces';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'
import ProjectResumeCard from '../cards/project-resume/ProjectResumeCard';

interface Props {
    projects: Project[];
}

const ResumeProjects = ({ projects }: Props) => {

    const t = useTranslations("Resume projects");
    const localeActive = useLocale();

    return (
        <section aqm-data="resume-projects" className='flex flex-col items-center gap-20 py-16 text-night dark:text-silver-900'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

            <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 gap-6 p-5 container">

                {
                    // Featured projects first; the sort is stable, so the published order is kept inside each group.
                    [...projects]
                    .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
                    .slice(0, 3)
                    .map((project, index) => (
                        <ProjectResumeCard
                            key={`${project.title}-${index}`}
                            project={project}
                            localeActive={localeActive}
                            index={index}
                        />
                    ))

                }

            </div>

        </section>
    )
}

export default ResumeProjects