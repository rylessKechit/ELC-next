// hooks/useGoogleMaps.js
"use client"

import { useState, useEffect, useCallback } from 'react'

// ID de la librairie pour éviter les duplications
const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'

/**
 * Hook pour charger le script de l'API Google Maps
 * @returns {Object} - État de chargement du script
 */
export const useGoogleMapsScript = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    // Vérifier si le script est déjà chargé
    if (document.getElementById(GOOGLE_MAPS_SCRIPT_ID)) {
      setIsLoaded(window.google && window.google.maps)
      return
    }

    // Récupérer la clé API depuis l'environnement
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setLoadError(new Error('Clé API Google Maps non configurée'))
      return
    }

    // Créer et ajouter le script
    const script = document.createElement('script')
    script.id = GOOGLE_MAPS_SCRIPT_ID
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=googleMapsCallback`
    script.async = true
    script.defer = true

    // Définir la fonction de callback globale
    window.googleMapsCallback = () => {
      setIsLoaded(true)
      console.log('Google Maps API chargée avec succès')
    }

    // Gérer les erreurs
    script.onerror = () => {
      setLoadError(new Error('Erreur lors du chargement de l\'API Google Maps'))
    }

    // Ajouter le script au document
    document.head.appendChild(script)

    // Nettoyage
    return () => {
      // Ne pas supprimer le script lors du démontage du composant
      // car d'autres composants pourraient l'utiliser
      window.googleMapsCallback = null
    }
  }, [])

  return { isLoaded, loadError }
}

/**
 * Hook pour utiliser une bibliothèque spécifique de Google Maps
 * @param {string} library - Nom de la bibliothèque (places, drawing, geometry, etc.)
 * @returns {Object|null} - L'instance de la bibliothèque ou null si non chargée
 */
export const useMapsLibrary = (library) => {
  const [lib, setLib] = useState(null)
  const { isLoaded } = useGoogleMapsScript()

  useEffect(() => {
    if (!isLoaded) return

    // Essayer de récupérer la bibliothèque
    try {
      if (window.google && window.google.maps) {
        setLib(window.google.maps.importLibrary(library))
      }
    } catch (error) {
      console.error(`Erreur lors de l'accès à la bibliothèque ${library}:`, error)
    }
  }, [isLoaded, library])

  return lib
}

/**
 * Hook pour créer un jeton de session pour les requêtes Places API
 * @returns {string} - Jeton de session
 */
export const useSessionToken = () => {
  const { isLoaded } = useGoogleMapsScript()
  const [sessionToken, setSessionToken] = useState(null)

  const generateNewToken = useCallback(() => {
    if (!isLoaded || !window.google || !window.google.maps || !window.google.maps.places) {
      return null
    }
    
    setSessionToken(new window.google.maps.places.AutocompleteSessionToken())
  }, [isLoaded])

  // Générer un jeton au premier chargement
  useEffect(() => {
    if (isLoaded && !sessionToken) {
      generateNewToken()
    }
  }, [isLoaded, sessionToken, generateNewToken])

  return { sessionToken, generateNewToken }
}

/**
 * Hook pour gérer l'autocomplétion d'adresses
 * @param {Object} options - Options de configuration
 * @returns {Object} - Fonctions et état pour l'autocomplétion
 */
export const useAddressAutocomplete = (options = {}) => {
  const { isLoaded } = useGoogleMapsScript()
  const { sessionToken, generateNewToken } = useSessionToken()
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getPlacePredictions = useCallback(async (input) => {
    if (!isLoaded || !input) {
      setPredictions([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const placesService = new window.google.maps.places.AutocompleteService()
      
      const request = {
        input,
        sessionToken,
        componentRestrictions: options.country ? { country: options.country } : undefined,
        types: options.types || ['address']
      }

      const response = await placesService.getPlacePredictions(request)
      setPredictions(response.predictions || [])
    } catch (err) {
      console.error('Erreur lors de la récupération des prédictions d\'adresse:', err)
      setError(err)
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }, [isLoaded, sessionToken, options.country, options.types])

  const getPlaceDetails = useCallback(async (placeId) => {
    if (!isLoaded || !placeId) return null

    try {
      const placesService = new window.google.maps.places.PlacesService(
        document.createElement('div')
      )
      
      return new Promise((resolve, reject) => {
        placesService.getDetails(
          {
            placeId,
            fields: options.fields || ['address_components', 'formatted_address', 'geometry', 'name'],
            sessionToken
          },
          (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              // Générer un nouveau jeton après avoir obtenu les détails
              generateNewToken()
              resolve(place)
            } else {
              reject(new Error(`Erreur Places API: ${status}`))
            }
          }
        )
      })
    } catch (err) {
      console.error('Erreur lors de la récupération des détails du lieu:', err)
      return null
    }
  }, [isLoaded, sessionToken, generateNewToken, options.fields])

  return {
    predictions,
    loading,
    error,
    getPlacePredictions,
    getPlaceDetails,
    isLoaded
  }
}

export default { useGoogleMapsScript, useMapsLibrary, useSessionToken, useAddressAutocomplete }