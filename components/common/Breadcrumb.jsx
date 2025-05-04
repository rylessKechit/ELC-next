"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const Breadcrumb = () => {
  const pathname = usePathname();
  
  // Ne pas afficher le fil d'Ariane sur la page d'accueil
  if (pathname === '/') {
    return null;
  }
  
  // Créer le fil d'Ariane à partir du chemin
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  // Construire les segments avec leurs URL
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    
    // Formater le texte du segment (remplacer les tirets par des espaces et mettre en majuscule la première lettre)
    let label = segment.replace(/-/g, ' ');
    
    // Traduire les segments courants en français
    switch(segment) {
      case 'services':
        label = 'Services';
        break;
      case 'a-propos':
        label = 'À propos';
        break;
      case 'contact':
        label = 'Contact';
        break;
      case 'flotte-vehicules':
        label = 'Notre Flotte';
        break;
      case 'experience-vip':
        label = 'Transfert VIP';
        break;
      case 'services-evenements':
        label = 'Événements & Soirées';
        break;
      case 'services-longue-distance':
        label = 'Voyages Longue Distance';
        break;
      case 'services-affaires':
        label = 'Transport d\'Affaires';
        break;
      case 'legals':
        label = 'Mentions Légales';
        break;
      default:
        // Première lettre en majuscule pour les autres segments
        label = label.charAt(0).toUpperCase() + label.slice(1);
    }
    
    return {
      url,
      label,
      isLast: index === pathSegments.length - 1
    };
  });
  
  // Créer le schéma structuré pour le fil d'Ariane (Schema.org)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://elysian-luxury-chauffeurs.com"
      },
      ...breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": `https://elysian-luxury-chauffeurs.com${item.url}`
      }))
    ]
  };
  
  return (
    <>
      {/* Balisage structuré pour les moteurs de recherche */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Affichage visuel du fil d'Ariane */}
      <nav aria-label="Fil d'Ariane" className="py-3 px-4 bg-light text-sm mt-20">
        <ol className="flex flex-wrap items-center">
          <li className="flex items-center">
            <Link 
              href="/" 
              className="text-gray-500 hover:text-primary transition-colors duration-300 flex items-center"
              aria-label="Accueil"
            >
              <i className="fas fa-home mr-1"></i>
              <span className="hidden sm:inline">Accueil</span>
            </Link>
          </li>
          
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <i className="fas fa-chevron-right mx-2 text-gray-400 text-xs" aria-hidden="true"></i>
              
              {item.isLast ? (
                <span className="font-semibold text-primary" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-gray-500 hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;