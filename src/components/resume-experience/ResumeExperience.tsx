import { CareerConfig } from '@/core/config/career/career.config'
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'

const ResumeExperience = () => {

    const t = useTranslations('Resume experience');
    const localeActive = useLocale();
    const max = 5;
    const lastCareerConfig = CareerConfig.slice(CareerConfig.length - max, CareerConfig.length);

    return (
        <section aqm-data="resume-experience" className='hidden xl:flex flex-col items-center gap-20 y-16 text-night dark:text-silver-900'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

            <div className="container overflow-x-auto w-full px-5">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute h-full sm:h-0.5 w-0.5 sm:w-full bg-night dark:bg-silver top-5 left-0"></div>

                    {/* Timeline events */}
                    <div className="relative flex flex-col sm:flex-row items-start justify-between min-w-max">
                        {
                            lastCareerConfig.map((event, index) => (
                                <div
                                    key={`${event.empress}-${index}`}
                                    className="relative pt-8 px-2"
                                >
                                    {/* Year marker */}
                                    <div className="absolute top-1/2 sm:top-0 left-0 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-aero dark:bg-emerald border-2 border-silver"></div>

                                    {/* Event content */}
                                    <div className="bg-silver-700 dark:bg-night-600 p-4 ml-10 sm:ml-0 mb-10 rounded shadow-lg hover:shadow-xl shadow-night-600 dark:shadow-silver-200 transition-shadow duration-300 w-48">
                                        <h3 className="font-bold text-lg mb-2 text-fluorescent_cyan-300 dark:text-emerald">{event.empress}</h3>
                                        <p className="text-sm font-semibold text-night dark:text-silver mb-1">{event.dateRange.get(localeActive)}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResumeExperience