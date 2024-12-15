import CareerCard from '@/components/cards/career/CareerCard';
import { CareerConfig } from '@/core/config/career/career.config';
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

const CareerPage = () => {

    const t = useTranslations('Career');
    const localeActive = useLocale();

    return (
        <section className='py-24'>

            <div className="container mx-auto px-4 relative">

                <h1 className="text-3xl font-bold mb-8 text-center">
                    {t('title')}
                </h1>

                <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 border-2 rounded" />

                {
                    CareerConfig.map((stage, index) => (
                        <CareerCard
                            key={`${stage.empress}-${index}`}
                            stage={stage}
                            localeActive={localeActive}
                            index={index}
                        />
                    ))
                }

            </div>
        </section>
    )
}

export default CareerPage