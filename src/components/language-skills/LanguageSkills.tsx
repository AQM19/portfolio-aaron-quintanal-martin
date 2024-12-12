import { SkillConfig } from '@/core/config/skills/skill.config'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import SkillCard from '../cards/skill-card/SkillCard'

const LanguageSkills = () => {

    const t = useTranslations("Language skills");
    const localeActive = useLocale();

    return (
        <section aqm-data="language-skills" className='flex flex-col items-center gap-20 py-16 text-night dark:text-silver-900'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>
            

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-16 justify-items-center'>

                {
                    SkillConfig.map((item, index) => (
                        item.isEnabled && (
                            <SkillCard
                                key={`${item.nemonic}-${index}`}
                                skill={item}
                                localeActive={localeActive} />
                        )
                    ))
                }
            </div>

        </section>
    )
}

export default LanguageSkills