import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co", "via.placeholder.com"], // Add allowed domains here
  },
};

export default nextConfig;
