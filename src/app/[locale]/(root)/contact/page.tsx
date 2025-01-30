import { AiOutlinePhone } from 'react-icons/ai'
import { getTranslations } from 'next-intl/server'
import { IoMailOutline } from 'react-icons/io5'
import ContactForm from '@/components/contact/ContactForm'
import React from 'react'

const ContactPage = async () => {

    const t = await getTranslations('Contact')

    return (
        <section className='w-full px-5 pt-20 sm:pt-28 flex flex-col xl:flex-row gap-4 2xl:gap-0 justify-evenly items-center text-night dark:text-silver-900 transition-all duration-300'>

            <div className='flex flex-col gap-4 w-full lg:w-auto'>

                <h2 className='text-3xl font-semibold text-aero dark:text-emerald'>
                    {t("page title")}
                </h2>

                <p className={`text-pretty font-thin max-w-prose text-justify`}>
                    {t("description")}
                </p>
                <p className='text-pretty font-thin max-w-prose text-justify'>
                    {t("question")}
                </p>
                <span className='text-aero dark:text-emerald font-semibold'>{t("hook")}</span>

                <div className='font-thin'>

                    <span className='flex flex-row gap-2 my-2'>
                        <IoMailOutline size={30} className='text-aero dark:text-emerald' />
                        <a href="mailto:aquintanalm.dev@gmail.com">aquintanalm.dev@gmail.com</a>
                    </span>

                    <span className='flex flex-row gap-2 mt-4'>
                        <AiOutlinePhone size={30} className='text-aero dark:text-emerald' />
                        <a href="tel:+34635-770-481">635 770 481</a>
                    </span>
                </div>
            </div>

            <div className='flex flex-col gap-4 w-full lg:w-auto rounded bg-silver-700 dark:bg-night-600 p-5 md:p-10 transition-colors duration-300'>

                <h2 className='text-aero dark:text-emerald font-semibold text-xl'>
                    {t("form title")}
                </h2>

                <ContactForm full />

            </div>

        </section>
    )
}

export default ContactPage