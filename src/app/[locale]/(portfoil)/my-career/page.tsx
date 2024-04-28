import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { IoFastFood } from 'react-icons/io5';
import { MdOutlineLaptopMac } from 'react-icons/md';
import { RiHotelBedFill } from 'react-icons/ri';
import { FaRepeat } from 'react-icons/fa6';

const MyCareerPage = () => {
  return (
    <section className='w-full h-screen lg:h-auto lg:min-h-screen px-5 py-20 md:p-20 flex flex-col lg:flex-row gap-4 lg:gap-0 '>

      <Timeline position='alternate'>

        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            9:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <IoFastFood size={30}/>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Eat
            </Typography>
            <Typography>Because you need strength</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
          >
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <MdOutlineLaptopMac size={30}/>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Code
            </Typography>
            <Typography>Because it&apos;s awesome!</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <RiHotelBedFill size={30}/>
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Sleep
            </Typography>
            <Typography>Because you need rest</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot color="secondary">
              <FaRepeat size={30}/>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Repeat
            </Typography>
            <Typography>Because this is the life you love!</Typography>
          </TimelineContent>
        </TimelineItem>
        
      </Timeline>

    </section>
  )
}

export default MyCareerPage