import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/** Rendered inside the [locale] layout, which already provides <html>, <body>, the i18n provider and analytics. */
export default function PageNotFound() {

    const t = useTranslations("Not Found");

    return (
        <main
            className="flex flex-col min-h-screen h-auto w-full items-center justify-center px-5 text-center bg-background text-foreground">

            <h1 className={`text-4xl md:text-6xl text-accent-fg font-light`}>
                {t('title')}
            </h1>

            <p className='mt-5 max-w-prose text-lg text-pretty font-semibold'>
                {t('body')}
            </p>

            <p className='mt-8'>
                <Link href={'/'} className='btn btn-secondary'>
                    {t('button')}
                </Link>
            </p>

        </main>
    );
}
