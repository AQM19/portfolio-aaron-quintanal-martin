'use client'

import { kanit } from '@/config/fonts'
import Typography from '@mui/material/Typography/Typography'
import React from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlinePhone } from 'react-icons/ai'
import { IoMailOutline } from 'react-icons/io5'


type Inputs = {
    fullName: string;
    empress?: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
};

const ContactPage = () => {

    const { handleSubmit, register, formState: { isValid, errors }, reset } = useForm<Inputs>({
        defaultValues: {
            email: '',
            empress: '',
            fullName: '',
            message: '',
            phone: '',
            subject: ''
        }
    });

    const onSubmit = (data: Inputs) => {
        console.log({ data });
    };

    return (
        <section className='w-full md:h-screen px-5 py-20 md:p-20 flex flex-col lg:flex-row gap-4 md:gap-0 justify-around items-center'>

            <div className='flex flex-col gap-4 w-full lg:w-1/3'>

                <Typography variant='h5' className='text-[#ed4709] dark:text-[#e2b5fd]'>
                    ¡Hablemos de tu proyecto!
                </Typography>

                <p className={`text-pretty text-[#441006] dark:text-[#d2e4ff] font-thin ${kanit.className} max-w-prose`}>
                    Transformemos tus ideas en resultados tangibles juntos. Como profesional independiente,
                    sé lo que significa trabajar duro para alcanzar tus metas. Sin trucos ni promesas vacías,
                    solo compromiso y dedicación para ayudarte a lograr tus objetivos.
                    <br />
                    ¿Listo para dar el primer paso?
                    <br />
                    <span className='text-[#ed4709] dark:text-[#e2b5fd]'>¡Contáctame hoy mismo y comencemos!</span>
                </p>

                <div className={`text-[#441006] dark:text-[#d2e4ff] font-thin ${kanit.className}`}>
                    <span className='flex flex-row gap-2 my-2'>
                        <IoMailOutline size={30} />
                        <a href="mailto:aquintanalm.dev@gmail.com">aquintanalm.dev@gmail.com</a>
                    </span>

                    <span className='flex flex-row gap-2 mt-4'>
                        <AiOutlinePhone size={30} />
                        <a href="tel:+34635-770-481">635 770 481</a>
                    </span>
                </div>
            </div>

            <div className='flex flex-col gap-4 w-full lg:w-1/2 rounded bg-[#44100625] dark:bg-[#d2e4ff25] p-10'>

                <Typography variant='h4' className='text-[#ed4709] dark:text-[#e2b5fd] text-xl'>
                    ¡Deja tus datos y y mismo me pondré en contacto contigo!
                </Typography>

                <form
                    className='flex flex-col gap-4'
                    onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex flex-col md:flex-row flex-wrap gap-4'>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label
                                className='text-[#ed4709] dark:text-[#e2b5fd]'
                                htmlFor="complete_name"
                            >Nombre completo:</label>
                            <input
                                className='px-5 py-2 border bg-neutral-50 dark:bg-purple-900 rounded text-[#441006] dark:text-[#d2e4ff] '
                                type="text"
                                {...register("fullName", { required: true })}
                                aria-invalid={errors.fullName ? "true" : "false"}
                            />
                            {errors.fullName?.type === "required" && (
                                <p
                                    className='text-[#441006] dark:text-[#d2e4ff]'
                                    role="alert">El nombre es requerido</p>
                            )}
                        </div>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label
                                className='text-[#ed4709] dark:text-[#e2b5fd]'
                                htmlFor="empress">Empresa:</label>
                            <input
                                className='px-5 py-2 border bg-neutral-50 dark:bg-purple-900 rounded text-[#441006] dark:text-[#d2e4ff] '
                                type="text"
                                {...register('empress', { required: false })}
                            />
                        </div>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label
                                className='text-[#ed4709] dark:text-[#e2b5fd]'
                                htmlFor="email">Email:</label>
                            <input
                                className='px-5 py-2 border bg-neutral-50 dark:bg-purple-900 rounded text-[#441006] dark:text-[#d2e4ff] '
                                type="email"
                                {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                            />
                            {errors.email?.type === "required" && (
                                <p
                                    className='text-[#441006] dark:text-[#d2e4ff]'
                                    role="alert">El email es requerido</p>
                            )}
                        </div>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label
                                className='text-[#ed4709] dark:text-[#e2b5fd]'
                                htmlFor="phone">Número de teléfono:</label>
                            <input
                                className='px-5 py-2 border bg-neutral-50 dark:bg-purple-900 rounded text-[#441006] dark:text-[#d2e4ff] '
                                type="tel"
                                {...register("phone", { required: false })}
                            />
                        </div>

                    </div>

                    <div className='flex flex-col flex-wrap gap-4'>
                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label
                                className='text-[#ed4709] dark:text-[#e2b5fd]'
                                htmlFor="subject">Asunto:</label>
                            <input
                                className='px-5 py-2 border bg-neutral-50 dark:bg-purple-900 rounded text-[#441006] dark:text-[#d2e4ff] '
                                type="text"
                                {...register("subject", { required: false })}
                            />
                        </div>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label
                                className='text-[#ed4709] dark:text-[#e2b5fd]'
                                htmlFor="message">Mensaje:</label>
                            <textarea
                                className='p-5 bg-neutral-50 dark:bg-purple-900 text-[#441006] dark:text-[#d2e4ff]'
                                cols={20}
                                rows={4}
                                wrap='soft'
                                maxLength={1000}
                                placeholder='Inserta tu mensaje...'
                                {...register("message", { required: true })}
                                aria-invalid={errors.message ? "true" : "false"}
                            />
                            {errors.message?.type === "required" && (
                                <p
                                    className='text-[#441006] dark:text-[#d2e4ff]'
                                    role="alert">El mensaje es requerido</p>
                            )}
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='self-end mt-5 w-min px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                        Enviar
                    </button>

                </form>

            </div>

        </section>
    )
}

export default ContactPage
