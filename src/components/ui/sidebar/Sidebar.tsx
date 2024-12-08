'use client'

import { centerMenu } from '@/core/config/top-menu/top-menu-items.config';
import { useUISidebarStatus } from '@/core/services/ui/sidebar-status.service';
import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react'
import { IoCloseOutline, IoHomeSharp } from 'react-icons/io5';

const Sidebar = () => {

    const isSideMenuOpen = useUISidebarStatus(state => state.isSideMenuOpen);
    const closeMenu = useUISidebarStatus(state => state.closeSideMenu);

    // const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);
    // const enableDarkMode = useUIDarkMode(mode => mode.enableDarkMode);
    // const disableDarkMode = useUIDarkMode(mode => mode.disableDarkMode);

    // const toggleDarkMode = () => {
    //     isDarkModeEnabled ? disableDarkMode() : enableDarkMode();
    // }

    const t = useTranslations("Menu");

    return (
        <aside>
            {/* Background black */}
            {
                isSideMenuOpen && (
                    <div
                        className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
                    />
                )
            }

            {/* Blur */}
            {
                isSideMenuOpen && (
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
                        'fixed p-5 right-0 top-0 w-full md:w-1/2 lg:w-1/4 h-screen flex flex-col bg-[#fff6ed] dark:bg-[#030637] text-[#ed4709] dark:text-[#e2b5fd] z-20 shadow-2xl transform transition-all duration-300',
                        {
                            'translate-x-full': !isSideMenuOpen
                        }
                    )
                }>

                <IoCloseOutline
                    size={50}
                    className='absolute top-5 right-5 cursor-pointer'
                    onClick={() => closeMenu()}
                />

                <Link
                    href={'/'}
                    onClick={() => closeMenu()}
                    className={`flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all sm:hidden`}
                >
                    <IoHomeSharp size={30} />
                    <span className='ml-3 text-xl'>Inicio</span>
                </Link>

                {
                    centerMenu.map((value, index) => (
                        <Link
                            key={index}
                            href={'/'}
                            onClick={() => closeMenu()}
                            className={`${value.class} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
                        >
                            <value.icon size={30} />
                            <span className='ml-3 text-xl'>{t(value.name)}</span>
                        </Link>
                    ))
                }

            </nav>

        </aside>
    )
}

export default Sidebar