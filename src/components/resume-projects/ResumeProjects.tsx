import { ProjectsConfig } from '@/core/config/projects/projects.config';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'
import ProjectResumeCard from '../cards/project-resume/ProjectResumeCard';

const ResumeProjects = () => {

    const t = useTranslations("Resume projects");
    const localeActive = useLocale();

    return (
        <section aqm-data="resume-projects" className='flex flex-col items-center gap-20 py-16 text-night dark:text-silver-900'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 sm:p-0">

                {
                    ProjectsConfig.map((project, index) => (
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