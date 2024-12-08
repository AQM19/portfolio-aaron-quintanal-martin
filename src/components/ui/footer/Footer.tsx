import React from 'react'
import { FaXTwitter } from 'react-icons/fa6';
import { FiFacebook } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import AQMIcon from '@/components/icons/AQMIcon';
import { Link as I18nLink } from '@/i18n/routing';
import Link from 'next/link';

const Footer = () => {

    const t = useTranslations("Footer");

    return (
        <footer
            className="py-8 md:py-12 px-6 sm:px-0 w-full flex flex-row items-center justify-center transition-all duration-200"
        >

            <div
                className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            >

                <div
                    className="flex items-center gap-2"
                >
                    <AQMIcon />
                    <span
                        className="text-lg font-semibold "
                    >
                        Aarón Quintanal Martín
                    </span>
                </div>

                <nav
                    className="grid gap-2"
                >
                    <I18nLink
                        href={'/'}
                        className="text-sm hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {t('index')}
                    </I18nLink>

                    <I18nLink
                        href={'/projects'}
                        className="text-sm hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {t('projects')}
                    </I18nLink>

                    <I18nLink
                        href={'/contact'}
                        className="text-sm hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {t('contact')}
                    </I18nLink>

                    <I18nLink
                        href={'/career'}
                        className="text-sm hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {t('career')}
                    </I18nLink>

                </nav>

                <div
                    className="space-y-2"
                >

                    <h4
                        className="text-sm font-medium"
                    >
                        {t('follow me')}
                    </h4>

                    <div className="flex gap-2">

                        <Link href="#" className="text-muted-foreground hover:text-foreground" >
                            <FaXTwitter className="h-5 w-5" />
                        </Link>

                        <Link href="#" className="text-muted-foreground hover:text-foreground" >
                            <FiFacebook className="h-5 w-5" />
                        </Link>

                        <Link href="#" className="text-muted-foreground hover:text-foreground" >
                            <FaInstagram className="h-5 w-5" />
                        </Link>

                    </div>
                </div>

                <div className="text-xs text-muted-foreground">&copy; 2024 Aarón Quintanal Martín. {t('all rights reserved')}</div>

            </div>

        </footer>
    )
}

export default Footer