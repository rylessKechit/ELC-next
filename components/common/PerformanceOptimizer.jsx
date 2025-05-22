// components/common/PerformanceOptimizer.jsx
"use client";

import { memo, lazy, Suspense, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

// Lazy loading des composants non critiques
const LazyTestimonials = lazy(() => import('../sections/TestimonialsSection'));
const LazyPartners = lazy(() => import('../sections/PartnersSection'));
const LazyFAQ = lazy(() => import('../sections/FAQSection'));

// Composant de loading optimisé
const LoadingPlaceholder = memo(({ height = "h-64", className = "" }) => (
  <div className={`${height} ${className} bg-gray-50 animate-pulse rounded-lg flex items-center justify-center`}>
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">Chargement...</p>
    </div>
  </div>
));

LoadingPlaceholder.displayName = 'LoadingPlaceholder';

// Hook pour la détection de la connexion
const useConnectionSpeed = () => {
  const [connectionSpeed, setConnectionSpeed] = useState('4g');

  useEffect(() => {
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      setConnectionSpeed(connection.effectiveType || '4g');
      
      const handleChange = () => {
        setConnectionSpeed(connection.effectiveType || '4g');
      };
      
      connection.addEventListener('change', handleChange);
      return () => connection.removeEventListener('change', handleChange);
    }
  }, []);

  return connectionSpeed;
};

// Hook pour la gestion des images adaptives
const useAdaptiveImages = () => {
  const [imageQuality, setImageQuality] = useState(85);
  const connectionSpeed = useConnectionSpeed();

  useEffect(() => {
    switch (connectionSpeed) {
      case 'slow-2g':
      case '2g':
        setImageQuality(60);
        break;
      case '3g':
        setImageQuality(75);
        break;
      case '4g':
      default:
        setImageQuality(85);
        break;
    }
  }, [connectionSpeed]);

  return { imageQuality, connectionSpeed };
};

// Composant pour les images optimisées
const OptimizedImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  className = "",
  priority = false,
  ...props 
}) => {
  const { imageQuality, connectionSpeed } = useAdaptiveImages();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  });

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (inView || priority) {
      // Générer l'URL optimisée selon la connexion
      const optimizedSrc = connectionSpeed === 'slow-2g' || connectionSpeed === '2g' 
        ? src.replace('.webp', '_small.webp').replace('.jpg', '_small.jpg')
        : src;
      
      setImageSrc(optimizedSrc);
    }
  }, [inView, priority, src, connectionSpeed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder pendant le chargement */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}
        >
          <div className="text-gray-400">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Image réelle */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setImageLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Composant pour le préchargement des pages critiques
const PagePreloader = memo(() => {
  useEffect(() => {
    // Précharger les pages importantes au survol des liens
    const preloadPage = (href) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    };

    const handleLinkHover = (event) => {
      const link = event.target.closest('a');
      if (link && link.hostname === window.location.hostname) {
        preloadPage(link.href);
      }
    };

    // Précharger au survol
    document.addEventListener('mouseover', handleLinkHover);
    
    // Précharger les pages critiques après 2 secondes
    const criticalPages = [
      '/vtc-ballainvilliers',
      '/chauffeurs-prive-essonne',
      '/contact',
      '/flotte-vehicules'
    ];

    const preloadTimer = setTimeout(() => {
      criticalPages.forEach(preloadPage);
    }, 2000);

    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
      clearTimeout(preloadTimer);
    };
  }, []);

  return null;
});

PagePreloader.displayName = 'PagePreloader';

// Composant principal d'optimisation
const PerformanceOptimizer = memo(({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Optimisations client-side
    if (typeof window !== 'undefined') {
      // Préconnexion aux domaines critiques
      const preconnectDomains = [
        'https://cdnjs.cloudflare.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com'
      ];

      preconnectDomains.forEach(domain => {
        if (!document.querySelector(`link[href="${domain}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        }
      });

      // Optimisation des fonts
      if ('fonts' in document) {
        document.fonts.ready.then(() => {
          document.documentElement.classList.add('fonts-loaded');
        });
      }

      // Service Worker pour le cache
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        navigator.serviceWorker.register('/sw.js')
          .catch(err => console.log('Service Worker registration failed'));
      }
    }
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingPlaceholder height="h-32" />
      </div>
    );
  }

  return (
    <>
      <PagePreloader />
      {children}
    </>
  );
});

PerformanceOptimizer.displayName = 'PerformanceOptimizer';

// Composant pour les sections lazy-loadées
const LazySection = memo(({ 
  component: Component, 
  fallback, 
  threshold = 0.1, 
  rootMargin = '100px',
  ...props 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
    rootMargin
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={fallback || <LoadingPlaceholder />}>
          <Component {...props} />
        </Suspense>
      ) : (
        fallback || <LoadingPlaceholder />
      )}
    </div>
  );
});

LazySection.displayName = 'LazySection';

export { 
  PerformanceOptimizer, 
  OptimizedImage, 
  LoadingPlaceholder, 
  LazySection,
  useAdaptiveImages,
  useConnectionSpeed
};