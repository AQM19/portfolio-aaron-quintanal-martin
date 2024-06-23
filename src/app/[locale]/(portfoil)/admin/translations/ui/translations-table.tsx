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
            <thead className="bg-gray-200 border-b">
                <tr>

                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Título
                    </th>

                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        <img src='/imgs/es.flag.svg' />
                    </th>

                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        <img src='/imgs/en.flag.svg' />
                    </th>

                </tr>
            </thead>
            <tbody>
                {
                    projects.map(project => (
                        <tr key={project.id} onDoubleClick={() => handleOnDoubleClick(project.id)} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {project.title}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {project['es']
                                    ? <MdDone size={30} className='text-green-300' />
                                    : <RxCross2 size={30} className='text-red-400' />
                                }
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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