import { getTranslations } from 'next-intl/server'
import Link from 'next/link';
import React from 'react'

const PrivacyPage = async () => {

    const t = await getTranslations('Privacy');

    return (
        <section id='privacy-policy-page' className='container mx-auto py-20 lg:py-8 px-4 max-w-3xl text-justify text-night dark:text-silver-900 transition-colors duration-300'>

            <h1 className='text-3xl font-bold mb-6'>{t('title')}</h1>

            <div className='w-full flex flex-col gap-4'>

                <h3 className='text-xl font-semibold mt-4'>1. {t('responsable')}</h3>
                <p>{t('responsable text')} <strong>Aarón Quintanal Martín</strong></p>

                <h3 className='text-xl font-semibold mt-4'>2. {t('recopiled data')}</h3>
                <p>{t('recopiled data text')}</p>

                <ul className='list-disc pl-16'>
                    <li>{t('recopiled data item 1')}</li>
                    <li>{t('recopiled data item 2')}</li>
                    <li>{t('recopiled data item 3')}</li>
                    <li>{t('recopiled data item 4')}</li>
                </ul>

                <h3 className='text-xl font-semibold mt-4'>3. {t('purpose of treatment')}</h3>
                <p>{t('purpose text')}</p>

                <h3 className='text-xl font-semibold mt-4'>4. {t('conservation of data')}</h3>
                <p>{t('conservation text')}</p>

                <h3 className='text-xl font-semibold mt-4'>5. {t('user rights')}</h3>
                <p>{t('user rights text')}</p>

                <ul className='list-disc pl-16'>
                    <li>{t('user rights item 1')}</li>
                    <li>{t('user rights item 2')}</li>
                    <li>{t('user rights item 3')}</li>
                </ul>

                <h3 className='text-xl font-semibold mt-4'>6. {t('security of data')}</h3>
                <p>{t('security text')}</p>

                <h3 className='text-xl font-semibold mt-4'>7. {t('contact')}</h3>
                <p>{t('contact text')} <Link href={'mailto:aquintanalm.dev@gmail.com'}><strong>aquintanalm.dev@gmail.com</strong></Link></p>

            </div>

        </section>
    )
}

export default PrivacyPage
