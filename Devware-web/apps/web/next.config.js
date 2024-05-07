const {PrismaPlugin} = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, {isServer}) => {
    if (isServer){
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  suppressHydrationWarning: true,
};

module.exports = nextConfig;
