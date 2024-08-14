'use client'

import Loading from '@/app/[locale]/loading';
import { useUILoading } from '@/store/ui/ui-loading.store';
import React from 'react'

const LoaderProvider = () => {

    const isLoading = useUILoading(loading => loading.isLoading);

    return (
        <>
            {
                isLoading && (
                    <Loading />
                )
            }
        </>
    )
}

export default LoaderProvider