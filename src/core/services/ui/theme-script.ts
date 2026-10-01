// No React here: the root layout (a server component) imports the inline script from this module.

export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME: Theme = 'dark';

/**
 * Inline script for <head>: applies the saved theme before the first paint, so a visitor who chose the light
 * theme does not see the dark one flash while the page hydrates. Keep it in sync with `readTheme` (theme.service).
 */
export const themeInitScript = `(function(){try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light'){var r=document.documentElement;r.classList.remove('dark');r.classList.add('light');}}catch(e){}})();`;
