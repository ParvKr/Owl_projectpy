/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: true,
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['m.media-amazon.com']
  }
}

module.exports = nextConfig