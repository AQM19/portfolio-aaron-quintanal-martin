import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export const PageNotFound = () => {

    return (
        <div className='flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle'>

            <div className="text-center px-5 mx-5">
                <Image
                    src="/imgs/404-not-found.svg"
                    alt='404 not found'
                    className='p-5 sm:p-0'
                    width={550}
                    height={550}
                />
                <Link
                    href='/'
                    className='font-normal hover:underline transition-all'
                >
                    Return to home
                </Link>
            </div>

        </div>
    )
}
