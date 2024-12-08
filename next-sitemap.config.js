module.exports = {
    siteUrl: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${port}`,
    generateRobotsTxt: true,
    sitemapSize: 7000,
}