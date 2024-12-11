import { Link as I18Link } from '@/i18n/routing';
import ChangingText from '../changing-text/ChangingText';
import { useTranslations } from 'next-intl';
import { TbFileCv } from "react-icons/tb";
import Link from 'next/link';
import Image from 'next/image';

import './card-resume.css'

const birthDate: Date = new Date(1996, 2, 15);
const currentDate: Date = new Date();

const birthMonth = birthDate.getMonth();
const currentMonth = currentDate.getMonth();

let age = currentDate.getFullYear() - birthDate.getFullYear();

if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
    age--;
}
// Obtener edad dinámicamente

const CardResume = () => {

    const t = useTranslations("Index");

    return (
        <section aqm-data="presentation" className="w-full pt-28 flex flex-col-reverse lg:flex-row p-5 items-center justify-evenly text-night dark:text-silver-900">
            <div className='p-5 rounded-sm flex flex-col gap-4'>

                <p>
                    {t('hello')}
                </p>

                <h1 className={`text-4xl md:text-6xl font-thin`}>
                    Aaron Quintanal Martín
                </h1>

                <ChangingText />

                <p className='mt-5 text-[#441006] dark:text-[#d2e4ff] max-w-prose text-lg text-pretty text-justify font-semibold'>
                    {t('I have')} {age} {t('first-part-presentation')}
                    <br />
                    {t('second-part-presentation')}
                </p>

                <div className='flex flex-row gap-4'>
                    <I18Link href={'/contact'} >
                        <button
                            className='lg:self-end mt-5 w-min px-5 py-2 rounded-md text-[#ed4709] dark:text-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                            {t('contact-button')}
                        </button>
                    </I18Link>

                    <Link
                        href={'https://drive.google.com/file/d/1_MioP4l1znzu5KJEVtSKWAayt7icYa2x/view'}
                        target='_blank'
                    >
                        <button className='flex flex-row lg:self-end mt-5 px-5 py-2 rounded-md text-[#fff6ed] dark:text-[#030637] bg-[#ed4709] dark:bg-[#e2b5fd] font-bold border-2 border-[#ed4709] dark:border-[#e2b5fd]'>
                            <TbFileCv className="mr-2" size={24} />
                            {t('download-cv')}
                        </button>
                    </Link>
                </div>

            </div>

            <Image
                className='h-[350px] w-3/4 md:h-[550px] md:w-[500px] hidden md:block'
                src="/imgs/developer.webp"
                alt="Imagen de Aarón Quintanal Martín"
                width={1920}
                height={1080}
            />
        </section>
    )
}

export default CardResume