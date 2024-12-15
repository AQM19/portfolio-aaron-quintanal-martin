import { SocialMediaMenuConfig, WorkMediaMenuConfig } from '@/core/config'
import { Link as I18Link } from '@/i18n/routing'
import Link from 'next/link'
import React from 'react'
import LocalSwitcher from '../local-switcher/LocalSwitcher'
import Switch from '../switch/Switch'

interface Props {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isDarkMode, setIsDarkMode }: Props) => {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className='hidden sm:flex flex-row items-center justify-between p-4 bg-silver-900 dark:bg-night text-aero dark:text-emerald transition-colors duration-300'>

      <I18Link href={'/'}>
        <h1 className='font-semibold text-xl'>AARON QUINTANAL MARTIN</h1>
      </I18Link>

      <div className='flex flex-row gap-20'>

        <ul className='flex flex-row gap-4'>
          {
            SocialMediaMenuConfig
              .filter(item => item.isEnabled)
              .map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <Link
                    href={item.href}
                    target={item.target}>
                    <item.icon
                      size={30}
                      className='hover:scale-125 transition-transform duration-300'
                    />
                  </Link>
                </li>
              ))
          }
        </ul>

        <ul className='flex flex-row gap-4'>
          {
            WorkMediaMenuConfig.map((item, index) => (
              <li key={`${item.href}-${index}`}>
                <Link
                  href={item.href}
                  target={item.target}>
                  <item.icon
                    size={30}
                    className='hover:scale-125 transition-transform duration-300'
                  />
                </Link>
              </li>
            ))
          }
        </ul>

      </div>

      <div className='flex flex-row gap-4 items-center justify-center'>
        <LocalSwitcher />
        <Switch isDark={isDarkMode} toggleTheme={toggleDarkMode} />
      </div>

    </header>
  )
}

export default Header