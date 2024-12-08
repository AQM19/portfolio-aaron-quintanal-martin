'use client'

import Loading from '@/app/[locale]/loading';
import { useUILoading } from '@/core/services/ui/loading.service';
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