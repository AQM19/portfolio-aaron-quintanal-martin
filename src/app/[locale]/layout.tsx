import { Analytics } from "@vercel/analytics/react"
import { host } from "@/config";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react";
import Loading from "./loading";
import type { Metadata } from "next";

import "./globals.css";
import { getMessages } from "next-intl/server";


type MetadataTranslations = {
    title: string;
    description: string;
    ogDescription: string;
    twitterDescription: string;
};

const translations: Record<string, MetadataTranslations> = {
    es: {
        title: "Aarón Quintanal Martín - Desarrollador Full Stack",
        description: "Aarón Quintanal Martín es un desarrollador full stack especializado en Angular, Next.js y .NET, ubicado en Cantabria.",
        ogDescription: "Conoce a Aarón Quintanal Martín, un experto desarrollador full stack en tecnologías modernas.",
        twitterDescription: "Aarón Quintanal Martín es un desarrollador full stack con experiencia en Angular, Next.js y .NET.",
    },
    en: {
        title: "Aarón Quintanal Martín - Full Stack Developer",
        description: "Aarón Quintanal Martín is a full stack developer specialized in Angular, Next.js and .NET, based in Cantabria.",
        ogDescription: "Meet Aarón Quintanal Martín, an expert full stack developer in modern technologies.",
        twitterDescription: "Aarón Quintanal Martín is a full stack developer with experience in Angular, Next.js and .NET.",
    }
};

const getKeywords = (locale: string) => {
    const baseKeywords = ["Aarón Quintanal Martín", "Cantabria", "Angular", "Next.js", ".NET"];

    const localizedKeywords = {
        es: ["programador", "desarrollador", "full stack"],
        en: ["programmer", "developer", "full stack"]
    };

    return [...baseKeywords, ...(localizedKeywords[locale as keyof typeof localizedKeywords] || [])];
};

export const generateMetadata = async (locale: string): Promise<Metadata> => {
    const t = translations[locale] || translations.en; // Fallback to English if locale not found

    return {
        title: t.title,
        description: t.description,
        authors: [
            {
                name: 'Aarón',
                url: host
            }
        ],
        keywords: getKeywords(locale),
        openGraph: {
            title: t.title,
            description: t.ogDescription,
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
            title: t.title,
            description: t.twitterDescription,
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
            title: t.title,
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
};

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {

    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Madrid">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                    <Analytics />
                    <SpeedInsights />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
