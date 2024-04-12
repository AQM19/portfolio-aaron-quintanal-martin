'use client'

import React from 'react'
import { TopMenu } from '../../components/ui/top-menu/TopMenu';
import SideRSS from '@/components/ui/side-rss/SideRSS';
import Sidebar from '../../components/ui/sidebar/Sidebar';
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store';

const PortfoilLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (
        <main className={`min-h-screen ${isDarkModeEnabled && 'dark'}`}>
            <TopMenu />
            <SideRSS />
            <Sidebar />
            <section className='w-full h-screen bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] flex flex-col-reverse lg:flex-row p-5 items-center justify-evenly transition-all duration-200'>
                {children}
            </section>
        </main>
    )
}

export default PortfoilLayout