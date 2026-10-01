import { Skill } from '@/core/interfaces/skills/skill.interface'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import SkillCard from '../cards/skill-card/SkillCard'

interface Props {
    skills: Skill[];
}

/** Display order of the groups; types without enabled skills are not shown. */
const GROUPS: Skill['type'][] = ['language', 'framework', 'library', 'tool'];

/** Skills mosaic grouped by type, favourites first inside each group. */
const LanguageSkills = ({ skills }: Props) => {

    const t = useTranslations("Language skills");
    const localeActive = useLocale();

    const groups = GROUPS
        .map((type) => ({
            type,
            items: skills
                .filter((skill) => skill.isEnabled && skill.type === type)
                .sort((a, b) => Number(b.isFavourite) - Number(a.isFavourite)),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <section aqm-data="language-skills" className='flex flex-col items-center gap-10 py-16 px-4 sm:px-8 text-foreground'>

            <h2 className='text-3xl font-semibold'>
                {t('title')}
            </h2>

            <div className='w-full max-w-5xl flex flex-col divide-y divide-line'>
                {
                    groups.map((group) => (
                        <div key={group.type} className='grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:items-start'>

                            <h3 className='text-sm font-semibold uppercase tracking-wide text-muted sm:pt-4'>
                                {t(group.type)}
                            </h3>

                            <ul className='grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]'>
                                {
                                    group.items.map((item) => (
                                        <SkillCard
                                            key={item.nemonic}
                                            skill={item}
                                            localeActive={localeActive} />
                                    ))
                                }
                            </ul>

                        </div>
                    ))
                }
            </div>

        </section>
    )
}

export default LanguageSkills
