import { Career } from "@/core/interfaces/career/career.interface";
import { AiOutlineDotNet } from "react-icons/ai";
import { FaAngular, FaNodeJs } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { GiArtificialIntelligence } from "react-icons/gi";

export const CareerConfig: Career[] = [
    {
        empress: 'Indole Studio',
        empressImage: '/webp/indole-studio.webp',
        dateRange: new Map([
            ['es', 'Febrero 2021 - Agosto 2021'],
            ['en', 'February 2021 - August 2021']
        ]),
        description: new Map([
            ['es', 'Empecé en Índole Studio como becario tras haber hecho un cursillo de creación de páginas web. Estuve durante 7 meses en los que logré aprender las bases de la programación con JavaScript. Hasta entonces no tenía ninguna formación en lo que respecta a la programación, pero fue mi inicio como tal.'],
            ['en', 'I started at Indole Studio as an intern after taking a web development course. I spent 7 months there during which I managed to learn the basics of programming with JavaScript. Until then, I had no formal training in programming, but it was my start as such.']
        ]),
        dotIcon: FaNodeJs
    },
    {
        empress: 'DAM',
        empressImage: '/webp/ies-miguel-herrero.webp',
        dateRange: new Map([
            ['es', 'Septiembre 2021 - Marzo 2023'],
            ['en', 'September 2021 - March 2023']
        ]),
        description: new Map([
            ['es', 'Ese mismo año conseguí matricularme en el curso de Desarrollo de Aplicaciones Multiplataforma. Mientras trabajaba a media jornada por las mañanas, estudiaba por las tardes. Aquí he aprendido muchas cosas a lo largo del curso completo, gracias a excelentes profesores que tuve la suerte de tener.'],
            ['en', 'That same year I managed to enroll in the Multiplatform Application Development course. While working part-time in the mornings, I studied in the afternoons. Here I have learned many things throughout the entire course, thanks to excellent teachers that I was lucky to have.']
        ]),
        dotIcon: IoSchool
    },
    {
        empress: 'LKS Next',
        empressImage: '/webp/lks-next.webp',
        dateRange: new Map([
            ['es', 'Marzo 2023 - Junio 2023'],
            ['en', '']
        ]),
        description: new Map([
            ['es', 'Tras haber acabado el curso comencé el periodo de prácticas del instituto en LKS Next. Estuve programando con Angular en front y con .NET en el back. Aprendí muchas cosas sobre el código limpio, patrones de diseño, front-end y estructuración de proyectos y carpetas de proyecto, cosas que aplicaría más tarde en todos los ámbitos posibles.'],
            ['en', '']
        ]),
        dotIcon: AiOutlineDotNet
    },
    {
        empress: 'CEIABD',
        empressImage: '/webp/ceiabd.webp',
        dateRange: new Map([
            ['es', 'Septiembre 2023 - Junio 2024'],
            ['en', 'September 2023 - June 2024']
        ]),
        description: new Map([
            ['es', 'Además, he realizado el curso de Especialización de Inteligencia Artificial y Big Data a la vez que trabajo en CIC. Aportando mas conocimientos a mi currículum y haciendo muchos avances. Además considero que es algo necesario hoy en día con la fiebre de la IA que nos está desbordando últimamente.'],
            ['en', 'In addition, I made the Artificial Intelligence and Big Data Specialization course while working at CIC. Contributing more knowledge to my resume and making many advances. I also consider it something necessary nowadays with the fever of AI that has been overwhelming us lately.']
        ]),
        dotIcon: GiArtificialIntelligence
    },
    {
        empress: 'CIC',
        empressImage: '/webp/cic.webp',
        dateRange: new Map([
            ['es', 'Julio 2023 - Actualidad'],
            ['en', 'July 2023 - Present']
        ]),
        description: new Map([
            ['es', 'Actualmente me encuentro en CIC (Consulting Informático de Cantabria) trabajando como desarrollador junior. Aquí me ofrecen la posibilidad de desarrollarme como profesional de una manera asombrosa, ofreciendo desafíos acordes a mi nivel, proyectos interesantes en los que trabajar y, lo más importante, un equipo maravilloso con el que estar.'],
            ['en', 'I am currently at CIC (Cantabria Computer Consulting) working as a junior developer. Here they offer me the possibility to develop myself as a professional in an amazing way, offering challenges according to my level, interesting projects to work on, and, most importantly, a wonderful team to be with.']
        ]),
        dotIcon: FaAngular,
        progression: [
            {
                evaluation: new Map([
                    ['es', 'Excelente'],
                    ['en', 'Excellent']
                ]),
                position: 'Junior Developer II',
                promotionDate: new Date(2024, 2, 11)
            },
            {
                evaluation: new Map([
                    ['es', 'Excelente'],
                    ['en', 'Excellent']
                ]),
                position: 'Junior Developer VI',
                promotionDate: new Date(2024, 2, 18)
            }
        ]
    }
];