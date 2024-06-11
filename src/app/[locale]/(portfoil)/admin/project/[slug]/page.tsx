'use server'

import { getCategories, getProjectBySlug, getStatus, getTags } from '@/actions';
import { redirect } from 'next/navigation';
import React from 'react'
import ManageProjectForm from './ui/manage-project-form';
import { useLocale } from 'next-intl';
import { Paths } from '@/interfaces/paths/paths.enum';

interface Props {
  params: {
    slug: string;
  }
}

const ManageProjectByIdPage = async ({ params }: Props) => {

  const { slug } = params;
  if (!slug) redirect(Paths.INDEX);

  const localeActive = useLocale();

  const [project, categories, tags, status] = await Promise.all([
    getProjectBySlug(slug, localeActive),
    getCategories(),
    getTags(),
    getStatus()
  ])

  if (!project && slug !== 'new' || !categories || !tags || !status) {
    redirect(Paths.PROJECTS)
  }


  return (
    <section className='w-full h-auto min-h-screen px-5 py-20 md:p-20 md:pt-40'>

      <ManageProjectForm project={project ?? {}} categories={categories!.categories} tags={tags!.tags} status={status!.status} />

    </section>
  )
}

export default ManageProjectByIdPage