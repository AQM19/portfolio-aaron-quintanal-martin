import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales } from './navigation';

export default createMiddleware({
    defaultLocale: 'es',
    localePrefix,
    locales
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(es|en)/:path*']
};