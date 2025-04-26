// app/api/booking/route.js
import { NextResponse } from 'next/server'
import { validateBookingRequest } from '@/lib/validator'
import { emailService } from '@/services/emailService'
import { whatsappService } from '@/services/whatsappService'

/**
 * Génère un ID unique pour la réservation
 * @returns {string} - ID de réservation formaté
 */
function generateBookingId() {
  const prefix = 'ELC'
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Route API pour créer une nouvelle réservation
 * @param {Object} request - Requête HTTP
 * @returns {Promise<Object>} - Réponse HTTP avec les détails de la réservation
 */
export async function POST(request) {
  try {
    // Extraire les données de la requête
    const requestData = await request.json()
    
    // Valider les données entrantes
    const { valid, errors } = validateBookingRequest(requestData)
    
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: errors },
        { status: 400 }
      )
    }
    
    // Générer un ID unique pour cette réservation
    const bookingId = generateBookingId()
    
    // Extraire les données principales
    const {
      pickupAddress,
      dropoffAddress,
      pickupDate,
      pickupTime,
      passengers,
      luggage,
      vehicleType,
      roundTrip,
      returnDate,
      returnTime,
      flightNumber,
      trainNumber,
      specialRequests,
      customerInfo,
      priceEstimate
    } = requestData

    // Combiner date et heure pour les champs DateTime
    const pickupDateTime = `${pickupDate}T${pickupTime}`
    const returnDateTime = roundTrip ? `${returnDate}T${returnTime}` : null
    
    // Simuler la création d'une réservation (dans un vrai système, ceci serait enregistré en base de données)
    const booking = {
      bookingId,
      pickupAddress,
      dropoffAddress,
      pickupDateTime,
      returnDateTime,
      passengers,
      luggage,
      vehicleType,
      roundTrip,
      flightNumber,
      trainNumber,
      specialRequests,
      price: priceEstimate.exactPrice,
      currency: 'EUR',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone
    }
    
    // Envoyer un email de confirmation au client
    try {
      await emailService.sendBookingConfirmation(booking)
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email de confirmation:', emailError)
      // Ne pas échouer la réservation si l'email échoue
    }
    
    // Envoyer une notification WhatsApp à l'administrateur
    try {
      await whatsappService.sendAdminNotification(booking)
    } catch (whatsappError) {
      console.error('Erreur lors de l\'envoi de la notification WhatsApp:', whatsappError)
      // Ne pas échouer la réservation si la notification échoue
    }
    
    // Retourner la réservation confirmée
    return NextResponse.json({
      success: true,
      booking
    })
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error)
    
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de la réservation', message: error.message },
      { status: 500 }
    )
  }
}

/**
 * Gestionnaire pour les requêtes OPTIONS (CORS)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}