'use client'

import { Certification } from '@/core/interfaces/certification/certification.interface';
import { getLocaleFormattedDate } from '@/core/utils/date-format';
import React from 'react'
import { motion } from 'framer-motion';

interface Props {
    certification: Certification;
    localeActive: string;
    index: number;
}

const CertificationCard = ({ certification, localeActive, index }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5, delay: index
                    ? index * 0.4
                    : 0.2
            }}
            className="relative flex flex-col rounded p-4 bg-silver-700 dark:bg-night-600 shadow-lg hover:shadow-xl shadow-night-600 dark:shadow-silver-200 transition-all duration-300">
            <div className='flex-grow'>
                <h3 className='text-2xl font-semibold text-aero dark:text-emerald'>{certification.title}</h3>
                <p className='font-thin text-sm text-fluorescent_cyan-300 dark:text-raisin_black-800'>
                    {certification.organization}
                </p>
                {
                    certification.professor && (
                        <p className='font-thin text-sm text-fluorescent_cyan-300 dark:text-raisin_black-800'>
                            {certification.professor}
                        </p>
                    )
                }
            </div>

            <div className="mt-4">
                <p className="text-base mb-4">{certification.description.get(localeActive)}</p>

                <div className="flex items-center">
                    <span className='text-sm rounded-full bg-light_sky_blue px-4 font-thin ml-auto'>{`${getLocaleFormattedDate(certification.date, localeActive)}`}</span>
                </div>

                {
                    certification.calification && (
                        <p className='text-sm font-medium '>
                            <span className='text-'>
                                Nota media: {certification.calification}
                            </span>
                        </p>
                    )
                }

            </div>

        </motion.div>
    )
}

export default CertificationCard