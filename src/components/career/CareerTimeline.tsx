import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react'
import Chip from '@/components/chip/Chip';
import { Career } from '@/core/interfaces/career/career.interface';
import { getLocaleFormattedDate } from '@/core/utils';

interface Props {
    entries: Career[];
    localeActive: string;
}

/** Vertical timeline of career stages (jobs or studies), in the order received. */
const CareerTimeline = ({ entries, localeActive }: Props) => {

    const t = useTranslations('Career');
    const e = useTranslations('Employment');

    return (
        <ol className="relative ml-2 border-l-2 border-line-strong space-y-6">
            {
                entries.map((entry, index) => {
                    const descriptionHtml = entry.descriptionHtml?.get(localeActive);
                    const description = entry.description.get(localeActive);
                    // "Other" says nothing, so it gets no badge
                    const employment = entry.employmentType && entry.employmentType !== 'other' && e.has(entry.employmentType)
                        ? e(entry.employmentType)
                        : undefined;

                    return (
                        <li key={`${entry.empress}-${index}`} className="relative pl-6 sm:pl-8">

                            {/* Marker on the line; the current stage is filled with the accent */}
                            <span
                                className={`absolute -left-[9px] top-6 h-4 w-4 rounded-full border-2 border-background ${entry.isCurrent ? 'bg-accent' : 'bg-line-strong'}`}
                                aria-hidden
                            />

                            <article className="card p-4 sm:p-5">

                                <header className="flex gap-3 sm:gap-4">
                                    <Image
                                        src={entry.empressImage}
                                        alt=""
                                        width={56}
                                        height={56}
                                        className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-md object-cover border border-line bg-background"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-semibold leading-snug text-pretty">
                                            {entry.position ?? entry.empress}
                                        </h3>

                                        {
                                            entry.position && (
                                                <p className="font-semibold text-accent-fg">
                                                    {
                                                        entry.companyUrl
                                                            ? <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{entry.empress}</a>
                                                            : entry.empress
                                                    }
                                                </p>
                                            )
                                        }

                                        <p className="text-sm text-muted">
                                            {entry.dateRange.get(localeActive)}
                                            {entry.location && ` · ${entry.location}`}
                                        </p>
                                    </div>
                                </header>

                                {
                                    (entry.isCurrent || employment) && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {entry.isCurrent && <Chip value={t('current')} />}
                                            {employment && <Chip value={employment} variant="outline" />}
                                        </div>
                                    )
                                }

                                {
                                    descriptionHtml
                                        ? <div className="rich-text mt-3 text-sm leading-relaxed md:text-justify" dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                                        : description && <p className="mt-3 text-sm leading-relaxed md:text-justify">{description}</p>
                                }

                                {
                                    entry.progression && entry.progression.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">{t('milestones')}</h4>
                                            <ul className="mt-2 space-y-1">
                                                {
                                                    entry.progression.map((milestone, milestoneIndex) => (
                                                        <li key={milestoneIndex} className="flex flex-wrap gap-x-2 text-sm">
                                                            <time className="text-muted tabular-nums">{getLocaleFormattedDate(milestone.promotionDate, localeActive)}</time>
                                                            <span className="font-semibold">{milestone.position}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                                }

                                {
                                    entry.skills && entry.skills.length > 0 && (
                                        <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('technologies')}>
                                            {entry.skills.map((skill) => <li key={skill}><Chip value={skill} variant="outline" /></li>)}
                                        </ul>
                                    )
                                }

                            </article>
                        </li>
                    )
                })
            }
        </ol>
    )
}

export default CareerTimeline
