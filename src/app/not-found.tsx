'use client'

import SideRSS from '@/components/ui/side-rss/SideRSS';
import Sidebar from '@/components/ui/sidebar/Sidebar';
import { TopMenu } from '@/components/ui/top-menu/TopMenu';
import { kanit } from '@/config/fonts';
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store';
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (

        <main className={`${isDarkModeEnabled ? 'dark' : 'light'}`}>
            <TopMenu />
            <SideRSS />
            <Sidebar />
            <section className='w-full h-screen flex flex-col p-5 items-center justify-evenly bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200'>

                <img
                    src="/imgs/png/404-not-found-cat.webp"
                    alt="Imagen de Aarón Quintanal Martín"
                />

                <div className='text-center'>
                    <h1 className={`${kanit.className} text-4xl md:text-6xl text-[#ed4709] dark:text-[#e2b5fd] font-thin`}>¡Ha habido un problema!</h1>
                    <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                        Parece ser que bigotitos ha eliminado esta página
                    </p>

                    <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                        Por tanto tienes que volver <Link href={'/'} className='text-[#ed4709] dark:text-[#e2b5fd]'>al inicio</Link>. Disculpa las molestias.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default NotFoundPage