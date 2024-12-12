import { SkillConfig } from '@/core/config/skills/skill.config'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const LanguageSkills = () => {

    const t = useTranslations("Language skills");
    const localeActive = useLocale();

    return (
        <section aqm-data="language-skills" className='flex flex-col items-center gap-20 py-10 text-night dark:text-silver-900'>

            <h3 className='text-3xl font-semibold'>
                {t('title')}
            </h3>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-16 justify-items-center'>

                {
                    SkillConfig.map((item, index) => (
                        item.isEnabled && (
                            <>
                                <div
                                    key={`${item.nemonic}-${index}`}
                                    className="hidden sm:block relative w-[300px] pt-[50px] border-4 rounded-lg border-aero dark:border-emerald text-center shadow-md"
                                >
                                    {/* Círculo con la imagen */}
                                    <div className="absolute inset-0 -top-[50px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full overflow-hidden bg-silver-900 dark:bg-night border-4 border-aero dark:border-emerald">
                                        <Image
                                            src={`./svg/${item.nemonic}.svg`}
                                            alt={`${item.alt.get(localeActive)}`}
                                            width={100}
                                            height={100}
                                        />
                                    </div>

                                    {/* Texto dentro del rectángulo */}
                                    <div className="p-5 text-2xl uppercase font-semibold dark:text-emerald text-aero">
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                                <Image
                                    src={`./svg/${item.nemonic}.svg`}
                                    alt={`${item.alt.get(localeActive)}`}
                                    width={150}
                                    height={150}
                                    className="block sm:hidden rounded-full border-2 border-night-600 dark:border-silver-90"
                                />
                            </>
                        )
                    ))
                }
            </div>

        </section>
    )
}

export default LanguageSkills