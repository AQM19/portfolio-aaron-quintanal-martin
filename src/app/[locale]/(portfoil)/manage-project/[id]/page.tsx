'use server'

import { getCategories, getProjectById, getRoleName, getStatus, getTags } from '@/actions';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import React from 'react'
import ManageProjectForm from './ui/manage-project-form';
import { useLocale } from 'next-intl';
import notFound from '../../project/not-found';

interface Props {
  params: {
    id: string;
  }
}

const ManageProjectByIdPage = async ({ params }: Props) => {

  const { id } = params;
  if (!id) redirect('/');

  const session = await auth();
  const role = await getRoleName(session!.user.roleId);
  if (role?.role?.name !== 'admin') redirect('/');

  const localeActive = useLocale();
  const project = await getProjectById(id, localeActive);
  const categories = await getCategories();
  const tags = await getTags();
  const status = await getStatus();

  if (!project) {
    console.log('No se ha encontrado un proyecto');
    return notFound();
  }

  if (!categories || categories.categories.length <= 0) {
    console.log('No se han encontrado categorías.');
    return notFound();
  }

  if (!tags || tags.tags.length <= 0) {
    console.log("No se han encontrado etiquetas.");
    return notFound();
  }

  if (!status || status.status.length <= 0) {
    console.log("No se han encontrado estados.");
    return notFound();
  }

  return (
    <section className='w-full h-auto min-h-screen px-5 py-20 md:p-20 md:pt-64 flex md:flex-col items-center'>

      <ManageProjectForm project={project} categories={categories.categories} tags={tags.tags} status={status.status} />

    </section>
  )
}

export default ManageProjectByIdPage