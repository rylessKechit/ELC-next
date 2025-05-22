/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimisations expérimentales pour les performances
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // Optimisation du bundling
    optimizePackageImports: ['react-icons', 'lodash'],
    // Préchargement des pages importantes
    workerThreads: false,
  },
  
  // Configuration des images optimisée
  images: {
    domains: ['example.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24h cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Variables d'environnement publiques
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elysian-luxury-chauffeurs.com',
  },
  
  // Headers pour la sécurité, CORS et performances
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_SITE_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
      {
        // Cache statique optimisé
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache pour les images
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Headers de sécurité globaux
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  
  // Redirections SEO
  async redirects() {
    return [
      {
        source: '/vtc-ballainvilliers.html',
        destination: '/vtc-ballainvilliers',
        permanent: true,
      },
      {
        source: '/chauffeur-prive.html',
        destination: '/chauffeurs-prive-essonne',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  
  // Configuration API optimisée
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    responseLimit: '8mb',
    // Timeout plus court pour les APIs
    externalResolver: true,
  },
  
  // Optimisations webpack pour la production
  webpack: (config, { dev, isServer, webpack }) => {
    // Optimisations pour la production uniquement
    if (!dev && !isServer) {
      // Optimisation du splitting des chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            enforce: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            enforce: true,
          },
          // Séparer les polyfills
          polyfills: {
            test: /[\\/]node_modules[\\/](core-js|@babel\/runtime)[\\/]/,
            name: 'polyfills',
            priority: 15,
          },
        },
      };

      // Optimisation de la taille des bundles
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Plugin pour analyser les bundles
      if (process.env.ANALYZE) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: './analyze/client.html'
          })
        );
      }
    }

    // Optimisations pour les fonts
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/fonts/',
          outputPath: 'static/fonts/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    // Ignore des warnings spécifiques
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { file: /node_modules\/node-fetch\/lib\/index\.js/ },
    ];

    return config;
  },
  
  // Désactiver le header "X-Powered-By" pour la sécurité
  poweredByHeader: false,
  
  // Désactiver les source maps en production pour la sécurité
  productionBrowserSourceMaps: false,
  
  // Compression activée
  compress: true,
  
  // Configuration du serveur de développement
  devIndicators: {
    buildActivity: true,
  },
  
  // Optimisation du CSS
  optimizeFonts: true,
  
  // Configuration des trailing slashes
  trailingSlash: false,
  
  // Configuration pour le sitemap et robots.txt
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
    ];
  },
};

// Configuration conditionnelle selon l'environnement
if (process.env.NODE_ENV === 'production') {
  // En production, activer toutes les optimisations
  nextConfig.swcMinify = true;
  nextConfig.experimental.esmExternals = true;
  
  // Configuration CDN si disponible
  if (process.env.CDN_URL) {
    nextConfig.assetPrefix = process.env.CDN_URL;
  }
}

module.exports = nextConfig;