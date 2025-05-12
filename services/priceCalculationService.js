// services/priceCalculationService.js
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
    try {
      const {
        pickupPlaceId,
        dropoffPlaceId,
        vehicleType = 'premium', // défaut à premium
        roundTrip = false
      } = params

      // Tenter d'obtenir les détails du trajet via Google Maps
      let routeDetails;
      try {
        if (typeof googleMapsService.getRouteDetails === 'function') {
          routeDetails = await googleMapsService.getRouteDetails(pickupPlaceId, dropoffPlaceId);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de route:', error);
        // Continuer avec des valeurs simulées
      }
      
      // Si on n'a pas pu obtenir des détails réels, utiliser des valeurs simulées
      if (!routeDetails) {
        // Distance moyenne simulée entre 15 et 50 km
        const distanceInKm = Math.random() * 35 + 15;
        const durationInMinutes = distanceInKm * 1.5; // ~40km/h en moyenne avec trafic
        
        routeDetails = {
          distance: {
            value: distanceInKm * 1000, // en mètres
            text: `${distanceInKm.toFixed(1)} km`
          },
          duration: {
            value: durationInMinutes * 60, // en secondes
            text: `${Math.floor(durationInMinutes)} min`
          },
          origin: "Adresse d'origine simulée",
          destination: "Adresse de destination simulée"
        };
      }

      // Extraire les informations de distance
      const distanceInMeters = routeDetails.distance.value;
      const distanceInKm = distanceInMeters / 1000;
      const durationInMinutes = routeDetails.duration.value / 60;

      // Calculer le prix de base (PEC)
      const baseFare = BASE_FARES[vehicleType] || BASE_FARES.premium;
      
      // Calculer la distance à facturer (minimum pour Classe S)
      const minDistanceKm = MIN_DISTANCE_KM[vehicleType] || 0;
      const chargeableDistanceKm = Math.max(distanceInKm, minDistanceKm);
      
      // Calculer le coût basé sur la distance
      const perKmRate = PER_KM_RATES[vehicleType] || PER_KM_RATES.premium;
      const distanceCharge = chargeableDistanceKm * perKmRate;
      
      // Prix total = PEC + (Distance × Prix par km)
      let exactPrice = baseFare + distanceCharge;
      
      // Si aller-retour, multiplier par 2
      if (roundTrip) {
        exactPrice *= 2;
      }

      // Arrondir à 2 décimales
      exactPrice = Math.round(exactPrice * 100) / 100;
      
      // Prévoir une marge d'erreur de 5% pour le prix min/max
      const minPrice = Math.round(exactPrice * 0.95 * 100) / 100;
      const maxPrice = Math.round(exactPrice * 1.05 * 100) / 100;

      // Retourner l'estimation complète
      return {
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
      };
    } catch (error) {
      console.error('Erreur lors du calcul du prix:', error);
      
      // Retourner une estimation par défaut en cas d'erreur
      return this.generateDefaultEstimate(params);
    }
  },

  /**
   * Génère une estimation par défaut en cas d'erreur
   * @param {Object} params - Paramètres originaux
   * @returns {Object} - Estimation par défaut
   */
  generateDefaultEstimate(params) {
    const { vehicleType = 'premium', roundTrip = false } = params;
    
    // Valeurs par défaut
    const baseFare = BASE_FARES[vehicleType] || BASE_FARES.premium;
    const perKmRate = PER_KM_RATES[vehicleType] || PER_KM_RATES.premium;
    const defaultDistance = 25; // 25km par défaut
    const minDistanceKm = MIN_DISTANCE_KM[vehicleType] || 0;
    const chargeableDistance = Math.max(defaultDistance, minDistanceKm);
    
    const distanceCharge = chargeableDistance * perKmRate;
    let exactPrice = baseFare + distanceCharge;
    
    if (roundTrip) {
      exactPrice *= 2;
    }
    
    exactPrice = Math.round(exactPrice * 100) / 100;
    
    return {
      success: true,
      estimate: {
        exactPrice,
        minPrice: Math.round(exactPrice * 0.95 * 100) / 100,
        maxPrice: Math.round(exactPrice * 1.05 * 100) / 100,
        currency: 'EUR',
        breakdown: {
          baseFare,
          distanceCharge,
          actualDistance: defaultDistance,
          chargeableDistance,
          pricePerKm: perKmRate,
          roundTrip,
          vehicleType
        },
        details: {
          distanceInKm: defaultDistance,
          chargeableDistanceInKm: chargeableDistance,
          durationInMinutes: 40,
          formattedDistance: `${defaultDistance} km`,
          formattedDuration: "40 min"
        }
      }
    };
  }
};

export default priceCalculationService;