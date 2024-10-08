// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      { hostname: '**.daily-yamazaki.jp' },
      { hostname: '**.family.co.jp' },
      { hostname: '**.lawson.co.jp' },
      { hostname: '**.ministop.co.jp' },
      { hostname: '**.jr-cross.co.jp' },
      { hostname: '**.sej.co.jp' },
    ],
  },
}

module.exports = nextConfig
