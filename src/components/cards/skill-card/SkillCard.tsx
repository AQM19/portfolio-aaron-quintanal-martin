import React from 'react'
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Skill } from '@/core/interfaces/skills/skill.interface';
import { BsFillAwardFill } from "react-icons/bs";

interface Props {
    skill: Skill;
    localeActive: string;
}

/** Skill tile of the home mosaic: logo and name, with a badge for the favourite ones. */
const SkillCard = ({ skill, localeActive }: Props) => {
    const t = useTranslations('Language skills');
    const iconUrl = skill.iconUrl ?? `/svg/${skill.nemonic}.svg`;

    return (
        <li
            className={`flex items-center gap-3 min-h-[56px] rounded-md border bg-surface pl-2 pr-3 py-2 transition-colors ${skill.isFavourite ? 'border-accent-fg' : 'border-line'}`}
            title={skill.alt.get(localeActive)}
        >
            <Image
                src={iconUrl}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-md object-contain"
            />

            <span className="min-w-0 font-semibold leading-tight text-pretty">{skill.name}</span>

            {
                skill.isFavourite && (
                    <BsFillAwardFill className="ml-auto h-4 w-4 shrink-0 text-favourite fill-current" role="img" aria-label={t('favourite')} title={t('favourite')} />
                )
            }
        </li>
    )
}

export default SkillCard
