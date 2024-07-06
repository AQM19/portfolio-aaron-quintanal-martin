'use client'

import { Button, Typography } from '@mui/material'
import ChangingText from '../changing-text/ChangingText';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { TbFileCv } from "react-icons/tb";
import { kanit } from '@/config/fonts/fonts';
import { Paths } from '@/config';

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

    const t = useTranslations("Index");

    return (
        <div
            className='p-5 rounded-sm flex flex-col gap-4'
        >

            <Typography variant='h5' className='text-[#ed4709] dark:text-[#e2b5fd]'>
                {t('hello')}
            </Typography>

            <h1
                className={`text-4xl md:text-6xl text-[#441006] dark:text-[#d2e4ff] font-thin ${kanit.className}`}
            >
                Aaron Quintanal Martín
            </h1>

            <ChangingText />

            <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty text-justify font-semibold'>
                {t('I have')} {age} {t('first-part-presentation')}
                <br />
                {t('second-part-presentation')}
            </p>

            <div className='flex flex-row gap-4'>
                <Link href={Paths.CONTACT} >
                    <button
                        className='lg:self-end mt-5 w-min px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                        {t('contact-button')}
                    </button>
                </Link>

                <Link
                    href={'https://drive.google.com/file/d/1_MioP4l1znzu5KJEVtSKWAayt7icYa2x/view'}
                    target='_blank'
                >
                    <button className='flex flex-row lg:self-end mt-5 px-5 py-2 rounded-md text-[#fff6ed] dark:text-[#030637] bg-[#ed4709] dark:bg-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                        <TbFileCv className="mr-2" size={24} />
                        {t('download-cv')}
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default CardResume