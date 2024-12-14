import { CertificationConfig } from '@/core/config/certifications/certification.config'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import CertificationCard from '../cards/certification-card/CertificationCard'

const ResumeCertifications = () => {

    const t = useTranslations('Resume certifications');
    const localeActive = useLocale();
    const lenght = CertificationConfig.length;
    const max = 6;
    const sortedCertifications = CertificationConfig.sort((a, b) => { return b.date.getTime() - a.date.getTime(); });
    const lastCertifications = sortedCertifications.slice(lenght - max, lenght);

    return (
        <section aqm-data="resume-experience" className='flex flex-col items-center gap-20 py-16 text-night dark:text-silver-900'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center container'>

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