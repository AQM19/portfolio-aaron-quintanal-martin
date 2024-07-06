'use client'

import { CrudToolbar, Project } from '@/interfaces'
import { CrudToolbarComponent } from '@/components/projects/crud-toolbar/crud-toolbar.component';
import { DataGrid, GridCallbackDetails, GridRowParams, MuiEvent } from '@mui/x-data-grid';
import { deleteProjectById } from '@/actions';
import { MdAdd, MdDeleteForever, MdModeEdit } from 'react-icons/md';
import { PROJECT_GRID_HEADERS } from '@/config/headers/project-grid.headers';
import { useRouter } from '@/navigation';
import React, { useState } from 'react'

interface Props {
    projects: Partial<Project>[],
}

const columns = PROJECT_GRID_HEADERS;

export const ProjectsTable = ({ projects }: Props) => {

    const router = useRouter();

    const [settedProject, setProject] = useState<Partial<Project> | null>(null)

    const handleClick = (project: Partial<Project>) => {
        if (!project) {
            return;
        }

        if (settedProject == project) {
            setProject(null);
            return;
        }

        setProject(project);
    }

    const handleNewProject = () => {
        router.replace((`/admin/project/new`))
    }

    const handleEdit = () => {
        if (!settedProject) return;

        const { slug } = settedProject;
        router.replace((`/admin/project/${slug}`))
    }

    const handleDelete = () => {
        if (!settedProject) return;

        const { id } = settedProject;

        if (!id) {
            return;
        }

        deleteProjectById(id);
        setProject(null);
        router.refresh();
    }

    const crud: CrudToolbar[] = [
        { icon: MdAdd, size: 'large', label: 'Añadir', function: handleNewProject },
        { icon: MdModeEdit, size: 'large', label: 'Editar', function: handleEdit, disabled: !settedProject },
        { icon: MdDeleteForever, size: 'large', label: 'Borrar', function: handleDelete, disabled: !settedProject },
    ]

    return (

        <>
            <CrudToolbarComponent crud={crud} />

            <table className="min-w-full">
                <thead className="text-center font-medium text-[#fff6ed] dark:text-[#e2b5fd] bg-[#ed4709] dark:bg-[#030637]">
                    <tr>

                        <th scope="col" className="px-6 py-4">
                            Título
                        </th>

                        <th scope="col" className="px-6 py-4">
                            Slug
                        </th>

                        <th scope="col" className="px-6 py-4">
                            Estado
                        </th>

                        <th scope="col" className="px-6 py-4">
                            Categoría
                        </th>

                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        projects.map(project => {
                            const isActive = settedProject == project;
                            return (
                                <tr
                                    key={project.id}
                                    onClick={() => handleClick(project)}
                                    className={`border-b transition duration-200 ease-in-out cursor-pointer 
                                        ${isActive 
                                            ? 'text-[#ed4709] dark:text-[#3C0753] bg-[#d2e4ff75] dark:bg-[#e2b5fd80]' 
                                            : 'text-[#ed4709] dark:text-[#030637] bg-[#fff6ed] dark:bg-[#e2b5fd] hover:bg-[#d2e4ff75] dark:hover:bg-[#e2b5fd80]'}`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {project.title}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {project.slug}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {project.Status}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {project.Category}
                                    </td>

                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

        </>
    )
}
