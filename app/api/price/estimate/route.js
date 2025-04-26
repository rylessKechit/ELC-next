// app/api/price/estimate/route.js
import { NextResponse } from 'next/server'
import { validatePriceRequest } from '@/lib/validator'
import { priceCalculationService } from '@/services/priceCalculationService'

/**
 * Route API pour estimer le prix d'une course
 * @param {Object} request - Requête HTTP
 * @returns {Promise<Object>} - Réponse HTTP avec l'estimation de prix
 */
export async function POST(request) {
  try {
    // Extraire les données de la requête
    const requestData = await request.json()
    
    // Valider les données entrantes
    const { valid, errors } = validatePriceRequest(requestData)
    
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: errors },
        { status: 400 }
      )
    }
    
    // Calculer l'estimation de prix
    // Note: Dans un environnement de production, s'assurer que ce service est correctement implémenté
    const priceEstimate = await priceCalculationService.calculatePrice(requestData)
    
    // Retourner l'estimation
    return NextResponse.json({
      success: true,
      data: {
        estimate: priceEstimate.estimate
      }
    })
  } catch (error) {
    console.error('Erreur lors du calcul du prix:', error)
    
    // Simulation d'une estimation pour le développement si le service échoue
    if (process.env.NODE_ENV === 'development') {
      console.log('Génération d\'une estimation de prix simulée pour le développement')
      
      const { vehicleType = 'sedan', roundTrip = false } = request.body || {}
      
      // Tarifs de base simulés
      const baseFares = {
        'sedan': 30,
        'premium': 50,
        'green': 40,
        'suv': 45,
        'van': 60
      }
      
      // Estimation simulée
      const baseFare = baseFares[vehicleType] || baseFares.sedan
      const distanceCharge = Math.random() * 50 + 20 // Entre 20 et 70
      const timeCharge = Math.random() * 30 + 10 // Entre 10 et 40
      const exactPrice = Math.ceil(baseFare + distanceCharge + timeCharge) * (roundTrip ? 1.8 : 1)
      
      return NextResponse.json({
        success: true,
        data: {
          estimate: {
            exactPrice,
            minPrice: Math.floor(exactPrice * 0.9),
            maxPrice: Math.ceil(exactPrice * 1.1),
            currency: 'EUR',
            breakdown: {
              baseFare,
              distanceCharge,
              timeCharge,
              isPeakHour: false,
              isAdvanceBooking: true,
              roundTrip
            },
            details: {
              distanceInKm: 45.5,
              durationInMinutes: 60,
              formattedDistance: "45,5 km",
              formattedDuration: "1h"
            }
          }
        },
        note: 'Estimation simulée pour le développement'
      })
    }
    
    return NextResponse.json(
      { success: false, error: 'Erreur lors du calcul du prix', message: error.message },
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