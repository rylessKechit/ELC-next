// app/api/price/estimate/route.js - Version finale
import { NextResponse } from 'next/server'
import { validatePriceRequest } from '@/lib/validator'
import { priceCalculationService } from '@/services/priceCalculationService'

export async function POST(request) {
  try {
    console.log('=== API price/estimate appelée ===')
    
    const requestData = await request.json()
    console.log('Données reçues:', requestData)
    
    // Validation
    const { valid, errors } = validatePriceRequest(requestData)
    
    if (!valid) {
      console.log('Validation échouée:', errors)
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: errors },
        { status: 400 }
      )
    }
    
    // Calcul du prix
    console.log('Calcul du prix...')
    const priceEstimate = await priceCalculationService.calculatePrice(requestData)
    console.log('Estimation calculée:', priceEstimate)
    
    return NextResponse.json({
      success: true,
      data: priceEstimate
    })
  } catch (error) {
    console.error('Erreur complète:', error)
    
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