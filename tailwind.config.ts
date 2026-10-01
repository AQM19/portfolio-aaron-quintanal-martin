import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  future: {
    // `hover:` only on devices with a real pointer: on touch screens hover sticks after the tap
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Semantic tokens (globals.css), they switch with the `dark`/`light` class on <html>
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          hover: "rgb(var(--surface-hover) / <alpha-value>)",
        },
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          fg: "rgb(var(--accent-fg) / <alpha-value>)",
          'fg-hover': "rgb(var(--accent-fg-hover) / <alpha-value>)",
        },
        'on-accent': "rgb(var(--on-accent) / <alpha-value>)",
        line: {
          DEFAULT: "rgb(var(--line) / <alpha-value>)",
          strong: "rgb(var(--line-strong) / <alpha-value>)",
        },
        field: "rgb(var(--field) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        favourite: "rgb(var(--favourite) / <alpha-value>)",
        // DARK
        'night': {
          DEFAULT: '#0c0b10',
          100: '#020203',
          200: '#050406',
          300: '#070609',
          400: '#09080c',
          500: '#0c0b10',
          600: '#363249',
          700: '#615982',
          800: '#938cb1',
          900: '#c9c5d8'
        },
        'emerald': {
          DEFAULT: '#2dba77',
          100: '#092517',
          200: '#124a2f',
          300: '#1b6f46',
          400: '#24945e',
          500: '#2dba77',
          600: '#4ad391',
          700: '#78dead',
          800: '#a5e9c8',
          900: '#d2f4e4'
        },
        'raisin_black': {
          DEFAULT: '#25272a',
          100: '#070808',
          200: '#0e0f10',
          300: '#161718',
          400: '#1d1e20',
          500: '#25272a',
          600: '#4d5156',
          700: '#757b84',
          800: '#a3a7ae',
          900: '#d1d3d6'
        },
        // DARK
        // LIGHT
        'fluorescent_cyan': {
          DEFAULT: '#23e2ea',
          100: '#053031',
          200: '#096063',
          300: '#0e9094',
          400: '#12c0c6',
          500: '#23e2ea',
          600: '#50e9ef',
          700: '#7beff3',
          800: '#a7f4f7',
          900: '#d3fafb'
        },
        'aero': {
          DEFAULT: '#3cbdd8',
          100: '#09282e',
          200: '#12505c',
          300: '#1b788a',
          400: '#249fb8',
          500: '#3cbdd8',
          600: '#62cbe0',
          700: '#89d8e8',
          800: '#b1e5f0',
          900: '#d8f2f7'
        },
        'silver': {
          DEFAULT: '#b5b5b7',
          100: '#242425',
          200: '#484849',
          300: '#6c6c6e',
          400: '#909092',
          500: '#b5b5b7',
          600: '#c3c3c4',
          700: '#d2d2d3',
          800: '#e1e1e2',
          900: '#f0f0f0'
        },
        // LIGHT
      },
    },
  },
  plugins: [],
} satisfies Config;
