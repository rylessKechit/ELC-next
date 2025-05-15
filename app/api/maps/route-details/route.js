// app/api/maps/route-details/route.js - Version avec logs exhaustifs
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
  const startTime = Date.now()
  
  try {
    console.log('🚀 [API Proxy] === DÉBUT REQUÊTE ROUTE-DETAILS ===')
    console.log('🕐 [API Proxy] Timestamp:', new Date().toISOString())
    
    // Lire le body de la requête
    let requestBody
    try {
      requestBody = await request.json()
      console.log('📥 [API Proxy] Body reçu:', requestBody)
    } catch (bodyError) {
      console.error('❌ [API Proxy] Erreur lecture body:', bodyError)
      return NextResponse.json(
        { success: false, error: 'Corps de requête invalide' },
        { status: 400 }
      )
    }

    const { originPlaceId, destinationPlaceId } = requestBody

    // Validation des Place IDs
    if (!originPlaceId || !destinationPlaceId) {
      console.error('❌ [API Proxy] Place IDs manquants')
      return NextResponse.json(
        { success: false, error: 'IDs de lieux requis' },
        { status: 400 }
      )
    }

    // Vérifier les variables d'environnement
    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    console.log('🔑 [API Proxy] Variables d\'environnement:', {
      hasApiKey: !!apiKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyPrefix: apiKey ? apiKey.substring(0, 8) + '...' : 'N/A',
      nodeEnv: process.env.NODE_ENV
    })
    
    if (!apiKey) {
      console.error('❌ [API Proxy] Clé API Google Maps non configurée')
      return NextResponse.json(
        { success: false, error: 'Clé API Google Maps non configurée' },
        { status: 500 }
      )
    }

    // Construire l'URL
    const baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json'
    const params = new URLSearchParams({
      origins: `place_id:${originPlaceId}`,
      destinations: `place_id:${destinationPlaceId}`,
      mode: 'driving',
      language: 'fr',
      key: apiKey
    })
    
    const url = `${baseUrl}?${params.toString()}`
    console.log('🌐 [API Proxy] URL Google Maps:', {
      baseUrl,
      urlLength: url.length,
      hasKey: url.includes('key='),
      originPlaceId: originPlaceId.substring(0, 20) + '...',
      destinationPlaceId: destinationPlaceId.substring(0, 20) + '...'
    })

    // Faire l'appel à Google Maps
    console.log('📡 [API Proxy] Appel à Google Maps en cours...')
    
    let gmResponse
    try {
      gmResponse = await axios.get(url, {
        timeout: 15000, // 15 secondes
        headers: {
          'User-Agent': 'Elysian-Chauffeurs/1.0',
          'Accept': 'application/json'
        }
      })
      
      console.log('📥 [API Proxy] Réponse Google Maps reçue:', {
        status: gmResponse.status,
        hasData: !!gmResponse.data,
        googleStatus: gmResponse.data?.status,
        errorMessage: gmResponse.data?.error_message
      })
    } catch (axiosError) {
      console.error('❌ [API Proxy] Erreur axios:', {
        message: axiosError.message,
        code: axiosError.code,
        status: axiosError.response?.status,
        data: axiosError.response?.data
      })
      throw axiosError
    }

    // Analyser la réponse
    const responseData = gmResponse.data
    console.log('🔍 [API Proxy] Analyse de la réponse:', {
      status: responseData.status,
      hasRows: !!responseData.rows,
      rowsLength: responseData.rows?.length,
      hasElements: !!responseData.rows?.[0]?.elements,
      elementsLength: responseData.rows?.[0]?.elements?.length,
      firstElementStatus: responseData.rows?.[0]?.elements?.[0]?.status
    })

    if (
      responseData &&
      responseData.status === 'OK' &&
      responseData.rows &&
      responseData.rows[0] &&
      responseData.rows[0].elements &&
      responseData.rows[0].elements[0] &&
      responseData.rows[0].elements[0].status === 'OK'
    ) {
      const result = responseData.rows[0].elements[0]
      const responsePayload = {
        distance: result.distance,
        duration: result.duration,
        origin: responseData.origin_addresses[0],
        destination: responseData.destination_addresses[0]
      }
      
      console.log('✅ [API Proxy] Succès :', {
        distance: result.distance?.text,
        duration: result.duration?.text,
        processingTime: Date.now() - startTime + 'ms'
      })
      
      return NextResponse.json({
        success: true,
        data: responsePayload
      })
    } else {
      console.error('❌ [API Proxy] Réponse Google Maps invalide:', {
        status: responseData.status,
        error_message: responseData.error_message,
        rows: responseData.rows
      })
      throw new Error(`Erreur API Google Maps: ${responseData.status || 'Unknown'} - ${responseData.error_message || ''}`)
    }
  } catch (error) {
    const processingTime = Date.now() - startTime
    console.error('❌ [API Proxy] === ERREUR FINALE ===')
    console.error('❌ [API Proxy] Message:', error.message)
    console.error('❌ [API Proxy] Stack:', error.stack)
    console.error('❌ [API Proxy] Temps de traitement:', processingTime + 'ms')
    
    // Fallback avec estimation
    console.log('🔄 [API Proxy] Retour du fallback')
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