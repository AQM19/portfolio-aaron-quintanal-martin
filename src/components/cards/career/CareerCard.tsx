'use client'

import { Career } from '@/core/interfaces/career/career.interface';
import { getLocaleFormattedDate } from '@/core/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Props {
    stage: Career;
    localeActive: string;
    index: number;
}

const CareerCard = ({ stage, localeActive, index }: Props) => {

    const [expandedStage, setExpandedStage] = useState<number | null>(null)

    const toggleExpand = (index: number) => {
        setExpandedStage(expandedStage === index ? null : index)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}
        >
            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'sm:mr-8' : 'sm:ml-8'} rounded p-4 bg-silver-700 dark:bg-night-600 text-night dark:text-silver-900 transition-colors duration-300`}>

                <div>
                    <h3 className='text-2xl font-semibold text-center mb-2 text-aero dark:text-emerald'>{stage.empress}</h3>
                </div>

                <div>
                    <Image
                        src={stage.empressImage}
                        alt={''}
                        width={150}
                        height={150}
                        className='w-full h-64 object-cover'
                    />
                </div>

                <div className='mt-6'>
                    {
                        stage.descriptionHtml?.get(localeActive)
                            ? <div className="rich-text text-base mb-4 text-justify" dangerouslySetInnerHTML={{ __html: stage.descriptionHtml.get(localeActive)! }} />
                            : <p className="text-base mb-4 text-justify">{stage.description.get(localeActive)}</p>
                    }

                    {
                        stage.progression && (
                            <>
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="w-full border-4 rounded flex flex-row justify-center items-center gap-4 py-3 font-semibold text-aero dark:text-emerald border-aero dark:border-emerald"
                                >
                                    {
                                        expandedStage === index
                                            ? (
                                                <>
                                                    Hide Achievements <FaChevronUp className="ml-2 h-4 w-4" />
                                                </>
                                            )
                                            : (
                                                <>
                                                    Show Achievements <FaChevronDown className="ml-2 h-4 w-4" />
                                                </>
                                            )
                                    }
                                </button>

                                {
                                    expandedStage === index && (
                                        <motion.ul
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-4 space-y-2"
                                        >
                                            {
                                                stage.progression.map((achievement, achievementIndex) => (
                                                    <li
                                                        key={achievementIndex}
                                                        className="text-sm font-semibold">
                                                        <span className='text-aero dark:text-emerald mr-1'>{getLocaleFormattedDate(achievement.promotionDate, localeActive)}</span>
                                                        {achievement.position}
                                                    </li>
                                                ))
                                            }
                                        </motion.ul>
                                    )
                                }
                            </>
                        )
                    }

                </div>
            </div>
        </motion.div>
    )
}

export default CareerCard