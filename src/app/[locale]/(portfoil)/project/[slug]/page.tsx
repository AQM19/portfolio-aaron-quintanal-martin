export const revalidate = 604800;

import { getProjectBySlug } from '@/actions';
import { Metadata, ResolvingMetadata } from 'next';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import React, { } from 'react'
import { kanit } from '@/config/fonts';
import ProjectView from './ui/project-view';

interface Props {
    params: {
        slug: string;
    }
}

const SlugProjectPage = async ({ params }: Props) => {

    const localeActive = useLocale();
    const { slug } = params;
    const project = await getProjectBySlug(slug, localeActive);

    if (!project) {
        notFound();
    }

    return (
        <section className={`${kanit.className} w-full h-auto lg:h-screen py-12 md:py-14 lg:py-20 px-8 lg:px-12`}>
            <ProjectView project={project} />
        </section>
    )
}

export default SlugProjectPage
