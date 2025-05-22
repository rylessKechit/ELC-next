// app/api/price/estimate/route.js - Version corrigée
import { NextResponse } from 'next/server'
import { validatePriceRequest } from '@/lib/validator'
import { priceCalculationService } from '@/services/priceCalculationService'

export async function POST(request) {
  try {
    const requestData = await request.json()
    
    // Validation basique des données requises
    const { pickupPlaceId, dropoffPlaceId } = requestData
    
    if (!pickupPlaceId || !dropoffPlaceId) {
      return NextResponse.json(
        { success: false, error: 'pickupPlaceId et dropoffPlaceId sont requis' },
        { status: 400 }
      )
    }
    
    // Calcul du prix en utilisant le service modifié
    const priceEstimate = await priceCalculationService.calculatePrice(requestData)
    
    return NextResponse.json(priceEstimate)
  } catch (error) {
    console.error('Erreur lors du calcul du prix:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors du calcul du prix', message: error.message },
      { status: 500 }
    )
  }
}

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