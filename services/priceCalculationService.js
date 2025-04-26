// services/priceCalculationService.js
import { googleMapsService } from './googleMapsService'

// Constantes de prix
const BASE_FARES = {
  'sedan': 30, // Berline de luxe
  'premium': 50, // Berline premium
  'green': 40, // Véhicule électrique
  'suv': 45, // SUV
  'van': 60 // Van VIP
}

const PER_KM_RATES = {
  'sedan': 1.5,
  'premium': 2.2,
  'green': 1.8,
  'suv': 2.0,
  'van': 2.5
}

// Tarifs horaires pour le temps de conduite (€ par minute)
const PER_MINUTE_RATES = {
  'sedan': 0.5,
  'premium': 0.7,
  'green': 0.6,
  'suv': 0.65,
  'van': 0.8
}

// Surcharge pour bagages supplémentaires (au-delà de 2)
const LUGGAGE_SURCHARGE = 5 // € par bagage supplémentaire au-delà de 2

// Supplément pour périodes de forte demande
const PEAK_HOURS_MULTIPLIER = 1.2 // +20% aux heures de pointe

// Réduction pour réservation à l'avance
const ADVANCE_BOOKING_DISCOUNT = 0.9 // -10% pour réservation plus de 7 jours à l'avance

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
        pickupDateTime,
        passengers = 1,
        luggage = 0,
        vehicleType = 'sedan', // par défaut
        roundTrip = false,
        returnDateTime
      } = params

      // Obtenir les détails du trajet via Google Maps
      const routeDetails = await googleMapsService.getRouteDetails(pickupPlaceId, dropoffPlaceId)
      
      if (!routeDetails) {
        throw new Error('Impossible de calculer l\'itinéraire')
      }

      // Extraire les informations de distance et de durée
      const distanceInMeters = routeDetails.distance.value
      const durationInSeconds = routeDetails.duration.value
      
      const distanceInKm = distanceInMeters / 1000
      const durationInMinutes = durationInSeconds / 60

      // Déterminer si c'est une heure de pointe
      const pickupTime = new Date(pickupDateTime)
      const isPeakHour = this.isPeakHour(pickupTime)

      // Déterminer si c'est une réservation anticipée
      const isAdvanceBooking = this.isAdvanceBooking(pickupTime)

      // Calculer le prix de base en fonction du type de véhicule
      const baseFare = BASE_FARES[vehicleType] || BASE_FARES.sedan
      
      // Calculer le coût basé sur la distance
      const distanceCharge = distanceInKm * (PER_KM_RATES[vehicleType] || PER_KM_RATES.sedan)
      
      // Calculer le coût basé sur la durée
      const timeCharge = durationInMinutes * (PER_MINUTE_RATES[vehicleType] || PER_MINUTE_RATES.sedan)
      
      // Calculer les suppléments pour bagages
      const extraLuggage = Math.max(0, luggage - 2) // 2 bagages inclus
      const luggageCharge = extraLuggage * LUGGAGE_SURCHARGE
      
      // Prix total avant ajustements
      let totalBeforeAdjustments = baseFare + distanceCharge + timeCharge + luggageCharge

      // Appliquer le multiplicateur d'heure de pointe si nécessaire
      if (isPeakHour) {
        totalBeforeAdjustments *= PEAK_HOURS_MULTIPLIER
      }

      // Appliquer la réduction pour réservation anticipée si applicable
      if (isAdvanceBooking) {
        totalBeforeAdjustments *= ADVANCE_BOOKING_DISCOUNT
      }

      // Arrondir à l'euro supérieur
      let exactPrice = Math.ceil(totalBeforeAdjustments)
      
      // Si aller-retour, multiplier par 1.8 (10% de remise sur le retour)
      if (roundTrip) {
        exactPrice *= 1.8
      }

      // Prévoir une marge d'erreur de 10% pour le prix min/max
      const minPrice = Math.floor(exactPrice * 0.9)
      const maxPrice = Math.ceil(exactPrice * 1.1)

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
            timeCharge,
            luggageCharge,
            isPeakHour,
            isAdvanceBooking,
            roundTrip
          },
          details: {
            distanceInKm: parseFloat(distanceInKm.toFixed(1)),
            durationInMinutes: Math.round(durationInMinutes),
            formattedDistance: routeDetails.distance.text,
            formattedDuration: routeDetails.duration.text
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du calcul du prix:', error)
      throw error
    }
  },

  /**
   * Vérifie si l'heure donnée est une heure de pointe
   * @param {Date} dateTime - Date et heure
   * @returns {boolean}
   */
  isPeakHour(dateTime) {
    const hour = dateTime.getHours()
    const dayOfWeek = dateTime.getDay() // 0 = dimanche, 1 = lundi, etc.
    
    // Heures de pointe en semaine : 7h-10h et 17h-20h
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      return (hour >= 7 && hour < 10) || (hour >= 17 && hour < 20)
    }
    
    // Weekend : pas d'heures de pointe
    return false
  },

  /**
   * Vérifie si la réservation est faite suffisamment à l'avance
   * @param {Date} dateTime - Date et heure de prise en charge
   * @returns {boolean}
   */
  isAdvanceBooking(dateTime) {
    const now = new Date()
    const daysInAdvance = (dateTime - now) / (1000 * 60 * 60 * 24)
    
    // Réduction appliquée si réservation 7 jours ou plus à l'avance
    return daysInAdvance >= 7
  }
}

export default priceCalculationService