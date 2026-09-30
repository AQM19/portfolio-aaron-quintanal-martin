import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { getImageOrigins, hasLocalImageOrigin } from './src/core/content/image-hosts';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: getImageOrigins().map(({ protocol, hostname, port }) => ({ protocol, hostname, port })),
        // The local S3 of the admin (http://localhost:9000) is a local address: next/image refuses it unless
        // allowed. Only in development, never in a deployed build.
        dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development' && hasLocalImageOrigin(),
    }
};

export default withNextIntl(nextConfig);
