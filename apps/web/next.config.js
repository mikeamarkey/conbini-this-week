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
      'img.7api-01.dp1.sej.co.jp',
      'www.family.co.jp',
      'www.lawson.co.jp',
      'www.ministop.co.jp',
    ],
  },
}

module.exports = nextConfig
