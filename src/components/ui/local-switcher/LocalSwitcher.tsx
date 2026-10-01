'use client'

import { IoLanguageSharp } from 'react-icons/io5';
import { LocaleConfig } from '../../../core/config/locales/locale';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState, useTransition } from 'react'

const LocalSwitcher = () => {
    const [isPending, startTransition] = useTransition();
    const [isListOpen, setIsListOpen] = useState(false);

    const t = useTranslations('Menu');
    const router = useRouter();
    const localActive = useLocale();

    const handleLanguageChange = (locale: string) => {
        const currentUrl = new URL(window.location.href).pathname.replace(/^\/[a-z]{2}/, locale);

        startTransition(() => {
            router.replace(`/${currentUrl}`);
        });

        setIsListOpen(false);
    };

    return (
        <div className='relative'>

            <button
                onClick={() => setIsListOpen(!isListOpen)}
                className='px-4 py-2 rounded-md text-accent-fg'
                aria-label={t('language')}
                aria-expanded={isListOpen}
            >
                <IoLanguageSharp size={30} />
            </button>

            <div
                className={`absolute top-10 border-2 border-line-strong rounded bg-background shadow-md z-10
                transition-all duration-300 ease-in-out
                ${isListOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none invisible'}`}
            >
                <ul>
                    {
                        LocaleConfig.map((value, index) => (
                            <li key={index}>
                                <button
                                    className={`py-2 px-4 w-full text-left transition-colors duration-300 hover:bg-surface-hover ${localActive === value.lang ? 'bg-surface-hover shadow-[inset_3px_0_0_rgb(var(--accent-fg))]' : ''}`}
                                    aria-current={localActive === value.lang ? 'true' : undefined}
                                    onClick={() => handleLanguageChange(value.lang)}
                                    disabled={isPending}
                                >
                                    <Image
                                        src={`/svg/${value.lang}.flag.svg`}
                                        alt={value.alt}
                                        width={150}
                                        height={150}
                                    />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default LocalSwitcher