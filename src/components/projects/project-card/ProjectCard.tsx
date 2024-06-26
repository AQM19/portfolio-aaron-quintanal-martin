import React from 'react'

import { IoMdShare } from 'react-icons/io';

import { GridProject, Project } from '@/interfaces';
import { Link } from '@/navigation';
import Image from 'next/image';

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
                className='min-w-full sm:min-w-[520px] sm:min-h-[450px] max-w-lg bg-neutral-50 dark:bg-[#3C0753] rounded-lg flex flex-col gap-4 transition-all hover:scale-110 duration-200 shadow-lg shadow-[#441006] dark:shadow-[#e2b5fd] overflow-hidden cursor-pointer'
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

                <div className='flex-grow'></div>

                <div className='hidden px-5 pb-5 md:flex flex-row flex-wrap gap-4 items-center justify-center md:justify-start'>
                    <button
                        className='hidden md:block w-auto px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                        Saber mas
                    </button>

                    <div className='hidden md:block flex-grow'></div>

                    <button>
                        <IoMdShare size={30} className='text-[#ed4709] dark:text-[#e2b5fd]' />
                    </button>
                </div>

            </article>
        </Link>
    )
}

export default ProjectCard