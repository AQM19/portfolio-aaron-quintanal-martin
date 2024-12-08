'use client'

import { authMenu, editorMenu } from '@/core/config/top-menu/top-auth-items.config';
import { centerMenu } from '@/core/config/top-menu/top-menu-items.config';
import { IoCloseOutline, IoHomeSharp, IoLogOutOutline } from 'react-icons/io5';
import { Link } from '@/navigation';
import { logout } from '@/actions';
import { Paths } from '@/config';
import { Switch } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useUIDarkMode } from '@/core/services/ui/dark-mode.service';
import { useUISidebarStatus } from '@/core/services/ui/sidebar-status.service';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import CustomLink from '../custom-link/CustomLink';

const Sidebar = () => {

    const [userRole, setUserRole] = useState('');
    const isSideMenuOpen = useUISidebarStatus(state => state.isSideMenuOpen);
    const closeMenu = useUISidebarStatus(state => state.closeSideMenu);

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);
    const enableDarkMode = useUIDarkMode(mode => mode.enableDarkMode);
    const disableDarkMode = useUIDarkMode(mode => mode.disableDarkMode);

    const toggleDarkMode = () => {
        isDarkModeEnabled ? disableDarkMode() : enableDarkMode();
    }

    const t = useTranslations("Menu");
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                if (!session?.user.role) {
                    setUserRole('user');
                    return;
                }

                setUserRole(session.user.role || 'user');
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        if (session) {
            fetchUserRole();
        }
    }, [session]);

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

                <CustomLink
                    href={Paths.INDEX}
                    onClick={() => closeMenu()}
                    className={`flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all sm:hidden`}
                >
                    <IoHomeSharp size={30} />
                    <span className='ml-3 text-xl'>Inicio</span>
                </CustomLink>

                {
                    centerMenu.map((value, index) => (
                        <CustomLink
                            key={index}
                            href={value.href}
                            onClick={() => closeMenu()}
                            className={`${value.class} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
                        >
                            <value.icon size={30} />
                            <span className='ml-3 text-xl'>{t(value.name)}</span>
                        </CustomLink>
                    ))
                }

                {/* Separator */}

                {
                    <>
                        {

                            userRole === 'admin' && (
                                <>
                                    <div className='w-full h-px bg-[#ed4709] dark:bg-[#e2b5fd] mt-10' />
                                    {
                                        authMenu.map((value, index) => (
                                            <CustomLink
                                                key={index}
                                                href={value.href}
                                                onClick={() => closeMenu()}
                                                className={`${value.class} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
                                            >
                                                <value.icon size={30} />
                                                <span className='ml-3 text-xl'>{value.name}</span>
                                            </CustomLink>
                                        ))
                                    }

                                </>


                            )
                        }
                    </>
                }

                {
                    <>

                        {

                            (userRole === 'admin' || userRole === 'editor') && (
                                <>

                                    <div className='w-full h-px bg-[#ed4709] dark:bg-[#e2b5fd] mt-10' />

                                    {editorMenu.map((value, index) => (
                                        <Link
                                            key={index}
                                            href={value.href}
                                            onClick={() => closeMenu()}
                                            className={`${value.class} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
                                        >
                                            <value.icon size={30} />
                                            <span className='ml-3 text-xl'>{value.name}</span>
                                        </Link>
                                    ))}

                                </>
                            )
                        }
                    </>
                }

                <div className='flex-grow'></div>

                {
                    (userRole === 'admin' || userRole === 'editor') && (
                        <button
                            onClick={() => logout()}
                            className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        >
                            <IoLogOutOutline size={30} />
                            <span className='ml-3 text-xl'>Salir</span>
                        </button>
                    )
                }

                <div className='block sm:hidden items-center'>

                    {/* <MaterialUISwitch checked={isDarkModeEnabled} onChange={toggleDarkMode} /> */}
                    <Switch checked={isDarkModeEnabled} onChange={toggleDarkMode} className='text-red-400' />
                </div>

            </nav>

        </aside>
    )
}

export default Sidebar