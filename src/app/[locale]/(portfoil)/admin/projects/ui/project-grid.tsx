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
    currentPage?: number,
    totalPages?: number,
    totalCount?: number
}

const columns = PROJECT_GRID_HEADERS;

export const ProjectGrid = ({ projects, currentPage, totalPages, totalCount }: Props) => {

    const page = 1;
    const take = 10;
    const router = useRouter();

    const [project, setProject] = useState(null)

    const handleRowClick = async (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails,) => {
        const { row } = params;
        row === project ? setProject(null) : setProject(row);
    };

    const handleNewProject = () => {
        router.replace((`/admin/project/new`))
    }

    const handleEdit = () => {
        if (!project) return;

        const { slug } = project;
        router.replace((`/admin/project/${slug}`))
    }

    const handleDelete = () => {
        if (!project) return;

        const { id } = project
        deleteProjectById(id);
        setProject(null);
        router.refresh();
    }

    const crud: CrudToolbar[] = [
        { icon: MdAdd, size: 'large', label: 'Añadir', function: handleNewProject },
        { icon: MdModeEdit, size: 'large', label: 'Editar', function: handleEdit, disabled: !project },
        { icon: MdDeleteForever, size: 'large', label: 'Borrar', function: handleDelete, disabled: !project },
    ]

    return (

        <>
            <CrudToolbarComponent crud={crud} />

            <DataGrid
                sx={{
                    '.MuiDataGrid-columnHeader': {
                        backgroundColor: 'rgba(68, 16, 6, .25)',
                        width: '100%'
                    },
                }}
                className='bg-[#44100625] dark:bg-[#d2e4ff25] text-[#ed4709] dark:text-[#e2b5fd]'
                rows={projects}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: currentPage, pageSize: take },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100, { value: totalCount ?? 0, label: 'Todos' }]}
                checkboxSelection
                disableMultipleRowSelection
                onRowClick={handleRowClick}
                density='standard'
            />

        </>
    )
}
