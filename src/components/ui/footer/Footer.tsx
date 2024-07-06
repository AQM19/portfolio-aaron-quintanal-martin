import React from 'react'
import { Link } from '@/navigation';
import { FaXTwitter } from 'react-icons/fa6';
import { FiFacebook } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Paths } from '@/config';
import AQMIcon from '@/components/icons/AQMIcon';

const Footer = () => {

    const t = useTranslations("Footer");

    return (
        <footer
            className="py-8 md:py-12 px-6 sm:px-0 w-full flex flex-row items-center justify-center bg-transparent bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200"
        >

            <div
                className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-[#ed4709] dark:text-[#e2b5fd]"
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
                    <Link
                        href={Paths.INDEX}
                        className="text-sm hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {t('index')}
                    </Link>

                    <Link
                        href={Paths.PROJECTS}
                        className="text-sm hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {t('projects')}
                    </Link>

                    <Link
                        href={Paths.CONTACT}
                        className="text-sm hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {t('contact')}
                    </Link>

                    <Link
                        href={Paths.MY_CAREER}
                        className="text-sm hover:underline underline-offset-4"
                        prefetch={false}
                    >
                        {t('career')}
                    </Link>
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
                        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                            <FaXTwitter className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                            <FiFacebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
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