import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { getImageHosts } from './src/core/content/image-hosts';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: getImageHosts().map((hostname) => ({ protocol: 'https', hostname }))
    }
};

export default withNextIntl(nextConfig);
