import { Developer } from '@/core/interfaces'
import React from 'react'

interface Props {
    developers: Developer[];
}

const AvatarGroup = ({ developers }: Props) => {

    const max = 3;
    const visibleAvatars = developers.slice(0, max);
    const remainingCount = developers.length - max;

    return (
        <>
            {
                visibleAvatars.map((dev, index) => (
                    <div
                        key={index}
                        className={`${index !== 0 ? '-ml-2' : ''} border-2 border-silver-900 rounded-full`}
                        style={{ zIndex: developers.length - index }}
                    >
                        <img
                            key={`${dev.username}-${index}`}
                            alt={dev.username}
                            src={dev.avatar!}
                            className='w-16 h-16 rounded-full'
                        />
                    </div>
                ))
            }
            {
                remainingCount > 0 && (
                    <div
                        className='rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600 border-2 border-white ml-2 px-1'
                    >
                        +{remainingCount}
                    </div>
                )
            }
        </>
    )
}

export default AvatarGroup