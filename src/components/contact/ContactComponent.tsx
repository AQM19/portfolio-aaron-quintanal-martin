'use client'

import { Mail } from '@/core/interfaces/mail/mail.interface';
import { sendMail } from '@/core/services/mail/email.service';
import { useTranslations } from 'next-intl';
import React from 'react'
import { useForm } from 'react-hook-form';
import { IoMailOutline } from 'react-icons/io5'

const ContactComponent = () => {

    const t = useTranslations('Contact');

    const { handleSubmit, register, formState: { errors }, reset } = useForm<Mail>({
        defaultValues: {
            name: '',
            subject: '',
            email: '',
            message: ''
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data: Mail) => {
        const { ok, message } = await sendMail(data);

        if (!ok) {
            console.debug('No se pudo mandar el correo: ', message);
            return;
        }

        reset();
    };

    return (
        <section aqm-data="contact" className="text-night">

            <div className='py-20 container mx-auto px-4'>

                <h2 className="text-3xl font-bold mb-8 text-center">{t('title')}</h2>

                <form
                    className="max-w-md mx-auto"
                    onSubmit={handleSubmit(onSubmit)}>

                    {/* Campo Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-semibold text-aero dark:text-emerald mb-1">{t('name')}</label>
                        <input
                            type="text"
                            id="name"
                            placeholder={t('name placeholder')}
                            className='w-full rounded py-1 px-4 focus:outline-aero focus:dark:outline-emerald'
                            {...register("name", {
                                required: t("name required"),
                                minLength: {
                                    value: 3,
                                    message: t("name too short"),
                                },
                                maxLength: {
                                    value: 50,
                                    message: t("name too long"),
                                },
                            })}
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                            <p
                                className={`text-red-500 transition-opacity duration-300 ease-in-out ${errors.name && "opacity-100 animate-fadeIn"}`}
                                role="alert">
                                {errors.name.message}
                            </p>
                        )}

                    </div>
                    {/* Campo Name */}

                    {/* Campo email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold text-aero dark:text-emerald mb-1">{t('email')}</label>
                        <input
                            type="email"
                            id="email"
                            placeholder={t('email placeholder')}
                            {...register("email", {
                                required: t("email required"),
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: t("email invalid"),
                                },
                            })}
                            className='w-full rounded py-1 px-4 focus:outline-aero focus:dark:outline-emerald'
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <p
                                className={`text-red-500 transition-opacity duration-300 ease-in-out ${errors.email && "opacity-100 animate-fadeIn"}`}
                                role="alert">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    {/* Campo email */}

                    {/* Campo Name */}
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-semibold text-aero dark:text-emerald mb-1">{t('subject')}</label>
                        <input
                            type="text"
                            id="subject"
                            placeholder={t('subject placeholder')}
                            className='w-full rounded py-1 px-4 focus:outline-aero focus:dark:outline-emerald'
                            {...register("subject", {
                                required: t("subject required"),
                                minLength: {
                                    value: 3,
                                    message: t("subject too short"),
                                },
                                maxLength: {
                                    value: 50,
                                    message: t("subject too long"),
                                },
                            })}
                            aria-invalid={!!errors.subject}
                        />
                        {errors.subject && (
                            <p
                                className={`text-red-500 transition-opacity duration-300 ease-in-out ${errors.subject && "opacity-100 animate-fadeIn"}`}
                                role="alert">
                                {errors.subject.message}
                            </p>
                        )}

                    </div>
                    {/* Campo Name */}

                    {/* Campo message */}
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-semibold text-aero dark:text-emerald mb-1">{t('message')}</label>
                        <textarea
                            id="message"
                            rows={4}
                            minLength={10}
                            maxLength={1000}
                            placeholder={t("message placeholder")}
                            {...register("message", {
                                required: t("message required"),
                                minLength: {
                                    value: 10,
                                    message: t("message too short"),
                                },
                                maxLength: {
                                    value: 1000,
                                    message: t("message too long"),
                                },
                            })}
                            className='w-full rounded py-1 px-4 focus:outline-aero focus:dark:outline-emerald'
                            aria-invalid={!!errors.message}
                        />
                        {errors.message && (
                            <p
                                className={`text-red-500 transition-opacity duration-300 ease-in-out ${errors.message && "opacity-100 animate-fadeIn"}`}
                                role="alert">
                                {errors.message.message}
                            </p>
                        )}
                    </div>
                    {/* Campo message */}

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 font-semibold text-sm border-solid border-4 px-1 py-4 rounded border-aero text-aero dark:border-emerald dark:text-emerald disabled:border-gray-400 disabled:text-gray-400 hover:border-carnation_pink-100 hover:text-carnation_pink-100 transition-all">
                        <IoMailOutline size={22} />
                        {t('send message')}
                    </button>

                </form>

            </div>

        </section>
    )
}

export default ContactComponent