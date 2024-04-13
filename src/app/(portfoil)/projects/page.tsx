'use client'

import { getRepos } from '@/actions/github/get-github-repos/retrieve-list-user-repos.action'
import { GithubGroupedRepositoryList } from '@/interfaces/github/github-grouped-repository-list.interface';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { IoMdShare } from 'react-icons/io';
import ProjectCard from '@/components/projects/project-card/ProjectCard';

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
                    <ProjectCard project={group} index={index} />
                ))
            }
        </section >
    )
}

export default ProjectsPage