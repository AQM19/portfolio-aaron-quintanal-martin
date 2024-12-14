import { Developer } from '@/core/interfaces'
import Link from 'next/link';
import React from 'react'

interface Props {
    dev: Developer;
}

const Avatar = ({ dev }: Props) => {
    return (
        <Link
            href={dev.github ? dev.github : '#'}
            target='_blank'
        >
            <div className="flex items-center gap-2">
                <div>
                    <img
                        alt={dev.username}
                        src={dev.avatar!}
                        width={150}
                        height={150}
                        className='w-16 h-16 rounded-full'
                    />
                </div>

                <div className="text-sm text-night dark:text-silver-900 font-semibold transition-colors duration-300">
                    {dev.name} {dev.surname}
                </div>

            </div>

        </Link>
    )
}

export default Avatar