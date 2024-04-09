'use client'

import { GithubGroupedRepositoryList } from '@/interfaces'
import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    data: GithubGroupedRepositoryList;
}

export const CardProject = (project: Props) => {

    const router = useRouter();

    const goToProjectPage = () => {
        router.push(`/project/${project.data.name}`);
    };

    return (
        <Card
            className='w-4/5 sm:w-[450px] sm:min-h-[440px] bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-blue-700 opacity-90 rounded-2xl sm:project-card transition-all duration-200 cursor-pointer'
            elevation={5}
            onClick={goToProjectPage}
        >

            <div className='flex justify-center items-center h-[150px] sm:h-[250px] sm:min-h-[250px]'>
                <CardMedia
                    component='img'
                    image={project.data.image}
                    className='max-h-full w-auto'
                    alt={project.data.name}
                />
            </div>

            <CardContent className='flex flex-col gap-1 p-5'>

                <Typography className='font-bold text-3xl' component='div' variant='h5' >
                    {project.data.name}
                </Typography>

                <Typography className='font-semibold text-base text-neutral-900 dark:text-neutral-100' variant='body1'>
                    {project.data.repositories.map(repo => repo.description)}
                </Typography>

                <div className='hidden sm:flex mt-5 justify-start items-center gap-1'>
                    {
                        project.data.topics.map(topic => (
                            <Chip label={topic} className='bg-neutral-300 dark:bg-neutral-600 text-neutral-700 dark:text-blue-400' />
                        ))
                    }
                </div>

            </CardContent>

        </Card>
    )
}

export default CardProject