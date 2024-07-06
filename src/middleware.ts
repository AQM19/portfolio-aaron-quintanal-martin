import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales, pathnames } from './config';

export default createMiddleware({
    defaultLocale: 'es',
    localePrefix,
    locales,
    pathnames
});
export const config = {
    matcher: [
        '/',
        '/(es|en)/:path*',
        '/((?!_next|_vercel|.*\\..*).*)'
    ]
};