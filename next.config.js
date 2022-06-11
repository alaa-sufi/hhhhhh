// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['localhost' , 'placehold.jp'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//   },
// }
const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  basePath: '/react',
  images: {
    domains: ['localhost', 'placehold.jp',"www.hululmfx.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  flags: {
    DEV_SSR: false,
  },
  env: {
    host: 'https://www.hululmfx.com/api',
    hostImage: 'https://www.hululmfx.com/public/files',
    userId : "65",
    company_id : "67",
  },
})
// module.exports = nextConfig
