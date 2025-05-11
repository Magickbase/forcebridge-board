import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'api.microlink.io'
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
