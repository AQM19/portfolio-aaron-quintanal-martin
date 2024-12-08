import React from 'react'
import { useUIDarkMode } from '@/core/services/ui/dark-mode.service';
import Footer from '@/components/ui/footer/Footer';
import { HeaderComponent } from '@/components';

export default function PortfoilLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (
        <>
            <HeaderComponent />
            {/* <SideRSS /> */}
            {/* <Sidebar /> */}
            <main className={`${isDarkModeEnabled ? 'dark' : 'light'} min-h-screen grid grid-rows-[auto_1fr_auto] overflow-x-hidden bg-silver dark:bg-eerie_black transition-all duration-300`}>
                {children}
            </main>
            <Footer />
        </>
    )
};