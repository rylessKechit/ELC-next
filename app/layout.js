// app/layout.js - Version optimisée SEO Ballainvilliers
import '../styles/globals.css';
import { Inter, Montserrat, Playfair_Display } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import FontLoader from '@/components/common/FontLoader';
import FontAwesomeLoader from '@/components/common/FontAwesomeLoader';
import Script from 'next/script';

// Configuration des polices localement via Next.js au lieu de CDN
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'VTC Ballainvilliers | Chauffeurs Privé Essonne (91) - ELC',
  description: 'VTC Ballainvilliers / Essonne : service premium 24h/24 dans le département 91. Véhicules haut de gamme, chauffeurs expérimentés. Réservation en ligne.',
  keywords: 'vtc ballainvilliers, chauffeurs privé essonne, chauffeur privé 91, transport ballainvilliers, vtc essonne, taxi ballainvilliers, chauffeur ballainvilliers, vtc 91',
  alternates: {
    canonical: 'https://www.elysian-luxury-chauffeurs.com',
  },
  openGraph: {
    title: 'VTC Ballainvilliers | Chauffeurs Privé Essonne (91)',
    description: 'Service VTC premium à Ballainvilliers et chauffeurs privés dans tout l\'Essonne (91). Réservation 24h/24 avec véhicules haut de gamme.',
    url: 'https://www.elysian-luxury-chauffeurs.com',
    siteName: 'VTC Ballainvilliers - Elysian Luxury Chauffeurs',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.elysian-luxury-chauffeurs.com/assets/images/vtc-ballainvilliers-og.webp',
        width: 1200,
        height: 630,
        alt: 'VTC Ballainvilliers et Chauffeurs Privé Essonne',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VTC Ballainvilliers | Chauffeurs Privé Essonne (91)',
    description: 'Service VTC premium à Ballainvilliers et chauffeurs privés dans l\'Essonne. Réservation 24h/24.',
    images: ['https://www.elysian-luxury-chauffeurs.com/assets/images/vtc-ballainvilliers-twitter.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'à-remplir-avec-votre-code-de-vérification',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#d4af37',
  other: {
    'geo.region': 'FR-91',
    'geo.placename': 'Ballainvilliers, Essonne',
    'geo.position': '48.6747;2.2897',
    'ICBM': '48.6747, 2.2897'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Préconnexion aux domaines externes pour accélérer le chargement */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        
        {/* Métadonnées géographiques pour le SEO local */}
        <meta name="geo.region" content="FR-91" />
        <meta name="geo.placename" content="Ballainvilliers, Essonne" />
        <meta name="geo.position" content="48.6747;2.2897" />
        <meta name="ICBM" content="48.6747, 2.2897" />
        
        {/* Pour les appareils Apple */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.webp" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Chargement Font Awesome plus robuste */}
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
      <body className={`${inter.className} font-sans`}>
        <FontAwesomeLoader />

        <Header />
        
        <Breadcrumb />
        
        <main className="min-h-screen pb-16 md:pb-0">
          {children}
        </main>
        
        <Footer />
        
        {/* Analytics avec protection RGPD */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
        )}
        
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || ''}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
        
        {/* Schema.org structuré pour VTC Ballainvilliers */}
        <Script
          id="schema-script"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LimousineService",
              "name": "VTC Ballainvilliers - Elysian Luxury Chauffeurs",
              "alternateName": "Chauffeurs Privé Essonne",
              "image": "https://www.elysian-luxury-chauffeurs.com/assets/images/logo.webp",
              "url": "https://www.elysian-luxury-chauffeurs.com",
              "telephone": "+33643537653",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Zone de service Ballainvilliers",
                "addressLocality": "Ballainvilliers",
                "addressRegion": "Essonne",
                "postalCode": "91160",
                "addressCountry": "FR"
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
              "serviceType": ["VTC Ballainvilliers", "Chauffeurs privé Essonne", "Transport premium"],
              "priceRange": "€€€",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                  ],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services VTC Ballainvilliers",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "VTC Ballainvilliers",
                      "description": "Service VTC premium à Ballainvilliers avec chauffeurs privés"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Chauffeurs privé Essonne",
                      "description": "Chauffeurs privés professionnels dans tout le département de l'Essonne"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Schema local business pour Ballainvilliers */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.elysian-luxury-chauffeurs.com/#ballainvilliers",
              "name": "VTC Ballainvilliers",
              "image": "https://www.elysian-luxury-chauffeurs.com/assets/images/vtc-ballainvilliers.webp",
              "telephone": "+33643537653",
              "address": {
                "@type": "PostalAddress",
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
              "openingHours": "Mo-Su 00:00-23:59",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates", 
                  "latitude": 48.6747,
                  "longitude": 2.2897
                },
                "geoRadius": "50000"
              }
            })
          }}
        />
      </body>
    </html>
  );
}