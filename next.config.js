/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['example.com'], // Ajoutez les domaines externes d'où vous chargez des images
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
  }
  
  module.exports = nextConfig