'use client'

import { IPAddress } from '@/interfaces';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode
}

export const Provider = ({ children }: Props) => {

    useEffect(() => {
        getUserIp();
    }, []);

    const getUserIp = async () => {
        const ipAddress: IPAddress = (await axios.get("https://ipapi.co/json")).data;
        const { ip, network, city, region, country_name, postal, latitude, longitude, timezone, currency } = ipAddress;
        console.log(ipAddress)
    };

    return (
        // <SessionProvider>
        <>
            {children}
        </>
        // </SessionProvider>
    )
}
