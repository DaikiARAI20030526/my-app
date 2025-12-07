/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  // すでに存在する他のオプションがあればそれらはそのまま残してください
  images: {
    // 以下のどちらかを使う

    // 1. domains で指定する場合
    domains: ['images.microcms-assets.io'],

    // 2. remotePatterns を使う場合 (Next.js 13+)
    /*
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        port: '',
        pathname: '/assets/**',
      },
    ],
    */
  },
};

export default nextConfig;

