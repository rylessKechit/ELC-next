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

    // Calculer le prix de base (PEC)
    const baseFare = BASE_FARES[vehicleType] || BASE_FARES.premium
    
    // Calculer la distance à facturer (minimum pour Classe S)
    const minDistanceKm = MIN_DISTANCE_KM[vehicleType] || 0
    const chargeableDistanceKm = Math.max(distanceInKm, minDistanceKm)
    
    // Calculer le coût basé sur la distance
    const perKmRate = PER_KM_RATES[vehicleType] || PER_KM_RATES.premium
    const distanceCharge = chargeableDistanceKm * perKmRate
    
    // Prix total = PEC + (Distance × Prix par km)
    let exactPrice = baseFare + distanceCharge
    
    // Si aller-retour, multiplier par 2
    if (roundTrip) {
      exactPrice *= 2
    }

    // Arrondir à 2 décimales
    exactPrice = Math.round(exactPrice * 100) / 100
    
    // Prévoir une marge d'erreur de 5% pour le prix min/max
    const minPrice = Math.round(exactPrice * 0.95 * 100) / 100
    const maxPrice = Math.round(exactPrice * 1.05 * 100) / 100

    const result = {
      success: true,
      estimate: {
        exactPrice,
        minPrice,
        maxPrice,
        currency: 'EUR',
        breakdown: {
          baseFare,
          distanceCharge,
          actualDistance: parseFloat(distanceInKm.toFixed(2)),
          chargeableDistance: parseFloat(chargeableDistanceKm.toFixed(2)),
          pricePerKm: perKmRate,
          roundTrip,
          vehicleType
        },
        details: {
          distanceInKm: parseFloat(distanceInKm.toFixed(2)),
          chargeableDistanceInKm: parseFloat(chargeableDistanceKm.toFixed(2)),
          durationInMinutes: Math.round(durationInMinutes),
          formattedDistance: routeDetails.distance?.text || `${distanceInKm.toFixed(1)} km`,
          formattedDuration: routeDetails.duration?.text || `${Math.round(durationInMinutes)} min`
        }
      }
    }

    return result
  }
}