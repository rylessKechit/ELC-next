// lib/validator.js

/**
 * Valide les données d'une demande d'estimation de prix
 * @param {Object} data - Données à valider
 * @returns {Object} - Résultat de validation {valid: boolean, errors: Array}
 */
export function validatePriceRequest(data) {
    const errors = []
    
    // Vérification des champs obligatoires
    if (!data.pickupPlaceId) {
      errors.push('L\'ID du lieu de départ est obligatoire')
    }
    
    if (!data.dropoffPlaceId) {
      errors.push('L\'ID du lieu d\'arrivée est obligatoire')
    }
    
    if (!data.pickupDateTime) {
      errors.push('La date et l\'heure de départ sont obligatoires')
    } else {
      // Vérifier que la date est au format correct et future
      const pickupDate = new Date(data.pickupDateTime)
      const now = new Date()
      
      if (isNaN(pickupDate.getTime())) {
        errors.push('Le format de la date et heure de départ est invalide')
      } else if (pickupDate < now) {
        errors.push('La date de départ doit être dans le futur')
      }
    }
    
    // Vérification du nombre de passagers
    if (data.passengers !== undefined) {
      const passengers = parseInt(data.passengers, 10)
      
      if (isNaN(passengers) || passengers < 1) {
        errors.push('Le nombre de passagers doit être d\'au moins 1')
      } else if (passengers > 10) {
        errors.push('Le nombre de passagers ne peut pas dépasser 10')
      }
    }
    
    // Vérification du nombre de bagages
    if (data.luggage !== undefined) {
      const luggage = parseInt(data.luggage, 10)
      
      if (isNaN(luggage) || luggage < 0) {
        errors.push('Le nombre de bagages doit être un nombre positif')
      }
    }
    
    // Vérification de l'aller-retour
    if (data.roundTrip === true) {
      if (!data.returnDateTime) {
        errors.push('La date et l\'heure de retour sont obligatoires pour un aller-retour')
      } else {
        const returnDate = new Date(data.returnDateTime)
        const pickupDate = new Date(data.pickupDateTime)
        
        if (isNaN(returnDate.getTime())) {
          errors.push('Le format de la date et heure de retour est invalide')
        } else if (returnDate <= pickupDate) {
          errors.push('La date de retour doit être postérieure à la date de départ')
        }
      }
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }
  
  /**
   * Valide les données d'une demande de réservation
   * @param {Object} data - Données à valider
   * @returns {Object} - Résultat de validation {valid: boolean, errors: Array}
   */
  export function validateBookingRequest(data) {
    const errors = []
    
    // Vérification des champs obligatoires
    if (!data.pickupAddress) {
      errors.push('L\'adresse de départ est obligatoire')
    }
    
    if (!data.dropoffAddress) {
      errors.push('L\'adresse d\'arrivée est obligatoire')
    }
    
    if (!data.pickupDate || !data.pickupTime) {
      errors.push('La date et l\'heure de départ sont obligatoires')
    } else {
      // Vérifier que la date est au format correct et future
      const pickupDateTime = new Date(`${data.pickupDate}T${data.pickupTime}`)
      const now = new Date()
      
      if (isNaN(pickupDateTime.getTime())) {
        errors.push('Le format de la date et heure de départ est invalide')
      } else if (pickupDateTime < now) {
        errors.push('La date de départ doit être dans le futur')
      }
    }
    
    // Vérification du nombre de passagers
    if (!data.passengers) {
      errors.push('Le nombre de passagers est obligatoire')
    } else {
      const passengers = parseInt(data.passengers, 10)
      
      if (isNaN(passengers) || passengers < 1) {
        errors.push('Le nombre de passagers doit être d\'au moins 1')
      } else if (passengers > 10) {
        errors.push('Le nombre de passagers ne peut pas dépasser 10')
      }
    }
    
    // Vérification du type de véhicule
    if (!data.vehicleType) {
      errors.push('Le type de véhicule est obligatoire')
    } else {
      // Vérifier que le type de véhicule est valide
      const validVehicleTypes = ['sedan', 'premium', 'green', 'suv', 'van']
      if (!validVehicleTypes.includes(data.vehicleType)) {
        errors.push('Type de véhicule invalide')
      }
    }
    
    // Vérification des informations client
    if (!data.customerInfo) {
      errors.push('Les informations client sont obligatoires')
    } else {
      if (!data.customerInfo.name) {
        errors.push('Le nom du client est obligatoire')
      }
      
      if (!data.customerInfo.email) {
        errors.push('L\'email du client est obligatoire')
      } else {
        // Vérifier le format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.customerInfo.email)) {
          errors.push('Le format de l\'email est invalide')
        }
      }
      
      if (!data.customerInfo.phone) {
        errors.push('Le téléphone du client est obligatoire')
      }
    }
    
    // Vérification de l'aller-retour
    if (data.roundTrip === true) {
      if (!data.returnDate || !data.returnTime) {
        errors.push('La date et l\'heure de retour sont obligatoires pour un aller-retour')
      } else {
        const returnDateTime = new Date(`${data.returnDate}T${data.returnTime}`)
        const pickupDateTime = new Date(`${data.pickupDate}T${data.pickupTime}`)
        
        if (isNaN(returnDateTime.getTime())) {
          errors.push('Le format de la date et heure de retour est invalide')
        } else if (returnDateTime <= pickupDateTime) {
          errors.push('La date de retour doit être postérieure à la date de départ')
        }
      }
    }
    
    // Vérification de l'estimation de prix
    if (!data.priceEstimate) {
      errors.push('L\'estimation du prix est obligatoire')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }
  
  /**
   * Valide les données d'un formulaire de contact
   * @param {Object} data - Données à valider
   * @returns {Object} - Résultat de validation {valid: boolean, errors: Array}
   */
  export function validateContactRequest(data) {
    const errors = []
    
    // Vérification des champs obligatoires
    if (!data.name || data.name.trim() === '') {
      errors.push('Le nom est obligatoire')
    }
    
    if (!data.email || data.email.trim() === '') {
      errors.push('L\'email est obligatoire')
    } else {
      // Vérifier le format de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        errors.push('Le format de l\'email est invalide')
      }
    }
    
    if (!data.subject || data.subject.trim() === '') {
      errors.push('Le sujet est obligatoire')
    }
    
    if (!data.message || data.message.trim() === '') {
      errors.push('Le message est obligatoire')
    } else if (data.message.length < 10) {
      errors.push('Le message doit contenir au moins 10 caractères')
    }
    
    return {
      valid: errors.length === 0,
      errors
    }
  }
  
  export default {
    validatePriceRequest,
    validateBookingRequest,
    validateContactRequest
  }