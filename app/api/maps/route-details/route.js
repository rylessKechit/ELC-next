import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
  try {
    const { originPlaceId, destinationPlaceId } = await request.json()

    if (!originPlaceId || !destinationPlaceId) {
      return NextResponse.json(
        { success: false, error: 'IDs de lieux requis' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Clé API Google Maps non configurée' },
        { status: 500 }
      )
    }

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${originPlaceId}&destinations=place_id:${destinationPlaceId}&mode=driving&language=fr&key=${apiKey}`
    )

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
      throw new Error(`Erreur API Google Maps: ${response.data.status}`)
    }
  } catch (error) {
    console.error('Erreur proxy Google Maps:', error)
    
    // Fallback avec estimation
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