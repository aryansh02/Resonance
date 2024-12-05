/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.scdn.co", "via.placeholder.com"], // Add allowed domains here
  },
};

module.exports = nextConfig;
