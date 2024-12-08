'use client'

import { useTranslations } from 'next-intl';
import React from 'react'
import { useForm } from 'react-hook-form';

const ContactForm = () => {

    const t = useTranslations("Contact");

    // const { handleSubmit, register, formState: { isValid, errors }, reset } = useForm<Mail>({
    //     defaultValues: {
    //         email: '',
    //         empress: '',
    //         fullName: '',
    //         message: '',
    //         phone: '',
    //         subject: ''
    //     }
    // });

    // const onSubmit = async (data: Mail) => {
    //     const { ok, message } = await sendMail(data);

    //     if (!ok) {
    //         console.log('No se pudo mandar el correo')
    //         return;
    //     }

    //     reset();
    // };

    return (
        <></>
        // <form
        //     className='flex flex-col gap-4'
        //     onSubmit={handleSubmit(onSubmit)}>

        //     <div className='flex flex-col md:flex-row flex-wrap gap-4'>

        //         <div className='flex flex-col flex-[1_0_1rem]'>
        //             <label
        //                 className='text-[#ed4709] dark:text-[#e2b5fd]'
        //                 htmlFor="complete_name"
        //             >
        //                 {t("full name")}
        //             </label>
        //             <input
        //                 className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff] '
        //                 type="text"
        //                 {...register("fullName", { required: true })}
        //                 aria-invalid={errors.fullName ? "true" : "false"}
        //             />
        //             {errors.fullName?.type === "required" && (
        //                 <p
        //                     className='text-[#441006] dark:text-[#d2e4ff]'
        //                     role="alert">
        //                     {t("name required")}
        //                 </p>
        //             )}
        //         </div>

        //         <div className='flex flex-col flex-[1_0_1rem]'>
        //             <label
        //                 className='text-[#ed4709] dark:text-[#e2b5fd]'
        //                 htmlFor="empress">
        //                 {t("empress")}
        //             </label>
        //             <input
        //                 className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff] '
        //                 type="text"
        //                 {...register('empress', { required: false })}
        //             />
        //         </div>

        //         <div className='flex flex-col flex-[1_0_1rem]'>
        //             <label
        //                 className='text-[#ed4709] dark:text-[#e2b5fd]'
        //                 htmlFor="email">
        //                 {t("email")}
        //             </label>
        //             <input
        //                 className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff] '
        //                 type="email"
        //                 {...register("email", { required: true })}
        //                 aria-invalid={errors.email ? "true" : "false"}
        //             />
        //             {errors.email?.type === "required" && (
        //                 <p
        //                     className='text-[#441006] dark:text-[#d2e4ff]'
        //                     role="alert">
        //                     {t("email required")}
        //                 </p>
        //             )}
        //         </div>

        //         <div className='flex flex-col flex-[1_0_1rem]'>
        //             <label
        //                 className='text-[#ed4709] dark:text-[#e2b5fd]'
        //                 htmlFor="phone">
        //                 {t("phone")}
        //             </label>
        //             <input
        //                 className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff] '
        //                 type="tel"
        //                 {...register("phone", { required: false })}
        //             />
        //         </div>

        //     </div>

        //     <div className='flex flex-col flex-wrap gap-4'>
        //         <div className='flex flex-col flex-[1_0_1rem]'>
        //             <label
        //                 className='text-[#ed4709] dark:text-[#e2b5fd]'
        //                 htmlFor="subject">
        //                 {t("subject")}
        //             </label>
        //             <input
        //                 className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff]'
        //                 type="text"
        //                 {...register("subject", { required: false })}
        //             />
        //         </div>

        //         <div className='flex flex-col flex-[1_0_1rem]'>
        //             <label
        //                 className='text-[#ed4709] dark:text-[#e2b5fd]'
        //                 htmlFor="message">
        //                 {t("body")}
        //             </label>
        //             <textarea
        //                 className='px-5 py-2 border bg-neutral-50 dark:bg-[#03063750] rounded text-[#441006] dark:text-[#d2e4ff]'
        //                 cols={20}
        //                 rows={4}
        //                 wrap='soft'
        //                 maxLength={1000}
        //                 placeholder={t("body placeholder")}
        //                 {...register("message", { required: true })}
        //                 aria-invalid={errors.message ? "true" : "false"}
        //             />
        //             {errors.message?.type === "required" && (
        //                 <p
        //                     className='text-[#441006] dark:text-[#d2e4ff]'
        //                     role="alert">
        //                     {t("body required")}
        //                 </p>
        //             )}
        //         </div>
        //     </div>

        //     <button
        //         type='submit'
        //         className='self-end mt-5 w-min px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
        //         {t("send")}
        //     </button>

        // </form>

    )
}

export default ContactForm