'use client'

import { kanit } from '@/config/fonts';
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store';
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode); // Para cambiar la imagen del gato
    const t = useTranslations("Not Found");

    return (
        <section className={`w-full h-screen flex flex-col p-5 items-center justify-evenly bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200`}>

            <img
                src="/webp/404-not-found-cat.webp"
                alt={t("image alt")}
            />

            <div className='text-center'>
                <h1 className={`${kanit.className} text-4xl md:text-6xl text-[#ed4709] dark:text-[#e2b5fd] font-thin`}>
                    {t("oopsie")}
                </h1>
                <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                    {t("cat problem")}
                </p>

                <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                    {t("go back")} <Link href={'/'} className='text-[#ed4709] dark:text-[#e2b5fd]'>{t("index")}</Link> {t("sorry")}
                </p>
            </div>
        </section>
    )
}

export default NotFoundPage