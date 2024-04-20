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

            <div className='flex flex-col gap-4 w-full lg:w-1/2 rounded bg-slate-100 p-10'>

                <Typography variant='h4' className='text-[#ed4709] dark:text-[#e2b5fd] text-xl'>
                    ¡Deja tus datos y y mismo me pondré en contacto contigo!
                </Typography>

                <form action="">

                    <div className='flex flex-col md:flex-row flex-wrap gap-4'>


                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label htmlFor="complete_name">Nombre completo:</label>
                            <input
                                className='px-5 py-2 border bg-gray-200 rounded'
                                type="text"
                                name='complete_name'
                                required />
                        </div>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label htmlFor="empress">Empresa:</label>
                            <input
                                className='px-5 py-2 border bg-gray-200 rounded'
                                type="text"
                                name='empress'
                            />
                        </div>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label htmlFor="email">Email:</label>
                            <input
                                className='px-5 py-2 border bg-gray-200 rounded'
                                type="email"
                                name='email' />
                        </div>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label htmlFor="phone">Número de teléfono:</label>
                            <input
                                className='px-5 py-2 border bg-gray-200 rounded'
                                type="tel"
                                name="phone" />
                        </div>

                        <div className='flex flex-col flex-[1_0_1rem]'>
                            <label htmlFor="body">Mensaje:</label>
                            <textarea
                                className='p-5'
                                name="body"
                                cols={20}
                                rows={4}
                                wrap='soft'
                                maxLength={1000}
                                placeholder='Inserta tu mensaje...' />
                        </div>
                    </div>

                    <button className='self-end mt-5 w-min px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                        Contacto
                    </button>

                </form>

            </div>

        </section>
    )
}

export default ContactPage