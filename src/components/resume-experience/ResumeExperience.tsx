import { CareerConfig } from '@/core/config/career/career.config'
import { useLocale } from 'next-intl'
import React from 'react'

const ResumeExperience = () => {

    const localeActive = useLocale();

    return (
        <section aqm-data="resume-experience" className='flex flex-col items-center gap-20 py-16 text-night dark:text-silver-900'>
            <div className="px-0 py-8 overflow-x-auto">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute h-0.5 w-full bg-gray-200 top-5 left-0"></div>

                    {/* Timeline events */}
                    <div className="relative flex items-start justify-between min-w-max">
                        {
                            CareerConfig.map((event, index) => (
                                <div key={index} className="relative pt-8 px-2">
                                    {/* Year marker */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>

                                    {/* Event content */}
                                    <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300 w-48">
                                        <h3 className="font-bold text-lg mb-2">{event.empress}</h3>
                                        <p className="text-sm font-semibold text-blue-500 mb-1">{event.dateRange.get(localeActive)}</p>
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