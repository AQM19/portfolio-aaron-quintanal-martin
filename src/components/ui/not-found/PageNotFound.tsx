import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl";
import { inter, kanit } from "@/config/index";
import "../../../app/[locale]/globals.css";
import { Link } from "@/navigation";
import { Paths, host } from "@/config";

export const metadata: Metadata = {
    title: "Aarón Quintanal Martín - Desarrollador Full Stack",
    description: "Aarón Quintanal Martín es un desarrollador full stack especializado en Angular, Next.js y .NET, ubicado en Cantabria.",
    authors: [
        {
            name: 'Aarón',
            url: host
        }
    ],
    keywords: ["Aarón Quintanal Martín", "Cantabria", "programador", "desarrollador", "full stack", "Angular", "Next.js", ".NET"],
    openGraph: {
        title: "Aarón Quintanal Martín - Desarrollador Full Stack",
        description: "Conoce a Aarón Quintanal Martín, un experto desarrollador full stack en tecnologías modernas.",
        url: host,
        type: "website",
        images: [
            {
                url: `${host}/imgs/aaron-quintanal-martin.png`,
                width: 800,
                height: 600,
                alt: "Aarón Quintanal Martín",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Aarón Quintanal Martín - Desarrollador Full Stack",
        description: "Aarón Quintanal Martín es un desarrollador full stack con experiencia en Angular, Next.js y .NET.",
        site: '@AQuintanalMDev',
        creator: '@AQuintanalMDev',
        images: [
            `${host}/imgs/aaron-quintanal-martin.png`
        ]
    },
    alternates: {
        canonical: host,
        languages: {
            'en': `${host}/en`,
            'es': `${host}/es`
        }
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    appleWebApp: {
        title: 'Aarón Quintanal Martín - Desarrollador Full Stack',
        statusBarStyle: 'black-translucent',
        startupImage: [
            '/imgs/aaron-quintanal-martin.png',
            {
                url: '/assets/imgs/aaron-quintanal-martin.png',
                media: '(device-width: 768px) and (device-height: 1024px)',
            },
        ],
    },
    assets: [
        `${host}/assets`,
    ],
    category: 'development'
};

export default function PageNotFound() {

    const messages = useMessages();
    const locale = useLocale();
    const t = useTranslations("Not Found");

    return (
        <html lang={locale}>
            <body className={`${inter.className} w-full min-h-screen h-auto`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <main
                        className="flex flex-col min-h-screen h-auto w-full items-center justify-center">

                        <h1 className={`${kanit.className} text-4xl md:text-6xl text-[#ed4709] dark:text-[#e2b5fd] font-thin`}>
                            {t('title')}
                        </h1>

                        <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                            {t('body')}
                        </p>

                        <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                            <Link href={Paths.INDEX} className='text-[#ed4709] dark:text-[#e2b5fd]'>
                                {t('button')}
                            </Link>
                        </p>

                    </main>
                    <Analytics />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
