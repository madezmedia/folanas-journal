import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'postiz-u70402.vm.elestio.app',
      },
      {
        protocol: 'https',
        hostname: 'v3b.fal.media',
      },
    ],
  },
};


export default nextConfig;
