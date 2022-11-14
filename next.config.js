/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['sv', 'en'],
    defaultLocale: 'sv',
    localeDetection: false,
  },
};

module.exports = nextConfig;
