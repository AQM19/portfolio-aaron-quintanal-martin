'use client'

import { AboutMeData, AboutMeDetails } from "@/core/config/about-me-details/about-me-details.config";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const ChangingText = () => {

    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const localeActive = useLocale() as keyof AboutMeData;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isDeleting) {
                setCurrentText(currentText.slice(0, -1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % AboutMeDetails[localeActive].length);
                }
                return;
            }
            if (currentText.length === AboutMeDetails[localeActive][textIndex].length) {
                setTimeout(() => {
                    setIsDeleting(true);
                }, 3000);
                return;
            }
            setCurrentText(currentText + AboutMeDetails[localeActive][textIndex][currentText.length]);
        }, isDeleting ? 50 : 200);

        return () => clearTimeout(timeoutId);
    }, [currentText, isDeleting, textIndex, localeActive]);

    return (
        <h2 className={`text-4xl font-bold text-aero dark:text-emerald`}>
            {currentText}
            <span className="typed-cursor typed-cursor--blink">_</span>
        </h2>
    )
}

export default ChangingText