'use client'

import React, { useState } from 'react'
import SideNav from '@/components/ui/sidenav/SideNav';

export default function PortfoilLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex h-screen">
            <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className={`flex-1 transition-all duration-500 ${isExpanded ? 'sm:ml-[12.5rem]' : 'sm:ml-[5rem]'} grid grid-rows-[auto_auto_1fr_auto] sm:grid-rows-[auto_1fr_auto] min-h-screen`}>
                <div className='block sm:hidden'>MOBILE HEADER</div>
                <header className='bg-red-300'>HEADER</header>
                <main className='bg-blue-300'>{children}</main>
                <footer className='bg-green-200'>FOOTER</footer>
            </div>
        </div>
    )
};