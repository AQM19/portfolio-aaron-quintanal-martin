export const CATEGORIES = [
    'personal',
    'freelance',
    'private',
    'employee',
    'academic',
] as const;

export type Category = (typeof CATEGORIES)[number];
