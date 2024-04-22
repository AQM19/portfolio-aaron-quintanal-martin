'use client'

import React from 'react'
import { useForm } from 'react-hook-form';

type Inputs = {
    fullName: string;
    empress?: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
};

const ContactForm = () => {

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
                        className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff] '
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
                        className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff] '
                        type="text"
                        {...register('empress', { required: false })}
                    />
                </div>

                <div className='flex flex-col flex-[1_0_1rem]'>
                    <label
                        className='text-[#ed4709] dark:text-[#e2b5fd]'
                        htmlFor="email">Email:</label>
                    <input
                        className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff] '
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
                        className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff] '
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
                        className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff]'
                        type="text"
                        {...register("subject", { required: false })}
                    />
                </div>

                <div className='flex flex-col flex-[1_0_1rem]'>
                    <label
                        className='text-[#ed4709] dark:text-[#e2b5fd]'
                        htmlFor="message">Mensaje:</label>
                    <textarea
                        className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff]'
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

    )
}

export default ContactForm