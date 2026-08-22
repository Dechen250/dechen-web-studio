import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["lighthouse", "chrome-launcher"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
