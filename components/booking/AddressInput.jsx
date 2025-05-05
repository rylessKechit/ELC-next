// components/booking/AddressInput.jsx
"use client";

import { useState, useEffect, useRef } from 'react';

const AddressInput = ({ id, value, onChange, onSelect, placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  
  // Initialiser l'API Google Maps uniquement lorsque l'input est focalisé
  useEffect(() => {
    const handleFocus = () => {
      if (!isLoaded && !isLoading) {
        loadGoogleMapsScript();
      }
    };
    
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', handleFocus);
    }
    
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', handleFocus);
      }
    };
  }, [isLoaded, isLoading]);
  
  // Initialiser l'API Google Maps
  const loadGoogleMapsScript = () => {
    // Variable pour suivre si le composant est toujours monté
    let isMounted = true;
    
    // Vérifier si l'API est déjà chargée
    if (window.google && window.google.maps && window.google.maps.places) {
      if (isMounted) {
        setIsLoaded(true);
      }
      return;
    }
    
    // Vérifier si le script est déjà en cours de chargement
    if (window.googleMapsScriptLoading) {
      // Attendre que le script soit chargé
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkLoaded);
          if (isMounted) {
            setIsLoaded(true);
          }
        }
      }, 100);
      return;
    }
    
    // Marquer le script comme en cours de chargement
    window.googleMapsScriptLoading = true;
    
    // Créer une fonction de callback globale
    window.initGoogleMapsAutocomplete = () => {
      window.googleMapsScriptLoading = false;
      if (isMounted) {
        setIsLoaded(true);
      }
    };
    
    // Charger le script
    setIsLoading(true);
    const script = document.createElement('script');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    // Charger uniquement les bibliothèques nécessaires
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMapsAutocomplete&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      if (isMounted) {
        console.error('Erreur lors du chargement de l\'API Google Maps');
        setIsLoading(false);
      }
      window.googleMapsScriptLoading = false;
    };
    
    document.head.appendChild(script);
  };
  
  // Initialiser l'autocomplete quand l'API est chargée
  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      try {
        // Créer l'autocomplete
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'fr' },
          fields: ['address_components', 'formatted_address', 'place_id', 'geometry']
        });
        
        // Ajouter l'événement de sélection
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.place_id) {
            onChange(place.formatted_address || '');
            onSelect(place.formatted_address || '', place.place_id);
          }
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'autocomplete:', error);
        setIsLoading(false);
      }
    }
  }, [isLoaded, onChange, onSelect]);
  
  // Réinitialisation de l'autocomplete si la valeur est effacée
  useEffect(() => {
    if (value === '' && inputRef.current) {
      inputRef.current.value = '';
    }
  }, [value]);

  return (
    <div className="relative">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3" aria-hidden="true">
          <i className="fas fa-map-marker-alt text-gray-400"></i>
        </span>
        <input
          id={id}
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Saisissez une adresse et sélectionnez une suggestion dans la liste
      </p>
    </div>
  );
};

export default AddressInput;