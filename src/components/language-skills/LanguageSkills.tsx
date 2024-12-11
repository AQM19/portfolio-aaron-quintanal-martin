import { SkillConfig } from '@/core/config/skills/skill.config'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const LanguageSkills = () => {

    const localeActive = useLocale();

    return (
        <section aqm-data="language-skills" className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center'>


            {
                SkillConfig.map((item, index) => (
                    <Image
                        key={`${item.nemonic}-${index}`}
                        src={`./svg/${item.nemonic}.svg`}
                        alt={`${item.alt.get(localeActive)}`}
                        width={150}
                        height={150}
                        className='cursor-pointer hover:scale-110 transition-transform duration-300'
                    />
                ))
            }

        </section>
    )
}

export default LanguageSkills