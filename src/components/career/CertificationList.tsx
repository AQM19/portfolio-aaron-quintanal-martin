import { useTranslations } from 'next-intl';
import React from 'react'
import { IoOpenOutline } from 'react-icons/io5';
import { Certification } from '@/core/interfaces/certification/certification.interface';

interface Props {
    certifications: Certification[];
}

/** Compact list of certifications: title, issuer, year and credential, without descriptions. */
const CertificationList = ({ certifications }: Props) => {

    const t = useTranslations('Career');
    const r = useTranslations('Resume certifications');

    return (
        <ul className="card divide-y divide-line">
            {
                certifications.map((certification, index) => (
                    <li key={`${certification.title}-${index}`} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-4">

                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold leading-snug text-pretty">{certification.title}</h3>
                            <p className="text-sm text-muted">
                                {certification.organization}
                                {certification.professor && ` · ${certification.professor}`}
                                {certification.calification !== undefined && ` · ${r('average grade')}: ${certification.calification}`}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <time className="text-sm text-muted tabular-nums">
                                {certification.date.getFullYear()}
                            </time>

                            {
                                certification.link && (
                                    <a
                                        href={certification.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent-fg underline underline-offset-2"
                                    >
                                        {t('credential')}
                                        <IoOpenOutline size={14} aria-hidden />
                                    </a>
                                )
                            }
                        </div>

                    </li>
                ))
            }
        </ul>
    )
}

export default CertificationList
