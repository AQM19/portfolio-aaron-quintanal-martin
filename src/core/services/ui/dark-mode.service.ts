import { create } from 'zustand'

interface State {
    darkMode: boolean;

    enableDarkMode: () => void;
    disableDarkMode: () => void;
}

export const useUIDarkMode = create<State>()((set) => ({
    darkMode: false,
    enableDarkMode: () => set({ darkMode: true }),
    disableDarkMode: () => set({ darkMode: false })
}));