import { Link as I18Link } from '@/i18n/routing';
import ChangingText from '../changing-text/ChangingText';
import { useTranslations } from 'next-intl';
import { TbFileCv } from "react-icons/tb";
import type { Profile } from '@/core/interfaces/profile/profile.interface';
import Image from 'next/image';

import './presentation.css'

interface Props {
    profile: Profile;
}

const Presentation = ({ profile }: Props) => {

    const t = useTranslations("Index");

    return (
        <section aqm-data="presentation" className="flex flex-col xl:flex-row py-16 sm:py-28 px-5 sm:px-32 justify-normal gap-10 sm:gap-36 text-night dark:text-silver-900">

            <Image
                className='h-[350px] w-full sm:w-3/4 md:h-[550px] md:w-[500px] object-contain'
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

                <h1 className={`text-4xl md:text-6xl font-thin transition-colors duration-300`}>
                    {profile.ownerName}
                </h1>

                <ChangingText taglines={profile.taglines} />

                {/* Sanitized on the server (rich-text.ts), with the age already filled in */}
                <div
                    className='rich-text presentation-bio mt-5 max-w-prose text-lg text-pretty text-justify font-semibold transition-colors duration-300'
                    dangerouslySetInnerHTML={{ __html: profile.bioHtml }}
                />

                <div className='flex flex-row gap-4'>
                    <I18Link href={'/contact'} >
                        <button
                            className='lg:self-end mt-5 w-min px-5 py-2 rounded-md text-aero dark:text-emerald font-bold border-2 border-aero dark:border-emerald'>
                            {t('contact-button')}
                        </button>
                    </I18Link>

                    {
                        // The PDF opens in a new tab: the browser shows it and offers the download.
                        profile.cvUrl && (
                            <a
                                href={profile.cvUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <button className='flex flex-row lg:self-end mt-5 px-5 py-2 rounded-md text-silver-900 dark:text-night bg-aero dark:bg-emerald font-bold border-2 border-aero dark:border-emerald transition-colors duration-300'>
                                    <TbFileCv className="mr-2" size={24} />
                                    {t('download-cv')}
                                </button>
                            </a>
                        )
                    }
                </div>

            </div>

        </section>
    )
}

export default Presentation
