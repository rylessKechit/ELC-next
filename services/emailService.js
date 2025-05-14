// services/emailService.js - Version corrigée
import nodemailer from 'nodemailer'

/**
 * Créer un transporteur d'email optimisé
 */
const createTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.EMAIL_PORT || '587', 10)
  const secure = process.env.EMAIL_SECURE === 'true'
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASSWORD
  
  console.log('Configuration email:', {
    host,
    port,
    secure,
    user: user ? user : 'Non configuré',
    pass: pass ? '***configuré***' : 'Non configuré'
  })
  
  if (!user || !pass) {
    console.warn('⚠️ EMAIL_USER ou EMAIL_PASSWORD non configurés')
    return null
  }
  
  // CORRECTION: utiliser createTransport au lieu de createTransporter
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    },
    // Configuration anti-spam
    tls: {
      rejectUnauthorized: false
    }
  })
}

export const emailService = {
  /**
   * Envoyer un email avec optimisations anti-spam
   */
  async sendEmail(options) {
    try {
      const transporter = createTransporter()
      
      if (!transporter) {
        console.log('⚠️ Transporteur email non configuré. Simulation d\'envoi d\'email:')
        console.log(options)
        return { 
          messageId: `dev-${Date.now()}`,
          simulated: true,
          status: 'Simulated - Missing email configuration'
        }
      }
      
      const mailOptions = {
        from: `"Elysian Luxury Chauffeurs" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        // Headers anti-spam
        headers: {
          'X-Entity-Ref-ID': `elysian-${Date.now()}`,
          'X-Priority': '1',
          'Return-Path': process.env.EMAIL_FROM || process.env.EMAIL_USER,
          'Reply-To': process.env.EMAIL_FROM || process.env.EMAIL_USER,
          'Message-ID': `<${Date.now()}-${Math.random().toString(36).substr(2, 9)}@elysian-luxury-chauffeurs.com>`
        }
      }
      
      // Ajouter des pièces jointes si fournies
      if (options.attachments) {
        mailOptions.attachments = options.attachments
      }
      
      // Envoyer l'email
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
   * Email de confirmation ET d'acceptation de réservation
   */
  async sendBookingConfirmation(booking) {
    // Formatage des dates
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
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price)
    }
    
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
    
    // Template HTML optimisé pour confirmation ET acceptation
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Réservation Confirmée - Elysian Luxury Chauffeurs</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4">
    <table style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#f4f4f4">
        <tr>
            <td style="padding:0">
                <table style="width:600px;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;margin:20px auto;border-radius:8px">
                    <!-- En-tête -->
                    <tr>
                        <td style="padding:0">
                            <table style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#1c2938;border-radius:8px 8px 0 0">
                                <tr>
                                    <td style="padding:30px;color:#ffffff;text-align:center">
                                        <h1 style="margin:0;font-size:24px;font-weight:bold;color:#d4af37">
                                            Elysian Luxury Chauffeurs
                                        </h1>
                                        <p style="margin-top:10px;font-size:18px;color:#ffffff;font-weight:bold">
                                            ✅ Réservation Confirmée
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Message de confirmation -->
                    <tr>
                        <td style="padding:20px 40px">
                            <div style="background-color:#d4f7dc;border-left:4px solid #4CAF50;padding:15px;text-align:center">
                                <h2 style="margin:0;color:#2e7d32;font-size:18px">
                                    🎉 Excellente nouvelle ! Votre réservation est automatiquement confirmée et acceptée
                                </h2>
                                <p style="margin:10px 0 0 0;color:#2e7d32;font-weight:500">
                                    Un chauffeur professionnel a été assigné à votre course
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Contenu principal -->
                    <tr>
                        <td style="padding:20px 40px">
                            <h2 style="margin:0 0 20px 0;font-size:18px;color:#333">
                                Bonjour ${booking.customerName},
                            </h2>
                            
                            <p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333">
                                Nous sommes ravis de vous informer que votre réservation a été <strong>immédiatement confirmée et acceptée</strong> ! 
                                Aucune attente nécessaire, votre course est garantie.
                            </p>
                            
                            <!-- Détails de la réservation -->
                            <table style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5;background:#f9f9f9;margin:20px 0">
                                <tr>
                                    <td style="padding:20px;border-left:4px solid #d4af37">
                                        <table style="width:100%;border-collapse:collapse">
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333;width:40%">Numéro de réservation :</td>
                                                <td style="padding:5px 0;color:#333">${booking.bookingId}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Statut :</td>
                                                <td style="padding:5px 0;color:#4CAF50;font-weight:bold">✅ CONFIRMÉE ET ACCEPTÉE</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Date et heure :</td>
                                                <td style="padding:5px 0;color:#333">${formatDate(booking.pickupDateTime)}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Adresse de départ :</td>
                                                <td style="padding:5px 0;color:#333">${booking.pickupAddress}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Adresse d'arrivée :</td>
                                                <td style="padding:5px 0;color:#333">${booking.dropoffAddress}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Véhicule :</td>
                                                <td style="padding:5px 0;color:#333">${getVehicleName(booking.vehicleType)}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Nombre de passagers :</td>
                                                <td style="padding:5px 0;color:#333">${booking.passengers}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Nombre de bagages :</td>
                                                <td style="padding:5px 0;color:#333">${booking.luggage}</td>
                                            </tr>
                                            ${booking.flightNumber ? `
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Numéro de vol :</td>
                                                <td style="padding:5px 0;color:#333">${booking.flightNumber}</td>
                                            </tr>
                                            ` : ''}
                                            ${booking.trainNumber ? `
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Numéro de train :</td>
                                                <td style="padding:5px 0;color:#333">${booking.trainNumber}</td>
                                            </tr>
                                            ` : ''}
                                            ${booking.roundTrip ? `
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Retour prévu le :</td>
                                                <td style="padding:5px 0;color:#333">${formatDate(booking.returnDateTime)}</td>
                                            </tr>
                                            ` : ''}
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Prix total :</td>
                                                <td style="padding:5px 0;color:#d4af37;font-weight:bold;font-size:18px">${formatPrice(booking.price)}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Informations sur le chauffeur -->
                            <table style="width:100%;border-collapse:collapse;background:#e3f2fd;border-radius:8px;margin:20px 0">
                                <tr>
                                    <td style="padding:20px">
                                        <h3 style="margin:0 0 15px 0;font-size:16px;color:#1565c0">📞 Contact du chauffeur</h3>
                                        <p style="margin:0 0 10px 0;color:#1565c0;font-weight:500">
                                            Notre chauffeur vous contactera <strong>2 heures avant</strong> l'heure prévue pour :
                                        </p>
                                        <ul style="margin:10px 0;padding-left:20px;color:#1565c0;line-height:1.6">
                                            <li>Confirmer sa présence et l'heure exacte d'arrivée</li>
                                            <li>Vous communiquer ses coordonnées directes</li>
                                            <li>Répondre à vos éventuelles questions</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Informations importantes -->
                            <table style="width:100%;border-collapse:collapse;background:#fff3e0;border-radius:8px;margin:20px 0">
                                <tr>
                                    <td style="padding:20px">
                                        <h3 style="margin:0 0 15px 0;font-size:16px;color:#e65100">ℹ️ Informations importantes</h3>
                                        <ul style="margin:0;padding-left:20px;color:#e65100;line-height:1.6">
                                            <li><strong>Paiement :</strong> Payable directement au chauffeur (espèces, carte bancaire)</li>
                                            <li><strong>Annulation :</strong> Gratuite jusqu'à 24h avant le départ</li>
                                            <li><strong>Modification :</strong> Contactez-nous au plus vite si besoin</li>
                                            <li><strong>Urgence :</strong> 01 23 45 67 89 (disponible 24h/24)</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin:20px 0;font-size:16px;line-height:1.5;color:#333">
                                Pour toute question ou modification concernant votre réservation, n'hésitez pas à nous contacter par email à 
                                <a href="mailto:contact@elysian-luxury-chauffeurs.com" style="color:#d4af37;text-decoration:none;font-weight:bold">contact@elysian-luxury-chauffeurs.com</a> 
                                ou par téléphone au <strong style="color:#d4af37">01 23 45 67 89</strong>.
                            </p>
                            
                            <p style="margin:30px 0 0 0;font-size:16px;color:#333">
                                Nous vous remercions de votre confiance et vous souhaitons un excellent voyage !<br><br>
                                <strong>L'équipe Elysian Luxury Chauffeurs</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Pied de page -->
                    <tr>
                        <td style="padding:0">
                            <table style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#f5f5f5;border-radius:0 0 8px 8px">
                                <tr>
                                    <td style="padding:20px;color:#666;font-size:12px;text-align:center">
                                        <p style="margin:0 0 10px 0">
                                            <strong>Elysian Luxury Chauffeurs</strong><br>
                                            123 Avenue des Champs, 91000 Évry-Courcouronnes<br>
                                            Tél: 01 23 45 67 89 | Email: contact@elysian-luxury-chauffeurs.com
                                        </p>
                                        <p style="margin:0">
                                            © ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `
    
    // Version texte améliorée
    const textContent = `
ELYSIAN LUXURY CHAUFFEURS
✅ RÉSERVATION CONFIRMÉE

🎉 Excellente nouvelle ! Votre réservation est automatiquement confirmée et acceptée
Un chauffeur professionnel a été assigné à votre course

Bonjour ${booking.customerName},

Nous sommes ravis de vous informer que votre réservation a été IMMÉDIATEMENT CONFIRMÉE ET ACCEPTÉE !
Aucune attente nécessaire, votre course est garantie.

DÉTAILS DE VOTRE RÉSERVATION:
════════════════════════════════════════════

Numéro de réservation : ${booking.bookingId}
Statut : ✅ CONFIRMÉE ET ACCEPTÉE
Date et heure : ${formatDate(booking.pickupDateTime)}
Départ : ${booking.pickupAddress}
Arrivée : ${booking.dropoffAddress}
Véhicule : ${getVehicleName(booking.vehicleType)}
Passagers : ${booking.passengers}
Bagages : ${booking.luggage}
${booking.flightNumber ? `Numéro de vol : ${booking.flightNumber}` : ''}
${booking.trainNumber ? `Numéro de train : ${booking.trainNumber}` : ''}
${booking.roundTrip ? `Retour prévu le : ${formatDate(booking.returnDateTime)}` : ''}
Prix total : ${formatPrice(booking.price)}

════════════════════════════════════════════

📞 CONTACT DU CHAUFFEUR:
Notre chauffeur vous contactera 2 HEURES AVANT l'heure prévue pour :
- Confirmer sa présence et l'heure exacte d'arrivée
- Vous communiquer ses coordonnées directes
- Répondre à vos éventuelles questions

INFORMATIONS IMPORTANTES:
- Paiement : Payable directement au chauffeur (espèces, carte bancaire)
- Annulation : Gratuite jusqu'à 24h avant le départ
- Modification : Contactez-nous au plus vite si besoin
- Urgence : 01 23 45 67 89 (disponible 24h/24)

Pour toute question ou modification, contactez-nous :
Email: contact@elysian-luxury-chauffeurs.com
Téléphone: 01 23 45 67 89

Nous vous remercions de votre confiance et vous souhaitons un excellent voyage !

L'équipe Elysian Luxury Chauffeurs

© ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés
    `
    
    return this.sendEmail({
      to: booking.customerEmail,
      subject: `✅ Réservation CONFIRMÉE #${booking.bookingId} - Elysian Luxury Chauffeurs`,
      text: textContent,
      html: htmlContent
    })
  },

  /**
   * Email de notification pour l'admin
   */
  async sendBookingNotification(booking) {
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
          <p style="margin: 3px 0;"><strong>Prix :</strong> ${booking.price} €</p>
        </div>
      </div>
    </div>
    `

    return this.sendEmail({
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Nouvelle réservation #${booking.bookingId} - Elysian Luxury Chauffeurs`,
      html: htmlContent
    })
  }
}