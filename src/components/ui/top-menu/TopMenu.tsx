'use client'

import { authMenu, editorMenu } from '@/config/top-menu/top-auth-items.config'
import { centerMenu } from '@/config/top-menu/top-menu-items.config'
import { IoMenu } from 'react-icons/io5'
import { kanit } from '@/config/fonts/fonts'
import { Link } from '@/navigation'
import { Paths } from '@/config'
import { Switch } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl';
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store'
import { useUISidebarStatus } from '@/store/ui/ui-sidebar-status.store'
import AQMIcon from '@/components/icons/AQMIcon';
import LocalSwitcher from '../local-switcher/local-switcher';
import CustomLink from '../custom-link/CustomLink'

export const TopMenu = () => {

    const [userRole, setUserRole] = useState('');
    const openSideMenu = useUISidebarStatus(state => state.openSideMenu);
    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);
    const enableDarkMode = useUIDarkMode(mode => mode.enableDarkMode);
    const disableDarkMode = useUIDarkMode(mode => mode.disableDarkMode);

    const toggleDarkMode = () => {
        isDarkModeEnabled ? disableDarkMode() : enableDarkMode();
    }
    const t = useTranslations("Menu");
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserRole = () => {
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
        <nav className={`flex pt-4 sm:p-5 justify-center items-center w-full fixed left-0 right-0 z-10 backdrop-filter backdrop-blur-sm`}>

            <div className='flex justify-between items-center align-middle w-4/5'>

                {/* Logo */}
                <CustomLink
                    className='flex flex-row gap-6 items-center cursor-pointer'
                    href={Paths.INDEX}
                >

                    <AQMIcon />

                    <h1
                        className={`${kanit.className} text-lg sm:text-2xl font-normal text-[#ed4709] dark:text-[#e2b5fd]`}
                    >
                        Aarón Quintanal Martín
                    </h1>

                </CustomLink>

                {/* Center Menu */}
                <div className='hidden sm:block'>

                    {
                        centerMenu.map(value => (
                            <CustomLink
                                className={`${value.class} m-2 p-2 transition-all font-bold text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff] hover:border-b-4 border-[#3c0753] dark:border-[#e2b5fd]`}
                                href={value.href}
                                key={value.name}
                            >
                                {t(value.name)}
                            </CustomLink>
                        ))
                    }

                    {
                        userRole === 'admin' && (
                            authMenu.map(value => (
                                <CustomLink
                                    className={`${value.class} m-2 p-2 transition-all font-bold text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff] hover:border-b-4 border-[#3c0753] dark:border-[#e2b5fd]`}
                                    href={value.href}
                                    key={value.name}
                                >
                                    {value.name}
                                </CustomLink>
                            ))
                        )
                    }

                    {
                        (userRole === 'admin' || userRole === 'editor') && (
                            editorMenu.map((value) => (
                                <CustomLink
                                    className={`${value.class} m-2 p-2 transition-all font-bold text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff] hover:border-b-4 border-[#3c0753] dark:border-[#e2b5fd]`}
                                    href={value.href}
                                    key={value.name}
                                >
                                    {value.name}
                                </CustomLink>
                            ))
                        )
                    }

                </div>


                {/* Search, Cart, Menu */}
                <div className='hidden sm:flex items-center'>
                    <LocalSwitcher />

                    {/* <button>
                        <IoMenu className='mx-2 w-8 h-8 rounded' />
                    </button> */}

                    {/* <MaterialUISwitch checked={isDarkModeEnabled} onChange={toggleDarkMode} /> */}
                    <Switch checked={isDarkModeEnabled} onChange={toggleDarkMode} className='text-red-400' />

                </div>


            </div>

            <button onClick={() => openSideMenu()} className='block sm:hidden'>
                <IoMenu className='mx-2 w-8 h-8 rounded text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff]'></IoMenu>
            </button>
        </nav>
    )
}
