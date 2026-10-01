import React from 'react'
import { useTranslations } from 'next-intl';
import AQMIcon from '@/components/icons/AQMIcon';
import { Link as I18nLink } from '@/i18n/routing';
import Link from 'next/link';
import { NavConfig } from '@/core/config';
import SocialIcon from '@/components/icons/SocialIcon';
import { SocialLink } from '@/core/interfaces';

interface Props {
    socialLinks: SocialLink[];
    ownerName: string;
}

const Footer = ({ socialLinks, ownerName }: Props) => {

    const t = useTranslations("Footer");

    return (
        <footer
            className="py-8 md:py-12 px-6 sm:px-0 w-full flex flex-row items-center justify-center bg-background text-foreground border-t border-line transition-colors duration-300"
        >

            <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" >

                <div className="flex items-center gap-2" >
                    <AQMIcon />
                    <span className="text-lg font-semibold text-accent-fg" >
                        {ownerName}
                    </span>
                </div>

                <nav className="grid" >

                    {
                        NavConfig.map((item, index) => (
                            <I18nLink
                                key={`${item.name}-${index}`}
                                href={item.href}
                                className="inline-block py-2 text-sm hover:text-accent-fg transition-colors"
                            >
                                {t(item.name)}
                            </I18nLink>
                        ))
                    }

                    <I18nLink href="/privacy" className="inline-block py-2 text-sm hover:text-accent-fg transition-colors">
                        {t('privacy')}
                    </I18nLink>

                </nav>

                <div className="space-y-2" >

                    <h4 className="text-sm font-medium" >
                        {t('follow me')}
                    </h4>

                    <div className="flex gap-1 -ml-3">

                        {
                            socialLinks
                                .filter(item => item.group === 'social')
                                .map((item, index) => (
                                    <Link
                                        key={`${item.href}-${index}`}
                                        href={item.href}
                                        target='_blank'
                                        aria-label={item.label ?? item.platform}
                                        className="p-3 rounded-md text-accent-fg hover:scale-110 transition-all duration-300"
                                    >
                                        <SocialIcon platform={item.platform} className="h-5 w-5" />
                                    </Link>

                                ))
                        }

                    </div>

                    <div className="flex gap-1 -ml-3">
                        {
                            socialLinks.filter(item => item.group === 'work').map((item, index) => (
                                <Link
                                    key={`${item.href}-${index}`}
                                    href={item.href}
                                    target='_blank'
                                    aria-label={item.label ?? item.platform}
                                    className="p-3 rounded-md text-accent-fg hover:scale-110 transition-all duration-300"
                                >
                                    <SocialIcon platform={item.platform} className="h-5 w-5" />
                                </Link>
                            ))
                        }
                    </div>

                </div>

                <div className="text-xs text-muted">&copy; {new Date().getFullYear()} {ownerName}. {t('all rights reserved')}</div>

            </div>

        </footer>
    )
}

export default Footer