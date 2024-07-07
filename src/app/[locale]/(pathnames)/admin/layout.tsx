import { auth } from '@/auth.config';
import { Paths } from '@/config';
import { redirect } from '@/navigation';
import React, { use } from 'react'

const PortfoilLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    // Obtener sesión y comprobar que tenga rol administrador
    const session = use(auth());

    if (session?.user.role !== 'admin') redirect(Paths.INDEX)

    return (
        <div className='bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200'>
            {children}
        </div>
    )
}

export default PortfoilLayout