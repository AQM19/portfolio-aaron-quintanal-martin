import { useTranslations } from 'next-intl'
import React from 'react'

const ResumeCertifications = () => {

    const t = useTranslations('Resume certifications')

    return (
        <section aqm-data="resume-experience" className='flex flex-col items-center gap-20 py-16 text-night dark:text-silver-900'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-16 justify-items-center container'>



            </div>

        </section>
    )
}

export default ResumeCertifications