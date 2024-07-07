'use client'

import React from 'react'
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store';
import { TopMenu } from '@/components';
import Sidebar from '@/components/ui/sidebar/Sidebar';
import Footer from '@/components/ui/footer/Footer';

const PortfoilLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (
        <main>
            <TopMenu />
            <Sidebar />
            <div className={`${isDarkModeEnabled ? 'dark' : 'light'} min-h-screen bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200`}>
                {children}
            </div>
            <Footer />
        </main >
    )
}

export default PortfoilLayout