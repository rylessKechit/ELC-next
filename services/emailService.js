// services/emailService.js - Version optimisée anti-spam
import nodemailer from 'nodemailer'

export const emailService = {
  /**
   * Créer un transporteur d'email optimisé pour éviter le spam
   */
  createTransporter() {
    const host = process.env.EMAIL_HOST || 'smtp.gmail.com'
    const port = parseInt(process.env.EMAIL_PORT || '587', 10)
    const secure = process.env.EMAIL_SECURE === 'true'
    const user = process.env.EMAIL_USER || 'user@example.com'
    const pass = process.env.EMAIL_PASSWORD || 'password'
    
    return nodemailer.createTransporter({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      },
      // Configuration anti-spam
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
      },
      // Headers de réputation
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'X-Mailer': 'Elysian Luxury Chauffeurs'
      }
    })
  },

  /**
   * Envoyer un email avec optimisations anti-spam
   */
  async sendEmail(options) {
    try {
      const transporter = this.createTransporter()
      
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
          'Message-ID': `<${Date.now()}-${Math.random().toString(36).substr(2, 9)}@elysian-luxury-chauffeurs.com>`,
          'List-Unsubscribe': `<mailto:unsubscribe@elysian-luxury-chauffeurs.com>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        },
        // Encodage pour éviter les problèmes d'affichage
        encoding: 'utf8',
        textEncoding: 'base64',
        // Signature DKIM (si configurée)
        dkim: {
          domainName: 'elysian-luxury-chauffeurs.com',
          keySelector: 'default',
          privateKey: process.env.DKIM_PRIVATE_KEY
        }
      }
      
      // Ajouter des pièces jointes si fournies
      if (options.attachments) {
        mailOptions.attachments = options.attachments
      }
      
      // Vérifier si on est en mode test
      if (!process.env.EMAIL_HOST || process.env.EMAIL_HOST === 'smtp.example.com') {
        console.log('⚠️ Configuration SMTP incomplète. Simulation d\'envoi d\'email:')
        console.log(mailOptions)
        return { 
          messageId: `dev-${Date.now()}`,
          simulated: true,
          status: 'Simulated - Missing EMAIL_HOST configuration'
        }
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
   * Email de confirmation optimisé
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
    
    // Template HTML optimisé pour éviter le spam
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>Confirmation de réservation - Elysian Luxury Chauffeurs</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4">
    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#f4f4f4">
        <tr>
            <td align="center" style="padding:0">
                <table role="presentation" style="width:600px;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;margin-top:20px;margin-bottom:20px;border-radius:8px;box-shadow:0 4px 6px rgba(0,0,0,0.1)">
                    <!-- En-tête -->
                    <tr>
                        <td style="padding:0">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#1c2938;border-radius:8px 8px 0 0">
                                <tr>
                                    <td align="center" style="padding:30px 40px 30px 40px;color:#ffffff">
                                        <h1 style="margin:0;font-size:24px;font-weight:bold;color:#d4af37">
                                            Elysian Luxury Chauffeurs
                                        </h1>
                                        <p style="margin-top:10px;font-size:16px;color:#ffffff">
                                            Confirmation de votre réservation
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Contenu principal -->
                    <tr>
                        <td style="padding:40px 40px 40px 40px">
                            <h2 style="margin:0 0 20px 0;font-size:18px;color:#333">
                                Bonjour ${booking.customerName},
                            </h2>
                            
                            <p style="margin:0 0 20px 0;font-size:16px;line-height:1.5;color:#333">
                                Nous avons le plaisir de confirmer votre réservation. Voici les détails :
                            </p>
                            
                            <!-- Détails de la réservation -->
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #e5e5e5;background:#f9f9f9;margin:20px 0">
                                <tr>
                                    <td style="padding:20px;border-left:4px solid #d4af37">
                                        <table role="presentation" style="width:100%;border-collapse:collapse">
                                            <tr>
                                                <td style="padding:5px 0;font-weight:bold;color:#333">Numéro de réservation :</td>
                                                <td style="padding:5px 0;color:#333">${booking.bookingId}</td>
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
                                                <td style="padding:5px 0;color:#d4af37;font-weight:bold">${formatPrice(booking.price)}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin:20px 0;font-size:16px;line-height:1.5;color:#333">
                                Notre chauffeur vous contactera environ 2 heures avant l'heure prévue pour confirmer sa présence.
                            </p>
                            
                            <!-- Informations importantes -->
                            <table role="presentation" style="width:100%;border-collapse:collapse;background:#e8f4fd;border-radius:5px;margin:20px 0">
                                <tr>
                                    <td style="padding:20px">
                                        <h3 style="margin:0 0 15px 0;font-size:16px;color:#1c2938">Informations importantes</h3>
                                        <ul style="margin:0;padding-left:20px;color:#333;line-height:1.6">
                                            <li>Annulation gratuite jusqu'à 24h avant le départ</li>
                                            <li>Le paiement s'effectuera auprès du chauffeur (espèces, carte bancaire)</li>
                                            <li>En cas d'urgence, contactez-nous au 01 23 45 67 89</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin:20px 0;font-size:16px;line-height:1.5;color:#333">
                                Pour toute question ou modification concernant votre réservation, n'hésitez pas à nous contacter par email à 
                                <a href="mailto:contact@elysian-luxury-chauffeurs.com" style="color:#d4af37;text-decoration:none">contact@elysian-luxury-chauffeurs.com</a> 
                                ou par téléphone au 01 23 45 67 89.
                            </p>
                            
                            <p style="margin:20px 0;font-size:16px;line-height:1.5;color:#333">
                                Nous vous remercions de votre confiance et vous souhaitons un agréable trajet.
                            </p>
                            
                            <p style="margin:30px 0 0 0;font-size:16px;color:#333">
                                Cordialement,<br>
                                <strong>L'équipe Elysian Luxury Chauffeurs</strong>
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Pied de page -->
                    <tr>
                        <td style="padding:0">
                            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#f5f5f5;border-radius:0 0 8px 8px">
                                <tr>
                                    <td align="center" style="padding:20px;color:#666;font-size:12px">
                                        <p style="margin:0 0 10px 0">
                                            <strong>Elysian Luxury Chauffeurs</strong><br>
                                            123 Avenue des Champs, 91000 Évry-Courcouronnes<br>
                                            Tél: 01 23 45 67 89
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
    
    // Version texte optimisée
    const textContent = `
ELYSIAN LUXURY CHAUFFEURS
Confirmation de votre réservation

Bonjour ${booking.customerName},

Nous avons le plaisir de confirmer votre réservation.

DÉTAILS DE VOTRE RÉSERVATION:
════════════════════════════════════════════

Numéro de réservation : ${booking.bookingId}
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

Notre chauffeur vous contactera environ 2 heures avant l'heure prévue pour confirmer sa présence.

INFORMATIONS IMPORTANTES:
- Annulation gratuite jusqu'à 24h avant le départ
- Le paiement s'effectuera auprès du chauffeur (espèces, carte bancaire)  
- En cas d'urgence, contactez-nous au 01 23 45 67 89

Pour toute question ou modification, contactez-nous :
Email: contact@elysian-luxury-chauffeurs.com
Téléphone: 01 23 45 67 89

Nous vous remercions de votre confiance et vous souhaitons un agréable trajet.

Cordialement,
L'équipe Elysian Luxury Chauffeurs

--
Elysian Luxury Chauffeurs
123 Avenue des Champs, 91000 Évry-Courcouronnes
Tél: 01 23 45 67 89
© ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés
    `
    
    return this.sendEmail({
      to: booking.customerEmail,
      subject: `✅ Confirmation réservation #${booking.bookingId} - Elysian Luxury Chauffeurs`,
      text: textContent,
      html: htmlContent
    })
  }
}