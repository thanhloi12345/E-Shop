/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'chinhnhan.vn',
                pathname: '**',
            },
        ],
        unoptimized: true,
    },
    reactStrictMode: false,
    output: 'standalone'
}

module.exports = nextConfig
