'use client'

import AQMIcon from '@/components/icons/AQMIcon'
import { NavConfig } from '@/core/config/nav-config/nav.config'
import { Link } from '@/i18n/routing'
import { FaAngleRight } from 'react-icons/fa'
import React from 'react'

const SideNav = ({ isExpanded, setIsExpanded }: any) => {
    return (
        <aside
            className={`fixed top-0 left-0 h-full transition-all duration-500 ${isExpanded ? 'w-[12.5rem]' : 'w-[5rem]'} bg-night`}
        >

            <nav className="h-full flex flex-col p-4 space-y-2">

                <Link
                    href={'/'}
                    className='self-center pb-8'
                >
                    <AQMIcon />
                </Link>

                <ul className="flex flex-col gap-2 h-full text-neutral-100">

                    {
                        NavConfig.map((item, index) => (
                            <li key={`${item.name}-${index}`}>
                                <a
                                    href={item.href}
                                    className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-night-600"
                                >
                                    <item.icon size={30} className='shrink-0' />
                                    <span
                                        className={`text-sm transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 invisible'
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </a>
                            </li>
                        ))
                    }



                    <li className="mt-auto">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-4 w-full rounded-md p-2 hover:bg-night-600 transition-colors"
                        >
                            <FaAngleRight size={30} className={`shrink-0 ${isExpanded ? 'rotate-180' : 'rotate-0'} duration-500`} />
                            <span className={`text-sm transition-opacity duration-300 ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}`} >
                                Collapse
                            </span>
                        </button>
                    </li>

                </ul>
            </nav>
        </aside>
    )
}

export default SideNav