import { Card, CardMedia } from '@mui/material'
import React from 'react'

const CardImage = () => {
    return (

        <Card
            className='h-[550px] w-[500px] bg-neutral-100 dark:bg-neutral-900 opacity-75 rounded-md'
            elevation={5}
        >

            <CardMedia
                component='img'
                image='hola'
                className='max-h-full w-auto'
                alt='Imagen de Aarón Quintanal Martín'
            />

        </Card>
    )
}

export default CardImage