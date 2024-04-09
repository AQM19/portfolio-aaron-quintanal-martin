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
            className='min-w-full min-h-full md:max-w-[350px] lg:max-w-[450px] bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-blue-700 opacity-90 rounded-2xl project-card transition-all duration-200 cursor-pointer'
            elevation={5}
            onClick={goToProjectPage}
        >

            <div className='flex justify-center items-center h-[150px] lg:h-[200px] lg:min-h-[200px]'>
                <CardMedia
                    component='img'
                    image={project.data.image}
                    className='max-h-full w-auto'
                    alt={project.data.name}
                />
            </div>

            <CardContent className='flex flex-col gap-1 p-5'>

                <Typography className='font-bold text-xl md:text-3xl' component='div' variant='h5' >
                    {project.data.name}
                </Typography>

                <div className='hidden overflow-auto md:flex mt-5 justify-start items-center gap-1'>
                    {
                        project.data.topics.map((topic) => (
                            <Chip label={topic} className='bg-neutral-300 dark:bg-neutral-600 text-neutral-700 dark:text-blue-400' />
                        ))
                    }
                </div>

            </CardContent>

        </Card>
    )
}

export default CardProject