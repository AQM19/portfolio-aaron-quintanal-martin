import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiDownload } from 'react-icons/fi';
import { getLocale, getTranslations } from "next-intl/server";
import { getLocaleFormattedDate } from '@/core/utils';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoIosLink } from 'react-icons/io';
import { Link as I18nLink } from '@/i18n/routing';
import { notFound } from 'next/navigation'
import { loadProjects } from '@/core/content';
import { routing } from '@/i18n/routing';
import Avatar from '@/components/avatar/Avatar';
import AvatarGroup from '@/components/avatar/AvatarGroup';
import Chip from '@/components/chip/Chip';
import ImageSlider from '@/components/image-slider/ImageSlider';
import Link from 'next/link';
import React from 'react'

export const revalidate = 84600;
export const dynamicParams = true;

const ProjectDetailPage = async ({ params, }: { params: Promise<{ slug: string, locale: string }> }) => {

    const { slug, locale } = await params;
    const projects = await loadProjects(locale);
    const project = projects.find(project => project.slug === slug);

    if (!project) {
        notFound();
    }

    const projectIndex = projects.findIndex(project => project.slug === slug);
    const previousProject =
        projects[(projectIndex - 1 + projects.length) % projects.length];
    const nextProject =
        projects[(projectIndex + 1) % projects.length];

    const t = await getTranslations('Project');
    const c = await getTranslations('Category');
    const e = await getTranslations('Tags');

    const localeActive = await getLocale();

    return (
        <section className='w-full h-full py-10 px-8 lg:px-12 relative'>

            <I18nLink
                aqm-data="previous-project"
                href={{ pathname: '/projects/[slug]', params: { slug: previousProject.slug } }}
                className='hidden sm:flex absolute top-0 left-0 h-full items-center cursor-pointer hover:bg-silver dark:hover:bg-night-600 rounded-sm transition-colors duration-300 text-aero dark:text-emerald'
            >
                <FaChevronLeft size={30} />
            </I18nLink>

            <I18nLink
                aqm-data="next-project"
                href={{ pathname: '/projects/[slug]', params: { slug: nextProject.slug } }}
                className='hidden sm:flex absolute top-0 right-4 h-full items-center cursor-pointer hover:bg-silver dark:hover:bg-night-600 rounded-sm transition-colors duration-300 text-aero dark:text-emerald'
            >
                <FaChevronRight size={30} />
            </I18nLink>

            <div className='flex flex-col 2xl:flex-row-reverse justify-evenly items-center'>

                <div className='md:w-2/3 lg:w-1/3'>
                    <ImageSlider
                        images={project.images}
                    />
                </div>

                <div className='w-full 2xl:w-1/3 flex flex-col gap-4'>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <div className='flex flex-row gap-4 items-center justify-between'>

                                <h2 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-aero dark:text-emerald`}>
                                    {project.title}
                                </h2>

                                {
                                    // Remote projects bring the name from the admin catalog; local ones are translated here.
                                    (project.categoryLabel ?? (project.category && c(project.category))) && (
                                        <div className="flex flex-col gap-2 items-center">

                                            <div className="font-medium text-aero dark:text-emerald">
                                                {t('category')}
                                            </div>

                                            <Chip value={project.categoryLabel ?? c(project.category!)} />

                                        </div>
                                    )
                                }
                            </div>

                            {
                                project.descriptionHtml?.get(localeActive)
                                    ? (
                                        // Published content: HTML sanitized on the server (rich-text.ts)
                                        <div
                                            className='rich-text font-light text-justify antialiased text-night dark:text-silver-900 transition-colors duration-300'
                                            dangerouslySetInnerHTML={{ __html: project.descriptionHtml.get(localeActive)! }}
                                        />
                                    )
                                    : (
                                        <div className='font-light text-justify antialiased text-night dark:text-silver-900 transition-colors duration-300'>
                                            {
                                                project.description.get(localeActive)?.map((item, index) => (
                                                    <p key={index}>
                                                        {item}
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    )
                            }

                        </div>

                        <div className="flex items-center gap-4 text-night dark:text-silver-900">

                            <IoCalendarOutline size={30} className='transition-colors duration-300' />
                            <div className="text-sm transition-colors duration-300">
                                <div className='text-aero dark:text-emerald font-semibold'>
                                    {t('date start')}:
                                </div>
                                <span>
                                    {getLocaleFormattedDate(project.dateStart, localeActive)}
                                </span>
                            </div>

                            <IoCalendarOutline size={30} className='transition-colors duration-300' />
                            <div className="text-sm transition-colors duration-300">
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
                                        <button
                                            className='lg:self-end mt-5 px-5 py-4 rounded-md text-aero dark:text-emerald font-bold border-2 border-aero dark:border-emerald flex flex-row items-center gap-x-4'>
                                            <IoIosLink size={20} />
                                            <span>
                                                {t('view page')}
                                            </span>
                                        </button>
                                    </Link>
                                )
                            }

                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {
                                (project.tagLabels ?? project.tags.map((tag) => e(tag))).map((tag, index) => (
                                    <Chip
                                        key={`${tag}-${index}`}
                                        value={tag}
                                    />
                                ))
                            }
                        </div>

                        <div className="flex items-center">
                            {
                                project.developers.length === 1 && <Avatar dev={project.developers[0]} />
                            }

                            {
                                project.developers.length > 1 && <AvatarGroup developers={project.developers} />
                            }

                        </div>

                    </div>
                </div>

            </div>

        </section >
    )
}

export default ProjectDetailPage

export async function generateStaticParams() {
    const paths = [];

    for (const locale of routing.locales) {
        for (const project of await loadProjects(locale)) {
            paths.push({
                locale: locale,
                slug: project.slug
            });
        }
    }

    return paths;
}