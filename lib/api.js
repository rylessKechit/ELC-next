// lib/api.js
import axios from 'axios'

/**
 * Client API pour les requêtes vers le backend
 */
export const api = {
  /**
   * Effectue une requête GET
   * @param {string} url - URL de la requête
   * @param {Object} params - Paramètres de la requête
   * @param {Object} options - Options de la requête Axios
   * @returns {Promise<Object>} - Réponse de l'API
   */
  async get(url, params = {}, options = {}) {
    try {
      const response = await axios.get(url, { params, ...options })
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
      const response = await axios.post(url, data, options)
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
      const response = await axios.put(url, data, options)
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
      const response = await axios.delete(url, options)
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
  }
}

export default api