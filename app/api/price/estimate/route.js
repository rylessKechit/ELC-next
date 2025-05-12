// app/api/price/estimate/route.js - Version propre
import { NextResponse } from 'next/server'
import { validatePriceRequest } from '@/lib/validator'
import { priceCalculationService } from '@/services/priceCalculationService'

export async function POST(request) {
  try {
    const requestData = await request.json()
    
    // Validation
    const { valid, errors } = validatePriceRequest(requestData)
    
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: errors },
        { status: 400 }
      )
    }
    
    // Calcul du prix
    const priceEstimate = await priceCalculationService.calculatePrice(requestData)
    
    return NextResponse.json({
      success: true,
      data: priceEstimate
    })
  } catch (error) {
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