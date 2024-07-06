export const revalidate = 604800;

import { getProjectBySlug } from '@/actions';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import React, { use } from 'react'
import ProjectView from './ui/project-view';
import { kanit } from '@/config/fonts/fonts';

interface Props {
    params: {
        slug: string;
    }
}

const SlugProjectPage = ({ params }: Props) => {

    const localeActive = useLocale();
    const { slug } = params;
    const project = use(getProjectBySlug(slug, localeActive));

    if (!project) {
        notFound();
    }

    return (
        <section className={`${kanit.className} w-full h-auto min-h-screen py-12 md:py-14 lg:py-20 px-8 lg:px-12`}>
            <ProjectView project={project} />
        </section>
    )
}

export default SlugProjectPage
