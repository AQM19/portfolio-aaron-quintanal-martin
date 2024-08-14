'use client'

import React, { useCallback, useEffect } from 'react'
import { GridProject } from '@/interfaces';
import ProjectCard from '../project-card/ProjectCard';
import { useUILoading } from '@/store/ui/ui-loading.store';

interface Props {
    projects: GridProject[]
}

const ProjectGrid = ({ projects }: Props) => {

    const setIsLoaded = useUILoading(state => state.setIsLoaded);
    const loadPage = useCallback(async () => {
        await Promise.resolve();
        setIsLoaded();
    }, [setIsLoaded]);

    useEffect(() => {
        loadPage();
    }, [loadPage]);

    return (
        <div className='flex flex-wrap gap-4 items-center justify-center'>
            {
                projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))
            }
        </div>
    )
}

export default ProjectGrid