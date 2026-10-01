'use client'

import Footer from '@/components/ui/footer/Footer';
import Header from '@/components/ui/header/Header';
import MobileHeader from '@/components/ui/header/MobileHeader';
import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/ui/sidebar/SidebarComponent';
import SideNav from '@/components/ui/sidenav/SideNav';
import { SocialLink } from '@/core/interfaces';
import { applyTheme, setTheme, useTheme } from '@/core/services/ui/theme.service';

interface Props {
    socialLinks: SocialLink[];
    ownerName: string;
    children: React.ReactNode;
}

export default function PortfolioShell({ socialLinks, ownerName, children }: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSidebarMobileExpanded, setSidebarMobileExpanded] = useState(false);
    // Saved in localStorage; dark by default
    const theme = useTheme();
    const isDark = theme === 'dark';
    const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

    // Keeps <html> in sync when the theme changes in another tab
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return (
        <div className='flex h-screen transition-all duration-200'>
            <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className={`flex-1 transition-all duration-300 ${isExpanded ? 'sm:ml-[12.5rem]' : 'sm:ml-[5rem]'} grid grid-rows-[auto_auto_1fr_auto] sm:grid-rows-[auto_1fr_auto] min-h-screen`}>
                <MobileHeader isExpanded={isSidebarMobileExpanded} setIsExpanded={setSidebarMobileExpanded} />
                <Header isDark={isDark} toggleTheme={toggleTheme} socialLinks={socialLinks} ownerName={ownerName} />
                <Sidebar isExpanded={isSidebarMobileExpanded} setIsExpanded={setSidebarMobileExpanded} isDark={isDark} toggleTheme={toggleTheme} />
                <main className='bg-background text-foreground transition-colors duration-300'>{children}</main>
                <Footer socialLinks={socialLinks} ownerName={ownerName} />
            </div>
        </div>
    )
};
