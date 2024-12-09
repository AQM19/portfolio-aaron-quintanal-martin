'use client'

import React, { useState } from 'react'
import SideNav from '@/components/ui/sidenav/SideNav';
import MobileHeader from '@/components/ui/header/MobileHeader';
import Header from '@/components/ui/header/Header';

export default function PortfoilLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const [isExpanded, setIsExpanded] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className={`${isDarkMode ? 'dark' : 'light'} flex h-screen`}>
            <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className={`flex-1 transition-all duration-500 ${isExpanded ? 'sm:ml-[12.5rem]' : 'sm:ml-[5rem]'} grid grid-rows-[auto_auto_1fr_auto] sm:grid-rows-[auto_1fr_auto] min-h-screen`}>
                <MobileHeader />
                <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                <main>{children}</main>
                <footer>FOOTER</footer>
            </div>
        </div>
    )
};