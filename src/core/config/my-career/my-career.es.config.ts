import { MyCareer } from "@/core/interfaces/my-career/career.interface";
import { FaNodeJs } from "react-icons/fa6";
import { IoLogoAngular, IoSchool } from "react-icons/io5";
import { SiCsharp } from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";

export const myCareerEsConfig: MyCareer[] = [
    {
        dateRange: 'Febrero 2021 - Agosto 2021',
        dotIcon: FaNodeJs,
        empress: 'Indole Studio',
        empressImage: 'https://www.indole.es/ext/r/oxo-1221/soacial-share-image-indole.jpg',
        description: `Empecé en Índole Studio como becario tras haber hecho un cursillo de creación de páginas web.
        Estuve durante 7 meses en los que logré aprender las bases de la programación con JavaScript. Hasta entonces no tenía ninguna formación
        en lo que respecta a la programación, pero fue mi inicio como tal.`
    },
    {
        dateRange: 'Septiembre 2021 - Marzo 2023',
        dotIcon: IoSchool,
        empress: 'DAM',
        empressImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Iesmph_entrada.JPG',
        description: `Ese mismo año conseguí matricularme en el curso de Desarrollo de Aplicaciones Multiplataforma. Mientras trabajaba a media jornada por las
        mañanas, estudiaba por las tardes. Aquí he aprendido muchas cosas a lo largo del curso completo, gracias a excelentes profesores que
        tuve la suerte de tener.`
    },
    {
        dateRange: 'Marzo 2023 - Junio 2023',
        dotIcon: SiCsharp,
        empress: 'LKS Next',
        empressImage: 'https://img.youtube.com/vi/DkrDadvthu8/hqdefault.jpg',
        description: `Tras haber acabado el curso comencé el periodo de prácticas del instituto en LKS Next. Estuve programando con Angular en front y con
        .NET en el back. Aprendí muchas cosas sobre el código limpio, patrones de diseño, front-end y estructuración de proyectos y carpetas
        de proyecto, cosas que aplicaría más tarde en todos los ámbitos posibles.`
    },
    {
        dateRange: 'Julio 2023 - Actualidad',
        dotIcon: IoLogoAngular,
        empress: 'CIC',
        empressImage: 'https://static.smartgridsinfo.es/media/2020/03/edificio-santander-cic-consulting-informatico.png',
        description: `Actualmente me encuentro en CIC (Consulting Informático de Cantabria) trabajando como desarrollador junior. Aquí me ofrecen la
        posibilidad de desarrollarme como profesional de una manera asombrosa, ofreciendo desafíos acordes a mi nivel, proyectos
        interesantes en los que trabajar y, lo más importante, un equipo maravilloso con el que estar.`,
        progression: [
            {
                promotionDate: new Date(2024, 1, 11),
                position: 'Junior Developer II',
                evaluation: 'Excelente'
            },
            {
                promotionDate: new Date(2024, 1, 18),
                position: 'Junior Developer IV',
                evaluation: 'Excelente'
            }
        ]
    },
    {
        dateRange: 'Septiembre 2023 - Actualidad',
        dotIcon: GiArtificialIntelligence,
        empress: 'CEIABD',
        empressImage: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2022/04/17/625c8a30eea74.r_d.487-342-0.jpeg',
        description: `Además, estoy realizando el curso de Especialización de Inteligencia Artificial y Big Data a la vez que trabajo en CIC. Aportando
        mas conocimientos a mi currículum y haciendo muchos avances. Además considero que es algo necesario hoy en día con la fiebre de la IA que
        nos está desbordando últimamente.`
    }
]