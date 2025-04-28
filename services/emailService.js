// services/emailService.js
import nodemailer from 'nodemailer'

/**
 * Service pour l'envoi d'emails
 */
export const emailService = {
  /**
   * Créer un transporteur d'email
   * @returns {Object} - Transporteur NodeMailer configuré
   */
  createTransporter() {
    // Récupérer les paramètres SMTP depuis les variables d'environnement
    const host = process.env.EMAIL_HOST || 'smtp.example.com'
    const port = parseInt(process.env.EMAIL_PORT || '587', 10)
    const secure = process.env.EMAIL_SECURE === 'true'
    const user = process.env.EMAIL_USER || 'user@example.com'
    const pass = process.env.EMAIL_PASSWORD || 'password'
    
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      }
    })
  },

  /**
   * Envoyer un email
   * @param {Object} options - Options d'envoi
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendEmail(options) {
    try {
      const transporter = this.createTransporter()
      
      const mailOptions = {
        from: options.from || process.env.EMAIL_FROM || '"Elysian Luxury Chauffeurs" <contact@elysian-chauffeurs.fr>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      }
      
      // Ajouter des pièces jointes si fournies
      if (options.attachments) {
        mailOptions.attachments = options.attachments
      }
      
      // Vérifier si on est en mode test ou sans configuration SMTP
      if (!process.env.EMAIL_HOST || process.env.EMAIL_HOST === 'smtp.example.com') {
        console.log('⚠️ Configuration SMTP incomplète. Simulation d\'envoi d\'email:')
        console.log(mailOptions)
        
        // Retourner un ID de message simulé pour le développement
        return { 
          messageId: `dev-${Date.now()}`,
          simulated: true,
          status: 'Simulated - Missing EMAIL_HOST configuration'
        }
      }
      
      // Envoyer l'email réellement
      console.log(`📧 Envoi d'email à ${options.to}`)
      const info = await transporter.sendMail(mailOptions)
      console.log(`📧 Email envoyé: ${info.messageId}`)
      return info
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error)
      throw error
    }
  },

  /**
   * Envoyer un email de confirmation de réservation
   * @param {Object} booking - Détails de la réservation
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendBookingConfirmation(booking) {
    // Formater la date et l'heure pour l'affichage
    const formatDate = (dateTimeStr) => {
      if (!dateTimeStr) return 'Non spécifié'
      
      const date = new Date(dateTimeStr)
      return date.toLocaleString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // Formater le prix
    const formatPrice = (price) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price)
    }
    
    // Récupérer le nom du véhicule
    const getVehicleName = (type) => {
      const vehicleTypes = {
        'sedan': 'Berline de Luxe',
        'premium': 'Berline Premium',
        'green': 'Green - Tesla Model 3',
        'suv': 'SUV de Luxe',
        'van': 'Van VIP'
      }
      
      return vehicleTypes[type] || 'Véhicule non spécifié'
    }
    
    // Construire le contenu de l'email
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1c2938; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; color: #d4af37;">Elysian Luxury Chauffeurs</h1>
          <p style="margin-top: 10px;">Confirmation de votre réservation</p>
        </div>
        
        <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
          <p>Bonjour <strong>${booking.customerName}</strong>,</p>
          
          <p>Nous avons le plaisir de confirmer votre réservation. Voici les détails :</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #d4af37;">
            <p style="margin: 5px 0;"><strong>Numéro de réservation :</strong> ${booking.bookingId}</p>
            <p style="margin: 5px 0;"><strong>Date et heure :</strong> ${formatDate(booking.pickupDateTime)}</p>
            <p style="margin: 5px 0;"><strong>Adresse de départ :</strong> ${booking.pickupAddress}</p>
            <p style="margin: 5px 0;"><strong>Adresse d'arrivée :</strong> ${booking.dropoffAddress}</p>
            <p style="margin: 5px 0;"><strong>Véhicule :</strong> ${getVehicleName(booking.vehicleType)}</p>
            <p style="margin: 5px 0;"><strong>Nombre de passagers :</strong> ${booking.passengers}</p>
            <p style="margin: 5px 0;"><strong>Nombre de bagages :</strong> ${booking.luggage}</p>
            ${booking.flightNumber ? `<p style="margin: 5px 0;"><strong>Numéro de vol :</strong> ${booking.flightNumber}</p>` : ''}
            ${booking.trainNumber ? `<p style="margin: 5px 0;"><strong>Numéro de train :</strong> ${booking.trainNumber}</p>` : ''}
            ${booking.roundTrip ? `<p style="margin: 5px 0;"><strong>Retour prévu le :</strong> ${formatDate(booking.returnDateTime)}</p>` : ''}
            <p style="margin: 5px 0;"><strong>Prix total :</strong> ${formatPrice(booking.price)}</p>
          </div>
          
          <p>Notre chauffeur vous contactera environ 2 heures avant l'heure prévue pour confirmer sa présence.</p>
          
          <h3 style="color: #1c2938;">Informations importantes</h3>
          <ul>
            <li>Annulation gratuite jusqu'à 24h avant le départ</li>
            <li>Le paiement s'effectuera auprès du chauffeur (espèces, carte bancaire)</li>
            <li>En cas d'urgence, contactez-nous au 01 23 45 67 89</li>
          </ul>
          
          <p>Pour toute question ou modification concernant votre réservation, n'hésitez pas à nous contacter par email à contact@elysian-chauffeurs.fr ou par téléphone au 01 23 45 67 89.</p>
          
          <p>Nous vous remercions de votre confiance et vous souhaitons un agréable trajet.</p>
          
          <p>Cordialement,<br>L'équipe Elysian Luxury Chauffeurs</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>Elysian Luxury Chauffeurs<br>123 Avenue des Champs, 91000 Évry-Courcouronnes<br>Tel: 01 23 45 67 89</p>
          <p>© ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés</p>
        </div>
      </div>
    `
    
    // Texte alternatif pour les clients sans HTML
    const textContent = `
      Elysian Luxury Chauffeurs - Confirmation de votre réservation
      
      Bonjour ${booking.customerName},
      
      Nous avons le plaisir de confirmer votre réservation. Voici les détails :
      
      Numéro de réservation : ${booking.bookingId}
      Date et heure : ${formatDate(booking.pickupDateTime)}
      Adresse de départ : ${booking.pickupAddress}
      Adresse d'arrivée : ${booking.dropoffAddress}
      Véhicule : ${getVehicleName(booking.vehicleType)}
      Nombre de passagers : ${booking.passengers}
      Nombre de bagages : ${booking.luggage}
      ${booking.flightNumber ? `Numéro de vol : ${booking.flightNumber}` : ''}
      ${booking.trainNumber ? `Numéro de train : ${booking.trainNumber}` : ''}
      ${booking.roundTrip ? `Retour prévu le : ${formatDate(booking.returnDateTime)}` : ''}
      Prix total : ${formatPrice(booking.price)}
      
      Notre chauffeur vous contactera environ 2 heures avant l'heure prévue pour confirmer sa présence.
      
      Informations importantes :
      - Annulation gratuite jusqu'à 24h avant le départ
      - Le paiement s'effectuera auprès du chauffeur (espèces, carte bancaire)
      - En cas d'urgence, contactez-nous au 01 23 45 67 89
      
      Pour toute question ou modification concernant votre réservation, n'hésitez pas à nous contacter par email à contact@elysian-chauffeurs.fr ou par téléphone au 01 23 45 67 89.
      
      Nous vous remercions de votre confiance et vous souhaitons un agréable trajet.
      
      Cordialement,
      L'équipe Elysian Luxury Chauffeurs
      
      -----------------------------------------------
      Elysian Luxury Chauffeurs
      123 Avenue des Champs, 91000 Évry-Courcouronnes
      Tel: 01 23 45 67 89
      © ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés
    `
    
    return this.sendEmail({
      to: booking.customerEmail,
      subject: `Confirmation de réservation #${booking.bookingId} - Elysian Luxury Chauffeurs`,
      text: textContent,
      html: htmlContent
    })
  },

  /**
   * Envoyer une notification de réservation à l'administrateur
   * @param {Object} booking - Détails de la réservation
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendBookingNotification(booking) {
    // Le contenu de l'email serait similaire à celui de confirmation
    // mais adapté pour les administrateurs
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@elysian-chauffeurs.fr'
    
    // Formater la date
    const formatDate = (dateTimeStr) => {
      if (!dateTimeStr) return 'Non spécifié'
      
      const date = new Date(dateTimeStr)
      return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1c2938; padding: 15px; text-align: center; color: white;">
          <h1 style="margin: 0; color: #d4af37; font-size: 20px;">Nouvelle Réservation</h1>
        </div>
        
        <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
          <p>Une nouvelle réservation a été effectuée :</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0;">
            <p style="margin: 3px 0;"><strong>Référence :</strong> ${booking.bookingId}</p>
            <p style="margin: 3px 0;"><strong>Client :</strong> ${booking.customerName}</p>
            <p style="margin: 3px 0;"><strong>Tél :</strong> ${booking.customerPhone}</p>
            <p style="margin: 3px 0;"><strong>Email :</strong> ${booking.customerEmail}</p>
            <p style="margin: 3px 0;"><strong>Date :</strong> ${formatDate(booking.pickupDateTime)}</p>
            <p style="margin: 3px 0;"><strong>Départ :</strong> ${booking.pickupAddress}</p>
            <p style="margin: 3px 0;"><strong>Arrivée :</strong> ${booking.dropoffAddress}</p>
            <p style="margin: 3px 0;"><strong>Véhicule :</strong> ${booking.vehicleType}</p>
            <p style="margin: 3px 0;"><strong>Passagers :</strong> ${booking.passengers}</p>
            <p style="margin: 3px 0;"><strong>Bagages :</strong> ${booking.luggage}</p>
            ${booking.flightNumber ? `<p style="margin: 3px 0;"><strong>Vol :</strong> ${booking.flightNumber}</p>` : ''}
            ${booking.trainNumber ? `<p style="margin: 3px 0;"><strong>Train :</strong> ${booking.trainNumber}</p>` : ''}
            ${booking.roundTrip ? `<p style="margin: 3px 0;"><strong>Retour :</strong> ${formatDate(booking.returnDateTime)}</p>` : ''}
          </div>
          
          <p><a href="#" style="background-color: #d4af37; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Accéder au tableau de bord</a></p>
        </div>
      </div>
    `
    
    return this.sendEmail({
      to: adminEmail,
      subject: `Nouvelle réservation #${booking.bookingId}`,
      html: htmlContent
    })
  },

  /**
   * Envoyer une confirmation de réception du message de contact
   * @param {Object} contactMessage - Détails du message de contact
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendContactConfirmation(contactMessage) {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1c2938; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; color: #d4af37;">Elysian Luxury Chauffeurs</h1>
          <p style="margin-top: 10px;">Confirmation de réception de votre message</p>
        </div>
        
        <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
          <p>Bonjour <strong>${contactMessage.name}</strong>,</p>
          
          <p>Nous avons bien reçu votre message concernant "${contactMessage.subject}" et vous remercions de nous avoir contactés.</p>
          
          <p>Un membre de notre équipe vous répondra dans les plus brefs délais.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #d4af37;">
            <p style="margin: 5px 0;"><strong>Votre message :</strong></p>
            <p style="margin: 5px 0;">${contactMessage.message}</p>
          </div>
          
          <p>Cordialement,<br>L'équipe Elysian Luxury Chauffeurs</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>Elysian Luxury Chauffeurs<br>123 Avenue des Champs, 91000 Évry-Courcouronnes<br>Tel: 01 23 45 67 89</p>
          <p>© ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés</p>
        </div>
      </div>
    `
    
    const textContent = `
      Elysian Luxury Chauffeurs - Confirmation de réception de votre message
      
      Bonjour ${contactMessage.name},
      
      Nous avons bien reçu votre message concernant "${contactMessage.subject}" et vous remercions de nous avoir contactés.
      
      Un membre de notre équipe vous répondra dans les plus brefs délais.
      
      Votre message :
      ${contactMessage.message}
      
      Cordialement,
      L'équipe Elysian Luxury Chauffeurs
      
      -----------------------------------------------
      Elysian Luxury Chauffeurs
      123 Avenue des Champs, 91000 Évry-Courcouronnes
      Tel: 01 23 45 67 89
      © ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés
    `
    
    return this.sendEmail({
      to: contactMessage.email,
      subject: `Confirmation de réception de votre message - Elysian Luxury Chauffeurs`,
      text: textContent,
      html: htmlContent
    })
  },

  /**
   * Envoyer une notification de message de contact à l'administrateur
   * @param {Object} contactMessage - Détails du message de contact
   * @returns {Promise<Object>} - Résultat de l'envoi
   */
  async sendContactNotification(contactMessage) {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@elysian-chauffeurs.fr'
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #1c2938; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; color: #d4af37;">Elysian Luxury Chauffeurs</h1>
          <p style="margin-top: 10px;">Nouveau message de contact</p>
        </div>
        
        <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
          <p>Un nouveau message de contact a été reçu via le site web :</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #d4af37;">
            <p style="margin: 5px 0;"><strong>Nom :</strong> ${contactMessage.name}</p>
            <p style="margin: 5px 0;"><strong>Email :</strong> ${contactMessage.email}</p>
            <p style="margin: 5px 0;"><strong>Téléphone :</strong> ${contactMessage.phone || 'Non renseigné'}</p>
            <p style="margin: 5px 0;"><strong>Sujet :</strong> ${contactMessage.subject}</p>
            <p style="margin: 5px 0;"><strong>Message :</strong></p>
            <p style="margin: 5px 0;">${contactMessage.message}</p>
            <p style="margin: 5px 0;"><strong>Date d'envoi :</strong> ${new Date(contactMessage.submittedAt).toLocaleString('fr-FR')}</p>
          </div>
          
          <p>Veuillez répondre à ce client dès que possible.</p>
        </div>
      </div>
    `
    
    return this.sendEmail({
      to: adminEmail,
      subject: `Nouveau message de contact - ${contactMessage.subject}`,
      html: htmlContent
    })
  }
}

export default emailService