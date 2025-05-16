// components/common/FontAwesomeLoader.jsx - Version robuste pour production
"use client";

import { useEffect, useState } from 'react';

export default function FontAwesomeLoader() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Vérifier si FontAwesome est déjà chargé
    if (document.querySelector('link[href*="font-awesome"]')) {
      setLoaded(true);
      return;
    }

    // Créer le lien vers FontAwesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    
    // Gérer le chargement et les erreurs
    link.onload = () => {
      setLoaded(true);
      setError(false);
    };
    
    link.onerror = () => {
      setError(true);
      console.warn('Failed to load FontAwesome, falling back to Unicode icons');
    };
    
    // Ajouter le lien au head
    document.head.appendChild(link);

    // Cleanup au démontage
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // En cas d'erreur de chargement, ajouter des styles de fallback
  useEffect(() => {
    if (error && !loaded) {
      // Ajouter des styles de fallback avec des caractères Unicode
      const fallbackStyles = document.createElement('style');
      fallbackStyles.innerHTML = `
        .fas::before,
        .fab::before,
        .far::before {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        /* Icônes de fallback essentielles */
        .fa-phone::before { content: '📞'; }
        .fa-envelope::before { content: '✉️'; }
        .fa-car::before { content: '🚗'; }
        .fa-star::before { content: '⭐'; }
        .fa-check::before { content: '✓'; }
        .fa-arrow-right::before { content: '→'; }
        .fa-chevron-down::before { content: '▼'; }
        .fa-chevron-up::before { content: '▲'; }
        .fa-menu::before { content: '☰'; }
        .fa-times::before { content: '✕'; }
      `;
      document.head.appendChild(fallbackStyles);
    }
  }, [error, loaded]);
  
  return null;
}