import React from 'react'
import Image from 'next/image';
import { Skill } from '@/core/interfaces/skills/skill.interface';
import { BsFillAwardFill } from "react-icons/bs";

interface Props {
    skill: Skill;
    localeActive: string;
}

const SkillCard = ({ skill, localeActive }: Props) => {
    return (
        <>
            <div
                className="hidden sm:block relative w-[300px] pt-[50px] border-4 rounded-lg border-aero dark:border-emerald text-center shadow-md"
            >

                {
                    skill.isFavourite && (
                        <div className="absolute top-4 right-4">
                            <BsFillAwardFill className="h-6 w-6 text-yellow-400 fill-current" />
                        </div>
                    )
                }

                {/* Círculo con la imagen */}
                <div className="absolute inset-0 -top-[50px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full overflow-hidden bg-silver-900 dark:bg-night border-4 border-aero dark:border-emerald">
                    <Image
                        src={`./svg/${skill.nemonic}.svg`}
                        alt={`${skill.alt.get(localeActive)}`}
                        width={100}
                        height={100}
                    />
                </div>

                {/* Texto dentro del rectángulo */}
                <div className="p-5 text-2xl uppercase font-semibold dark:text-emerald text-aero">
                    <p>{skill.name}</p>
                </div>
            </div>
            <Image
                src={`./svg/${skill.nemonic}.svg`}
                alt={`${skill.alt.get(localeActive)}`}
                width={150}
                height={150}
                className="block sm:hidden rounded-full border-2 border-night-600 dark:border-silver-90"
            />
        </>
    )
}

export default SkillCard