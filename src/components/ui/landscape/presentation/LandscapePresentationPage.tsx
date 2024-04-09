'use client'

import React from 'react'
import CardImage from './presentation-card-image/CardImage';
import { useUIDarkMode } from '@/store';

import { inter, titleFont, ubuntu } from "@/config/fonts";
import CardResume from './presentation-card-image/CardResume';

// const imageUrl = "https://w0.peakpx.com/wallpaper/410/235/HD-wallpaper-shattered-shots-code-technology-abstract-lights-firefox-persona-theme.jpg";

interface Props {
    isDarkModeEnabled: boolean
}

const LandscapePresentationPage = () => {

    // const isDarkModeEnabled = useUIDarkMode(mode => mode.darkMode);
    // const imageUrl = isDarkModeEnabled ? 'https://i.imgur.com/us3Ye7j.jpeg' : 'https://w0.peakpx.com/wallpaper/410/235/HD-wallpaper-shattered-shots-code-technology-abstract-lights-firefox-persona-theme.jpg';

    return (
        <div
            className={`h-auto sm:h-screen flex flex-col sm:flex-row p-5 items-center justify-around transition-all duration-200`}
        >

            <CardImage />

            <CardResume />

        </div>
    )
}

export default LandscapePresentationPage