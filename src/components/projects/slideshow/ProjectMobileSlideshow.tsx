'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import Image from 'next/image';
import { ProjectImage } from '@/interfaces';

interface Props {
    images: ProjectImage[];
    title: string;
    className?: string;
}

const ProjectMobileSlideshow = ({ images, title, className }: Props) => {
    return (
        <div className={className}>

            {/* Primer swiper */}
            <Swiper
                style={{
                    width: '90vw',
                    height: '400px'
                }}
                pagination
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image.id}>
                            <Image
                                width={600}
                                height={500}
                                src={`${image.url}`}
                                alt={title}
                                className='object-fill'
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    )
}

export default ProjectMobileSlideshow