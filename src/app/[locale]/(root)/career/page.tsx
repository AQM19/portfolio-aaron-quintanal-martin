import { loadCareer, loadCertifications, loadProfile } from '@/core/content';
import { getLocale, getTranslations } from 'next-intl/server';
import { TbFileCv } from 'react-icons/tb';
import { Link as I18nLink } from '@/i18n/routing';
import CareerTimeline from '@/components/career/CareerTimeline';
import CertificationList from '@/components/career/CertificationList';
import { sortCareerByRecent } from '@/core/utils';
import React from 'react'

/** Career path: experience, education and certifications, compact; the full detail is in the CV. */
const CareerPage = async () => {

    const t = await getTranslations('Career');
    const p = await getTranslations('Project');
    const i = await getTranslations('Index');
    const localeActive = await getLocale();

    const [career, certifications, profile] = await Promise.all([
        loadCareer(localeActive, p('actual')),
        loadCertifications(localeActive),
        loadProfile(localeActive),
    ]);

    const sorted = sortCareerByRecent(career);
    const jobs = sorted.filter((entry) => (entry.kind ?? 'job') === 'job');
    const education = sorted.filter((entry) => entry.kind === 'education');
    const sortedCertifications = [...certifications].sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <div className='pt-24 pb-16 sm:pt-12 px-4 sm:px-8 text-foreground transition-colors duration-300'>

            <div className="mx-auto w-full max-w-3xl flex flex-col gap-12">

                <header className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">
                        {t('title')}
                    </h1>
                    <p className="text-muted text-pretty">{t('subtitle')}</p>

                    <div className="flex flex-wrap gap-3">
                        {
                            profile.cvUrl && (
                                <a href={profile.cvUrl} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
                                    <TbFileCv size={22} aria-hidden />
                                    {i('download-cv')}
                                </a>
                            )
                        }
                        <I18nLink href='/contact' className='btn btn-secondary'>
                            {i('contact-button')}
                        </I18nLink>
                    </div>
                </header>

                {
                    jobs.length > 0 && (
                        <section aria-labelledby="career-experience" className="flex flex-col gap-5">
                            <h2 id="career-experience" className="text-2xl font-semibold">{t('experience')}</h2>
                            <CareerTimeline entries={jobs} localeActive={localeActive} />
                        </section>
                    )
                }

                {
                    education.length > 0 && (
                        <section aria-labelledby="career-education" className="flex flex-col gap-5">
                            <h2 id="career-education" className="text-2xl font-semibold">{t('education')}</h2>
                            <CareerTimeline entries={education} localeActive={localeActive} />
                        </section>
                    )
                }

                {
                    sortedCertifications.length > 0 && (
                        <section aria-labelledby="career-certifications" className="flex flex-col gap-5">
                            <h2 id="career-certifications" className="text-2xl font-semibold">{t('certifications')}</h2>
                            <CertificationList certifications={sortedCertifications} />
                        </section>
                    )
                }

            </div>
        </div>
    )
}

export default CareerPage
