import { IoCloseOutline } from 'react-icons/io5';
import { Link as I18nLink, Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import React from 'react'
import { NavConfig } from '@/core/config';
import LocalSwitcher from '../local-switcher/LocalSwitcher';

interface Props {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isExpanded, setIsExpanded }: Props) => {

    const t = useTranslations('Menu');

    const closeMenu = () => {
        setIsExpanded(false);
    }

    return (
        <aside className='block sm:hidden'>
            {/* Background black */}
            {
                isExpanded && (
                    <div
                        className='fixed top-0 left-0 w-screen h-screen z-10 bg-night opacity-30'
                    />
                )
            }

            {/* Blur */}
            {
                isExpanded && (
                    <div
                        onClick={closeMenu}
                        className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
                    />
                )
            }

            {/* Side menu */}
            <nav
                className={
                    clsx(
                        'fixed p-5 right-0 top-0 w-1/2 sm:w-1/4 h-screen flex flex-col bg-silver dark:bg-night z-20 shadow-2xl transform transition-all duration-300',
                        {
                            'translate-x-full': !isExpanded
                        }
                    )
                }>

                <IoCloseOutline
                    size={30}
                    className='absolute top-5 right-5 cursor-pointer text-aero dark:text-emerald transition-all'
                    onClick={() => closeMenu()}
                />

                <div className='absolute top-4 left-2'>
                    <LocalSwitcher />
                </div>

                <div className='mb-10'></div>

                <ul className="flex flex-col gap-2 h-full mt-10 text-aero dark:text-emerald">
                    {
                        NavConfig.map((item, index) => (
                            <li key={`${item.name}-${index}`}>

                                <Link
                                    href={item.href}
                                    className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-night-600"
                                    onClick={() => closeMenu()}
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
                </ul>

            </nav>

        </aside>
    )
}

export default Sidebar