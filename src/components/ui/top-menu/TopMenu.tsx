'use client'

import Link from 'next/link'

import { titleFont } from '@/config/fonts'

import { centerMenu, rrssMenu } from '@/config/top-menu/menu-items.config'
import { MaterialUISwitch } from '../material-ui/switch/MaterialUiSwitch'
import { useUIDarkMode } from '@/store/ui/ui-store'
import { IoMenu } from 'react-icons/io5'

export const TopMenu = () => {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);
    const enableDarkMode = useUIDarkMode(mode => mode.enableDarkMode);
    const disableDarkMode = useUIDarkMode(mode => mode.disableDarkMode);

    const toggleDarkMode = () => {
        isDarkModeEnabled ? disableDarkMode() : enableDarkMode();
    }

    return (
        <nav className={`flex pt-4 sm:p-5 justify-center items-center w-full fixed left-0 right-0 transition-all z-10`}>

            <div className='flex justify-between items-center align-middle transition-all w-4/5'>

                {/* Logo */}
                <div className='hidden sm:block'>
                    <Link
                        href="/">
                        <span className={`${titleFont.className} antialiased font-bold dark:text-blue-600`}>XIX</span>
                    </Link>
                </div>

                {/* Center Menu */}
                <div className='hidden sm:block'>

                    {
                        centerMenu.map(value => (
                            <Link
                                className={`${value.class} m-2 p-2 rounded transition-all font-bold hover:bg-gray-100 dark:text-blue-600`}
                                href={value.href}
                                key={value.name}
                            >
                                {value.name}
                            </Link>
                        ))
                    }

                </div>

                {/* Search, Cart, Menu */}
                <div className='hidden sm:flex items-center'>

                    {/* <button>
                        <IoMenu className='mx-2 w-8 h-8 rounded' />
                    </button> */}

                    <MaterialUISwitch checked={isDarkModeEnabled} onChange={toggleDarkMode} />

                </div>


            </div>

                <button>
                    <IoMenu className='mx-2 w-8 h-8 rounded'></IoMenu>
                </button>
        </nav>
    )
}
