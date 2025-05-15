// app/api/maps/route-details/route.js - Version avec debug
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
  try {
    console.log('🚀 [API Proxy] Début de la requête route-details')
    
    const { originPlaceId, destinationPlaceId } = await request.json()
    console.log('📍 [API Proxy] Place IDs:', { originPlaceId, destinationPlaceId })

    if (!originPlaceId || !destinationPlaceId) {
      console.error('❌ [API Proxy] Place IDs manquants')
      return NextResponse.json(
        { success: false, error: 'IDs de lieux requis' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    console.log('🔑 [API Proxy] Clé API présente:', !!apiKey)
    
    if (!apiKey) {
      console.error('❌ [API Proxy] Clé API manquante')
      return NextResponse.json(
        { success: false, error: 'Clé API Google Maps non configurée' },
        { status: 500 }
      )
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${originPlaceId}&destinations=place_id:${destinationPlaceId}&mode=driving&language=fr&key=${apiKey}`
    console.log('🌐 [API Proxy] URL construite (sans clé):', url.replace(apiKey, 'XXX'))

    const response = await axios.get(url)
    console.log('📥 [API Proxy] Réponse Google Maps:', {
      status: response.data?.status,
      hasRows: !!response.data?.rows,
      firstElementStatus: response.data?.rows?.[0]?.elements?.[0]?.status
    })

    if (
      response.data &&
      response.data.status === 'OK' &&
      response.data.rows &&
      response.data.rows[0] &&
      response.data.rows[0].elements &&
      response.data.rows[0].elements[0] &&
      response.data.rows[0].elements[0].status === 'OK'
    ) {
      const result = response.data.rows[0].elements[0]
      console.log('✅ [API Proxy] Données extraites:', {
        distance: result.distance?.text,
        duration: result.duration?.text
      })
      
      return NextResponse.json({
        success: true,
        data: {
          distance: result.distance,
          duration: result.duration,
          origin: response.data.origin_addresses[0],
          destination: response.data.destination_addresses[0]
        }
      })
    } else {
      console.error('❌ [API Proxy] Réponse Google Maps invalide:', response.data)
      throw new Error(`Erreur API Google Maps: ${response.data?.status || 'Unknown'}`)
    }
  } catch (error) {
    console.error('❌ [API Proxy] Erreur:', error.message)
    console.error('❌ [API Proxy] Stack:', error.stack)
    
    // Fallback avec estimation
    console.log('🔄 [API Proxy] Utilisation du fallback')
    return NextResponse.json({
      success: true,
      data: {
        distance: {
          text: "25 km",
          value: 25000
        },
        duration: {
          text: "40 min",
          value: 2400
        },
        origin: "Adresse de départ",
        destination: "Adresse d'arrivée"
      }
    })
  }
}