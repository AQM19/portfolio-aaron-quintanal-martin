import ProjectResumeCard from '@/components/cards/project-resume/ProjectResumeCard'
import { ProjectsConfig } from '@/core/config/projects/projects.config'
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'

const ProjectPage = () => {

    const t = useTranslations('Projects');
    const localeActive = useLocale();

    return (
        <section className='flex flex-col w-full h-full items-center py-24 xl:py-10'>

            <div className="container">

                <h1 className="text-3xl font-bold mb-8 text-center text-night dark:text-silver-900 transition-colors duration-300">
                    {t('title')}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-5 sm:p-0">
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

            </div>

        </section>
    )
}

export default ProjectPage