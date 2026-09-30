import { Analytics } from "@vercel/analytics/react"
import { getMessages } from "next-intl/server";
import { host } from "@/config";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react";
import Loading from "./loading";
import type { Metadata } from "next";
import { loadProfile } from "@/core/content";

import "./globals.css";

/** Absolute URL for social cards: site paths are resolved against the deployment host. */
const absolute = (url: string | undefined) => !url ? undefined : url.startsWith('/') ? `${host}${url}` : url;

/** SEO from the admin (Perfil y SEO), with the previous texts as local fallback. */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const { ownerName, seo } = await loadProfile(locale);
    const image = absolute(seo.ogImageUrl);

    return {
        title: seo.title,
        description: seo.description,
        authors: [
            {
                name: ownerName,
                url: host
            }
        ],
        keywords: seo.keywords,
        openGraph: {
            title: seo.title,
            description: seo.description,
            url: `${host}/${locale}`,
            locale,
            type: "website",
            images: image ? [{ url: image, alt: ownerName }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.description,
            site: '@AQuintanalMDev',
            creator: '@AQuintanalMDev',
            images: image ? [image] : undefined,
        },
        alternates: {
            canonical: `${host}/${locale}`,
            languages: Object.fromEntries(routing.locales.map((l) => [l, `${host}/${l}`])),
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
            title: seo.title,
            statusBarStyle: 'black-translucent',
        },
        category: 'development'
    };
}

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
