'use server'

import { getRoleName } from '@/actions';
import { auth } from '@/auth.config';
import { TopMenu } from '@/components';
import SideRSS from '@/components/ui/side-rss/SideRSS';
import Sidebar from '@/components/ui/sidebar/Sidebar';
import { redirect } from '@/navigation';
import React from 'react'

const PortfoilLayout = async ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    // Obtener sesión y comprobar que tenga rol administrador
    const session = await auth();
    const role = await getRoleName(session!.user.roleId);
    if (role?.role?.name !== 'admin') redirect('/')

    return (
        <main className={`min-h-screen`}>
            <TopMenu />
            <SideRSS />
            <Sidebar />
            <div className='bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200'>
                {children}
            </div>
        </main>
    )
}

export default PortfoilLayout