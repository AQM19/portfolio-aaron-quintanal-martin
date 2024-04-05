import { rrssMenu } from '@/config/top-menu/menu-items.config'
import Link from 'next/link'
import React from 'react'

const SideRSS = () => {
    return (
        <div className='fixed flex flex-col gap-4 left-5 top-1/3 h-1/4 transition-all z-10'>
            {
                rrssMenu.map(value => (
                    <Link href={value.href} target={value.target} key={value.href}>
                        <value.icon className={`${value.class} w-7 h-7 rounded cursor-pointer dark:text-neutral-100`} />
                    </Link>
                ))
            }
        </div>
    )
}

export default SideRSS