'use client'

import Avatar from '@/components/avatar/Avatar';
import { ProjectsConfig } from '@/core/config/projects/projects.config';
import { getLocaleFormattedDate } from '@/core/utils';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation'
import React from 'react'
import { FiDownload } from 'react-icons/fi';
import { IoIosLink } from 'react-icons/io';
import { IoCalendarOutline } from 'react-icons/io5';

const ProjectDetailPage = () => {

    const params = useParams();
    const slug = params.slug as string;
    const project = ProjectsConfig.find(project => project.slug === slug);

    if (!project) {
        notFound();
    }

    const t = useTranslations('Project');
    const c = useTranslations('Category');
    const e = useTranslations('Tags');
    const localeActive = useLocale();

    const max = 3;
    const visibleAvatars = project.developers.slice(0, max)
    const remainingCount = project.developers.length - max

    return (
        <section className='w-full h-auto py-12 px-8 lg:px-12'>

            <div className='flex flex-col lg:flex-row-reverse justify-evenly items-center '>

                <div className='md:w-2/3 lg:w-1/3'>
                    {/* SLIDER */}
                </div>

                <div className='lg:w-1/3 flex flex-col gap-4'>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <div className='flex flex-row gap-4 items-center justify-between'>

                                <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-aero dark:text-emerald`}>
                                    {project.title}
                                </h2>

                                <div className="flex flex-col gap-2 items-center">

                                    <div className="font-medium text-aero dark:text-emerald">
                                        {t('category')}
                                    </div>

                                    <div className="rounded-full bg-neutral-900 text-[#fff6ed] dark:bg-[#d2e4ff] dark:text-[#030637] px-3 py-1 text-xs font-medium" >
                                        {c(project.category)}
                                    </div>

                                </div>
                            </div>

                            <p className='font-light text-justify antialiased text-[#441006] dark:text-[#d2e4ff]'>
                                {project.description.get(localeActive)}
                            </p>

                        </div>

                        <div className="flex items-center gap-4 text-night dark:text-silver-900">

                            <IoCalendarOutline size={30} />
                            <div className="text-sm">
                                <div className='text-aero dark:text-emerald font-semibold'>
                                    {t('date start')}:
                                </div>
                                <span>
                                    {getLocaleFormattedDate(project.dateStart, localeActive)}
                                </span>
                            </div>

                            <IoCalendarOutline size={30} />
                            <div className="text-sm">
                                <div className='text-aero dark:text-emerald font-semibold'>
                                    {t('date end')}:
                                </div>
                                <span>
                                    {
                                        project.dateEnd
                                            ? getLocaleFormattedDate(project.dateEnd, localeActive)
                                            : `${t('actual')}`
                                    }
                                </span>
                            </div>

                        </div>

                        <div className="flex items-center gap-4">
                            {
                                project.documentation && (
                                    <Link
                                        href={project.documentation.get(localeActive) || '#'}
                                        target='_blank'
                                    >
                                        <button
                                            className='lg:self-end mt-5 px-5 py-4 rounded-md text-aero dark:text-emerald font-bold border-2 border-aero dark:border-emerald flex flex-row items-center gap-x-4'>
                                            <FiDownload size={20} />
                                            <span>
                                                {t('download documentation')}
                                            </span>
                                        </button>
                                    </Link>
                                )
                            }

                            {
                                project.productionLink && (
                                    <Link
                                        href={project.productionLink}
                                        target='_blank'
                                    >
                                        <button className='rounded-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 hover:bg-neutral-900'>
                                            <IoIosLink className="mr-2 h-4 w-4" />
                                            {t('view page')}
                                        </button>
                                    </Link>
                                )
                            }

                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {
                                project.tags.map((tag, index) => (
                                    <div key={index} className="rounded-full bg-[#441006] text-[#fff6ed] dark:bg-[#d2e4ff] dark:text-[#030637] px-3 py-1 text-xs font-medium" >
                                        {e(tag)}
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex items-center">
                            {
                                project.developers.length === 1 && <Avatar dev={project.developers[0]} />
                            }

                            {
                                visibleAvatars.length > 1 && visibleAvatars.map((dev, index) => (
                                    <div
                                        key={index}
                                        className={`${index !== 0 ? '-ml-2' : ''} border-2 border-silver-900 rounded-full`}
                                        style={{ zIndex: project.developers.length - index }}
                                    >
                                        <img
                                            key={`${dev.username}-${index}`}
                                            alt={dev.username}
                                            src={dev.avatar!}
                                            className='w-16 h-16 rounded-full'
                                        />
                                    </div>
                                ))
                            }
                            {
                                remainingCount > 0 && (
                                    <div
                                        className='rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600 border-2 border-white ml-2 px-1'
                                    >
                                        +{remainingCount}
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>

            </div>

        </section >
    )
}

export default ProjectDetailPage