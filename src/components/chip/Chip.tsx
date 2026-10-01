import React from 'react'

interface Props {
    value: string;
    /** `#RRGGBB` background (e.g. an admin catalog color); without it the theme colors are used. */
    color?: string;
    /** `outline` for secondary information such as tags; `solid` (default) for category and status. */
    variant?: 'solid' | 'outline';
}

/** WCAG relative luminance of a `#RRGGBB` color. */
const luminance = (hex: string) => {
    const [r, g, b] = [1, 3, 5]
        .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
        .map((c) => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const contrast = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** Dark or white text, whichever has the higher WCAG contrast against the background. */
const textColorFor = (hex: string) => {
    const background = luminance(hex);
    return contrast(background, luminance('#111827')) >= contrast(background, 1) ? '#111827' : '#FFFFFF';
}

const Chip = ({ value, color, variant = 'solid' }: Props) => {
    const custom = color && /^#[0-9A-Fa-f]{6}$/.test(color);

    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${custom ? '' : variant === 'outline' ? 'border border-line-strong text-foreground' : 'bg-accent text-on-accent'}`}
            style={custom ? { backgroundColor: color, color: textColorFor(color) } : undefined}
        >
            {value}
        </span>
    )
}

export default Chip
