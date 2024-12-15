import React from 'react'
import { IoMoon, IoSunnyOutline } from 'react-icons/io5'

interface SwitchProps {
    isDark: boolean
    toggleTheme: () => void
}

const Switch: React.FC<SwitchProps> = ({
    isDark,
    toggleTheme
}) => {
    return (
        <button
            onClick={toggleTheme}
            className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isDark ? 'bg-blue-900' : 'bg-yellow-400'}`}
        >
            <div
                className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isDark ? 'translate-x-8 bg-blue-800' : 'translate-x-0 bg-white'}`}
            >
                {
                    isDark
                        ? (<IoMoon className="h-6 w-6 text-white p-1" />)
                        : (<IoSunnyOutline className="h-6 w-6 text-yellow-400 p-1" />)
                }
            </div>
        </button>
    )
}

export default Switch