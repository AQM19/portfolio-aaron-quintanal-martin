'use client'

import React from 'react'
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store';
import { TopMenu } from '@/components';
import Sidebar from '@/components/ui/sidebar/Sidebar';

const PortfoilLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (
        <body className={`${isDarkModeEnabled ? 'dark' : 'light'}`}>
            <TopMenu />
            <Sidebar />
            <main className='bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200'>
                {children}
            </main>
        </body>
    )
}

export default PortfoilLayout