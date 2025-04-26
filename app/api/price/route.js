// app/api/price/route.js
import { NextResponse } from 'next/server'
import { priceCalculationService } from '@/services/priceCalculationService'
import { validatePriceRequest } from '@/lib/validator'

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