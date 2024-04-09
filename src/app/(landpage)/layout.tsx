'use client'

import React from 'react'
import { TopMenu } from '../../components/ui/top-menu/TopMenu';
import { useUIDarkMode } from '@/store/ui/ui-store';
import SideRSS from '@/components/ui/side-rss/SideRSS';
import Footer from '@/components/ui/footer/Footer';

const PortfoilLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (
        <main className={`min-h-screen ${isDarkModeEnabled && 'dark'}`}>
            <TopMenu />
            <SideRSS />
            {children}
            <Footer />
        </main>
    )
}

export default PortfoilLayout