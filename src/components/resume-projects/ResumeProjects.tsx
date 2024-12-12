import { useLocale, useTranslations } from 'next-intl';
import React from 'react'

const ResumeProjects = () => {

    const t = useTranslations("Resume projects");
    const localeActive = useLocale();

    return (
        <section aqm-data="resume-projects" className='flex flex-col items-center gap-20 py-16 text-night dark:text-silver-900'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

        </section>
    )
}

export default ResumeProjects