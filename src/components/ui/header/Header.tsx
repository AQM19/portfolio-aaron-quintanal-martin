import SocialIcon from '@/components/icons/SocialIcon'
import { SocialLink } from '@/core/interfaces'
import { Link as I18Link } from '@/i18n/routing'
import Link from 'next/link'
import React from 'react'
import LocalSwitcher from '../local-switcher/LocalSwitcher'
import Switch from '../switch/Switch'

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
  socialLinks: SocialLink[];
  ownerName: string;
}

const Header = ({ isDark, toggleTheme, socialLinks, ownerName }: Props) => {

  return (
    <header className='hidden sm:flex flex-row items-center justify-between p-4 bg-background text-accent-fg transition-colors duration-300'>

      <I18Link href={'/'}>
        <h1 className='font-semibold text-xl uppercase'>{ownerName}</h1>
      </I18Link>

      <div className='flex flex-row gap-20'>

        <ul className='flex flex-row gap-4'>
          {
            socialLinks
              .filter(item => item.group === 'social')
              .map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <Link
                    href={item.href}
                    target='_blank'
                    aria-label={item.label ?? item.platform}>
                    <SocialIcon platform={item.platform}
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
            socialLinks
              .filter(item => item.group === 'work')
              .map((item, index) => (
              <li key={`${item.href}-${index}`}>
                <Link
                  href={item.href}
                  target='_blank'
                  aria-label={item.label ?? item.platform}>
                  <SocialIcon platform={item.platform}
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
        <Switch isDark={isDark} toggleTheme={toggleTheme} />
      </div>

    </header>
  )
}

export default Header