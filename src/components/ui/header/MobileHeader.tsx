import AQMIcon from '@/components/icons/AQMIcon'
import { useTranslations } from 'next-intl'
import React from 'react'
import { IoMenu } from 'react-icons/io5'

interface Props {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileHeader = ({ isExpanded, setIsExpanded }: Props) => {

    const t = useTranslations('Menu');

    const toggleExpandedSidenav = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className='sm:hidden grid grid-cols-[1fr_auto] sm:grid-cols-3 py-3 px-4 fixed top-0 left-0 w-full bg-background/80 border-b border-line backdrop-blur-sm items-center z-10'>

            <AQMIcon />

            <button
                onClick={() => toggleExpandedSidenav()}
                className='block sm:hidden p-2 -m-2 rounded-md text-accent-fg'
                aria-label={t('open menu')}
                aria-expanded={isExpanded}
                aria-controls='mobile-menu'
            >
                <IoMenu size={30}></IoMenu>
            </button>

        </div>
    )
}

export default MobileHeader
