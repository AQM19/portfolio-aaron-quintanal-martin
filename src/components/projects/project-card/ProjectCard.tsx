import { GridProject } from '@/interfaces';
import { Link } from '@/navigation';
import Image from 'next/image';
import React from 'react'

interface Props {
    project: GridProject;
    index: number;
}

const ProjectCard = ({ project, index }: Props) => {

    const { slug } = project;

    return (
        <Link href={`/project/${slug}`} >
            <article
                key={index}
                className='min-w-full sm:w-[540px] sm:h-[500px] max-w-lg bg-neutral-50 dark:bg-[#3C0753] rounded-lg flex flex-col gap-4 transition-all hover:scale-105 duration-200 shadow-lg shadow-[#441006] dark:shadow-[#e2b5fd] overflow-hidden cursor-pointer'
            >

                <Image
                    src={`${project.images[0]}`}
                    alt={project.title}
                    className='max-h-52 w-full object-cover'
                    width={150}
                    height={150}
                />

                <div className='flex flex-col gap-4 p-5'>
                    <h5
                        className='font-bold text-3xl text-[#ed4709] dark:text-[#e2b5fd] text-center sm:text-start'>
                        {project.title}
                    </h5>

                    <p
                        className='hidden sm:block text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty text-justify font-semibold'>
                        {project.shortDescription}
                    </p>

                </div>

            </article>
        </Link>
    )
}

export default ProjectCard