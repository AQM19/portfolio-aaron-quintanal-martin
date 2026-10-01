import { useSyncExternalStore } from 'react';
import { DEFAULT_THEME, Theme, THEME_STORAGE_KEY } from './theme-script';

export type { Theme } from './theme-script';

const listeners = new Set<() => void>();

const readTheme = (): Theme => {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : DEFAULT_THEME;
    } catch {
        // Storage blocked (private mode, cookies disabled): the default theme still works
        return DEFAULT_THEME;
    }
};

const subscribe = (onChange: () => void) => {
    listeners.add(onChange);
    // Another tab changed the theme
    const onStorage = (event: StorageEvent) => event.key === THEME_STORAGE_KEY && onChange();
    window.addEventListener('storage', onStorage);

    return () => {
        listeners.delete(onChange);
        window.removeEventListener('storage', onStorage);
    };
};

/** The theme lives on <html>, so the body, native controls (color-scheme) and the color tokens follow it. */
export const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
};

export const setTheme = (theme: Theme) => {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Not persisted, but it still applies to this visit
    }
    applyTheme(theme);
    listeners.forEach((listener) => listener());
};

/** Current theme; the server always renders the default one. */
export const useTheme = (): Theme => useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);
