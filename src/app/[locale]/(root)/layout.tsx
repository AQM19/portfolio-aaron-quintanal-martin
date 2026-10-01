import { getLocale } from 'next-intl/server';
import { loadProfile, loadSocialLinks } from '@/core/content';
import PortfolioShell from '@/components/ui/shell/PortfolioShell';
import React from 'react'

export default async function PortfoilLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const locale = await getLocale();
    const [socialLinks, profile] = await Promise.all([loadSocialLinks(locale), loadProfile(locale)]);

    return (
        <PortfolioShell socialLinks={socialLinks} ownerName={profile.ownerName}>
            {children}
        </PortfolioShell>
    )
};
