'use client'

import { titleFont } from '@/config/fonts'
import { MaterialUISwitch } from '../switch/MaterialUiSwitch'
import { IoMenu } from 'react-icons/io5'
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store'
import { centerMenu } from '@/config/top-menu/top-menu-items.config'
import { useUISidebarStatus } from '@/store/ui/ui-sidebar-status.store'
import LocalSwitcher from '../local-switcher/local-switcher';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation'
import { useSession } from 'next-auth/react'
import { authMenu, editorMenu } from '@/config/top-menu/top-auth-items.config'

export const TopMenu = () => {

    const openSideMenu = useUISidebarStatus(state => state.openSideMenu);
    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);
    const enableDarkMode = useUIDarkMode(mode => mode.enableDarkMode);
    const disableDarkMode = useUIDarkMode(mode => mode.disableDarkMode);

    const toggleDarkMode = () => {
        isDarkModeEnabled ? disableDarkMode() : enableDarkMode();
    }

    const t = useTranslations("Menu");

    const { data: session } = useSession();
    const isAdmin = (session?.user?.roleId === 4);
    const isEditor = (session?.user?.roleId === 6);

    return (
        <nav className={`flex pt-4 sm:p-5 justify-center items-center w-full fixed left-0 right-0 z-10`}>

            <div className='flex justify-between items-center align-middle w-4/5'>

                {/* Logo */}
                <div className='hidden sm:block'>
                    <Link
                        href="/">
                        <span className={`${titleFont.className} antialiased font-bold text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff]`}>XIX</span>
                    </Link>
                </div>

                {/* Center Menu */}
                <div className='hidden sm:block'>

                    {
                        centerMenu.map(value => (
                            <Link
                                className={`${value.class} m-2 p-2 transition-all font-bold text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff] hover:border-b-4 border-[#3c0753] dark:border-[#e2b5fd]`}
                                href={value.href}
                                key={value.name}
                            >
                                {t(value.name)}
                            </Link>
                        ))
                    }

                    {
                        isAdmin && (
                            authMenu.map(value => (
                                <Link
                                    className={`${value.class} m-2 p-2 transition-all font-bold text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff] hover:border-b-4 border-[#3c0753] dark:border-[#e2b5fd]`}
                                    href={value.href}
                                    key={value.name}
                                >
                                    {value.name}
                                </Link>
                            ))
                        )
                    }

                    {
                        (isAdmin || isEditor) && (
                            editorMenu.map((value) => (
                                <Link
                                    className={`${value.class} m-2 p-2 transition-all font-bold text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff] hover:border-b-4 border-[#3c0753] dark:border-[#e2b5fd]`}
                                    href={value.href}
                                    key={value.name}
                                >
                                    {value.name}
                                </Link>
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

                    <MaterialUISwitch checked={isDarkModeEnabled} onChange={toggleDarkMode} />

                </div>


            </div>

            <button onClick={() => openSideMenu()}>
                <IoMenu className='mx-2 w-8 h-8 rounded text-[#ed4709] dark:text-[#e2b5fd] hover:text-[#3c0753] dark:hover:text-[#d2e4ff]'></IoMenu>
            </button>
        </nav>
    )
}
