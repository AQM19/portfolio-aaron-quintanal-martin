'use client'

import React, { useState } from 'react'
import { HeaderComponent } from '@/components';
import SideNav from '@/components/ui/sidenav/SideNav';

export default function PortfoilLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex h-screen">
            <SideNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <div className={`flex-1 transition-all duration-500 ${isExpanded ? 'ml-[12.5rem]' : 'ml-[5rem]'}`}>
                <HeaderComponent />
                <main className="p-6">{children}</main>
            </div>
        </div>
    )
};