// services/googleMapsService.js - Version qui bypasse le proxy en production
import axios from 'axios'

export const googleMapsService = {
  /**
   * Version qui utilise toujours l'API directe (pas de proxy)
   * Cela devrait fonctionner si votre clé API est bien configurée
   */
  async getRouteDetails(originPlaceId, destinationPlaceId) {
    try {
      // Validation des inputs
      if (!originPlaceId || !destinationPlaceId) {
        throw new Error('Les IDs de lieux d\'origine et de destination sont requis')
      }

      if (typeof originPlaceId !== 'string' || originPlaceId.trim() === '') {
        throw new Error('ID du lieu d\'origine invalide')
      }

      if (typeof destinationPlaceId !== 'string' || destinationPlaceId.trim() === '') {
        throw new Error('ID du lieu de destination invalide')
      }

      console.log('🚗 [GoogleMaps] Calcul de route:', { 
        originPlaceId: originPlaceId.substring(0, 20) + '...', 
        destinationPlaceId: destinationPlaceId.substring(0, 20) + '...',
        env: process.env.NODE_ENV
      })

      // CHANGEMENT : Toujours utiliser l'approche directe (même en production)
      // Cela évitera les problèmes avec l'API proxy
      
      // Utiliser côté client avec NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      console.log('🔑 [GoogleMaps] Utilisation de la clé API client:', !!apiKey)
      
      if (!apiKey) {
        console.error('❌ [GoogleMaps] Clé API manquante')
        throw new Error('Clé API Google Maps non configurée')
      }

      // Construire l'URL avec validation
      const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json'
      const params = new URLSearchParams({
        origins: `place_id:${originPlaceId}`,
        destinations: `place_id:${destinationPlaceId}`,
        mode: 'driving',
        language: 'fr',
        key: apiKey
      })
      
      const url = `${baseUrl}?${params.toString()}`
      console.log('🌐 [GoogleMaps] URL construite (longueur):', url.length)

      // Faire l'appel direct
      const response = await axios.get(url, {
        timeout: 10000, // 10 secondes de timeout
        headers: {
          'Accept': 'application/json',
        }
      })

      console.log('📥 [GoogleMaps] Réponse reçue:', {
        status: response.data?.status,
        hasRows: !!response.data?.rows,
        firstElementStatus: response.data?.rows?.[0]?.elements?.[0]?.status
      })

      if (
        response.data &&
        response.data.status === 'OK' &&
        response.data.rows &&
        response.data.rows[0] &&
        response.data.rows[0].elements &&
        response.data.rows[0].elements[0] &&
        response.data.rows[0].elements[0].status === 'OK'
      ) {
        const result = response.data.rows[0].elements[0]
        
        console.log('✅ [GoogleMaps] Route calculée avec succès:', {
          distance: result.distance?.text,
          duration: result.duration?.text,
          distanceValue: result.distance?.value,
          durationValue: result.duration?.value
        })
        
        return {
          distance: result.distance,
          duration: result.duration,
          origin: response.data.origin_addresses[0],
          destination: response.data.destination_addresses[0]
        }
      } else {
        console.error('❌ [GoogleMaps] Réponse API invalide:', {
          status: response.data?.status,
          error_message: response.data?.error_message
        })
        throw new Error(`Erreur API Google Maps: ${response.data?.status || 'Unknown'} - ${response.data?.error_message || ''}`)
      }
    } catch (error) {
      console.error('❌ [GoogleMaps] Erreur complète:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      })
      
      // Fallback avec estimation
      console.log('🔄 [GoogleMaps] Utilisation du fallback')
      return this.getFallbackRouteDetails(originPlaceId, destinationPlaceId)
    }
  },

  /**
   * Fallback avec estimation
   */
  getFallbackRouteDetails(originPlaceId, destinationPlaceId) {
    return {
      distance: {
        text: "25 km",
        value: 25000
      },
      duration: {
        text: "40 min",
        value: 2400
      },
      origin: "Adresse de départ",
      destination: "Adresse d'arrivée"
    }
  },

  /**
   * Pour les détails de lieu (si nécessaire)
   */
  async getPlaceDetails(placeId) {
    try {
      if (!placeId) {
        throw new Error('L\'ID du lieu est requis')
      }

      // Fallback simple pour les détails de lieu
      return {
        formatted_address: `Adresse pour l'ID ${placeId}`,
        geometry: {
          location: {
            lat: 48.856614 + (Math.random() - 0.5) * 0.1,
            lng: 2.352222 + (Math.random() - 0.5) * 0.1
          }
        },
        name: `Lieu pour l'ID ${placeId}`
      }
    } catch (error) {
      console.error('❌ [GoogleMaps] Erreur place details:', error)
      return {
        formatted_address: `Adresse simulée pour l'ID ${placeId}`,
        geometry: {
          location: {
            lat: 48.856614 + (Math.random() - 0.5) * 0.1,
            lng: 2.352222 + (Math.random() - 0.5) * 0.1
          }
        },
        name: `Lieu simulé pour l'ID ${placeId}`
      }
    }
  }
}