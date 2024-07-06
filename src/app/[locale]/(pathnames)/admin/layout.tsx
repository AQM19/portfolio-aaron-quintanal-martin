'use server'

import { auth } from '@/auth.config';
import { Paths } from '@/config';
import { redirect } from '@/navigation';
import { TopMenu } from '@/components';
import Footer from '@/components/ui/footer/Footer';
import React from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar';
import SideRSS from '@/components/ui/side-rss/SideRSS';

const PortfoilLayout = async ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    // Obtener sesión y comprobar que tenga rol administrador
    const session = await auth();

    if (session?.user.role !== 'admin') redirect(Paths.INDEX)

    return (
        <main className={`min-h-screen`}>
            <TopMenu />
            <SideRSS />
            <Sidebar />
            <div className='bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200'>
                {children}
            </div>
            <Footer />
        </main>
    )
}

export default PortfoilLayout