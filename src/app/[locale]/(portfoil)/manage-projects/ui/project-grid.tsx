'use client'

import { CrudToolbarComponent } from '@/components/projects/crud-toolbar/crud-toolbar.component';
import { PROJECT_GRID_HEADERS } from '@/config/headers/project-grid.headers';
import { CrudToolbar, Project } from '@/interfaces'
import { redirect, useRouter } from '@/navigation';
import { sleep } from '@/utils/sleep';
import { LinearProgress } from '@mui/material';
import { DataGrid, GridCallbackDetails, GridRowParams, GridSlots, MuiEvent } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { IoMdEye } from 'react-icons/io';
import { MdDelete, MdDeleteForever, MdModeEdit } from 'react-icons/md';

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

    const handleRead = () => {
        if (!project) return;

        const { id } = project;
        router.replace((`manage-project/${id}`))
    }
    const handleEdit = () => { console.log('EDIT'); }
    const handleDisable = () => { console.log('DISABLE'); }
    const handleDelete = () => { console.log('DELETE') }

    const crud: CrudToolbar[] = [
        { icon: IoMdEye, size: 'large', label: 'Visualización', function: handleRead, disabled: !project },
        { icon: MdModeEdit, size: 'large', label: 'Editar', function: handleEdit, disabled: !project },
        { icon: MdDelete, size: 'large', label: 'Inhabilitar', function: handleDisable, disabled: !project },
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
