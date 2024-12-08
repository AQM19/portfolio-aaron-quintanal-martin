'use client'

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { FaFlag } from 'react-icons/fa';
import { localesConfig } from '../../../core/config/locales/locale';
import Image from 'next/image';

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

            <button onClick={() => setIsListOpen(!isListOpen)} className='px-4 py-2 text-[#ed4709] dark:text-[#e2b5fd]'>
                <FaFlag size={20} />
            </button>

            {isListOpen && (
                <div className='absolute top-10 border-2 rounded bg-white shadow-md z-10'>
                    <ul>
                        {
                            localesConfig.map((value, index) => (
                                <li key={index}>
                                    <button
                                        className={`py-2 px-4 w-full text-left ${localActive === value.lang ? 'bg-gray-200' : ''}`}
                                        onClick={() => handleLanguageChange(value.lang)}
                                        disabled={isPending}
                                    >
                                        <Image
                                            src={value.source}
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
            )}
        </div>
    )
}

export default LocalSwitcher