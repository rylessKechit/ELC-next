// components/common/FontLoader.jsx - Version simplifiée pour Next.js
"use client";

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Marquer les polices comme chargées
    // (Next.js gère automatiquement le chargement des polices)
    if (document.fonts) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    } else {
      // Fallback pour les anciens navigateurs
      document.documentElement.classList.add('fonts-loaded');
    }
  }, []);

  return null;
}