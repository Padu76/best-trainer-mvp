/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configurazione immagini per domini esterni
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'best-trainer.it',
      'api.best-trainer.it',
      'cdn.best-trainer.it'
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Headers di sicurezza con CSP fix per SVG inline e font esterni
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://checkout.stripe.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com",
              "connect-src 'self' https://api.stripe.com https://api.airtable.com https://checkout.stripe.com",
              "media-src 'self' data: blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://checkout.stripe.com",
              "frame-src 'self' https://checkout.stripe.com https://js.stripe.com",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
        ],
      },
    ]
  },

  // Redirects per SEO
  async redirects() {
    return [
      {
        source: '/workout-stock',
        destination: '/',
        permanent: true,
      },
      {
        source: '/workoutstock',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Configurazione per export statico
  trailingSlash: false,
  
  // Variabili ambiente pubbliche
  env: {
    SITE_NAME: 'Best-Trainer',
    SITE_URL: process.env.NODE_ENV === 'production' 
      ? 'https://best-trainer-mvp.vercel.app' 
      : 'http://localhost:3000',
  },
}

module.exports = nextConfig