import { Link as I18Link } from '@/i18n/routing';
import ChangingText from '../changing-text/ChangingText';
import { useTranslations } from 'next-intl';
import { TbFileCv } from "react-icons/tb";
import Link from 'next/link';
import Image from 'next/image';

import './presentation.css'

const Presentation = () => {

    const t = useTranslations("Index");
    const birthDate: Date = new Date(1996, 2, 15);
    const currentDate: Date = new Date();

    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    return (
        <section aqm-data="presentation" className="flex flex-col xl:flex-row py-16 sm:py-28 px-5 sm:px-32 justify-normal gap-10 sm:gap-36 text-night dark:text-silver-900">

            <Image
                className='h-[350px] w-full sm:w-3/4 md:h-[550px] md:w-[500px]'
                src="/png/mapache-ladron.png"
                alt="Imagen de Aarón Quintanal Martín"
                width={1920}
                height={1080}
            />

            <div className='rounded-sm flex flex-col gap-4'>

                <p className='transition-colors duration-300'>
                    {t('hello')}
                </p>

                <h1 className={`text-4xl md:text-6xl font-thin transition-colors duration-300`}>
                    Aaron Quintanal Martín
                </h1>

                <ChangingText />

                <p className='mt-5 max-w-prose text-lg text-pretty text-justify font-semibold transition-colors duration-300'>
                    {t('I have')} {age} {t('first-part-presentation')}
                </p>

                <p className='mt-5 max-w-prose text-lg text-pretty text-justify font-semibold transition-colors duration-300'>
                    {t('second-part-presentation')}
                </p>

                <div className='flex flex-row gap-4'>
                    <I18Link href={'/contact'} >
                        <button
                            className='lg:self-end mt-5 w-min px-5 py-2 rounded-md text-aero dark:text-emerald font-bold border-2 border-aero dark:border-emerald'>
                            {t('contact-button')}
                        </button>
                    </I18Link>

                    <Link
                        href={'https://drive.google.com/file/d/1_MioP4l1znzu5KJEVtSKWAayt7icYa2x/view'}
                        target='_blank'
                    >
                        <button className='flex flex-row lg:self-end mt-5 px-5 py-2 rounded-md text-silver-900 dark:text-night bg-aero dark:bg-emerald font-bold border-2 border-aero dark:border-emerald transition-colors duration-300'>
                            <TbFileCv className="mr-2" size={24} />
                            {t('download-cv')}
                        </button>
                    </Link>
                </div>

            </div>

        </section>
    )
}

export default Presentation