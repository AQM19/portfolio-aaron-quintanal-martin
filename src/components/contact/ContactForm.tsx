'use client'

import { Mail } from '@/core/interfaces/mail/mail.interface';
import { sendMail } from '@/core/services/mail/email.service';
import { useTranslations } from 'next-intl';
import { Link as I18nLink } from '@/i18n/routing';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoMailOutline } from 'react-icons/io5'

interface Props {
    full?: boolean;
}

/** Validation message under a field: icon + text, so the error does not rely on color alone. */
const FieldError = ({ id, message }: { id: string; message?: string }) => (
    <p id={id} className="mt-1 flex items-start gap-1 text-sm text-danger" role="alert">
        <IoAlertCircleOutline size={18} className="shrink-0 mt-px" aria-hidden />
        {message}
    </p>
);

const ContactForm = ({ full }: Props) => {

    const t = useTranslations('Contact');

    const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<Mail>({
        defaultValues: {
            name: '',
            subject: '',
            email: '',
            message: ''
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data: Mail) => {
        setStatus('idle');
        const { ok, message } = await sendMail(data);

        if (!ok) {
            console.debug('No se pudo mandar el correo: ', message);
            setStatus('error');
            return;
        }

        setStatus('sent');
        reset();
    };

    return (
        <form
            className={`${full ? 'w-full' : 'max-w-md'}  mx-auto text-foreground`}
            onSubmit={handleSubmit(onSubmit)}>

            {/* Campo Name */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold text-accent-fg mb-1">{t('name')}</label>
                <input
                    type="text"
                    id="name"
                    placeholder={t('name placeholder')}
                    className='field'
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
                    aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <FieldError id="name-error" message={errors.name.message} />}

            </div>
            {/* Campo Name */}

            {/* Campo email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold text-accent-fg mb-1">{t('email')}</label>
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
                    className='field'
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <FieldError id="email-error" message={errors.email.message} />}
            </div>
            {/* Campo email */}

            {/* Campo Name */}
            <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-semibold text-accent-fg mb-1">{t('subject')}</label>
                <input
                    type="text"
                    id="subject"
                    placeholder={t('subject placeholder')}
                    className='field'
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
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && <FieldError id="subject-error" message={errors.subject.message} />}

            </div>
            {/* Campo Name */}

            {/* Campo message */}
            <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-semibold text-accent-fg mb-1">{t('message')}</label>
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
                    className='field'
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <FieldError id="message-error" message={errors.message.message} />}
            </div>
            {/* Campo message */}

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-secondary w-full py-3">
                <IoMailOutline size={22} aria-hidden />
                {isSubmitting ? t('sending') : t('send message')}
            </button>

            {
                status !== 'idle' && (
                    <p
                        className={`mt-3 flex items-start gap-2 text-sm font-semibold ${status === 'sent' ? 'text-success' : 'text-danger'}`}
                        role={status === 'sent' ? 'status' : 'alert'}
                    >
                        {
                            status === 'sent'
                                ? <IoCheckmarkCircleOutline size={20} className="shrink-0" aria-hidden />
                                : <IoAlertCircleOutline size={20} className="shrink-0" aria-hidden />
                        }
                        {status === 'sent' ? t('sent') : t('send error')}
                    </p>
                )
            }

            <p className="mt-3 text-xs text-center text-muted">
                {t('privacy notice')}{' '}
                <I18nLink href="/privacy" className="underline underline-offset-2 text-accent-fg">
                    {t('privacy link')}
                </I18nLink>.
            </p>

        </form>
    )
}

export default ContactForm