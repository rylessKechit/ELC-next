// app/layout.js
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileCallButton from '@/components/common/MobileCallButton';
import Breadcrumb from '@/components/common/Breadcrumb';
import FontLoader from '@/components/common/FontLoader';
import FontAwesomeLoader from '@/components/common/FontAwesomeLoader';
import Script from 'next/script';

// Configurer les fonts avec display swap pour améliorer le CLS
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Améliore le CLS (Cumulative Layout Shift)
  fallback: ['system-ui', 'Arial', 'sans-serif']
});

export const metadata = {
  title: 'Elysian Luxury Chauffeurs - Service de chauffeur privé de luxe',
  description: 'Elysian Luxury Chauffeurs - Service de chauffeur privé de luxe. Réservez votre course en quelques clics pour tous vos trajets professionnels et privés.',
  keywords: 'chauffeur privé, limousine, transport VIP, service chauffeur luxe, événements VIP, aéroport VIP',
  alternates: {
    canonical: 'https://www.elysian-luxury-chauffeurs.com',
  },
  openGraph: {
    title: 'Elysian Luxury Chauffeurs - Service de chauffeur privé de luxe',
    description: 'Service de chauffeur privé de luxe pour tous vos déplacements professionnels et privés. Réservez en quelques clics.',
    url: 'https://www.elysian-luxury-chauffeurs.com',
    siteName: 'Elysian Luxury Chauffeurs',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.elysian-luxury-chauffeurs.com/images/og-image.webp', 
        width: 1200,
        height: 630,
        alt: 'Elysian Luxury Chauffeurs',
      },
    ],
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
  twitter: {
    card: 'summary_large_image',
    title: 'Elysian Luxury Chauffeurs - Service de chauffeur privé de luxe',
    description: 'Service de chauffeur privé de luxe pour tous vos déplacements.',
    images: ['https://www.elysian-luxury-chauffeurs.com/images/twitter-card.webp'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#d4af37',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.className}>
      <head>
        {/* Préconnexion aux domaines externes pour accélérer le chargement */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        
        {/* Chargement des polices de manière non-bloquante avec stratégie preload */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Préchargement des ressources critiques */}
        <link 
          rel="preload" 
          href="/assets/images/logo.webp" 
          as="image" 
          fetchPriority="high"
        />
        
        {/* Pour les appareils Apple */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.webp" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Fallback pour les utilisateurs sans JavaScript */}
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
      <body className={inter.className}>
        <FontLoader />
        <FontAwesomeLoader />

        <Header />
        
        {/* Fil d'Ariane pour le SEO et la navigation */}
        <Breadcrumb />
        
        <main className="min-h-screen pb-16 md:pb-0"> {/* Padding bottom pour éviter que le contenu soit caché par la bannière mobile */}
          {children}
        </main>
        
        <Footer />
        
        {/* Bouton d'appel mobile */}
        <MobileCallButton />
        
        {/* Scripts analytiques avec chargement différé et respect RGPD */}
        <Script
          id="gtag-config" 
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'wait_for_update': 500
              });
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || ''}', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
              });
              
              // Chargement différé du script GTM
              const loadGTM = () => {
                if (document.readyState === 'complete') {
                  setTimeout(() => {
                    const gtagScript = document.createElement('script');
                    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || ''}';
                    gtagScript.async = true;
                    document.head.appendChild(gtagScript);
                  }, 3000);  // Différer de 3 secondes après chargement complet
                } else {
                  // Réessayer plus tard si la page n'est pas encore complètement chargée
                  window.addEventListener('load', loadGTM);
                }
              };
              
              loadGTM();
            `
          }}
        />
        
        {/* Script pour le rich snippet LocalBusiness */}
        <Script
          id="schema-script"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LimousineService",
              "name": "Elysian Luxury Chauffeurs",
              "image": "https://www.elysian-luxury-chauffeurs.com/assets/images/logo.webp",
              "url": "https://www.elysian-luxury-chauffeurs.com",
              "telephone": "+33643537653",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Avenue des Champs",
                "addressLocality": "Évry-Courcouronnes",
                "addressRegion": "Île-de-France",
                "postalCode": "91000",
                "addressCountry": "FR"
              },
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
              "potentialAction": {
                "@type": "ReserveAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.elysian-luxury-chauffeurs.com/#booking",
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                }
              }
            })
          }}
        />
        
        {/* Script pour optimiser le chargement des polices */}
        <Script
          id="font-loading-optimization"
          strategy="afterInteractive"
        >
          {`
            // Détection de chargement des polices terminé
            if (document.fonts) {
              document.fonts.ready.then(function() {
                document.documentElement.classList.add('fonts-loaded');
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}