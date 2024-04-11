'use client'

import React from 'react'
import { TopMenu } from '../../components/ui/top-menu/TopMenu';
import { useUIDarkMode } from '@/store/ui/ui-store';
import SideRSS from '@/components/ui/side-rss/SideRSS';

const PortfoilLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (
        <main className={`min-h-screen ${isDarkModeEnabled && 'dark'}`}>
            <TopMenu />
            <SideRSS />
            {children}
        </main>
    )
}

export default PortfoilLayout