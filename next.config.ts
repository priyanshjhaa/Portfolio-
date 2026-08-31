/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    qualities: [35, 75, 84],
  },
  trailingSlash: true,
};

export default nextConfig;
