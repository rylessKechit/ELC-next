// services/priceCalculationService.js - Version qui utilise UNIQUEMENT Google Maps
import { googleMapsService } from './googleMapsService'

// TARIFS SELON LE BARÈME FOURNI - PEC + PRIX PAR KM UNIQUEMENT
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

// Calcul du prix
export const priceCalculationService = {
  /**
   * Calculer une estimation de prix pour un trajet
   * @param {Object} params - Paramètres du trajet
   * @returns {Promise<Object>} - Estimation de prix
   */
  async calculatePrice(params) {
    const {
      pickupPlaceId,
      dropoffPlaceId,
      vehicleType = 'premium', // défaut à premium
      roundTrip = false
    } = params

    // Validation des paramètres
    if (!pickupPlaceId || !dropoffPlaceId) {
      throw new Error('pickupPlaceId et dropoffPlaceId sont requis')
    }

    console.log('=== Calcul avec Google Maps ===')
    console.log('pickupPlaceId:', pickupPlaceId)
    console.log('dropoffPlaceId:', dropoffPlaceId)
    console.log('vehicleType:', vehicleType)

    // Obtenir les détails du trajet via Google Maps (OBLIGATOIRE)
    let routeDetails
    try {
      console.log('Appel de googleMapsService.getRouteDetails...')
      routeDetails = await googleMapsService.getRouteDetails(pickupPlaceId, dropoffPlaceId)
      console.log('Résultat Google Maps:', routeDetails)
    } catch (error) {
      console.error('Erreur Google Maps:', error)
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

    console.log(`Distance réelle: ${distanceInKm.toFixed(2)} km`)
    console.log(`Durée: ${durationInMinutes.toFixed(0)} min`)

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

    console.log('Prix calculé:', exactPrice)
    return result
  }
}