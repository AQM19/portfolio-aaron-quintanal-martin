import { create } from "zustand";

interface State {
    isLoading: boolean;

    setIsLoading: () => void;
    setIsLoaded: () => void;
}

export const useUILoading = create<State>((set) => ({
    isLoading: false,
    setIsLoading: () => set({ isLoading: true }),
    setIsLoaded: () => set({ isLoading: false })
}))