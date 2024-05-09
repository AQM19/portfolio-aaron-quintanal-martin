import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.imgur.com'], // Add this line to specify allowed domains
        formats: ["image/avif", "image/webp"],
        loader: "default", // You can customize the image loader if needed
    }
};

export default withNextIntl(nextConfig);