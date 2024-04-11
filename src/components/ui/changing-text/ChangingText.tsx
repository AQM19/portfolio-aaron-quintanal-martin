'use client'

import { kanit } from "@/config/fonts";
import { thinsIAm } from "@/config/things-i-am/things-i-am";
import { randomInt } from "crypto";
import { useEffect, useState } from "react";

const ChangingText = () => {

    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isDeleting) {
                setCurrentText(currentText.slice(0, -1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % thinsIAm.length);
                }
                return;
            }
            if (currentText.length === thinsIAm[textIndex].length) {
                setTimeout(() => {
                    setIsDeleting(true);
                }, 3000); // Esperar 3 segundos antes de borrar
                return;
            }
            setCurrentText(currentText + thinsIAm[textIndex][currentText.length]);
        }, isDeleting ? 100 : 200);

        return () => clearTimeout(timeoutId);
    }, [currentText, isDeleting, textIndex]);

    return (
        <h2
            className={`text-3xl text-blue-700 dark:text-[#ffc491] font-bold ${kanit.className}`}
        >
            {currentText}

            <span className="typed-cursor typed-cursor--blink ">_</span>
        </h2>
    )
}

export default ChangingText