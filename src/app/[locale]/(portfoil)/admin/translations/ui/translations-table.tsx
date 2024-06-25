'use client'

import { ProjectWithLocales } from '@/actions';
import { useRouter } from '@/navigation';
import React, { useState } from 'react'
import { MdDone } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { Paths } from '../../../../../../interfaces/paths/paths.enum';

interface Props {
    projects: ProjectWithLocales[];
}

const TranslationsTable = ({ projects }: Props) => {

    const router = useRouter();

    const handleOnDoubleClick = (projectId: string) => {
        router.replace(`${Paths.ADMIN_PROJECT_TRANSLATIONS}/${projectId}`);
    }

    return (
        <table className="min-w-full">
            <thead className="text-center font-medium text-[#fff6ed] dark:text-[#e2b5fd] bg-[#ed4709] dark:bg-[#030637]">
                <tr>

                    <th scope="col" className="px-6 py-4">
                        Título
                    </th>

                    <th scope="col" className="px-6 py-4">
                        <img src='/imgs/es.flag.svg' />
                    </th>

                    <th scope="col" className="px-6 py-4">
                        <img src='/imgs/en.flag.svg' />
                    </th>

                </tr>
            </thead>
            <tbody className='text-center'>
                {
                    projects.map(project => (
                        <tr
                            key={project.id}
                            onDoubleClick={() => handleOnDoubleClick(project.id)}
                            className='border-b transition duration-200 ease-in-out cursor-pointer text-[#ed4709] dark:text-[#030637] bg-[#fff6ed] dark:bg-[#e2b5fd] hover:bg-[#d2e4ff75] dark:hover:bg-[#e2b5fd80]'
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                {project.title}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                {project['es']
                                    ? <MdDone size={30} className='text-green-300' />
                                    : <RxCross2 size={30} className='text-red-400' />
                                }
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                                {
                                    project['en']
                                        ? <MdDone size={30} className='text-green-300' />
                                        : <RxCross2 size={30} className='text-red-400' />
                                }
                            </td>

                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default TranslationsTable