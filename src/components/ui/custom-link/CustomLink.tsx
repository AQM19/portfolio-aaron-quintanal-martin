'use client'

import { Link, usePathname, useRouter } from '@/navigation';
import { useUILoading } from '@/store/ui/ui-loading.store';
import React, { HTMLAttributeAnchorTarget } from 'react'

interface Props {
    href: string;
    target?: HTMLAttributeAnchorTarget | undefined;
    className?: string;
    children: React.ReactNode;
    onClick?: Function;
}

const CustomLink = ({ href, target, className, children, onClick }: Props) => {
    const pathnames = usePathname();
    const isLoading = useUILoading(loading => loading.setIsLoading);

    const handleClick = () => {
        if (pathnames !== href) {
            isLoading();
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <Link href={href} target={target} className={className} onClick={handleClick}>
            {children}
        </Link>
    )
}

export default CustomLink;
