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
import { myCareerConfig } from '@/config/my-career/my-career.config';


const MyCareerPage = () => {

  const isMobile = useMediaQuery('(max-width:600px)');
  const myCareer = myCareerConfig;

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

                  <TimelineContent className='py-3 px-4 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                    <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                      {value.empress}
                    </Typography>

                    <div className={`${value.empressImage} bg-center bg-cover bg-no-repeat h-60 w-full`}></div>

                    <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                      {value.description}
                    </p>

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

                  <TimelineContent className='py-3 px-2 my-2 flex flex-col items-center gap-3 rounded bg-[#44100625] dark:bg-[#d2e4ff25]'>
                    <Typography variant="h6" component="span" className='text-[#ed4709] dark:text-[#e2b5fd] text-3xl'>
                      {value.empress}
                    </Typography>

                    <Typography variant='body2' component='div' className='text-[#441006] dark:text-[#d2e4ff]'>
                      {value.dateRange}
                    </Typography>

                    {/* <div className={`${value.empressImage} bg-center bg-cover bg-no-repeat h-60 w-full`}></div> */}

                    <p className='self-start text-[#441006] dark:text-[#d2e4ff] text-pretty text-justify'>
                      {value.description}
                    </p>

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