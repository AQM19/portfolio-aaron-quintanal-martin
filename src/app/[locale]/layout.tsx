import { Analytics } from "@vercel/analytics/react"
import { host } from "@/config";
import { inter } from "@/config/fonts/fonts";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Provider } from '../../components/providers/Provider';
import type { Metadata } from "next";

import "./globals.css";

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

export default function RootLayout({ children, params: { locale } }: Readonly<{ children: React.ReactNode; params: { locale: string }; }>) {

    const messages = useMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Provider>
                        {children}
                        <Analytics />
                    </Provider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
