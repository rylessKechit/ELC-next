// services/whatsappService.js
import { Client } from 'whatsapp-web.js'
import qrcode from 'qrcode'

/**
 * Service pour interagir avec WhatsApp via whatsapp-web.js
 */
export const whatsappService = {
  client: null,
  clientReady: false,
  qrCode: null,
  
  /**
   * Initialise le client WhatsApp
   * @returns {Promise<void>}
   */
  async initClient() {
    try {
      // Éviter l'initialisation multiple
      if (this.client) {
        return
      }
      
      // Créer une nouvelle instance client
      this.client = new Client({
        puppeteer: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      })
      
      // Gérer l'événement QR code
      this.client.on('qr', async (qr) => {
        console.log('QR Code reçu, veuillez scanner avec WhatsApp')
        this.qrCode = await qrcode.toDataURL(qr)
      })
      
      // Gérer l'événement ready
      this.client.on('ready', () => {
        console.log('Client WhatsApp prêt')
        this.clientReady = true
      })
      
      // Initialiser le client
      await this.client.initialize()
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du client WhatsApp:', error)
      this.client = null
      throw error
    }
  },
  
  /**
   * Envoie un message WhatsApp
   * @param {string} to - Numéro de téléphone destinataire au format international
   * @param {string} message - Message à envoyer
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendMessage(to, message) {
    try {
      // S'assurer que le client est initialisé et prêt
      if (!this.client || !this.clientReady) {
        console.log('Client WhatsApp non prêt, tentative d\'initialisation...')
        await this.initClient()
        
        // Attendre que le client soit prêt
        // Dans un environnement de production, on utiliserait un système plus robuste
        let attempts = 0
        while (!this.clientReady && attempts < 10) {
          await new Promise(resolve => setTimeout(resolve, 1000))
          attempts++
        }
        
        if (!this.clientReady) {
          throw new Error('Client WhatsApp non prêt après plusieurs tentatives')
        }
      }
      
      // Formater le numéro de téléphone
      const formattedNumber = this.formatPhoneNumber(to)
      
      // Envoyer le message
      const response = await this.client.sendMessage(`${formattedNumber}@c.us`, message)
      return response
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message WhatsApp:', error)
      throw error
    }
  },
  
  /**
   * Formate un numéro de téléphone pour WhatsApp
   * @param {string} phoneNumber - Numéro de téléphone à formater
   * @returns {string} - Numéro formaté
   */
  formatPhoneNumber(phoneNumber) {
    // Supprimer tous les caractères non numériques
    let formatted = phoneNumber.replace(/\D/g, '')
    
    // Si le numéro commence par un 0, le remplacer par 33 (France)
    if (formatted.startsWith('0')) {
      formatted = '33' + formatted.substring(1)
    }
    
    return formatted
  },
  
  /**
   * Envoie une notification de réservation à l'administrateur
   * @param {Object} booking - Détails de la réservation
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendAdminNotification(booking) {
    // Dans un environnement de production, cette valeur viendrait des variables d'environnement
    const adminPhone = process.env.ADMIN_WHATSAPP || '33600000000'
    
    // Formater la date pour l'affichage
    const formatDate = (dateTimeStr) => {
      if (!dateTimeStr) return 'Non spécifié'
      
      const date = new Date(dateTimeStr)
      return date.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // Construire le message
    const message = `
*NOUVELLE RÉSERVATION*
Réf: ${booking.bookingId}
Date: ${formatDate(booking.pickupDateTime)}
Client: ${booking.customerName}
Tél: ${booking.customerPhone}
De: ${booking.pickupAddress}
À: ${booking.dropoffAddress}
Véhicule: ${booking.vehicleType}
Passagers: ${booking.passengers}
${booking.roundTrip ? `Retour: ${formatDate(booking.returnDateTime)}` : ''}
    `.trim()
    
    // Pour les environnements de développement, simuler l'envoi
    if (process.env.NODE_ENV === 'development') {
      console.log('Simulation d\'envoi WhatsApp à l\'administrateur:')
      console.log(message)
      return { id: `dev-${Date.now()}` }
    }
    
    // Envoyer la notification
    try {
      return await this.sendMessage(adminPhone, message)
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification WhatsApp:', error)
      // Ne pas faire échouer le processus de réservation si la notification échoue
      return { error: error.message }
    }
  },
  
  /**
   * Envoie une confirmation de réservation au client
   * @param {Object} booking - Détails de la réservation
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendBookingConfirmation(booking) {
    // S'assurer que le numéro de téléphone du client est disponible
    if (!booking.customerPhone) {
      throw new Error('Numéro de téléphone du client non disponible')
    }
    
    // Formater la date pour l'affichage
    const formatDate = (dateTimeStr) => {
      if (!dateTimeStr) return 'Non spécifié'
      
      const date = new Date(dateTimeStr)
      return date.toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // Construire le message
    const message = `
*Confirmation de réservation - Elysian Luxury Chauffeurs*

Bonjour ${booking.customerName},

Votre réservation a été confirmée.

Référence: ${booking.bookingId}
Date et heure: ${formatDate(booking.pickupDateTime)}
Départ: ${booking.pickupAddress}
Destination: ${booking.dropoffAddress}
${booking.roundTrip ? `Retour prévu: ${formatDate(booking.returnDateTime)}` : ''}

Votre chauffeur vous contactera environ 2h avant l'heure de prise en charge.

Pour toute question ou modification, contactez-nous au 01 23 45 67 89.

Merci de votre confiance et excellent voyage avec Elysian Luxury Chauffeurs !
    `.trim()
    
    // Pour les environnements de développement, simuler l'envoi
    if (process.env.NODE_ENV === 'development') {
      console.log('Simulation d\'envoi WhatsApp au client:')
      console.log(message)
      return { id: `dev-${Date.now()}` }
    }
    
    // Envoyer la confirmation
    try {
      return await this.sendMessage(booking.customerPhone, message)
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la confirmation WhatsApp:', error)
      // Ne pas faire échouer le processus de réservation si la confirmation échoue
      return { error: error.message }
    }
  }
}

export default whatsappService