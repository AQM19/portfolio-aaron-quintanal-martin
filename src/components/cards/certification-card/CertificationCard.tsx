import { Certification } from '@/core/interfaces/certification/certification.interface';
import { getLocaleFormattedDate } from '@/core/utils/date-format';
import React from 'react'

interface Props {
    certification: Certification;
    localeActive: string;
}

const CertificationCard = ({ certification, localeActive }: Props) => {
    return (
        <div className="flex flex-col border-2 rounded p-4 bg-thistle shadow-xl transition-all">
            <div className='flex-grow'>
                <h3 className='text-2xl font-semibold'>{certification.title.get(localeActive)}</h3>
                <p className='font-thin text-sm text-uranian_blue-200'>{certification.organization}</p>
            </div>

            <div className="mt-4">
                <p className="text-base mb-4">{certification.description.get(localeActive)}</p>

                <div className="flex items-center">
                    <span className='text-sm rounded-full bg-light_sky_blue px-4 font-thin ml-auto'>{`${getLocaleFormattedDate(certification.date, localeActive)}`}</span>
                </div>

            </div>
        </div>
    )
}

export default CertificationCard