'use client'

import { ThingIAm, thinsIAm } from "@/core/config/things-i-am/things-i-am.config";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const ChangingText = () => {

    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const localeActive = useLocale() as keyof ThingIAm;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isDeleting) {
                setCurrentText(currentText.slice(0, -1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % thinsIAm[localeActive].length);
                }
                return;
            }
            if (currentText.length === thinsIAm[localeActive][textIndex].length) {
                setTimeout(() => {
                    setIsDeleting(true);
                }, 3000); // Esperar 3 segundos antes de borrar
                return;
            }
            setCurrentText(currentText + thinsIAm[localeActive][textIndex][currentText.length]);
        }, isDeleting ? 50 : 200);

        return () => clearTimeout(timeoutId);
    }, [currentText, isDeleting, textIndex, localeActive]);

    return (
        <h2
            className={`text-3xl font-bold`}
        >
            {currentText}

            <span className="typed-cursor typed-cursor--blink ">_</span>
        </h2>
    )
}

export default ChangingText