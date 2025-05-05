// components/common/FontAwesomeLoader.jsx - Version optimisée
"use client";

import { useEffect } from 'react';

export default function FontAwesomeLoader() {
  useEffect(() => {
    // Utilisation de preload pour améliorer le chargement
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    preloadLink.as = 'style';
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);
    
    // Chargement asynchrone avec priorité
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.media = 'print';
    link.onload = () => { link.media = 'all' }; // Chargement non bloquant
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }, []);
  
  return null;
}