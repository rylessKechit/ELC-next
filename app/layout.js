// app/layout.js
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Préconnexion aux domaines externes pour accélérer le chargement */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        
        {/* Remove Google Fonts CDN - using Next.js font optimization instead */}
        
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
        
        {/* Schema.org structuré */}
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
              ]
            })
          }}
        />
      </body>
    </html>
  );
}