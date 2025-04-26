// components/booking/AddressInput.jsx
"use client"

import { useState, useEffect, useRef } from 'react'
import { useMapsLibrary, useGoogleMapsScript } from '@/hooks/useGoogleMaps'

const AddressInput = ({ id, value, onChange, onSelect, placeholder }) => {
  const { isLoaded } = useGoogleMapsScript()
  const placesLibrary = useMapsLibrary('places')
  
  const inputRef = useRef(null)
  const autocompleteRef = useRef(null)
  
  // Initialiser l'autocomplete quand l'API est chargée
  useEffect(() => {
    if (!isLoaded || !placesLibrary || !inputRef.current || autocompleteRef.current) return
    
    try {
      // Créer l'autocomplete
      autocompleteRef.current = new placesLibrary.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'fr' },
        fields: ['address_components', 'formatted_address', 'place_id', 'geometry']
      })
      
      // Ajouter l'événement de sélection
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace()
        if (place && place.place_id) {
          onChange(place.formatted_address || '')
          onSelect(place.formatted_address || '', place.place_id)
        }
      })
      
      console.log(`Autocomplete initialized for ${id}`)
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'autocomplete:', error)
    }
  }, [isLoaded, placesLibrary, id, onChange, onSelect])
  
  // Réinitialisation de l'autocomplete si la valeur est effacée
  useEffect(() => {
    if (value === '' && inputRef.current) {
      inputRef.current.value = ''
    }
  }, [value])
  
  return (
    <div className="relative">
      <input
        id={id}
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        disabled={!isLoaded}
      />
      {!isLoaded && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </div>
  )
}

export default AddressInput