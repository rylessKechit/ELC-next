/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
    // Formats modernes pour économiser de la bande passante
    formats: ['image/avif', 'image/webp'],
    // Optimisation des images
    minimumCacheTTL: 60,
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  },
  // Pour les API routes qui nécessitent plus de temps
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    responseLimit: '8mb',
  },
  // Optimisations pour la production
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Suppression de JavaScript inutile
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  // Support des modules ES
  webpack: (config, { dev, isServer }) => {
    // Optimisations webpack
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig