'use client'

import { kanit } from '@/config/fonts'
import { Typography } from '@mui/material'
import ChangingText from '../changing-text/ChangingText';

// Obtener edad dinámicamente
const birthDate: Date = new Date(1996, 2, 15);
const currentDate: Date = new Date();

const birthMonth = birthDate.getMonth();
const currentMonth = currentDate.getMonth();

let age = currentDate.getFullYear() - birthDate.getFullYear();

if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
    age--;
}
// Obtener edad dinámicamente

const CardResume = () => {

    return (
        <div
            className='p-5 rounded-sm flex flex-col gap-4'
        >

            <Typography variant='h5' className='text-neutral-800 dark:text-[#FFC491]'>
                ¡Hola!,  soy
            </Typography>

            <h1
                className={`text-6xl text-neutral-800 dark:text-neutral-200 font-thin ${kanit.className}`}
            >
                Aaron Quintanal Martín
            </h1>

            <ChangingText />

            <div className='mt-5 text-neutral-900 dark:text-neutral-100 max-w-prose text-lg text-pretty text-justify font-semibold'>
                Tengo {age} años, residente de España
            </div>

        </div>
    )
}

export default CardResume