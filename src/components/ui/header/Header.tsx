import { SocialMediaMenuConfig, WorkMediaMenuConfig } from '@/core/config'
import { Link as I18Link } from '@/i18n/routing'
import Link from 'next/link'
import React from 'react'
import LocalSwitcher from '../local-switcher/local-switcher'
import Switch from '../switch/Switch'

const Header = () => {
  return (
    <header className='flex flex-row items-center justify-between p-4 bg-night text-emerald'>

      <I18Link href={'/'}>
        <h1 className='font-semibold text-xl'>AARON QUINTANAL MARTIN</h1>
      </I18Link>

      <div className='flex flex-row gap-20'>

        <ul className='flex flex-row gap-4'>
          {
            SocialMediaMenuConfig.map((item, index) => (
              <li key={`${item.href}-${index}`}>
                <Link
                  href={item.href}
                  target={item.target}>
                  <item.icon
                    size={30}
                    className='hover:scale-125 transition-all duration-300'
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
                    className='hover:scale-125 transition-all duration-300'
                  />
                </Link>
              </li>
            ))
          }
        </ul>

      </div>

      <div className='flex flex-row gap-4'>
        <LocalSwitcher />
        <Switch isOn={true} handleToggle={() => { }} />
      </div>

    </header>
  )
}

export default Header