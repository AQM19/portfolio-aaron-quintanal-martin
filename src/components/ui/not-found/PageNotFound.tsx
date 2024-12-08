import "../../../app/[locale]/globals.css";
import { Analytics } from "@vercel/analytics/react"
import { NextIntlClientProvider, useLocale, useMessages, useTranslations } from "next-intl";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Link } from "@/i18n/routing";

export default function PageNotFound() {

    const messages = useMessages();
    const locale = useLocale();
    const t = useTranslations("Not Found");

    return (
        <html lang={locale}>
            <body className={`w-full min-h-screen h-auto`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <main
                        className="flex flex-col min-h-screen h-auto w-full items-center justify-center">

                        <h1 className={`text-4xl md:text-6xl text-[#ed4709] dark:text-[#e2b5fd] font-thin`}>
                            {t('title')}
                        </h1>

                        <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                            {t('body')}
                        </p>

                        <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty font-semibold'>
                            <Link href={'/'} className='text-[#ed4709] dark:text-[#e2b5fd]'>
                                {t('button')}
                            </Link>
                        </p>

                    </main>
                    <Analytics />
                    <SpeedInsights />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
