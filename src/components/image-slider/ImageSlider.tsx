'use client'

import React, { useState, useEffect, useCallback, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/** Visitor preference for reduced motion (false while server rendering). */
const usePrefersReducedMotion = () => useSyncExternalStore(
    (onChange) => {
        const query = window.matchMedia(REDUCED_MOTION);
        query.addEventListener('change', onChange);
        return () => query.removeEventListener('change', onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
);

interface ImageSliderProps {
    images: string[]
    interval?: number
}

export default function ImageSlider({ images, interval = 3000 }: ImageSliderProps) {
    const t = useTranslations('Slider');
    const [currentIndex, setCurrentIndex] = useState(0)
    // Paused by the button, or while the pointer/focus is inside the slider (temporary).
    // Without an explicit choice, autoplay is off for visitors who ask for reduced motion.
    const prefersReducedMotion = usePrefersReducedMotion()
    const [pauseChoice, setPauseChoice] = useState<boolean | null>(null)
    const isPaused = pauseChoice ?? prefersReducedMotion
    const [isHeld, setIsHeld] = useState(false)

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, [images.length])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }, [images.length])

    useEffect(() => {
        if (isPaused || isHeld) return

        const timer = setInterval(() => {
            nextSlide()
        }, interval)

        return () => clearInterval(timer)
    }, [nextSlide, interval, isPaused, isHeld])

    const arrowClass = 'absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 border border-line text-accent-fg hover:bg-surface-hover transition-colors duration-300';

    return (
        <div
            className="relative w-full max-w-6xl mx-auto flex flex-col justify-center items-center"
            onMouseEnter={() => setIsHeld(true)}
            onMouseLeave={() => setIsHeld(false)}
            onFocus={() => setIsHeld(true)}
            onBlur={() => setIsHeld(false)}
        >

            <div className="relative overflow-hidden justify-center items-center flex h-[400px] sm:h-[700px] w-full max-w-[300px] sm:max-w-[600px]">
                {
                    images.map((src, index) => (
                        <Image
                            key={`slide-image-${index}`}
                            src={src}
                            alt={t('image', { index: index + 1, total: images.length })}
                            width={600}
                            height={400}
                            className={`absolute object-contain transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                            priority={index === 0}
                        />
                    ))
                }
            </div>

            <button
                onClick={prevSlide}
                className={`${arrowClass} left-0 sm:-left-16`}
                aria-label={t('previous')}
            >
                <FaChevronLeft size={20} />
            </button>

            <button
                onClick={nextSlide}
                className={`${arrowClass} right-0 sm:-right-16`}
                aria-label={t('next')}
            >
                <FaChevronRight size={20} />
            </button>

            <div className="flex items-center mt-4">
                <button
                    onClick={() => setPauseChoice(!isPaused)}
                    className="p-3 rounded-full text-accent-fg hover:bg-surface-hover transition-colors"
                    aria-label={isPaused ? t('play') : t('pause')}
                >
                    {isPaused ? <FaPlay size={12} /> : <FaPause size={12} />}
                </button>

                {
                    images.map((_, index) => (
                        // 12px dot inside a 28px touch target
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className="p-2 flex items-center justify-center rounded-full"
                            aria-label={t('go to', { index: index + 1 })}
                            aria-current={index === currentIndex ? 'true' : undefined}
                        >
                            <span className={`block h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-6 bg-accent-fg' : 'w-3 bg-line-strong'}`} />
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
