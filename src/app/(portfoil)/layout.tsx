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
            {children}
        </main>
    )
}

export default PortfoilLayout