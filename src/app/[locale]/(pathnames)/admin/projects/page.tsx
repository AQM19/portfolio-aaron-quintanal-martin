import React, { use } from 'react'
import { getPaginatedProjectList } from '@/actions';
import { ProjectsTable } from './ui/projects-table';
import { Pagination } from '@/components';

interface Props {
    searchParams: {
        page?: string;
        take?: string
    }
}

const ManageProjectsPage = ({ searchParams }: Props) => {

    const page = searchParams.page ? +searchParams.page : 1;
    const take = searchParams.take ? +searchParams.take : 10;
    const { projects, currentPage, totalPages, totalCount } = use(getPaginatedProjectList({ page, take }));

    return (
        <section className='w-full h-auto min-h-screen px-5 py-20 md:p-20 md:pt-64 flex md:flex-col items-center'>

            <div className='w-full'>
                <ProjectsTable projects={projects ?? []} />
                <Pagination totalPages={totalPages} />
            </div>
        </section>
    )
}

export default ManageProjectsPage