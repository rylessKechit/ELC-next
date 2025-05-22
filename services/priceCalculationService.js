// services/priceCalculationService.js - Version corrigée finale
import { googleMapsService } from './googleMapsService'

// TARIFS SELON VOTRE BARÈME
const BASE_FARES = {
  'green': 10,
  'premium': 18,
  'sedan': 45,
  'van': 28
}

const PER_KM_RATES = {
  'green': 2.30,
  'premium': 2.90,
  'sedan': 3.80,
  'van': 3.10
}

const MIN_DISTANCE_KM = {
  'green': 0,
  'premium': 0,
  'sedan': 10,
  'van': 0
}

// Prix minimum pour toute course, quelle que soit la distance
const MINIMUM_FARE = 20

export const priceCalculationService = {
  async calculatePrice(params) {
    const {
      pickupPlaceId,
      dropoffPlaceId,
      vehicleType = 'premium',
      roundTrip = false
    } = params

    // Validation des paramètres
    if (!pickupPlaceId || !dropoffPlaceId) {
      throw new Error('pickupPlaceId et dropoffPlaceId sont requis')
    }

    // Obtenir les détails du trajet via Google Maps avec fallback
    let routeDetails
    try {
      routeDetails = await googleMapsService.getRouteDetails(pickupPlaceId, dropoffPlaceId)
    } catch (error) {
      console.error('Erreur Google Maps, utilisation du fallback:', error)
      // Utiliser des valeurs de fallback raisonnables
      routeDetails = {
        distance: {
          text: "25 km",
          value: 25000
        },
        duration: {
          text: "40 min",
          value: 2400
        }
      }
    }

    // Vérifier et extraire les informations de distance
    const distanceInMeters = routeDetails.distance?.value || 25000
    const distanceInKm = distanceInMeters / 1000
    const durationInMinutes = (routeDetails.duration?.value || 2400) / 60

    // Calculer prix pour chaque type de véhicule
    const vehiclePrices = {}
    
    // Calculer prix pour chaque type de véhicule
    Object.keys(BASE_FARES).forEach(vType => {
      // Calculer le prix de base (PEC)
      const baseFare = BASE_FARES[vType]
      
      // Calculer la distance à facturer (minimum pour Classe S)
      const minDistanceKm = MIN_DISTANCE_KM[vType] || 0
      const chargeableDistanceKm = Math.max(distanceInKm, minDistanceKm)
      
      // Calculer le coût basé sur la distance
      const perKmRate = PER_KM_RATES[vType]
      const distanceCharge = chargeableDistanceKm * perKmRate
      
      // Prix total = PEC + (Distance × Prix par km)
      let price = baseFare + distanceCharge
      
      // Si aller-retour, multiplier par 2
      if (roundTrip) {
        price *= 2
      }

      // Vérifier si le prix minimum doit être appliqué
      const minimumFareApplied = price < MINIMUM_FARE
      
      // Appliquer le prix minimum si nécessaire
      if (minimumFareApplied) {
        price = MINIMUM_FARE
      }
      
      // Arrondir à 2 décimales
      price = Math.round(price * 100) / 100
      
      // Stocker le prix pour ce type de véhicule
      vehiclePrices[vType] = {
        exactPrice: price,
        minimumFareApplied: minimumFareApplied,
        baseFare: baseFare,
        distanceCharge: distanceCharge,
        perKmRate: perKmRate
      }
    })

    // Générer les prix par catégorie de véhicule
    const priceRanges = {
      standard: {
        min: Math.ceil(vehiclePrices.sedan.exactPrice * 0.95),
        max: Math.ceil(vehiclePrices.sedan.exactPrice)
      },
      premium: {
        min: Math.ceil(vehiclePrices.premium.exactPrice * 0.95),
        max: Math.ceil(vehiclePrices.premium.exactPrice)
      },
      van: {
        min: Math.ceil(vehiclePrices.van.exactPrice * 0.95),
        max: Math.ceil(vehiclePrices.van.exactPrice)
      }
    }
    
    // Structure complète de la réponse - CETTE STRUCTURE EST CRUCIALE
    const result = {
      success: true,
      data: {
        estimate: {
          exactPrice: vehiclePrices[vehicleType].exactPrice,
          currency: 'EUR',
          basePrice: vehiclePrices[vehicleType].baseFare,
          priceRanges: priceRanges,
          vehiclePrices: vehiclePrices,  // CETTE PROPRIÉTÉ EST NÉCESSAIRE
          details: {
            distanceInKm: parseFloat(distanceInKm.toFixed(2)),
            durationInMinutes: Math.round(durationInMinutes),
            formattedDistance: routeDetails.distance?.text || `${distanceInKm.toFixed(1)} km`,
            formattedDuration: routeDetails.duration?.text || `${Math.round(durationInMinutes)} min`,
            polyline: null
          },
          minimumFareApplied: vehiclePrices[vehicleType].minimumFareApplied,
          breakdown: {
            baseFare: vehiclePrices[vehicleType].baseFare,
            distanceCharge: vehiclePrices[vehicleType].distanceCharge,
            pricePerKm: vehiclePrices[vehicleType].perKmRate,
            actualDistance: distanceInKm,
            minimumCourse: MINIMUM_FARE,
            currency: 'EUR'
          },
          selectedRate: 'A'
        }
      }
    }
    
    return result
  }
}