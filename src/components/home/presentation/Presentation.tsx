import { Link as I18Link } from '@/i18n/routing';
import ChangingText from '../changing-text/ChangingText';
import { useTranslations } from 'next-intl';
import { TbFileCv } from "react-icons/tb";
import type { Profile } from '@/core/interfaces/profile/profile.interface';
import Image from 'next/image';

import './presentation.css'

interface Props {
    profile: Profile;
    /** Current (or latest) job, shown as a link to the career page. */
    currentJob?: { position?: string; company: string };
}

const Presentation = ({ profile, currentJob }: Props) => {

    const t = useTranslations("Index");
    const c = useTranslations("Career");

    return (
        <section aqm-data="presentation" className="flex flex-col xl:flex-row xl:items-center pt-20 pb-12 sm:py-24 px-5 sm:px-10 lg:px-32 justify-normal gap-8 sm:gap-16 xl:gap-36 text-foreground">

            <Image
                // Smaller on phones so the name is visible without scrolling
                className='h-56 sm:h-[350px] w-full sm:w-3/4 md:h-[550px] md:w-[500px] object-contain self-center'
                src={profile.avatarUrl}
                alt={profile.ownerName}
                width={1920}
                height={1080}
                priority
            />

            <div className='rounded-sm flex flex-col gap-4'>

                <p className='transition-colors duration-300'>
                    {t('hello')}
                </p>

                <h1 className={`text-4xl md:text-6xl font-light transition-colors duration-300`}>
                    {profile.ownerName}
                </h1>

                <ChangingText taglines={profile.taglines} />

                {
                    currentJob && (
                        <I18Link
                            href={'/career'}
                            className='inline-flex w-fit flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-line px-4 py-2 text-sm hover:bg-surface-hover transition-colors'
                        >
                            <span className='h-2 w-2 rounded-full bg-accent' aria-hidden />
                            <span className='font-semibold text-accent-fg'>{c('now')}:</span>
                            <span>
                                {currentJob.position ? <>{currentJob.position} {c('at')} <strong>{currentJob.company}</strong></> : <strong>{currentJob.company}</strong>}
                            </span>
                        </I18Link>
                    )
                }

                {/* Sanitized on the server (rich-text.ts), with the age already filled in */}
                <div
                    className='rich-text presentation-bio mt-5 max-w-prose text-lg text-pretty md:text-justify font-semibold transition-colors duration-300'
                    dangerouslySetInnerHTML={{ __html: profile.bioHtml }}
                />

                <div className='flex flex-row flex-wrap gap-4 mt-5'>
                    <I18Link href={'/contact'} className='btn btn-secondary'>
                        {t('contact-button')}
                    </I18Link>

                    {
                        // The PDF opens in a new tab: the browser shows it and offers the download.
                        profile.cvUrl && (
                            <a
                                href={profile.cvUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='btn btn-primary'
                            >
                                <TbFileCv size={24} aria-hidden />
                                {t('download-cv')}
                            </a>
                        )
                    }
                </div>

            </div>

        </section>
    )
}

export default Presentation
