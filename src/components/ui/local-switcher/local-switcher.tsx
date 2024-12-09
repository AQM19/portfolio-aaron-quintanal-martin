'use client'

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { FaFlag } from 'react-icons/fa';
import { LocaleConfig } from '../../../core/config/locales/locale';
import Image from 'next/image';
import { IoLanguageSharp } from 'react-icons/io5';

const LocalSwitcher = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const localActive = useLocale();
    const [isListOpen, setIsListOpen] = useState(false);

    const handleLanguageChange = (locale: string) => {

        const currentUrl = new URL(window.location.href).pathname.replace(/^\/[a-z]{2}/, locale);

        startTransition(() => {
            router.replace(`/${currentUrl}`);
        });
        setIsListOpen(false);
    };

    return (
        <div className='relative'>

            <button onClick={() => setIsListOpen(!isListOpen)} className='px-4 py-2 text-emerald'>
                <IoLanguageSharp size={30} />
            </button>

            <div
                className={`absolute top-10 border-2 border-night-600 rounded bg-night shadow-md z-10
                transition-all duration-300 ease-in-out
                ${isListOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}
            >
                <ul>
                    {LocaleConfig.map((value, index) => (
                        <li key={index}>
                            <button
                                className={`py-2 px-4 w-full text-left ${localActive === value.lang ? 'bg-night-600' : ''
                                    }`}
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
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default LocalSwitcher