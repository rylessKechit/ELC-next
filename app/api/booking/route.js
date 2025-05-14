// app/api/booking/route.js - Version corrigée
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { validateBookingRequest } from '@/lib/validator'
import { emailService } from '@/services/emailService'

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
    console.log('📥 Début du traitement de la réservation')
    
    // Connexion à MongoDB
    await dbConnect()
    console.log('✅ Connecté à MongoDB')
    
    // Extraire les données de la requête
    const requestData = await request.json()
    console.log('📄 Données reçues:', {
      pickupAddress: requestData.pickupAddress,
      dropoffAddress: requestData.dropoffAddress,
      customerInfo: requestData.customerInfo
    })
    
    // Valider les données entrantes
    const { valid, errors } = validateBookingRequest(requestData)
    
    if (!valid) {
      console.log('❌ Validation échouée:', errors)
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: errors },
        { status: 400 }
      )
    }
    
    console.log('✅ Validation réussie')
    
    // Générer un ID unique pour cette réservation
    const bookingId = generateBookingId()
    console.log('🆔 ID de réservation généré:', bookingId)
    
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
    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`)
    const returnDateTime = roundTrip && returnDate && returnTime ? new Date(`${returnDate}T${returnTime}`) : null
    
    console.log('🕐 Date/heure formatées:', {
      pickupDateTime: pickupDateTime.toISOString(),
      returnDateTime: returnDateTime ? returnDateTime.toISOString() : null
    })
    
    // Créer l'objet réservation pour MongoDB avec Mongoose
    const bookingData = {
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
      price: {
        amount: priceEstimate?.exactPrice || 0,
        currency: 'EUR'
      },
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone
      },
      status: 'confirmed' // CHANGEMENT: Direct en "confirmed" au lieu de "pending"
    }
    
    console.log('💾 Création de la réservation dans la base de données...')
    
    // Sauvegarder en base de données avec Mongoose
    const booking = new Booking(bookingData)
    const savedBooking = await booking.save()
    
    console.log('✅ Réservation sauvegardée:', savedBooking._id)
    
    // Préparer les données pour l'email
    const emailBookingData = {
      bookingId: savedBooking.bookingId,
      customerName: savedBooking.customerInfo.name,
      customerEmail: savedBooking.customerInfo.email,
      customerPhone: savedBooking.customerInfo.phone,
      pickupAddress: savedBooking.pickupAddress,
      dropoffAddress: savedBooking.dropoffAddress,
      pickupDateTime: savedBooking.pickupDateTime,
      returnDateTime: savedBooking.returnDateTime,
      vehicleType: savedBooking.vehicleType,
      passengers: savedBooking.passengers,
      luggage: savedBooking.luggage,
      flightNumber: savedBooking.flightNumber,
      trainNumber: savedBooking.trainNumber,
      roundTrip: savedBooking.roundTrip,
      price: savedBooking.price.amount,
      specialRequests: savedBooking.specialRequests
    }
    
    // Envoyer un email de confirmation au client
    let emailSent = false
    let emailError = null
    
    try {
      console.log('📧 Envoi de l\'email de confirmation...')
      await emailService.sendBookingConfirmation(emailBookingData)
      emailSent = true
      console.log('✅ Email de confirmation envoyé')
      
      // Envoyer également une notification à l'administrateur
      try {
        console.log('📧 Envoi de la notification admin...')
        await emailService.sendBookingNotification(emailBookingData)
        console.log('✅ Notification admin envoyée')
      } catch (adminEmailError) {
        console.error('❌ Erreur notification admin:', adminEmailError.message)
        // Ne pas échouer la réservation si l'email admin échoue
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error.message)
      emailError = error.message
      // On continue le processus même si l'email échoue
    }
    
    // Retourner la réservation confirmée
    const responseData = {
      success: true,
      booking: {
        id: savedBooking.bookingId,
        _id: savedBooking._id,
        status: savedBooking.status,
        createdAt: savedBooking.createdAt,
        pickupAddress: savedBooking.pickupAddress,
        dropoffAddress: savedBooking.dropoffAddress,
        pickupDateTime: savedBooking.pickupDateTime,
        returnDateTime: savedBooking.returnDateTime,
        passengers: savedBooking.passengers,
        luggage: savedBooking.luggage,
        vehicleType: savedBooking.vehicleType,
        roundTrip: savedBooking.roundTrip,
        flightNumber: savedBooking.flightNumber,
        trainNumber: savedBooking.trainNumber,
        specialRequests: savedBooking.specialRequests,
        price: savedBooking.price,
        customerInfo: savedBooking.customerInfo
      },
      emailStatus: emailSent ? 'sent' : 'failed',
      emailError: emailError
    }
    
    console.log('✅ Réservation traitée avec succès')
    
    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    console.error('❌ Erreur lors de la création de la réservation:', error)
    console.error('Stack trace:', error.stack)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la création de la réservation', 
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
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