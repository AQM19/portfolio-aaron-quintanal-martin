'use client'

import React from 'react'
import SideRSS from '@/components/ui/side-rss/SideRSS';
import { useUIDarkMode } from '@/core/services/ui/dark-mode.service';
import { TopMenu } from '@/components';
import Sidebar from '@/components/ui/sidebar/Sidebar';
import Footer from '@/components/ui/footer/Footer';

const PortfoilLayout = ({ children, params: { locale } }: Readonly<{ children: React.ReactNode; params: { locale: string }; }>) => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (
        <main className={`${isDarkModeEnabled ? 'dark' : 'light'} min-h-screen bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200`}>
            <TopMenu />
            <SideRSS />
            <Sidebar />
            {children}
            <Footer />
        </main>
    )
}

export default PortfoilLayout