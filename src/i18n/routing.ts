import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localePrefix: 'always',
    pathnames: {
        "/": "/",
        "/projects": {
            "es": '/proyectos',
            "en": '/projects'
        },
        "/projects/[slug]": {
            "es": '/proyectos/[slug]',
            "en": '/projects/[slug]'
        },
        "/contact": {
            "es": '/contacto',
            "en": '/contact'
        },
        '/career': {
            "es": '/carrera',
            "en": '/career'
        },
        '/privacy': {
            "es": '/privacidad',
            "en": '/privacy'
        },
    }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);