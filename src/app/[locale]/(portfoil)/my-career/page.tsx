'use client'

import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { IoLogoAngular, IoSchool } from 'react-icons/io5';
import { FaNodeJs, FaUserNinja } from 'react-icons/fa6';
import { SiCsharp } from "react-icons/si";
import { useMediaQuery } from '@mui/material';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';


const MyCareerPage = () => {

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <section className='w-full h-auto lg:h-auto lg:min-h-screen py-20 md:p-20'>

      {
        !isMobile && (
          <Timeline position='alternate'>

            {/* Escondido */}
            <TimelineItem className='hidden'>
              <TimelineOppositeContent>
                <FaUserNinja size={30} />
              </TimelineOppositeContent>
            </TimelineItem>
            {/* Escondido */}

            <TimelineItem>
              <TimelineOppositeContent
                className='mx-0 my-auto text-[#441006] dark:text-[#d2e4ff]'
                variant="body2"
              >
                Febrero 2021 - Agosto 2021
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]'>
                  <FaNodeJs size={30} />
                </TimelineDot>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
              </TimelineSeparator>

              <TimelineContent className='py-3 px-4 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                  Indole Studio
                </Typography>

                <div className='bg-[url("https://www.indole.es/ext/r/oxo-1221/soacial-share-image-indole.jpg")] bg-center bg-cover bg-no-repeat h-60 w-full'></div>

                <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                  Empecé en Índole Studio como becario tras haber hecho un cursillo de creación de páginas web.
                  Estuve durante 7 meses en los que logré aprender las bases de la programación con JavaScript. Hasta entonces no tenía ninguna formación
                  en lo que respecta a la programación, pero fue mi inicio como tal.
                </p>

              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent
                className='mx-0 my-auto text-[#441006] dark:text-[#d2e4ff]'
                variant="body2"
              >
                Septiembre 2021 - Marzo 2023
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]'>
                  <IoSchool size={30} />
                </TimelineDot>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
              </TimelineSeparator>

              <TimelineContent className='py-3 px-4 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                  DAM
                </Typography>

                <div className='bg-[url("https://upload.wikimedia.org/wikipedia/commons/a/a7/Iesmph_entrada.JPG")] bg-center bg-cover bg-no-repeat h-60 w-full'></div>

                <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                  Ese mismo año conseguí matricularme en el curso de Desarrollo de Aplicaciones Multiplataforma. Mientras trabajaba a media jornada por las
                  mañanas, estudiaba por las tardes. Aquí he aprendido muchas cosas a lo largo del curso completo, gracias a excelentes profesores que
                  tuve la suerte de tener
                </p>

              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent
                className='mx-0 my-auto text-[#441006] dark:text-[#d2e4ff]'
                variant="body2"
              >
                Marzo 2023 - Junio 2023
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]'>
                  <SiCsharp size={30} />
                </TimelineDot>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
              </TimelineSeparator>

              <TimelineContent className='py-3 px-4 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                  LKS Next
                </Typography>

                <div className='bg-[url("https://img.youtube.com/vi/DkrDadvthu8/hqdefault.jpg")] bg-cover bg-center bg-no-repeat h-60 w-full'></div>

                <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                  Tras haber acabado el curso comencé el periodo de prácticas del instituto en LKS Next. Estuve programando con Angular en front y con
                  .NET en el back. Aprendí muchas cosas sobre el código limpio, patrones de diseño, front-end y estructuración de proyectos y carpetas
                  de proyecto, cosas que aplicaría más tarde en todos los ámbitos posibles
                </p>

              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent
                className='mx-0 my-auto text-[#441006] dark:text-[#d2e4ff]'
                variant="body2"
              >
                Julio 2023 - Actualidad
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]'>
                  <IoLogoAngular size={30} />
                </TimelineDot>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
              </TimelineSeparator>

              <TimelineContent className='py-3 px-4 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                  CIC
                </Typography>

                <div className='bg-[url("https://static.smartgridsinfo.es/media/2020/03/edificio-santander-cic-consulting-informatico.png")] bg-center bg-cover bg-no-repeat h-60 w-full'></div>

                <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                  Actualmente me encuentro en CIC (Consulting Informático de Cantabria) trabajando como desarrollador junior. Aquí me ofrecen la
                  posibilidad de desarrollarme como profesional de una manera asombrosa, ofreciendo desafíos acordes a mi nivel, proyectos
                  interesantes en los que trabajar y, lo más importante, un equipo maravilloso con el que estar
                </p>

              </TimelineContent>
            </TimelineItem>

          </Timeline>
        )
      }

      {
        isMobile && (
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}

          // className='flex flex-col gap-4'
          >

            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]' >
                  <FaNodeJs size={20} />
                </TimelineDot>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
              </TimelineSeparator>

              <TimelineContent className='py-3 px-2 my-2 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                  Indole Studio
                </Typography>

                <Typography variant='body2' component='div' className='text-[#441006] dark:text-[#d2e4ff]'>
                  Febrero 2021 - Agosto 2021
                </Typography>

                <div className='bg-[url("https://www.indole.es/ext/r/oxo-1221/soacial-share-image-indole.jpg")] bg-center bg-cover bg-no-repeat h-60 w-full'></div>

                <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                  Empecé en Índole Studio como becario tras haber hecho un cursillo de creación de páginas web.
                  Estuve durante 7 meses en los que logré aprender las bases de la programación con JavaScript. Hasta entonces no tenía ninguna formación
                  en lo que respecta a la programación, pero fue mi inicio como tal.
                </p>

              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]'>
                  <IoSchool size={20} />
                </TimelineDot>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
              </TimelineSeparator>

              <TimelineContent className='py-3 px-4 my-2 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                  DAM
                </Typography>

                <Typography variant='body2' component='div' className='text-[#441006] dark:text-[#d2e4ff]'>
                  Septiembre 2021 - Marzo 2023
                </Typography>

                <div className='bg-[url("https://upload.wikimedia.org/wikipedia/commons/a/a7/Iesmph_entrada.JPG")] bg-center bg-cover bg-no-repeat h-60 w-full'></div>

                <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                  Ese mismo año conseguí matricularme en el curso de Desarrollo de Aplicaciones Multiplataforma. Mientras trabajaba a media jornada por las
                  mañanas, estudiaba por las tardes. Aquí he aprendido muchas cosas a lo largo del curso completo, gracias a excelentes profesores que
                  tuve la suerte de tener
                </p>

              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]'>
                  <SiCsharp size={20} />
                </TimelineDot>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
              </TimelineSeparator>

              <TimelineContent className='py-3 px-4 my-2 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                  LKS Next
                </Typography>

                <Typography variant='body2' component='div' className='text-[#441006] dark:text-[#d2e4ff]'>
                  Marzo 2023 - Junio 2023
                </Typography>

                <div className='bg-[url("https://img.youtube.com/vi/DkrDadvthu8/hqdefault.jpg")] bg-cover bg-center bg-no-repeat h-60 w-full'></div>

                <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                  Tras haber acabado el curso comencé el periodo de prácticas del instituto en LKS Next. Estuve programando con Angular en front y con
                  .NET en el back. Aprendí muchas cosas sobre el código limpio, patrones de diseño, front-end y estructuración de proyectos y carpetas
                  de proyecto, cosas que aplicaría más tarde en todos los ámbitos posibles
                </p>

              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]'>
                  <IoLogoAngular size={20} />
                </TimelineDot>
                <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
              </TimelineSeparator>

              <TimelineContent className='py-3 px-4 my-2 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                  CIC
                </Typography>

                <Typography variant='body2' component='div' className='text-[#441006] dark:text-[#d2e4ff]'>
                  Julio 2023 - Actualidad
                </Typography>

                <div className='bg-[url("https://static.smartgridsinfo.es/media/2020/03/edificio-santander-cic-consulting-informatico.png")] bg-center bg-cover bg-no-repeat h-60 w-full'></div>

                <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                  Actualmente me encuentro en CIC (Consulting Informático de Cantabria) trabajando como desarrollador junior. Aquí me ofrecen la
                  posibilidad de desarrollarme como profesional de una manera asombrosa, ofreciendo desafíos acordes a mi nivel, proyectos
                  interesantes en los que trabajar y, lo más importante, un equipo maravilloso con el que estar
                </p>

              </TimelineContent>
            </TimelineItem>


          </Timeline>
        )
      }


    </section >
  )
}

export default MyCareerPage