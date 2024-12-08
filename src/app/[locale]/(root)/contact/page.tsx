'use client'

import { AiOutlinePhone } from 'react-icons/ai'
import { IoMailOutline } from 'react-icons/io5'
import { kanit } from '@/core/config/fonts/fonts'
import { useTranslations } from 'next-intl'
import ContactForm from '@/components/contact/contact-form'
import React, { useCallback, useEffect } from 'react'
import Typography from '@mui/material/Typography/Typography'
import { useUILoading } from '@/core/services/ui/loading.service'

const ContactPage = () => {

    const t = useTranslations("Contact");

    const setIsLoaded = useUILoading(state => state.setIsLoaded);
    const loadPage = useCallback(async () => {
        await Promise.resolve();
        setIsLoaded();
    }, [setIsLoaded]);
    
    useEffect(() => {
        loadPage();
    }, [loadPage]);

    return (
        <section className='w-full px-5 pt-28 flex flex-col lg:flex-row gap-4 lg:gap-0 justify-around items-center'>

            <div className='flex flex-col gap-4 w-full lg:w-1/3'>

                <Typography variant='h5' className='text-[#ed4709] dark:text-[#e2b5fd]'>
                    {t("title")}
                </Typography>

                <p className={`text-pretty text-[#441006] dark:text-[#d2e4ff] font-thin ${kanit.className} max-w-prose text-justify`}>
                    {t("description")}
                    <br />
                    {t("question")}
                    <br />
                    <span className='text-[#ed4709] dark:text-[#e2b5fd]'>{t("hook")}</span>
                </p>

                <div className={`text-[#441006] dark:text-[#d2e4ff] font-thin ${kanit.className}`}>
                    <span className='flex flex-row gap-2 my-2'>
                        <IoMailOutline size={30} />
                        <a href="mailto:aquintanalm.dev@gmail.com">aquintanalm.dev@gmail.com</a>
                    </span>

                    <span className='flex flex-row gap-2 mt-4'>
                        <AiOutlinePhone size={30} />
                        <a href="tel:+34635-770-481">635 770 481</a>
                    </span>
                </div>
            </div>

            <div className='flex flex-col gap-4 w-full lg:w-1/2 rounded bg-[#44100625] dark:bg-[#d2e4ff25] p-5 md:p-10'>

                <Typography variant='h4' className='text-[#ed4709] dark:text-[#e2b5fd] text-xl'>
                    {t("form title")}
                </Typography>

                <ContactForm />

            </div>

        </section>
    )
}

export default ContactPage
