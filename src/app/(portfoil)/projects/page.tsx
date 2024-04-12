'use client'

import { getRepos } from '@/actions/github/get-github-repos/retrieve-list-user-repos.action'
import { GithubGroupedRepositoryList } from '@/interfaces/github/github-grouped-repository-list.interface';
import React, { useEffect, useState } from 'react'

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
        <>

            {
                repos.map((group, index) => (

                    <div key={index}>
                        <h1>{group.name}</h1>
                        <h2>{index}</h2>
                    </div>
                )
                )}

        </>
    )
}

export default ProjectsPage