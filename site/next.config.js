/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'Teambit Production',
    description: 'The unofficial reproduction of a KASM template. Use at your own risk',
    icon: '/img/logo.svg',
    listUrl: 'https://github.com/TeambitDK/KASM_registry/',
    contactUrl: 'https://kasmweb.com/support',
  },
  reactStrictMode: true,
  basePath: '/kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
