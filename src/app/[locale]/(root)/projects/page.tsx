import { loadProjects } from '@/core/content';
import { getLocale, getTranslations } from 'next-intl/server';
import ProjectResumeCard from '@/components/cards/project-resume/ProjectResumeCard'
import React from 'react'

const ProjectPage = async () => {

    const t = await getTranslations('Projects');
    const localeActive = await getLocale();
    const projects = await loadProjects(localeActive);

    return (
        <section className='flex flex-col w-full h-full items-center pt-24 pb-16 sm:pt-10 px-4 sm:px-8 lg:px-12'>

            <div className="w-full max-w-6xl">

                <h1 className="text-3xl font-bold mb-8 text-center text-foreground transition-colors duration-300">
                    {t('title')}
                </h1>

                {/* Columns of 17-22rem: smaller cards that still fit two side by side on a tablet */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-6">
                    {
                        projects.map((project, index) => (
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