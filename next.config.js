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
    basePath: '/react'
})
// module.exports = nextConfig
