/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  disableStaticImages: true,
  images: {
    domains: [
      'afiariwebapi.centralus.cloudapp.azure.com',
      'source.unsplash.com',
      'localhost',
      'images.unsplash.com',
      'upload.wikimedia.org',
      'countriesnow.space',
    ],
  },

  env: {
    BASE_URL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
};

module.exports = nextConfig;

// module.exports = {

// // };

// const withImages = require('next-images');

// module.exports = withImages();

// const svgToMiniDataURI = require('mini-svg-data-uri');

// module.exports = {
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: [
//         { loader: '@svgr/webpack' },
//         {
//           loader: 'url-loader',
//           options: {
//             // encoding: false,
//             generator: (content) => svgToMiniDataURI(content.toString()),
//           },
//         },
//       ],
//     });

//     return config;
//   },
// };

//my comment from george
