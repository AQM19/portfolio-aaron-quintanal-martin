'use client'

import React, { useEffect, useRef } from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { FaCaretDown, FaUserNinja } from 'react-icons/fa6';
import { useMediaQuery } from '@mui/material';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useLocale } from 'next-intl';
import { MyCareerLangMap } from '@/config/my-career/my-career.lang.map';
import Image from 'next/image';

const MyCareerPage = () => {

  const isMobile = useMediaQuery('(max-width:600px)');
  const localeActive = useLocale();
  const myCareer = MyCareerLangMap[localeActive];
  const timelineRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {

        const elementIndex = elementNumberMap.get(entry.target as HTMLElement)!;

        if (entry.isIntersecting) {
          const classToAdd = isMobile ? "slide-in-left" : elementIndex % 2 !== 0 ? "slide-in-right" : "slide-in-left";
          entry.target.classList.add(classToAdd);
        }

      });
    };

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
    const elementNumberMap = new Map<Element, number>();

    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.card');
      items.forEach((item, index) => {
        elementNumberMap.set(item, index + 1);
        observer.observe(item)
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <section className='w-full h-auto lg:h-auto lg:min-h-screen py-20 md:p-20'>

      {
        !isMobile && (
          <Timeline position='alternate' ref={timelineRef}>

            {/* Escondido */}
            <TimelineItem className='hidden'>
              <TimelineOppositeContent>
                <FaUserNinja size={30} />
              </TimelineOppositeContent>
            </TimelineItem>
            {/* Escondido */}

            {
              myCareer.map((value, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent
                    className='mx-0 my-auto text-[#441006] dark:text-[#d2e4ff]'
                    variant="body2"
                  >
                    {value.dateRange}
                  </TimelineOppositeContent>

                  <TimelineSeparator>
                    <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                    <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]'>
                      <value.dotIcon size={30} />
                    </TimelineDot>
                    <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                  </TimelineSeparator>

                  <TimelineContent
                    className={`py-3 px-4 opacity-0 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25] card`}>
                    <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                      {value.empress}
                    </Typography>

                    <div className='h-60 w-full relative overflow-hidden'>
                      <Image src={value.empressImage} loading='lazy' className='w-full h-auto absolute top-1/2 -translate-y-1/2 object-cover' alt={'Foto de la empresa'} />
                    </div>

                    <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                      {value.description}
                    </p>

                    {
                      value.progression && (
                        value.progression.map((prog, indexProg) => (
                          <Accordion key={indexProg} className='w-full bg-transparent'>
                            <AccordionSummary
                              expandIcon={<FaCaretDown />}
                              aria-controls="panel1-content"
                              id={indexProg.toString()}
                            >
                              <Typography className='text-[#ed4709] dark:text-[#e2b5fd]'>{prog.promotionDate.toLocaleDateString()}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography className='text-[#441006] dark:text-[#d2e4ff]'>
                                <span className='font-extrabold text-[#441006] dark:text-[#d2e4ff]'>Evaluación:</span> {prog.evaluation}
                              </Typography>
                              <Typography className='text-[#441006] dark:text-[#d2e4ff]'>
                                <span className='font-extrabold text-[#441006] dark:text-[#d2e4ff]'>Nuevo puesto:</span> {prog.position}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        ))
                      )
                    }

                  </TimelineContent>
                </TimelineItem>
              ))
            }

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
            ref={timelineRef}
          >

            {
              myCareer.map((value, index) => (

                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                    <TimelineDot className='bg-[#ed4709] dark:bg-[#e2b5fd] dark:text-[#030637]' >
                      <value.dotIcon size={20} />
                    </TimelineDot>
                    <TimelineConnector className='bg-[#ed4709] dark:bg-[#e2b5fd]' />
                  </TimelineSeparator>

                  <TimelineContent
                    className={`py-3 px-2 my-2 opacity-0 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25] card`}>
                    <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                      {value.empress}
                    </Typography>

                    <Typography variant='body2' component='div' className='text-[#441006] dark:text-[#d2e4ff]'>
                      {value.dateRange}
                    </Typography>

                    <div className='h-60 w-full relative overflow-hidden'>
                      <Image src={value.empressImage} loading='lazy' className='w-full h-auto absolute top-1/2 -translate-y-1/2 object-cover' alt={'Foto de la empresa'} />
                    </div>

                    <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                      {value.description}
                    </p>

                    {
                      value.progression && (
                        value.progression.map((prog, indexProg) => (
                          <Accordion key={indexProg} className='w-full bg-transparent'>
                            <AccordionSummary
                              expandIcon={<FaCaretDown />}
                              aria-controls="panel1-content"
                              id={indexProg.toString()}
                            >
                              <Typography className='text-[#ed4709] dark:text-[#e2b5fd]'>{prog.promotionDate.toLocaleDateString()}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography className='text-[#441006] dark:text-[#d2e4ff]'>
                                <span className='font-extrabold text-[#441006] dark:text-[#d2e4ff]'>Evaluación:</span> {prog.evaluation}
                              </Typography>
                              <Typography className='text-[#441006] dark:text-[#d2e4ff]'>
                                <span className='font-extrabold text-[#441006] dark:text-[#d2e4ff]'>Nuevo puesto:</span> {prog.position}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        ))
                      )
                    }

                  </TimelineContent>
                </TimelineItem>

              ))
            }


          </Timeline>
        )
      }


    </section >
  )
}

export default MyCareerPage