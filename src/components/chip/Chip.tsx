import React from 'react'

interface Props {
    value: string;
    /** `#RRGGBB` background (e.g. an admin catalog color); without it the theme colors are used. */
    color?: string;
}

/** Dark text on light backgrounds and white on dark ones, by relative luminance. */
const textColorFor = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.6 ? '#111827' : '#FFFFFF';
}

const Chip = ({ value, color }: Props) => {
    const custom = color && /^#[0-9A-Fa-f]{6}$/.test(color);

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-colors duration-300 ${custom ? '' : 'bg-aero text-silver-900 dark:bg-emerald dark:text-night'}`}
            style={custom ? { backgroundColor: color, color: textColorFor(color) } : undefined}
        >
            {value}
        </span>
    )
}

export default Chip
