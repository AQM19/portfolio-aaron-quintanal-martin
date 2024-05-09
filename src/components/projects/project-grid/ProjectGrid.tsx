import React from 'react'

import { GridProject } from '@/interfaces';
import ProjectCard from '../project-card/ProjectCard';

interface Props {
    projects: GridProject[]
}

const ProjectGrid = ({ projects }: Props) => {
    return (
        <div className='flex flex-wrap gap-4 items-center justify-center'>
            {
                projects.map((project, index) => (
                    <ProjectCard project={project} index={index} />
                ))
            }
        </div>
    )
}

export default ProjectGrid