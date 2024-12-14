import React from 'react'

interface Props {
    value: string;
}

const Chip = ({ value }: Props) => {
    return (
        <span className="rounded-full bg-aero text-silver-900 dark:bg-emerald dark:text-night px-3 py-1 text-xs font-semibold shadow-sm transition-colors duration-300">
            {value}
        </span>
    )
}

export default Chip