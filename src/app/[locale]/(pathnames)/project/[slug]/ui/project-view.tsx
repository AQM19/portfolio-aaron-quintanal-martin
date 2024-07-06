'use client'

import ProjectMobileSlideshow from "@/components/projects/slideshow/ProjectMobileSlideshow"
import ProjectSlideshow from "@/components/projects/slideshow/ProjectSlideshow"
import { Project } from "@/interfaces"
import { Link } from "@/navigation"
import { getLocaleFormattedDate } from "@/utils/date-format"
import { Avatar, AvatarGroup, Button } from "@mui/material"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { FiDownload } from "react-icons/fi"
import { IoIosLink } from "react-icons/io"
import { IoCalendarOutline } from "react-icons/io5"
import { Developer } from '../../../../../../interfaces/developer/developer.interface';
import { ubuntu } from "@/config/fonts/fonts"

interface Props {
    project: Project
}

const ProjectView = ({ project }: Props) => {

    const t = useTranslations("Project");
    const locale = useLocale();

    return (
        <>
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
                                    <div className="font-medium text-[#ed4709] dark:text-[#e2b5fd]">
                                        {t('category')}
                                    </div>
                                    <div className="rounded-full bg-neutral-900 text-[#fff6ed] dark:bg-[#d2e4ff] dark:text-[#030637] px-3 py-1 text-xs font-medium" >
                                        {t(project.Category)}
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
                                <div className='text-[#ed4709] dark:text-[#e2b5fd]'>
                                    {t('date start')}:
                                </div>
                                <span className='text-[#441006] dark:text-[#d2e4ff]'>
                                    {getLocaleFormattedDate(project.dateStart, locale)}
                                </span>
                            </div>

                            <IoCalendarOutline className="h-5 w-5 text-[#441006] dark:text-[#d2e4ff]" />
                            <div className="text-sm">
                                <div className='text-[#ed4709] dark:text-[#e2b5fd]'>
                                    {t('date end')}:
                                </div>
                                <span className='text-[#441006] dark:text-[#d2e4ff]'>
                                    {project.dateEnd ? getLocaleFormattedDate(project.dateEnd, locale) : 'Actualidad'}
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
                                        <Button className='rounded-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 hover:bg-neutral-900'>
                                            <FiDownload className="mr-2 h-4 w-4" />
                                            {t('download documentation')}
                                        </Button>
                                    </Link>
                                )
                            }

                            {/* Botón para ir a la página del proyecto */}
                            {
                                project.link && project.link.trim() !== '' && (
                                    <Link
                                        href={project.link}
                                        target='_blank'
                                    >
                                        <Button className='rounded-md bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 hover:bg-neutral-900'>
                                            <IoIosLink className="mr-2 h-4 w-4" />
                                            {t('view page')}
                                        </Button>
                                    </Link>
                                )
                            }

                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {
                                project.tags.map((tag, index) => (
                                    <div key={index} className="rounded-full bg-[#441006] text-[#fff6ed] dark:bg-[#d2e4ff] dark:text-[#030637] px-3 py-1 text-xs font-medium" >
                                        {t(tag.nemonic)}
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex items-center gap-4">
                            {
                                project.developers.length === 1 && project.developers.map(dev => (
                                    <Link key={dev.id} href={dev.github ? dev.github : '#'} target='_blank'>
                                        <div className="flex items-center gap-2">
                                            {/* <Image
                                                alt={dev.name}
                                                className="h-8 w-8 rounded-full"
                                                height={32}
                                                src={dev.avatar ? dev.avatar : ''}
                                                style={{
                                                    aspectRatio: "32/32",
                                                    objectFit: "cover",
                                                }}
                                                width={32}
                                            /> */}
                                            <Avatar alt={dev.username} src={dev.avatar!} />
                                            <div
                                                className="text-sm font-medium text-[#441006] dark:text-[#d2e4ff]"
                                            >
                                                {dev.name} {dev.surname}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                            {
                                project.developers.length > 1 && (
                                    <AvatarGroup max={4}>
                                        {project.developers.map(dev => (
                                            <Avatar key={dev.id} alt={dev.username} src={dev.avatar!} />
                                        ))}
                                    </AvatarGroup>
                                )
                            }
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default ProjectView