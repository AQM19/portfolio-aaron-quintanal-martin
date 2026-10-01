'use client'

import { useEffect, useState } from "react";

interface Props {
    /** Phrases typed and deleted in a loop (edited in the admin, per language). */
    taglines: string[];
}

const ChangingText = ({ taglines }: Props) => {

    const [currentText, setCurrentText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (taglines.length === 0) return;
        const phrase = taglines[textIndex % taglines.length];

        const timeoutId = setTimeout(() => {
            if (isDeleting) {
                setCurrentText(currentText.slice(0, -1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % taglines.length);
                }
                return;
            }
            if (currentText.length === phrase.length) {
                setTimeout(() => {
                    setIsDeleting(true);
                }, 3000);
                return;
            }
            setCurrentText(currentText + phrase[currentText.length]);
        }, isDeleting ? 50 : 200);

        return () => clearTimeout(timeoutId);
    }, [currentText, isDeleting, textIndex, taglines]);

    return (
        <h2 className={`text-4xl font-bold text-accent-fg`}>
            {currentText}
            <span className="typed-cursor typed-cursor--blink">_</span>
        </h2>
    )
}

export default ChangingText