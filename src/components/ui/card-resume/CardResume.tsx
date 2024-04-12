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

            <Typography variant='h5' className='text-[#ed4709] dark:text-[#e2b5fd]'>
                ¡Hola!,  soy
            </Typography>

            <h1
                className={`text-4xl md:text-6xl text-[#441006] dark:text-[#d2e4ff] font-thin ${kanit.className}`}
            >
                Aaron Quintanal Martín
            </h1>

            <ChangingText />

            <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty text-justify font-semibold'>
                Tengo {age} años, residente de España. Como desarrollador full stack me inicié en el mundo de la programación en 2020 y ahora es mi vida.
                Compaginando trabajo y estudios me mantengo en contínua formación para mejorar como desarrollador.
                <br />
                Aquí presento mi portfolio que poco a poco irá teniendo cambios y mejoras. Mi sitio web por excelencia.
            </p>

            <button className='lg:self-end mt-5 w-min px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                Contacto
            </button>

        </div>
    )
}

export default CardResume