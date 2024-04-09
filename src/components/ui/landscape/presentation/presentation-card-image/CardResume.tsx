import { ubuntu } from '@/config/fonts'
import { Card } from '@mui/material'
import React from 'react'

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

            <h1
                className={`text-6xl text-neutral-900 dark:text-blue-700 text-right font-extrabold ${ubuntu.className}`}
            >Aaron Quintanal Martín</h1>
            <h2
                className={`text-3xl text-blue-700 dark:text-neutral-100 text-right font-bold ${ubuntu.className}`}
            >Full Stack Developer</h2>

            <div className='text-neutral-900 dark:text-neutral-100 max-w-prose text-lg text-pretty text-justify font-semibold'>
                <p>
                    Actualmente tengo {age} años, trabajo en <a href="https://www.cic.es/">CIC Consulting Informático de Cantabria</a> en el departamento de eficiencia energética en el proyecto de <a href="https://www.cic.es/bon0-control-gestion-analisis-y-ahorro-del-consumo-energetico/">Bon0</a> full-stack con Angular y Java.
                </p>
                <p>
                    Además por las tardes asisto al Curso de Especialización de Inteligencia Atificial y Big Data en el IES Miguel Herrero de Pereda.
                </p>
                <p>
                    Cuento con estudios de <span title='Administración de Sistemas Informáticos en Red'>ASIR</span> y de <span title='Desarrollo de Aplicaciones Multiplataforma'>DAM</span>
                </p>
            </div>

        </div>
    )
}

export default CardResume