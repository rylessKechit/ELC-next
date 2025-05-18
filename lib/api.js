// lib/api.js
import axios from 'axios'

/**
 * Client API pour les requêtes vers le backend
 */
export const api = {
  /**
   * Base URL pour les requêtes API
   * En production, utiliser l'URL du serveur
   * En développement, utiliser l'URL locale
   */
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  
  /**
   * Effectue une requête GET
   * @param {string} url - URL de la requête
   * @param {Object} params - Paramètres de la requête
   * @param {Object} options - Options de la requête Axios
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async get(url, params = {}, options = {}) {
    try {
      const response = await axios.get(this.baseURL + url, { params, ...options })
      return response
    } catch (error) {
      console.error(`Erreur lors de la requête GET vers ${url}:`, error)
      throw error
    }
  },

  /**
   * Effectue une requête POST
   * @param {string} url - URL de la requête
   * @param {Object} data - Données à envoyer
   * @param {Object} options - Options de la requête Axios
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async post(url, data = {}, options = {}) {
    try {
      const response = await axios.post(this.baseURL + url, data, options)
      return response
    } catch (error) {
      console.error(`Erreur lors de la requête POST vers ${url}:`, error)
      throw error
    }
  },

  /**
   * Effectue une requête PUT
   * @param {string} url - URL de la requête
   * @param {Object} data - Données à envoyer
   * @param {Object} options - Options de la requête Axios
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async put(url, data = {}, options = {}) {
    try {
      const response = await axios.put(this.baseURL + url, data, options)
      return response
    } catch (error) {
      console.error(`Erreur lors de la requête PUT vers ${url}:`, error)
      throw error
    }
  },

  /**
   * Effectue une requête DELETE
   * @param {string} url - URL de la requête
   * @param {Object} options - Options de la requête Axios
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async delete(url, options = {}) {
    try {
      const response = await axios.delete(this.baseURL + url, options)
      return response
    } catch (error) {
      console.error(`Erreur lors de la requête DELETE vers ${url}:`, error)
      throw error
    }
  },

  /**
   * Obtient une estimation de prix pour un trajet
   * @param {Object} data - Données du trajet
   * @returns {Promise<Object>} - Estimation de prix
   */
  async getPriceEstimate(data) {
    try {
      const response = await this.post('/api/price/estimate', data)
      return response.data
    } catch (error) {
      console.error('Erreur lors de l\'estimation du prix:', error)
      throw error
    }
  },

  /**
   * Crée une nouvelle réservation
   * @param {Object} bookingData - Données de la réservation
   * @returns {Promise<Object>} - Réservation créée
   */
  async createBooking(bookingData) {
    try {
      const response = await this.post('/api/booking', bookingData)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la création de la réservation:', error)
      throw error
    }
  },

  /**
   * Envoie un message de contact
   * @param {Object} contactData - Données du message de contact
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendContactMessage(contactData) {
    try {
      const response = await this.post('/api/contact', contactData)
      return response.data
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message de contact:', error)
      throw error
    }
  },

  /**
   * Vérifie la disponibilité d'un véhicule
   * @param {Object} data - Données de la demande
   * @returns {Promise<Object>} - Résultat de la vérification
   */
  async checkVehicleAvailability(data) {
    try {
      const response = await this.post('/api/availability', data)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la vérification de disponibilité:', error)
      
      // En développement, simuler une réponse positive
      if (process.env.NODE_ENV === 'development') {
        return {
          success: true,
          available: true,
          message: 'Véhicule disponible (simulé)'
        }
      }
      
      throw error
    }
  },

  /**
   * Simule une API pour le développement
   * @param {string} endpoint - Point d'entrée de l'API
   * @param {Object} data - Données de la requête
   * @returns {Promise<Object>} - Réponse simulée
   */
  async simulateRequest(endpoint, data) {
    
    // Attendre un peu pour simuler le délai réseau
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Simuler différentes réponses selon l'endpoint
    switch (endpoint) {
      case '/api/price/estimate':
        return {
          success: true,
          data: {
            estimate: {
              exactPrice: Math.floor(Math.random() * 100) + 50,
              minPrice: 45,
              maxPrice: 180,
              currency: 'EUR'
            }
          }
        }
      
      case '/api/booking':
        return {
          success: true,
          booking: {
            bookingId: `SIM-${Date.now()}`,
            status: 'confirmed'
          }
        }
        
      case '/api/contact':
        return {
          success: true,
          message: 'Message envoyé avec succès (simulation)'
        }
        
      default:
        return {
          success: true,
          message: 'Opération simulée avec succès'
        }
    }
  }
}

export default api