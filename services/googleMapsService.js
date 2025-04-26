// services/googleMapsService.js
import axios from 'axios'

/**
 * Service pour interagir avec l'API Google Maps
 */
export const googleMapsService = {
  /**
   * Récupère les détails d'itinéraire entre deux lieux
   * @param {string} originPlaceId - ID du lieu d'origine
   * @param {string} destinationPlaceId - ID du lieu de destination
   * @returns {Promise<Object>} - Détails de la route
   */
  async getRouteDetails(originPlaceId, destinationPlaceId) {
    try {
      // Vérifier que les IDs de lieux sont fournis
      if (!originPlaceId || !destinationPlaceId) {
        throw new Error('Les IDs de lieux d\'origine et de destination sont requis')
      }

      // En environnement de développement, simuler une réponse
      if (process.env.NODE_ENV === 'development') {
        return this.simulateRouteDetails()
      }

      // Récupérer la clé API depuis les variables d'environnement
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      // Appel à l'API Distance Matrix de Google
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${originPlaceId}&destinations=place_id:${destinationPlaceId}&mode=driving&language=fr&key=${apiKey}`
      )

      // Vérifier la réponse
      if (
        response.data &&
        response.data.status === 'OK' &&
        response.data.rows &&
        response.data.rows[0] &&
        response.data.rows[0].elements &&
        response.data.rows[0].elements[0] &&
        response.data.rows[0].elements[0].status === 'OK'
      ) {
        // Extraire les informations de distance et durée
        const result = response.data.rows[0].elements[0]
        
        return {
          distance: result.distance,
          duration: result.duration,
          origin: response.data.origin_addresses[0],
          destination: response.data.destination_addresses[0]
        }
      } else {
        console.error('Réponse invalide de l\'API Google Maps:', response.data)
        throw new Error(`Erreur lors de la récupération des détails d'itinéraire: ${response.data.status}`)
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API Google Maps:', error)
      // En cas d'erreur, retourner une simulation
      return this.simulateRouteDetails()
    }
  },

  /**
   * Simule une réponse pour les tests en développement
   * @returns {Object} - Détails de route simulés
   */
  simulateRouteDetails() {
    // Générer une distance aléatoire entre 5 et 100 km
    const distanceInKm = Math.floor(Math.random() * 95) + 5
    const distanceInMeters = distanceInKm * 1000
    
    // Estimer le temps de trajet (en moyenne 1 min par km + traffic aléatoire)
    const baseMinutes = distanceInKm
    const trafficVariation = Math.floor(Math.random() * (distanceInKm * 0.3))
    const durationInMinutes = baseMinutes + trafficVariation
    const durationInSeconds = durationInMinutes * 60
    
    return {
      distance: {
        value: distanceInMeters,
        text: `${distanceInKm} km`
      },
      duration: {
        value: durationInSeconds,
        text: durationInMinutes >= 60 
          ? `${Math.floor(durationInMinutes / 60)} h ${durationInMinutes % 60} min` 
          : `${durationInMinutes} min`
      },
      origin: "Adresse d'origine simulée",
      destination: "Adresse de destination simulée"
    }
  },

  /**
   * Récupère les détails d'un lieu à partir de son ID
   * @param {string} placeId - ID du lieu Google Maps
   * @returns {Promise<Object>} - Détails du lieu
   */
  async getPlaceDetails(placeId) {
    try {
      // Vérifier que l'ID du lieu est fourni
      if (!placeId) {
        throw new Error('L\'ID du lieu est requis')
      }

      // En environnement de développement, simuler une réponse
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

      // Récupérer la clé API depuis les variables d'environnement
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      // Appel à l'API Place Details de Google
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address,geometry,name&language=fr&key=${apiKey}`
      )

      // Vérifier la réponse
      if (
        response.data &&
        response.data.status === 'OK' &&
        response.data.result
      ) {
        return response.data.result
      } else {
        console.error('Réponse invalide de l\'API Google Maps Places:', response.data)
        throw new Error(`Erreur lors de la récupération des détails du lieu: ${response.data.status}`)
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API Google Maps Places:', error)
      // En cas d'erreur, retourner une simulation
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
   * @param {string} input - Texte saisi par l'utilisateur
   * @param {string} sessionToken - Jeton de session pour regrouper les requêtes
   * @returns {Promise<Array>} - Suggestions d'adresses
   */
  async getPlacePredictions(input, sessionToken) {
    try {
      // Vérifier que le texte de recherche est fourni
      if (!input) {
        return []
      }

      // En environnement de développement, simuler une réponse
      if (process.env.NODE_ENV === 'development') {
        return this.simulatePlacePredictions(input)
      }

      // Récupérer la clé API depuis les variables d'environnement
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      // Paramètres de la requête
      const params = {
        input,
        key: apiKey,
        language: 'fr',
        components: 'country:fr', // Limiter aux résultats en France
        sessiontoken: sessionToken
      }

      // Appel à l'API Autocomplete de Google
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        { params }
      )

      // Vérifier la réponse
      if (
        response.data &&
        response.data.status === 'OK' &&
        response.data.predictions
      ) {
        return response.data.predictions
      } else if (response.data.status === 'ZERO_RESULTS') {
        return []
      } else {
        console.error('Réponse invalide de l\'API Google Maps Autocomplete:', response.data)
        throw new Error(`Erreur lors de la recherche d'adresses: ${response.data.status}`)
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API Google Maps Autocomplete:', error)
      // En cas d'erreur, retourner une simulation
      return this.simulatePlacePredictions(input)
    }
  },

  /**
   * Simule des prédictions d'adresses pour les tests
   * @param {string} input - Texte de recherche
   * @returns {Array} - Prédictions simulées
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

    // Filtrer les prédictions en fonction de l'entrée
    const lowerInput = input.toLowerCase()
    return basePredictions
      .filter(pred => pred.description.toLowerCase().includes(lowerInput))
      .slice(0, 5) // Limiter à 5 résultats
  },

  /**
   * Convertit une adresse en coordonnées géographiques
   * @param {string} address - Adresse à géocoder
   * @returns {Promise<Object>} - Coordonnées (lat, lng)
   */
  async geocodeAddress(address) {
    try {
      // Vérifier que l'adresse est fournie
      if (!address) {
        throw new Error('L\'adresse est requise')
      }

      // En environnement de développement, simuler une réponse
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

      // Récupérer la clé API depuis les variables d'environnement
      const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      if (!apiKey) {
        throw new Error('Clé API Google Maps non configurée')
      }

      // Appel à l'API Geocoding de Google
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&region=fr&key=${apiKey}`
      )

      // Vérifier la réponse
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
        console.error('Réponse invalide de l\'API Google Maps Geocoding:', response.data)
        throw new Error(`Erreur lors du géocodage de l'adresse: ${response.data.status}`)
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API Google Maps Geocoding:', error)
      // En cas d'erreur, retourner une simulation
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