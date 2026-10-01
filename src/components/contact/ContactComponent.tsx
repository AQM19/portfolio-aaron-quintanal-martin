import { useTranslations } from 'next-intl';
import React from 'react'
import ContactForm from './ContactForm';

const ContactComponent = () => {

    const t = useTranslations('Contact');

    return (
        <section aqm-data="contact" className="text-foreground">

            <div className='py-20 container mx-auto px-4'>

                <h2 className="text-3xl font-bold mb-8 text-center">{t('title')}</h2>

                <ContactForm />

            </div>

        </section>
    )
}

export default ContactComponent