// components/booking/AddressInput.jsx - Version corrigée
"use client";

import { useState, useEffect, useRef } from 'react';

// Variable globale pour suivre si le script est chargé
let googleMapsLoaded = false;
let googleMapsLoading = false;

const AddressInput = ({ id, value, onChange, onSelect, placeholder }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Charger le script Google Maps au montage du composant, pas au focus
  useEffect(() => {
    // Si le script est déjà chargé
    if (googleMapsLoaded) {
      initializeAutocomplete();
      return;
    }

    // Si le script est en cours de chargement
    if (googleMapsLoading) {
      const checkInterval = setInterval(() => {
        if (googleMapsLoaded) {
          clearInterval(checkInterval);
          initializeAutocomplete();
        }
      }, 100);
      
      return () => clearInterval(checkInterval);
    }

    // Sinon, charger le script
    googleMapsLoading = true;
    setIsLoading(true);
    
    // Fonction de callback pour l'API Google Maps
    window.initGoogleMapsAutocomplete = () => {
      googleMapsLoading = false;
      googleMapsLoaded = true;
      setIsLoading(false);
      initializeAutocomplete();
    };
    
    const script = document.createElement('script');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.error('API key for Google Maps is missing');
      setIsLoading(false);
      googleMapsLoading = false;
      return;
    }
    
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMapsAutocomplete&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      console.error('Failed to load Google Maps script');
      setIsLoading(false);
      googleMapsLoading = false;
    };
    
    document.head.appendChild(script);
    
    // Nettoyage
    return () => {
      if (autocompleteRef.current && google && google.maps && google.maps.event) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  // Initialiser l'autocomplete
  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google || !window.google.maps || !window.google.maps.places) {
      return;
    }

    try {
      // Nettoyer l'ancienne instance si elle existe
      if (autocompleteRef.current && google.maps.event) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      
      // Créer une nouvelle instance pour ce champ
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'fr' },
        fields: ['address_components', 'formatted_address', 'place_id', 'geometry']
      });
      
      // Ajouter l'écouteur d'événements
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        
        if (place && place.place_id && place.formatted_address) {
          onChange(place.formatted_address);
          onSelect(place.formatted_address, place.place_id);
        }
      });
    } catch (error) {
      console.error('Error initializing Google Maps Autocomplete:', error);
    }
  };

  // Synchroniser l'input avec la valeur React
  useEffect(() => {
    // Si inputRef existe mais n'a pas le focus, synchroniser sa valeur
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = value || '';
    }
  }, [value]);

  // Gérer le changement de valeur
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (onSelect) {
      onSelect(newValue, '');
    }
  };

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
          defaultValue={value} // Utilisation de defaultValue au lieu de value
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          autoComplete="off" // Désactiver l'autocomplétion native du navigateur
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