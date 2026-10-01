import { IoCloseOutline } from 'react-icons/io5';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import React from 'react'
import { NavConfig } from '@/core/config';
import { isNavActive } from '@/core/utils';
import LocalSwitcher from '../local-switcher/LocalSwitcher';
import Switch from '../switch/Switch';

interface Props {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    isDark: boolean;
    toggleTheme: () => void;
}

const Sidebar = ({ isExpanded, setIsExpanded, isDark, toggleTheme }: Props) => {

    const t = useTranslations('Menu');
    const pathname = usePathname();

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
                id='mobile-menu'
                className={
                    clsx(
                        'fixed p-5 right-0 top-0 w-1/2 min-w-[14rem] sm:w-1/4 h-screen flex flex-col bg-background border-l border-line z-20 shadow-2xl transform transition-all duration-300',
                        {
                            'translate-x-full invisible': !isExpanded
                        }
                    )
                }>

                <button
                    onClick={() => closeMenu()}
                    className='absolute top-4 right-4 p-1 rounded-md text-accent-fg transition-all'
                    aria-label={t('close menu')}
                >
                    <IoCloseOutline size={30} />
                </button>

                <div className='absolute top-4 left-2'>
                    <LocalSwitcher />
                </div>

                <div className='mb-10'></div>

                <ul className="flex flex-col gap-2 flex-1 mt-10 text-accent-fg">
                    {
                        NavConfig.map((item, index) => {
                            const isActive = isNavActive(item.href, pathname);

                            return (
                                <li key={`${item.name}-${index}`}>

                                    <Link
                                        href={item.href}
                                        aria-current={isActive ? 'page' : undefined}
                                        className={clsx(
                                            'flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-surface-hover',
                                            { 'bg-surface-hover shadow-[inset_3px_0_0_rgb(var(--accent-fg))]': isActive }
                                        )}
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
                            )
                        })
                    }
                </ul>

                {/* Theme selector: on phones the header with the switch is hidden */}
                <div className='flex items-center justify-between gap-3 pt-4 border-t border-line'>
                    <span className='text-sm font-semibold text-muted'>{t('theme')}</span>
                    <Switch isDark={isDark} toggleTheme={toggleTheme} />
                </div>

            </nav>

        </aside>
    )
}

export default Sidebar
