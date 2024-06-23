import { getPaginatedProjectsWithTranslations } from '@/actions';
import { Pagination } from '@/components/ui/pagination/Pagination';
import React from 'react'
import TranslationsTable from './ui/translations-table';


interface Props {
    searchParams: {
        page?: string;
    }
}

const ProjectTranslationsSelectorPage = async ({ searchParams }: Props) => {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { projects, currentPage, totalPages } = await getPaginatedProjectsWithTranslations({ page });

    const handleOnClick = () => {
        console.log('HOLA')
    }

    return (
        <section className='w-full h-auto min-h-screen px-5 py-20 md:p-20 md:pt-64 flex md:flex-col items-center'>

            <div className="mb-10">

                <TranslationsTable projects={projects ?? []} />
                <Pagination totalPages={totalPages} />
            </div>

        </section>
    )
}

export default ProjectTranslationsSelectorPage