/** @type {import('next').NextConfig} */
const {createVanillaExtractPlugin} = require('@vanilla-extract/next-plugin');
const path = require('path');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/users',
        destination: 'https://spring.marrymo.site/users',
      },
      {
        source: '/users/:path*',
        destination: 'https://spring.marrymo.site/users/:path*',
      },
      {
        source: '/wish-item',
        destination: 'https://spring.marrymo.site/wish-item',
      },
      {
        // 네이버 검색 API에 대한 요청 처리
        source: '/v1/search/shop.json',
        destination: 'https://openapi.naver.com/v1/search/shop.json',
      },
    ];
  },
  images: {
    domains: [
      'marrymo-bucket.s3.amazonaws.com',
      'shopping-phinf.pstatic.net', // 여기에 추가
    ], // 여기에 도메인 추가

  },
  webpack: (config, {isServer}) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.resolve.alias['#'] = path.join(__dirname, 'public');
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withVanillaExtract(nextConfig);
