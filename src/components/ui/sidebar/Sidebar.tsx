import { useUISidebarStatus } from '@/store/ui/ui-sidebar-status.store';
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { IoCloseOutline, IoHomeSharp, IoLogOutOutline } from 'react-icons/io5';
import { centerMenu } from '@/config/top-menu/top-menu-items.config';
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { authMenu, editorMenu } from '@/config/top-menu/top-auth-items.config';
import { getRoleName, logout } from '@/actions';
import { Switch } from '@mui/material';


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
                if (!session?.user.roleId) {
                    setUserRole('user');
                    return;
                }

                const roleName = await getRoleName(session?.user.roleId);
                setUserRole(roleName?.role?.name || 'user');
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
                            href={value.href}
                            onClick={() => closeMenu()}
                            className={`${value.class} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
                        >
                            <value.icon size={30} />
                            <span className='ml-3 text-xl'>{t(value.name)}</span>
                        </Link>
                    ))
                }

                {/* Separator */}

                {
                    <>
                        <div className='w-full h-px bg-[#ed4709] dark:bg-[#e2b5fd] mt-10' />
                        {

                            userRole === 'admin' && (
                                authMenu.map((value, index) => (
                                    <Link
                                        key={index}
                                        href={value.href}
                                        onClick={() => closeMenu()}
                                        className={`${value.class} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
                                    >
                                        <value.icon size={30} />
                                        <span className='ml-3 text-xl'>{value.name}</span>
                                    </Link>
                                ))
                            )
                        }
                    </>
                }

                {
                    <>

                        <div className='w-full h-px bg-[#ed4709] dark:bg-[#e2b5fd] mt-10' />
                        {

                            (userRole === 'admin' || userRole === 'editor') && (
                                editorMenu.map((value, index) => (
                                    <Link
                                        key={index}
                                        href={value.href}
                                        onClick={() => closeMenu()}
                                        className={`${value.class} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
                                    >
                                        <value.icon size={30} />
                                        <span className='ml-3 text-xl'>{value.name}</span>
                                    </Link>
                                ))
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