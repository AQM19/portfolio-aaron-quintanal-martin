import { getLocale } from 'next-intl/server';
import { loadSocialLinks } from '@/core/content';
import PortfolioShell from '@/components/ui/shell/PortfolioShell';
import React from 'react'

export default async function PortfoilLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const socialLinks = await loadSocialLinks(await getLocale());

    return (
        <PortfolioShell socialLinks={socialLinks}>
            {children}
        </PortfolioShell>
    )
};
