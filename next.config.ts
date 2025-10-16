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

    // Handle Cloudinary client-side imports
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        crypto: false,
        os: false,
        util: false,
      };
    }

    return config;
  },

  // Disable React DevTools console message
  reactStrictMode: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Performance optimizations
  experimental: {},
  
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