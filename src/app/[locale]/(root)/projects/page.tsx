import ProjectResumeCard from '@/components/cards/project-resume/ProjectResumeCard'
import { ProjectsConfig } from '@/core/config/projects/projects.config'
import { useLocale } from 'next-intl';
import React from 'react'

const ProjectPage = () => {

    const localeActive = useLocale();

    return (
        <section className='flex flex-col w-full h-full items-center justify-center'>

            <div className="container">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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