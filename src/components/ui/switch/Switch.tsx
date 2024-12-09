import React from 'react'

interface SwitchProps {
    isOn: boolean
    handleToggle: () => void
    colorOn?: string
    colorOff?: string
}

const Switch: React.FC<SwitchProps> = ({
    isOn,
    handleToggle,
    colorOn = "bg-green-500",
    colorOff = "bg-gray-300"
}) => {
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
                    className={`block ${colorOff} w-14 h-8 rounded-full ${isOn ? colorOn : colorOff
                        }`}
                ></div>
                <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isOn ? "transform translate-x-full" : ""
                        }`}
                ></div>
            </div>
        </label>
    )
}

export default Switch