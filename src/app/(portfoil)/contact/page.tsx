import { kanit } from '@/config/fonts'
import Typography from '@mui/material/Typography/Typography'
import React from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { IoMailOutline } from 'react-icons/io5'

const ContactPage = () => {
    return (
        <section className='w-full h-screen p-20 flex flex-col lg:flex-row justify-around items-center'>

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

            <div className='flex flex-col gap-4 w-full lg:w-1/3'>

                <Typography variant='h4' className='text-[#ed4709] dark:text-[#e2b5fd]'>
                    ¡Deja tus datos y y mismo me pondré en contacto contigo!
                </Typography>

                <form action="" className='flex flex-col'>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div>
                            <label htmlFor="complete_name">Nombre completo:</label>
                            <input
                                className='px-5 py-2 border bg-gray-200 rounded mb-5'
                                type="text"
                                name='complete_name'
                                required />
                        </div>
                        <div>
                            <label htmlFor="empress">Empresa:</label>
                            <input
                                className='px-5 py-2 border bg-gray-200 rounded mb-5'
                                type="text"
                                name='empress'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                className='px-5 py-2 border bg-gray-200 rounded mb-5'
                                type="email"
                                name='email' />
                        </div>
                        <div>
                            <label htmlFor="phone">Número de teléfono:</label>
                            <input
                                className='px-5 py-2 border bg-gray-200 rounded mb-5'
                                type="tel"
                                name="phone" />
                        </div>
                    </div>

                </form>

            </div>

        </section>
    )
}

export default ContactPage