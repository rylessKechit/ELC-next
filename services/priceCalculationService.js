// services/priceCalculationService.js - Version propre
import { googleMapsService } from './googleMapsService'

// TARIFS SELON VOTRE BARÈME
const BASE_FARES = {
  'green': 10,    // Model 3 - PEC 10 euros
  'premium': 18,  // Classe E premium - PEC 18 euros
  'sedan': 45,    // Classe S luxe - PEC 45 euros
  'van': 28       // Classe V VIP - PEC 28 euros
}

const PER_KM_RATES = {
  'green': 2.30,   // Model 3 - 2.30 euros/km
  'premium': 2.90, // Classe E premium - 2.90 euros/km
  'sedan': 3.80,   // Classe S luxe - 3.80 euros/km
  'van': 3.10      // Classe V VIP - 3.10 euros/km
}

// MINIMUM DE DISTANCE POUR LA CLASSE S (SEDAN)
const MIN_DISTANCE_KM = {
  'green': 0,
  'premium': 0,
  'sedan': 10,  // Minimum 10km pour la Classe S
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

    // Obtenir les détails du trajet via Google Maps
    let routeDetails
    try {
      routeDetails = await googleMapsService.getRouteDetails(pickupPlaceId, dropoffPlaceId)
    } catch (error) {
      throw new Error(`Impossible d'obtenir les détails de route depuis Google Maps: ${error.message}`)
    }

    // Vérifier que nous avons reçu des données valides
    if (!routeDetails || !routeDetails.distance || !routeDetails.duration) {
      throw new Error('Données invalides reçues de Google Maps')
    }

    // Extraire les informations de distance
    const distanceInMeters = routeDetails.distance.value
    const distanceInKm = distanceInMeters / 1000
    const durationInMinutes = routeDetails.duration.value / 60

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
          formattedDistance: routeDetails.distance.text,
          formattedDuration: routeDetails.duration.text
        }
      }
    }

    return result
  }
}