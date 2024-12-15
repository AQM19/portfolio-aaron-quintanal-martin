import React from 'react'
import { useTranslations } from 'next-intl';
import AQMIcon from '@/components/icons/AQMIcon';
import { Link as I18nLink } from '@/i18n/routing';
import Link from 'next/link';
import { NavConfig, SocialMediaMenuConfig, WorkMediaMenuConfig } from '@/core/config';

const Footer = () => {

    const t = useTranslations("Footer");

    return (
        <footer
            className="py-8 md:py-12 px-6 sm:px-0 w-full flex flex-row items-center justify-center bg-silver-900 dark:bg-night text-night dark:text-silver-900 transition-colors duration-300"
        >

            <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" >

                <div className="flex items-center gap-2" >
                    <AQMIcon />
                    <span className="text-lg font-semibold text-aero dark:text-emerald" >
                        Aarón Quintanal Martín
                    </span>
                </div>

                <nav className="grid gap-2" >

                    {
                        NavConfig.map((item, index) => (
                            <I18nLink
                                key={`${item.name}-${index}`}
                                href={item.href}
                                className="text-sm"
                            >
                                {t(item.name)}
                            </I18nLink>
                        ))
                    }

                </nav>

                <div className="space-y-2" >

                    <h4 className="text-sm font-medium" >
                        {t('follow me')}
                    </h4>

                    <div className="flex gap-2">

                        {
                            SocialMediaMenuConfig.map((item, index) => (
                                <Link
                                    key={`${item.href}-${index}`}
                                    href={item.href}
                                    target={item.target}
                                    className="text-aero dark:text-emerald hover:scale-110 transition-all duration-300"
                                >
                                    <item.icon className="h-5 w-5" />
                                </Link>

                            ))
                        }

                    </div>

                    <div className="flex gap-2">
                        {
                            WorkMediaMenuConfig.map((item, index) => (
                                <Link
                                    key={`${item.href}-${index}`}
                                    href={item.href}
                                    target={item.target}
                                    className="text-aero dark:text-emerald hover:scale-110 transition-all duration-300"
                                >
                                    <item.icon className="h-5 w-5" />
                                </Link>
                            ))
                        }
                    </div>

                </div>

                <div className="text-xs text-muted-foreground">&copy; 2024 Aarón Quintanal Martín. {t('all rights reserved')}</div>

            </div>

        </footer>
    )
}

export default Footer