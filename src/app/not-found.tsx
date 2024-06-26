'use client';

import { kanit } from '@/config/fonts';
import { Paths } from '@/interfaces/paths/paths.enum';
import { useUIDarkMode } from '@/store/ui/ui-dark-mode.store';
import Image from 'next/image';
import Link from 'next/link';

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {

    const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);

    return (
        <html lang="en">
            <body>
                <main className={`${isDarkModeEnabled ? 'dark' : 'light'}`}>
                    <section className='w-full h-screen flex flex-col p-5 items-center justify-evenly bg-gradient-to-l from-[#fff6ed] to-[#ffead5] dark:from-[#030637] dark:to-[#3C0753] transition-all duration-200'>

                        <Image
                            src="/imgs/404-not-found-cat.webp"
                            alt="Imagen de Aarón Quintanal Martín"
                            width={150}
                            height={150}
                        />

                        <div className='text-center'>
                            <h1 className={`${kanit.className} text-4xl md:text-6xl text-[#ed4709] dark:text-[#e2b5fd] font-thin`}>Oppsie!</h1>
                            <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                                Flurflix do it again!
                            </p>

                            <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                                <Link href={Paths.INDEX} className='text-[#ed4709] dark:text-[#e2b5fd]'>Go back</Link>. Sowwy.
                            </p>
                        </div>
                    </section>
                </main>
            </body>
        </html>
    );
}