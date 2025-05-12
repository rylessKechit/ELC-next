// services/googleMapsService.js - Version propre
import axios from 'axios'

export const googleMapsService = {
  /**
   * Récupère les détails d'itinéraire entre deux lieux
   */
  async getRouteDetails(originPlaceId, destinationPlaceId) {
    try {
      if (!originPlaceId || !destinationPlaceId) {
        throw new Error('Les IDs de lieux d\'origine et de destination sont requis')
      }

      // Récupérer la clé API
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      // Appel à l'API Distance Matrix de Google
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${originPlaceId}&destinations=place_id:${destinationPlaceId}&mode=driving&language=fr&key=${apiKey}`
      )

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
        
        return {
          distance: result.distance,
          duration: result.duration,
          origin: response.data.origin_addresses[0],
          destination: response.data.destination_addresses[0]
        }
      } else {
        throw new Error(`Erreur API Google Maps: ${response.data.status}`)
      }
    } catch (error) {
      if (error.response) {
        throw new Error(`Erreur API ${error.response.status}: ${error.response.data?.error_message || error.response.statusText}`)
      }
      throw new Error(`Impossible d'obtenir les détails de route: ${error.message}`)
    }
  },

  /**
   * Récupère les détails d'un lieu à partir de son ID
   */
  async getPlaceDetails(placeId) {
    try {
      if (!placeId) {
        throw new Error('L\'ID du lieu est requis')
      }

      if (process.env.NODE_ENV === 'development') {
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

      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry,name&language=fr&key=${apiKey}`
      )

      if (response.data && response.data.status === 'OK' && response.data.result) {
        return response.data.result
      } else {
        throw new Error(`Erreur lors de la récupération des détails du lieu: ${response.data.status}`)
      }
    } catch (error) {
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
  },

  /**
   * Effectue une recherche d'autocomplétion d'adresse
   */
  async getPlacePredictions(input, sessionToken) {
    try {
      if (!input) {
        return []
      }

      if (process.env.NODE_ENV === 'development') {
        return this.simulatePlacePredictions(input)
      }

      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      const params = {
        input,
        key: apiKey,
        language: 'fr',
        components: 'country:fr',
        sessiontoken: sessionToken
      }

      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        { params }
      )

      if (response.data && response.data.status === 'OK' && response.data.predictions) {
        return response.data.predictions
      } else if (response.data.status === 'ZERO_RESULTS') {
        return []
      } else {
        throw new Error(`Erreur lors de la recherche d'adresses: ${response.data.status}`)
      }
    } catch (error) {
      return this.simulatePlacePredictions(input)
    }
  },

  /**
   * Simule des prédictions d'adresses pour les tests
   */
  simulatePlacePredictions(input) {
    if (!input || input.length < 3) {
      return []
    }

    const basePredictions = [
      { 
        description: 'Paris, France',
        place_id: 'sim_place_paris_123',
        structured_formatting: {
          main_text: 'Paris',
          secondary_text: 'France'
        }
      },
      {
        description: 'Évry-Courcouronnes, Essonne, France',
        place_id: 'sim_place_evry_456',
        structured_formatting: {
          main_text: 'Évry-Courcouronnes',
          secondary_text: 'Essonne, France'
        }
      },
      {
        description: 'Aéroport Charles de Gaulle (CDG), Roissy-en-France, France',
        place_id: 'sim_place_cdg_789',
        structured_formatting: {
          main_text: 'Aéroport Charles de Gaulle (CDG)',
          secondary_text: 'Roissy-en-France, France'
        }
      },
      {
        description: 'Gare de Lyon, Paris, France',
        place_id: 'sim_place_gare_lyon_012',
        structured_formatting: {
          main_text: 'Gare de Lyon',
          secondary_text: 'Paris, France'
        }
      },
      {
        description: 'Lyon, France',
        place_id: 'sim_place_lyon_345',
        structured_formatting: {
          main_text: 'Lyon',
          secondary_text: 'France'
        }
      }
    ]

    const lowerInput = input.toLowerCase()
    return basePredictions
      .filter(pred => pred.description.toLowerCase().includes(lowerInput))
      .slice(0, 5)
  },

  /**
   * Convertit une adresse en coordonnées géographiques
   */
  async geocodeAddress(address) {
    try {
      if (!address) {
        throw new Error('L\'adresse est requise')
      }

      if (process.env.NODE_ENV === 'development') {
        return {
          coords: {
            lat: 48.856614 + (Math.random() - 0.5) * 0.1,
            lng: 2.352222 + (Math.random() - 0.5) * 0.1
          },
          formattedAddress: address,
          placeId: `simulated_place_id_${Date.now()}`
        }
      }

      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&region=fr&key=${apiKey}`
      )

      if (
        response.data &&
        response.data.status === 'OK' &&
        response.data.results &&
        response.data.results[0] &&
        response.data.results[0].geometry &&
        response.data.results[0].geometry.location
      ) {
        return {
          coords: response.data.results[0].geometry.location,
          formattedAddress: response.data.results[0].formatted_address,
          placeId: response.data.results[0].place_id
        }
      } else {
        throw new Error(`Erreur lors du géocodage de l'adresse: ${response.data.status}`)
      }
    } catch (error) {
      return {
        coords: {
          lat: 48.856614 + (Math.random() - 0.5) * 0.1,
          lng: 2.352222 + (Math.random() - 0.5) * 0.1
        },
        formattedAddress: address,
        placeId: `simulated_place_id_${Date.now()}`
      }
    }
  }
}

export default googleMapsService