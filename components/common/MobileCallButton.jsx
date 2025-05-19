"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const MobileCallButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Détecte le défilement pour masquer le bouton en haut de page
  useEffect(() => {
    const handleScroll = () => {
      // Afficher le bouton après avoir défilé un peu
      setHasScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // N'affiche pas le bouton sur les grands écrans
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${hasScrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      {/* Version compacte ou étendue */}
      {isExpanded ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-64 transform transition-transform duration-300 animate-slide-in-up">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-secondary">Besoin d'un chauffeur ?</h4>
            <button 
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Fermer le menu d'options"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="space-y-3">
            <Link 
              href="tel:+33643537653" 
              className="bg-secondary hover:bg-secondary-dark text-white py-3 px-4 rounded-full font-medium transition-colors duration-300 w-full flex items-center justify-center"
              aria-label="Appeler maintenant pour réserver un chauffeur"
            >
              <i className="fas fa-phone mr-2"></i>
              Appeler maintenant
            </Link>
            
            <Link 
              href="/#booking" 
              className="bg-primary hover:bg-primary-dark hover:text-white text-white py-3 px-4 rounded-full font-medium transition-colors duration-300 w-full flex items-center justify-center"
              aria-label="Réserver un chauffeur en ligne"
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              Réserver
            </Link>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 bg-primary hover:bg-primary-dark hover:text-white text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-300"
          aria-label="Afficher les options de contact pour réserver un chauffeur"
          aria-expanded={isExpanded}
        >
          <i className="fas fa-phone text-lg animate-pulse"></i>
        </button>
      )}
    </div>
  );
};

export default MobileCallButton;