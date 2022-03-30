// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  images: {
    domains: [
      'www.lawson.co.jp',
      'img.7api-01.dp1.sej.co.jp',
      'www.family.co.jp',
    ],
  },
}

module.exports = nextConfig
