import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
    params: {
        id: string;
    }
}

const ProjectPage = ({ params }: Props) => {

    const { id } = params;

    if (id === '0') {
        notFound();
    }

    return (
        <h1>ProjectPage {id}</h1>
    )
}

export default ProjectPage