import React from 'react'
import { useTranslations } from 'next-intl'
import { IoMoon, IoSunnyOutline } from 'react-icons/io5'

interface SwitchProps {
    isDark: boolean
    toggleTheme: () => void
}

const Switch: React.FC<SwitchProps> = ({
    isDark,
    toggleTheme
}) => {
    const t = useTranslations('Menu');

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? t('theme light') : t('theme dark')}
            className='w-16 h-8 rounded-full p-0.5 border-2 border-line-strong bg-surface-hover transition-colors duration-300 ease-in-out'
        >
            <div
                className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out bg-accent text-on-accent ${isDark ? 'translate-x-8' : 'translate-x-0'}`}
            >
                {
                    isDark
                        ? (<IoMoon className="h-6 w-6 p-1" />)
                        : (<IoSunnyOutline className="h-6 w-6 p-1" />)
                }
            </div>
        </button>
    )
}

export default Switch
