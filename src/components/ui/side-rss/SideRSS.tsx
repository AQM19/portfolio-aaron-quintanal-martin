import { rrssMenu } from '@/core/config/rrss-menu/rrss-menu.config'
import CustomLink from '../custom-link/CustomLink'

const SideRSS = () => {
    return (
        <div className='hidden fixed sm:flex flex-col gap-4 left-5 top-1/3 h-1/4 z-10 rrss-icons duration-200 transition-all'>
            {
                rrssMenu.map(value => (
                    <CustomLink href={value.href} target={value.target} key={value.href}>
                        <value.icon className={`${value.class} w-7 h-7 rounded cursor-pointer rrss-icon hover:scale-105 duration-200`} />
                    </CustomLink>
                ))
            }
        </div>
    )
}

export default SideRSS