'use client'

import Footer from '@/components/ui/footer/Footer';
import Header from '@/components/ui/header/Header';
import MobileHeader from '@/components/ui/header/MobileHeader';
import React, { useState } from 'react'
import Sidebar from '@/components/ui/sidebar/SidebarComponent';
import SideNav from '@/components/ui/sidenav/SideNav';
import { SocialLink } from '@/core/interfaces';

interface Props {
    socialLinks: SocialLink[];
    ownerName: string;
    children: React.ReactNode;
}

export default function PortfolioShell({ socialLinks, ownerName, children }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSidebarMobileExpanded, setSidebarMobileExpanded] = useState(false);
    const [isDarkModeEnabled, setDarkModeEnabled] = useState(true);

    return (
        <div className={`${isDarkModeEnabled ? 'dark' : 'light'} flex h-screen transition-all duration-200`}>
            <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'sm:ml-[12.5rem]' : 'sm:ml-[5rem]'} grid grid-rows-[auto_auto_1fr_auto] sm:grid-rows-[auto_1fr_auto] min-h-screen`}>
                <MobileHeader isExpanded={isSidebarMobileExpanded} setIsExpanded={setSidebarMobileExpanded} />
                <Header isDarkMode={isDarkModeEnabled} setIsDarkMode={setDarkModeEnabled} socialLinks={socialLinks} ownerName={ownerName} />
                <Sidebar isExpanded={isSidebarMobileExpanded} setIsExpanded={setSidebarMobileExpanded} />
                <main className='bg-silver-900 dark:bg-night transition-colors duration-300'>{children}</main>
                <Footer socialLinks={socialLinks} ownerName={ownerName} />
            </div>
        </div>
    )
};
