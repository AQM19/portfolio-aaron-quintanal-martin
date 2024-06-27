const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'i.imgur.com'
            },
            {
                protocol: 'https',
                hostname: 'google.com'
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            }
        ]
    }
}

module.exports = withNextIntl(nextConfig);
