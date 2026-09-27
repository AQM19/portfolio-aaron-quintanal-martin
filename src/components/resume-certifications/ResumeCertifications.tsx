import { Certification } from '@/core/interfaces/certification/certification.interface'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import CertificationCard from '../cards/certification-card/CertificationCard'

interface Props {
    certifications: Certification[];
}

const ResumeCertifications = ({ certifications }: Props) => {

    const t = useTranslations('Resume certifications');
    const localeActive = useLocale();
    const max = 6;
    const sortedCertifications = [...certifications].sort((a, b) => { return b.date.getTime() - a.date.getTime(); });
    const lastCertifications = sortedCertifications.slice(-max);

    return (
        <section aqm-data="resume-experience" className='flex flex-col items-center gap-20 py-16 text-night dark:text-silver-900'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

            <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center container px-5'>

                {
                    lastCertifications.map((item, index) => (
                        <CertificationCard
                            key={`${item.title}-${index}`}
                            certification={item}
                            localeActive={localeActive}
                            index={index}
                        />
                    ))
                }

            </div>

        </section>
    )
}

export default ResumeCertifications