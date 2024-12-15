'use client'

import AQMIcon from '@/components/icons/AQMIcon'
import { NavConfig } from '@/core/config/nav-config/nav.config'
import { Link } from '@/i18n/routing';
import { FaAngleRight } from 'react-icons/fa'
import React from 'react'
import { useTranslations } from 'next-intl';

interface Props {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav = ({ isExpanded, setIsExpanded }: Props) => {

    const t = useTranslations('Menu');

    return (
        <aside
            className={`hidden sm:block fixed top-0 left-0 h-full transition-all duration-300 ${isExpanded ? 'w-[12.5rem]' : 'w-[5rem]'} bg-silver-900 dark:bg-night`}
        >

            <nav className="h-full flex flex-col p-4 space-y-2">

                <Link
                    href={'/'}
                    className='self-center pb-8'
                >
                    <AQMIcon />
                </Link>

                <ul className="flex flex-col gap-2 h-full text-aero dark:text-emerald">

                    {
                        NavConfig.map((item, index) => (
                            <li key={`${item.name}-${index}`}>

                                <Link
                                    href={item.href}
                                    className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-night-600"
                                >
                                    <item.icon
                                        size={30}
                                        className='shrink-0'
                                    />

                                    <span className={`text-sm transition-opacity duration-300 font-semibold ${isExpanded ? 'opacity-100' : 'opacity-0'}`} >
                                        {t(item.name)}
                                    </span>

                                </Link>

                            </li>
                        ))
                    }



                    <li className="mt-auto">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-4 w-full rounded-md p-2 hover:bg-night-600 transition-colors"
                        >
                            <FaAngleRight size={30} className={`shrink-0 ${isExpanded ? 'rotate-180' : 'rotate-0'} duration-500`} />
                            <span className={`text-sm transition-opacity duration-300 font-semibold ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}`} >
                                {t('collapse')}
                            </span>
                        </button>
                    </li>

                </ul>
            </nav>
        </aside>
    )
}

export default SideNav