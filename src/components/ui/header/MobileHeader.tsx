import AQMIcon from '@/components/icons/AQMIcon'
import React from 'react'
import { IoMenu } from 'react-icons/io5'

interface Props {
    isExpanded: boolean;
    setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileHeader = ({ isExpanded, setIsExpanded }: Props) => {

    const toggleExpandedSidenav = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className='sm:hidden grid grid-cols-[1fr_auto] sm:grid-cols-3 py-4 px-4 fixed top-0 left-0 w-full bg-thistle-400 bg-opacity-50 backdrop-blur-sm items-center'>

            <AQMIcon />

            <button onClick={() => toggleExpandedSidenav()} className='block sm:hidden'>
                <IoMenu size={30}></IoMenu>
            </button>

        </div>
    )
}

export default MobileHeader