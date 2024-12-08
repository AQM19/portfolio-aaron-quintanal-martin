import { CrudToolbar } from '@/core/interfaces'
import { IconButton, Tooltip } from '@mui/material';
import React from 'react'

interface Props {
    crud: CrudToolbar[];
}

export const CrudToolbarComponent = ({ crud }: Props) => {

    const handleClick = (func: Function) => {
        func();
    };

    return (
        <div className='w-full mb-1 flex flex-row items-center justify-end gap-1'>
            {
                crud.map((item, index) => (
                    <Tooltip title={item.label} placement='top' key={index}>
                        <span>
                            <IconButton
                                aria-label={item.label}
                                className='text-[#ed4709] dark:text-[#e2b5fd]'
                                size={item.size}
                                onClick={() => handleClick(item.function)}
                                disabled={item.disabled}>
                                <item.icon />
                            </IconButton>
                        </span>
                    </Tooltip>
                ))
            }
        </div>
    )
}
