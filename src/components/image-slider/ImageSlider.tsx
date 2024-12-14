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
        <div className="relative w-full max-w-3xl mx-auto">

            <div className="overflow-hidden aspect-w-16 aspect-h-9">
                {
                    images.map((src, index) => (
                        <Image
                            key={`slide-image-${index}`}
                            src={src}
                            alt={`Slide ${index + 1}`}
                            fill
                            className={`absolute top-0 left-0 object-cover transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                            priority={index === 0}
                        />
                    ))
                }
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                aria-label="Previous slide"
            >
                <FaChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                aria-label="Next slide"
            >
                <FaChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {
                    images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))
                }
            </div>

        </div>
    )
}