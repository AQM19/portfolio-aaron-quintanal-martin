'use server'

import React from 'react'
import { getPaginatedProjectList } from '@/actions';
import { ProjectGrid } from './ui/project-grid';

interface Props {
    searchParams: {
        page?: string;
        take?: string
    }
}

const ManageProjectsPage = async ({ searchParams }: Props) => {

    const page = searchParams.page ? +searchParams.page : 1;
    const take = searchParams.take ? +searchParams.take : 10;
    const { projects, currentPage, totalPages, totalCount } = await getPaginatedProjectList({ page, take });


    return (
        <section className='w-full h-auto min-h-screen px-5 py-20 md:p-20 md:pt-64 flex md:flex-col items-center'>

            <div className='w-full'>
                <ProjectGrid
                    projects={projects}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalCount={totalCount}
                />
            </div>
        </section>
    )
}

export default ManageProjectsPage