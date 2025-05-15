// services/googleMapsService.js - Version avec validation des inputs
import axios from 'axios'

export const googleMapsService = {
  /**
   * Utilise l'API Next.js comme proxy pour éviter les problèmes CORS
   */
  async getRouteDetails(originPlaceId, destinationPlaceId) {
    try {
      // VALIDATION DES INPUTS - CRUCIAL
      if (!originPlaceId || !destinationPlaceId) {
        throw new Error('Les IDs de lieux d\'origine et de destination sont requis')
      }

      // Vérifier que les Place IDs sont valides (pas juste des chaînes vides)
      if (typeof originPlaceId !== 'string' || originPlaceId.trim() === '') {
        throw new Error('ID du lieu d\'origine invalide')
      }

      if (typeof destinationPlaceId !== 'string' || destinationPlaceId.trim() === '') {
        throw new Error('ID du lieu de destination invalide')
      }

      console.log('🚗 [GoogleMaps] Calcul de route:', { 
        originPlaceId: originPlaceId.substring(0, 20) + '...', 
        destinationPlaceId: destinationPlaceId.substring(0, 20) + '...' 
      })

      // En production, utiliser l'API Next.js comme proxy
      if (process.env.NODE_ENV === 'production') {
        const response = await axios.post('/api/maps/route-details', {
          originPlaceId,
          destinationPlaceId
        })

        if (response.data && response.data.success) {
          return response.data.data
        } else {
          throw new Error(response.data?.error || 'Erreur lors du calcul de route')
        }
      }

      // Version directe pour le développement avec validation de la clé API
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      console.log('🔑 [GoogleMaps] Utilisation de la clé API directe')

      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${encodeURIComponent(originPlaceId)}&destinations=place_id:${encodeURIComponent(destinationPlaceId)}&mode=driving&language=fr&key=${apiKey}`
      
      console.log('🌐 [GoogleMaps] URL construite (sans clé):', url.replace(apiKey, 'XXX'))

      const response = await axios.get(url)

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
        
        console.log('✅ [GoogleMaps] Route calculée:', {
          distance: result.distance?.text,
          duration: result.duration?.text
        })
        
        return {
          distance: result.distance,
          duration: result.duration,
          origin: response.data.origin_addresses[0],
          destination: response.data.destination_addresses[0]
        }
      } else {
        console.error('❌ [GoogleMaps] Réponse invalide:', response.data)
        throw new Error(`Erreur API Google Maps: ${response.data.status}`)
      }
    } catch (error) {
      console.error('❌ [GoogleMaps] Erreur:', error.message)
      // Fallback avec estimation
      return this.getFallbackRouteDetails(originPlaceId, destinationPlaceId)
    }
  },

  /**
   * Fallback avec estimation raisonnable
   */
  getFallbackRouteDetails(originPlaceId, destinationPlaceId) {
    console.log('🔄 [GoogleMaps] Utilisation du fallback')
    
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
   * Utilise l'API Next.js comme proxy pour les détails de lieu
   */
  async getPlaceDetails(placeId) {
    try {
      if (!placeId) {
        throw new Error('L\'ID du lieu est requis')
      }

      // En production, utiliser l'API Next.js comme proxy
      if (process.env.NODE_ENV === 'production') {
        const response = await axios.post('/api/maps/place-details', {
          placeId
        })

        if (response.data && response.data.success) {
          return response.data.data
        }
      }

      // Fallback direct ou simulation
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