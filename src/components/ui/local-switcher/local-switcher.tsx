'use client'

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { FaFlag } from 'react-icons/fa';

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

            <button onClick={() => setIsListOpen(!isListOpen)} className='px-4 py-2'>
                <FaFlag size={20} />
            </button>

            {isListOpen && (
                <div className='absolute top-10 border-2 rounded bg-white shadow-md z-10'>
                    <ul>
                        <li>
                            <button
                                className={`py-2 px-4 w-full text-left ${localActive === 'es' ? 'bg-gray-200' : ''
                                    }`}
                                onClick={() => handleLanguageChange('es')}
                                disabled={isPending}
                            >
                                <img src="/svg/spain.flag.svg" alt="" />
                            </button>
                        </li>
                        <li>
                            <button
                                className={`py-2 px-4 w-full text-left ${localActive === 'en' ? 'bg-gray-200' : ''
                                    }`}
                                onClick={() => handleLanguageChange('en')}
                                disabled={isPending}
                            >
                                <img src="/svg/united-kingdom.flag.svg" alt="" />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default LocalSwitcher