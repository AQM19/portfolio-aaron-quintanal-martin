import React, { use } from 'react'
import { getPaginatedProjectsWithImages } from '@/actions';
import { useLocale } from 'next-intl';
import { Pagination } from '@/components';
import ProjectGrid from '@/components/projects/project-grid/ProjectGrid';

export const revalidate = 60;

interface Props {
    searchParams: {
        page?: string;
    }
}

const ProjectsPage = ({ searchParams }: Props) => {

    const localeActive = useLocale();

    const page = searchParams.page ? +searchParams.page : 1;
    const { projects, currentPage, totalPages } = use(getPaginatedProjectsWithImages({ page, lang: localeActive }));

    return (
        <section className='w-full px-12 pt-28'>
            <ProjectGrid projects={projects} />
            <Pagination totalPages={totalPages} />
        </section >
    )
}

export default ProjectsPage