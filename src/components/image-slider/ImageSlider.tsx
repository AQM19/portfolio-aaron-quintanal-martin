'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageSliderProps {
    images: string[]
    interval?: number
}

export default function ImageSlider({ images, interval = 3000 }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, [images.length])

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    }, [images.length])

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, interval)

        return () => clearInterval(timer)
    }, [nextSlide, interval])

    return (
        <div className="relative w-full max-w-6xl mx-auto flex flex-col justify-center items-center">

            <div className="relative overflow-hidden justify-center items-center flex h-[400px] sm:h-[700px] w-[300px] sm:w-[600px]">
                {
                    images.map((src, index) => (
                        <Image
                            key={`slide-image-${index}`}
                            src={src}
                            alt={`Slide ${index + 1}`}
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
                className="absolute -left-10 sm:-left-16 xl:-left-16 top-1/2 transform -translate-y-1/2 hover:bg-night-600 hover:dark:bg-silver-300 text-aero dark:text-emerald p-2 rounded-md hover:bg-opacity-75 transition-all duration-300"
                aria-label="Previous slide"
            >
                <FaChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute -right-10 sm:-right-16 top-1/2 transform -translate-y-1/2 hover:bg-night-600 hover:dark:bg-silver-300 text-aero dark:text-emerald p-2 rounded-md hover:bg-opacity-75 transition-all duration-300"
                aria-label="Next slide"
            >
                <FaChevronRight size={24} />
            </button>

            <div className="flex space-x-2 mt-4">
                {
                    images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-night-600' : 'bg-silver'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))
                }
            </div>
        </div>
    )
}