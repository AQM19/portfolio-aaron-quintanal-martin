import { Pathnames, LocalePrefix } from 'next-intl/routing';

export const defaultLocale = 'es' as const;
export const locales = ['es', 'en'] as const;

export const pathnames: Pathnames<typeof locales> = {
    '/': '/',
    '/projects': {
        es: '/proyectos',
        en: '/projects'
    },
    '/project': {
        es: '/proyecto',
        en: '/project'
    },
    '/contact': {
        es: '/contacto',
        en: '/contact'
    },
    '/my-career': {
        es: '/mi-carrera',
        en: '/my-career'
    },
    '/admin/projects': {
        es: '/admin/proyectos',
        en: '/admin/projects'
    },
    '/admin/project': {
        es: '/admin/proyecto',
        en: '/admin/project'
    },
    '/admin/translations': {
        es: '/admin/traducciones',
        en: '/admin/translations'
    },
    '/admin/project-translations': {
        es: '/admin/traducciones-de-proyectos',
        en: '/admin/project-translations'
    },
    '/auth/login': {
        es: '/auth/iniciar-sesion',
        en: '/auth/login'
    },
    '/auth/new-account': {
        es: '/auth/nueva-cuenta',
        en: '/auth/new-account'
    }
};

export enum Paths {
    INDEX = '/',
    PROJECTS = '/projects',
    PROJECT = '/project',
    CONTACT = '/contact',
    MY_CAREER = '/my-career',
    ADMIN_PROJECTS = '/admin/projects',
    ADMIN_PROJECT = '/admin/project/',
    ADMIN_TRANSLATIONS = '/admin/translations',
    ADMIN_PROJECT_TRANSLATIONS = '/admin/project-translations',
    LOGIN = '/auth/login',
    NEW_ACCOUNT = '/auth/new-account',
}

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${port}`;