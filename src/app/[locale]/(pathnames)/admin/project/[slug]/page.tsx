'use server'

import { getAllDevelopers, getCategories, getProjectBySlug, getStatus, getTags } from '@/actions';
import { Paths } from '@/config';
import { redirect } from 'next/navigation';
import { useLocale } from 'next-intl';
import ManageProjectForm from './ui/manage-project-form';
import React, { use } from 'react'

interface Props {
  params: {
    slug: string;
  }
}

const ManageProjectByIdPage = ({ params }: Props) => {

  const { slug } = params;
  if (!slug) redirect(Paths.INDEX);

  const localeActive = useLocale();

  const [project, categories, tags, status, developers] = use(Promise.all([
    getProjectBySlug(slug, localeActive),
    getCategories(),
    getTags(),
    getStatus(),
    getAllDevelopers()
  ]))

  if (!project && slug !== 'new' || !categories || !tags || !status || !developers) {
    redirect(Paths.PROJECTS)
  }


  return (
    <section className='w-full h-auto min-h-screen px-5 py-20 md:p-20 md:pt-40'>

      <ManageProjectForm project={project ?? {}} categories={categories!.categories} tags={tags!.tags} status={status!.status} developers={developers.developers!} />

    </section>
  )
}

export default ManageProjectByIdPage