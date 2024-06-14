export const revalidate = 604800;

import { getProjectBySlug } from '@/actions';
import ProjectMobileSlideshow from '@/components/projects/slideshow/ProjectMobileSlideshow';
import ProjectSlideshow from '@/components/projects/slideshow/ProjectSlideshow';
import { Metadata, ResolvingMetadata } from 'next';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5';
import Link from 'next/link';
import { IoIosLink } from 'react-icons/io';
import { Button, useMediaQuery } from '@mui/material';
import { FiDownload } from 'react-icons/fi';
import { kanit, ubuntu } from '@/config/fonts';

interface Props {
    params: {
        slug: string;
    }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const slug = params.slug
    const localeActive = useLocale();
    const project = await getProjectBySlug(slug, localeActive);
    return {
        title: project?.title ?? 'Producto no encontrado',
        description: project?.shortDescription ?? '',
        openGraph: {
            title: project?.title ?? 'Producto no encontrado',
            description: project?.description ?? '',
            images: [`/products/${project?.images[1]}`],
        }
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

            <div className='flex flex-col lg:flex-row-reverse justify-evenly items-center '>

                <div className='md:w-2/3 lg:w-1/3'>
                    {/* Mobile slideshow */}
                    <ProjectMobileSlideshow
                        title={project.title}
                        images={project.images}
                        className='block md:hidden'
                    />

                    {/* Desktop slidewhow */}
                    <ProjectSlideshow
                        title={project.title}
                        images={project.images}
                        className='hidden md:block'
                    />
                </div>

                <div className='lg:w-1/3 flex flex-col gap-4'>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <div className='flex flex-row gap-4 items-center justify-between'>
                                <h2 className={`${ubuntu.className} text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#ed4709] dark:text-[#e2b5fd]`}>
                                    {project.title}
                                </h2>

                                <div className="flex flex-col gap-2 items-center">
                                    <div className="font-medium text-[#ed4709] dark:text-[#e2b5fd]">Category</div>
                                    <div className="rounded-full bg-neutral-900 text-[#fff6ed] dark:bg-[#d2e4ff] dark:text-[#030637] px-3 py-1 text-xs font-medium" >
                                        {"Académico"}
                                    </div>
                                </div>
                            </div>

                            <p className='font-light text-justify antialiased text-[#441006] dark:text-[#d2e4ff]'>
                                {project.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <IoCalendarOutline className="h-5 w-5 text-[#441006] dark:text-[#d2e4ff]" />
                            <div className="text-sm">
                                <div className='text-[#ed4709] dark:text-[#e2b5fd]'>Fecha de inicio:</div>
                                <span className='text-[#441006] dark:text-[#d2e4ff]'>
                                    {project.dateStart.toLocaleDateString()}
                                </span>
                            </div>

                            <IoCalendarOutline className="h-5 w-5 text-[#441006] dark:text-[#d2e4ff]" />
                            <div className="text-sm">
                                <div className='text-[#ed4709] dark:text-[#e2b5fd]'>End Date:</div>
                                <span className='text-[#441006] dark:text-[#d2e4ff]'>
                                    {project.dateEnd ? project.dateEnd.toLocaleDateString() : 'Actualidad'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">

                            {/* Boton para descargar documentación */}
                            {
                                project.documentation && (
                                    <Link
                                        href={project.documentation}
                                        target='_blank'
                                    >
                                        <Button className='rounded-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900'>
                                            <FiDownload className="mr-2 h-4 w-4" />
                                            Download Documentation
                                        </Button>
                                    </Link>
                                )
                            }

                            {/* Botón para ir a la página del proyecto */}
                            {
                                project.link && (
                                    <Link
                                        className="inline-flex items-center gap-2 text-sm font-medium bg-neutral-900 hover:underline"
                                        href={project.link}
                                        target='_blank'
                                    >
                                        <IoIosLink className="h-4 w-4" />
                                        View Project
                                    </Link>
                                )
                            }

                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {
                                project.tags.map((tag, index) => (
                                    <div key={index} className="rounded-full bg-[#441006] text-[#fff6ed] dark:bg-[#d2e4ff] dark:text-[#030637] px-3 py-1 text-xs font-medium" >
                                        {tag}
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex items-center gap-4">
                            {
                                project.developers.map(dev => (
                                    <Link key={dev.id} href={dev.github ? dev.github : '#'} target='_blank'>
                                        <div className="flex items-center gap-2">
                                            <img
                                                alt={dev.name}
                                                className="h-8 w-8 rounded-full"
                                                height={32}
                                                src={dev.avatar ? dev.avatar : ''}
                                                style={{
                                                    aspectRatio: "32/32",
                                                    objectFit: "cover",
                                                }}
                                                width={32}
                                            />
                                            <div
                                                className="text-sm font-medium text-[#441006] dark:text-[#d2e4ff]"
                                            >
                                                {dev.name} {dev.surname}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>

                    </div>
                </div>



            </div>
        </section >

    )
}

export default SlugProjectPage
