import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress specific development warnings
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Suppress some noisy console warnings in development
      config.infrastructureLogging = {
        level: 'error',
      };
      
      // Suppress hot reload console spam
      config.optimization = {
        ...config.optimization,
        emitOnErrors: false,
      };
    }
    return config;
  },
  
  // Disable React DevTools console message
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Performance optimizations
  experimental: {
    // Remove optimizeCss as it's causing issues
  },
  
  // Development optimizations
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      // Reduce console logging in development
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
};

export default nextConfig;