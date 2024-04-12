import { useUIStore } from '@/store/ui/ui-sidebar-status.store';
import React from 'react'
import clsx from 'clsx';
import { IoCloseOutline } from 'react-icons/io5';
import Link from 'next/link';
import { centerMenu } from '@/config/top-menu/top-menu-items.config';
import { MaterialUISwitch } from '../switch/MaterialUiSwitch';
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store';


const Sidebar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);
    const enableDarkMode = useUIDarkMode(mode => mode.enableDarkMode);
    const disableDarkMode = useUIDarkMode(mode => mode.disableDarkMode);

    const toggleDarkMode = () => {
        isDarkModeEnabled ? disableDarkMode() : enableDarkMode();
    }

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
                        'fixed p-5 right-0 top-0 w-full md:w-1/4 h-screen flex flex-col bg-[#fff6ed] dark:bg-[#030637] text-[#ed4709] dark:text-[#e2b5fd] z-20 shadow-2xl transform transition-all duration-300',
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

                {
                    centerMenu.map(value => (
                        <Link
                            href={value.href}
                            onClick={() => closeMenu()}
                            className={`${value.class} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
                        >
                            <value.icon size={30} />
                            <span className='ml-3 text-xl'>{value.name}</span>
                        </Link>
                    ))
                }

                {/* Separator */}
                <div className='w-full h-px bg-[#ed4709] dark:bg-[#e2b5fd] my-10' />

                <div className='flex-grow'></div>

                <div className='block sm:hidden items-center'>

                    <MaterialUISwitch checked={isDarkModeEnabled} onChange={toggleDarkMode} />

                </div>

            </nav>

        </aside>
    )
}

export default Sidebar