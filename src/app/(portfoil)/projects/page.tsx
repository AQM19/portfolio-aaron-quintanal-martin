'use client'

import { getRepos } from '@/actions/github/get-github-repos/retrieve-list-user-repos.action'
import { GithubGroupedRepositoryList } from '@/interfaces/github/github-grouped-repository-list.interface';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { IoMdShare } from 'react-icons/io';

const ProjectsPage = () => {

    const [repos, setRepos] = useState<GithubGroupedRepositoryList[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const repositorios = await getRepos();
                setRepos(repositorios);
            } catch (error) {
                console.error('Error al obtener repositorios:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className='w-full min-h-screen py-20 px-12 flex flex-wrap gap-4 items-center justify-center'>

            {
                repos.map((group, index) => (
                    <article
                        key={index}
                        className='min-w-full sm:min-w-[520px] sm:min-h-[600px] max-w-lg bg-neutral-50 dark:bg-[#3C0753] rounded-lg flex flex-col gap-4 transition-all hover:scale-110 duration-200 shadow-lg shadow-[#441006] dark:shadow-[#e2b5fd] overflow-hidden cursor-pointer'>

                        <img
                            src={`/imgs/project-icons/${group.name}-icon.svg`}
                            alt={group.name}
                            className='max-h-52 w-full object-cover'
                        />

                        <div className='flex flex-col gap-4 p-5'>
                            <h5
                                className='font-bold text-3xl text-[#ed4709] dark:text-[#e2b5fd] text-center sm:text-start'>
                                {group.name}
                            </h5>

                            <p
                                className='hidden sm:block text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty text-justify font-semibold'>
                                {group.description}
                            </p>

                        </div>

                        <div className='flex-grow'></div>

                        <div className='hidden px-5 pb-5 md:flex flex-row flex-wrap gap-4 items-center justify-center md:justify-start'>
                            <button
                                className='hidden md:block w-auto px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                                Saber mas
                            </button>

                            <div className='hidden md:block flex-grow'></div>

                            <button>
                                <IoMdShare size={30} className='text-[#ed4709] dark:text-[#e2b5fd]' />
                            </button>
                        </div>

                    </article>

                ))
            }
        </section >
    )
}

export default ProjectsPage