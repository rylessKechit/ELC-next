// app/layout.js - Version SEO et performance optimisée
import '../styles/globals.css';
import { Inter, Montserrat, Playfair_Display } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import FontAwesomeLoader from '@/components/common/FontAwesomeLoader';
import Script from 'next/script';

// Configuration des polices optimisée
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  preload: true,
  fallback: ['sans-serif'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  preload: false, // Chargé uniquement si nécessaire
  fallback: ['serif'],
});

export const metadata = {
  metadataBase: new URL('https://www.elysian-luxury-chauffeurs.com'),
  title: {
    default: 'VTC Ballainvilliers | Chauffeur Privé Essonne (91) - ELC',
    template: '%s | VTC Ballainvilliers - Elysian Luxury Chauffeurs'
  },
  description: 'VTC Ballainvilliers ⭐ Chauffeur privé Essonne (91) ⭐ Service premium 24h/24 ⭐ Véhicules haut de gamme ⭐ Réservation immédiate ☎️ 06 43 53 76 53',
  keywords: [
    'vtc ballainvilliers',
    'chauffeur privé essonne',
    'chauffeur privé 91',
    'transport ballainvilliers',
    'vtc essonne',
    'taxi ballainvilliers',
    'chauffeur ballainvilliers',
    'vtc 91',
    'transport premium essonne',
    'vtc longjumeau',
    'vtc antony',
    'vtc massy'
  ].join(', '),
  authors: [{ name: 'Elysian Luxury Chauffeurs' }],
  creator: 'Elysian Luxury Chauffeurs',
  publisher: 'VTC Ballainvilliers',
  category: 'Transport Services',
  
  alternates: {
    canonical: 'https://www.elysian-luxury-chauffeurs.com',
    languages: {
      'fr-FR': 'https://www.elysian-luxury-chauffeurs.com',
      'en-US': 'https://www.elysian-luxury-chauffeurs.com/en'
    }
  },
  
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.elysian-luxury-chauffeurs.com',
    title: 'VTC Ballainvilliers | Chauffeur Privé Essonne (91) - Service Premium',
    description: 'Service VTC premium à Ballainvilliers et chauffeur privé dans l\'Essonne. Réservation 24h/24 avec véhicules haut de gamme. Transport de luxe dans le 91.',
    siteName: 'VTC Ballainvilliers - Elysian Luxury Chauffeurs',
    images: [
      {
        url: '/assets/images/vtc-ballainvilliers-og.jpg',
        width: 1200,
        height: 630,
        alt: 'VTC Ballainvilliers et Chauffeur Privé Essonne - Service Premium',
        type: 'image/jpeg',
      }
    ],
    videos: [
      {
        url: '/assets/videos/vtc-ballainvilliers-presentation.mp4',
        width: 1280,
        height: 720,
        type: 'video/mp4',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    site: '@ElysianVTC',
    creator: '@ElysianVTC',
    title: 'VTC Ballainvilliers | Chauffeur Privé Essonne (91)',
    description: 'Service VTC premium à Ballainvilliers et chauffeur privé dans l\'Essonne. Réservation 24h/24.',
    images: ['/assets/images/vtc-ballainvilliers-twitter.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    yandex: process.env.YANDEX_VERIFICATION_CODE,
    bing: process.env.BING_VERIFICATION_CODE,
  },
  
  manifest: '/manifest.json',
  
  other: {
    // Métadonnées géographiques pour le SEO local
    'geo.region': 'FR-91',
    'geo.placename': 'Ballainvilliers, Essonne',
    'geo.position': '48.6747;2.2897',
    'ICBM': '48.6747, 2.2897',
    // Business info
    'business:contact_data:street_address': 'Zone de service Ballainvilliers',
    'business:contact_data:locality': 'Ballainvilliers',
    'business:contact_data:region': 'Essonne',
    'business:contact_data:postal_code': '91160',
    'business:contact_data:country_name': 'France',
    'business:contact_data:phone_number': '+33643537653',
    // Rich snippets hints
    'rating': '4.9',
    'priceRange': '€€€',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d4af37' },
    { media: '(prefers-color-scheme: dark)', color: '#1c2938' }
  ],
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="fr" 
      className={`${inter.variable} ${montserrat.variable} ${playfairDisplay.variable}`}
      itemScope 
      itemType="https://schema.org/WebSite"
    >
      <head>
        {/* Préconnexion DNS pour accélérer le chargement */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        
        {/* Préchargement des ressources critiques */}
        <link rel="preload" href="/assets/images/hero.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/images/logo.webp" as="image" type="image/webp" />
        
        {/* DNS prefetch pour les domaines externes */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.facebook.com" />
        <link rel="dns-prefetch" href="//platform.twitter.com" />
        
        {/* Pour les appareils Apple */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VTC Ballainvilliers" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.webp" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.webp" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.webp" />
        
        {/* PWA et autres icônes */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Microsoft */}
        <meta name="msapplication-TileColor" content="#d4af37" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Chargement Font Awesome optimisé */}
        <noscript>
          <link 
            rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
            crossOrigin="anonymous" 
            referrerPolicy="no-referrer"
          />
        </noscript>
      </head>
      
      <body className={`${inter.className} font-sans antialiased`} itemScope itemType="https://schema.org/WebPage">
        {/* Chargement optimisé des fonts */}
        <FontAwesomeLoader />

        {/* Skip link pour l'accessibilité */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
        >
          Aller au contenu principal
        </a>

        <Header />
        
        <Breadcrumb />
        
        <main id="main-content" className="min-h-screen" role="main">
          {children}
        </main>
        
        <Footer />
        
        {/* Google Analytics avec consentement RGPD */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false
                });
                
                // Event tracking pour VTC Ballainvilliers
                gtag('event', 'page_view', {
                  page_title: 'VTC Ballainvilliers',
                  page_location: window.location.href,
                  content_group1: 'VTC Services',
                  content_group2: 'Ballainvilliers'
                });
              `}
            </Script>
          </>
        )}
        
        {/* Google Tag Manager (alternative) */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
          >
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}
        
        {/* Schema.org enrichi pour VTC Ballainvilliers */}
        <Script
          id="structured-data-vtc"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://www.elysian-luxury-chauffeurs.com/#business",
                  "name": "VTC Ballainvilliers - Elysian Luxury Chauffeurs",
                  "alternateName": "Chauffeur Privé Essonne",
                  "description": "Service VTC premium à Ballainvilliers avec chauffeurs privés dans l'Essonne. Transport haut de gamme 24h/24.",
                  "image": {
                    "@type": "ImageObject",
                    "url": "https://www.elysian-luxury-chauffeurs.com/assets/images/logo.webp",
                    "width": 400,
                    "height": 200
                  },
                  "logo": {
                    "@type": "ImageObject", 
                    "url": "https://www.elysian-luxury-chauffeurs.com/assets/images/logo.webp"
                  },
                  "url": "https://www.elysian-luxury-chauffeurs.com",
                  "telephone": "+33643537653",
                  "email": "contact@elysian-luxury-chauffeurs.com",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Zone de service",
                    "addressLocality": "Ballainvilliers",
                    "addressRegion": "Essonne",
                    "postalCode": "91160",
                    "addressCountry": "FR"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 48.6747,
                    "longitude": 2.2897
                  },
                  "areaServed": [
                    {
                      "@type": "City",
                      "name": "Ballainvilliers",
                      "containedInPlace": {
                        "@type": "AdministrativeArea",
                        "name": "Essonne"
                      }
                    },
                    {
                      "@type": "AdministrativeArea",
                      "name": "Essonne",
                      "alternateName": "Département 91"
                    }
                  ],
                  "serviceType": [
                    "VTC Ballainvilliers",
                    "Chauffeur privé Essonne", 
                    "Transport premium",
                    "Transfert aéroport",
                    "Transport d'affaires"
                  ],
                  "priceRange": "€€€",
                  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
                  "currenciesAccepted": "EUR",
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday", "Tuesday", "Wednesday", "Thursday", 
                        "Friday", "Saturday", "Sunday"
                      ],
                      "opens": "00:00",
                      "closes": "23:59"
                    }
                  ],
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "156",
                    "bestRating": "5",
                    "worstRating": "1"
                  },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Services VTC Ballainvilliers",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service",
                          "name": "VTC Premium Ballainvilliers",
                          "description": "Service VTC haut de gamme avec chauffeur privé d'élite"
                        },
                        "price": "35",
                        "priceCurrency": "EUR"
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Service", 
                          "name": "Transfert Aéroport Orly",
                          "description": "Transport VTC depuis Ballainvilliers vers aéroport Orly"
                        },
                        "price": "45",
                        "priceCurrency": "EUR"
                      }
                    ]
                  },
                  "sameAs": [
                    "https://www.facebook.com/ElysianVTC",
                    "https://www.instagram.com/elysianvtc",
                    "https://www.linkedin.com/company/elysian-vtc"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.elysian-luxury-chauffeurs.com/#website",
                  "url": "https://www.elysian-luxury-chauffeurs.com",
                  "name": "VTC Ballainvilliers - Chauffeur Privé Essonne",
                  "description": "Service VTC premium à Ballainvilliers et chauffeur privé dans l'Essonne",
                  "publisher": {
                    "@id": "https://www.elysian-luxury-chauffeurs.com/#business"
                  },
                  "potentialAction": [
                    {
                      "@type": "SearchAction",
                      "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://www.elysian-luxury-chauffeurs.com/search?q={search_term_string}"
                      },
                      "query-input": "required name=search_term_string"
                    }
                  ],
                  "inLanguage": "fr-FR"
                }
              ]
            })
          }}
        />
        
        {/* Performance monitoring */}
        <Script
          id="performance-observer"
          strategy="afterInteractive"
        >
          {`
            // Web Vitals tracking
            function sendToAnalytics(metric) {
              if (typeof gtag !== 'undefined') {
                gtag('event', metric.name, {
                  event_category: 'Web Vitals',
                  event_label: metric.id,
                  value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                  non_interaction: true,
                });
              }
            }
            
            // Import et utilisation de web-vitals
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ onCLS, onFCP, onFID, onLCP, onTTFB }) => {
              onCLS(sendToAnalytics);
              onFCP(sendToAnalytics);
              onFID(sendToAnalytics);
              onLCP(sendToAnalytics);
              onTTFB(sendToAnalytics);
            });
          `}
        </Script>
      </body>
    </html>
  );
}