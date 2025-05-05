// hooks/useGoogleMaps.js
"use client"

import { useState, useEffect, useCallback } from 'react'

// ID de la librairie pour éviter les duplications
const GOOGLE_MAPS_SCRIPT_ID = 'google-maps-script'

/**
 * Hook pour charger le script de l'API Google Maps de manière optimisée
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
      console.warn('Clé API Google Maps non configurée')
      setLoadError(new Error('Clé API Google Maps non configurée'))
      return
    }

    // Définir la fonction de callback globale
    window.googleMapsCallback = () => {
      setIsLoaded(true)
      console.log('Google Maps API chargée avec succès')
    }

    // Créer et ajouter le script avec chargement optimisé
    const script = document.createElement('script')
    script.id = GOOGLE_MAPS_SCRIPT_ID
    // Charger uniquement les bibliothèques nécessaires et utiliser le chargement asynchrone
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=googleMapsCallback&loading=async`
    script.async = true
    script.defer = true
    
    script.onerror = () => {
      setLoadError(new Error('Erreur lors du chargement de l\'API Google Maps'))
    }

    document.head.appendChild(script)

    return () => {
      window.googleMapsCallback = null
    }
  }, [])

  return { isLoaded, loadError }
}

/**
 * Hook pour utiliser une bibliothèque spécifique de Google Maps de manière optimisée
 * @param {string} library - Nom de la bibliothèque (places, drawing, geometry, etc.)
 * @returns {Object|null} - L'instance de la bibliothèque ou null si non chargée
 */
export const useMapsLibrary = (library) => {
  const [lib, setLib] = useState(null)
  const { isLoaded } = useGoogleMapsScript()

  useEffect(() => {
    if (!isLoaded) return

    // Utilisation de la méthode moderne d'importation des bibliothèques
    if (window.google && window.google.maps) {
      const loadLibrary = async () => {
        try {
          // Utiliser importLibrary au lieu d'accéder directement
          const loadedLib = await window.google.maps.importLibrary(library)
          setLib(loadedLib)
        } catch (error) {
          console.error(`Erreur lors de l'importation de la bibliothèque ${library}:`, error)
        }
      }
      
      loadLibrary()
    }
  }, [isLoaded, library])

  return lib
}

/**
 * Hook pour créer un jeton de session pour les requêtes Places API
 * @returns {Object} - Jeton de session et fonction pour en générer un nouveau
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
 * Hook pour gérer l'autocomplétion d'adresses de manière optimisée
 * @param {Object} options - Options de configuration
 * @returns {Object} - Fonctions et état pour l'autocomplétion
 */
export const useAddressAutocomplete = (options = {}) => {
  const { isLoaded } = useGoogleMapsScript()
  const { sessionToken, generateNewToken } = useSessionToken()
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cache, setCache] = useState({}) // Cache pour éviter les requêtes répétées

  const getPlacePredictions = useCallback(async (input) => {
    if (!isLoaded || !input || input.length < 3) {
      setPredictions([])
      return
    }

    // Vérifier le cache
    const cacheKey = `${input}:${options.country || ''}:${(options.types || []).join(',')}`
    if (cache[cacheKey]) {
      setPredictions(cache[cacheKey])
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        throw new Error('Google Maps Places API non disponible')
      }

      const placesService = new window.google.maps.places.AutocompleteService()
      
      const request = {
        input,
        sessionToken,
        componentRestrictions: options.country ? { country: options.country } : undefined,
        types: options.types || ['address']
      }

      const response = await placesService.getPlacePredictions(request)
      const results = response?.predictions || []
      
      // Mettre en cache les résultats
      setCache(prevCache => ({
        ...prevCache,
        [cacheKey]: results
      }))
      
      setPredictions(results)
    } catch (err) {
      console.error('Erreur lors de la récupération des prédictions d\'adresse:', err)
      setError(err)
      setPredictions([])
    } finally {
      setLoading(false)
    }
  }, [isLoaded, sessionToken, options.country, options.types, cache])

  const getPlaceDetails = useCallback(async (placeId) => {
    if (!isLoaded || !placeId) return null

    try {
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        throw new Error('Google Maps Places API non disponible')
      }

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

  // Fonction pour vider le cache
  const clearCache = useCallback(() => {
    setCache({})
  }, [])

  return {
    predictions,
    loading,
    error,
    getPlacePredictions,
    getPlaceDetails,
    clearCache,
    isLoaded
  }
}

export default { useGoogleMapsScript, useMapsLibrary, useSessionToken, useAddressAutocomplete }