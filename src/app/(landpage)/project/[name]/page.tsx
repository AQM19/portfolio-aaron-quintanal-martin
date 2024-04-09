import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: {
        name: string;
    }
}

const ProjectPage = ({ params }: Props) => {

    const { name } = params;

    if (name === '') {
        notFound();
    }

    return (
        <div className='h-screen flex items-center justify-center'>
            <h1>ProjectPage {name}</h1>
        </div>
    )
}

export default ProjectPage