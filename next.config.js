/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core config
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    domains: ['supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },

  // Webpack config for WebContainer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }
    return config
  },

  // Experimental features
  experimental: {
    typedRoutes: true,
    serverActions: true,
    optimizePackageImports: ['@radix-ui/react-*']
  }
}

module.exports = nextConfig