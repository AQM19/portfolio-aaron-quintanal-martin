'use client'

import React, { useState } from 'react'
import SideNav from '@/components/ui/sidenav/SideNav';
import MobileHeader from '@/components/ui/header/MobileHeader';
import Header from '@/components/ui/header/Header';
import Footer from '@/components/ui/footer/Footer';

export default function PortfoilLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isDarkModeEnabled, setDarkModeEnabled] = useState(true);

    return (
        <div className={`${isDarkModeEnabled ? 'dark' : 'light'} flex h-screen transition-all duration-200`}>
            <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'sm:ml-[12.5rem]' : 'sm:ml-[5rem]'} grid grid-rows-[auto_auto_1fr_auto] sm:grid-rows-[auto_1fr_auto] min-h-screen`}>
                <MobileHeader />
                <Header isDarkMode={isDarkModeEnabled} setIsDarkMode={setDarkModeEnabled} />
                <main className='bg-silver-900 dark:bg-night transition-colors duration-300'>{children}</main>
                <Footer />
            </div>
        </div>
    )
};