import React from 'react'

interface Props {
    isOn: boolean
    handleToggle: () => void
    colorOn?: string
    colorOff?: string
}

const Switch = ({ isOn, handleToggle, colorOn = "bg-emerald", colorOff = "bg-night-600" }: Props) => {
    return (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isOn}
                    onChange={handleToggle}
                />
                <div
                    className={`block ${colorOff} w-14 h-8 rounded-full ${isOn ? colorOn : colorOff}`}
                ></div>
                <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isOn ? "transform translate-x-full" : ""}`}
                ></div>
            </div>
        </label>
    )
}

export default Switch