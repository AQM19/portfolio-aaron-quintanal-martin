import ContactForm from '@/components/contact/contact-form'
import { kanit } from '@/config/fonts'
import Typography from '@mui/material/Typography/Typography'
import React from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { IoMailOutline } from 'react-icons/io5'

const ContactPage = () => {

    return (
        <section className='w-full md:h-screen px-5 py-20 md:p-20 flex flex-col lg:flex-row gap-4 md:gap-0 justify-around items-center'>

            <div className='flex flex-col gap-4 w-full lg:w-1/3'>

                <Typography variant='h5' className='text-[#ed4709] dark:text-[#e2b5fd]'>
                    ¡Hablemos de tu proyecto!
                </Typography>

                <p className={`text-pretty text-[#441006] dark:text-[#d2e4ff] font-thin ${kanit.className} max-w-prose text-justify`}>
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

            <div className='flex flex-col gap-4 w-full lg:w-1/2 rounded bg-[#44100625] dark:bg-[#d2e4ff25] p-5 md:p-10'>

                <Typography variant='h4' className='text-[#ed4709] dark:text-[#e2b5fd] text-xl'>
                    ¡Deja tus datos y y mismo me pondré en contacto contigo!
                </Typography>

                <ContactForm />

            </div>

        </section>
    )
}

export default ContactPage
