'use client'

import React, { useEffect, useState } from 'react'

import ProjectCard from '@/components/projects/project-card/ProjectCard';

import { GithubGroupedRepositoryList } from '@/interfaces/github/github-grouped-repository-list.interface';

import { getRepos } from '@/actions/github/get-github-repos/retrieve-list-user-repos.action'

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