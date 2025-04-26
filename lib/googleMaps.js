// lib/googleMaps.js

/**
 * Génère un jeton de session pour l'autocomplétion Google Maps
 * @returns {string} - Jeton de session
 */
export function generateSessionToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  /**
   * Calcule la distance entre deux points géographiques
   * @param {Object} point1 - Point 1 avec lat et lng
   * @param {Object} point2 - Point 2 avec lat et lng
   * @returns {number} - Distance en mètres
   */
  export function calculateDistance(point1, point2) {
    if (!point1 || !point2 || !point1.lat || !point1.lng || !point2.lat || !point2.lng) {
      return 0
    }
    
    // Rayon de la Terre en mètres
    const earthRadius = 6371000
    
    // Convertir les degrés en radians
    const lat1 = toRadians(point1.lat)
    const lng1 = toRadians(point1.lng)
    const lat2 = toRadians(point2.lat)
    const lng2 = toRadians(point2.lng)
    
    // Formule de Haversine
    const dLat = lat2 - lat1
    const dLng = lng2 - lng1
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    
    // Distance en mètres
    return earthRadius * c
  }
  
  /**
   * Convertit les degrés en radians
   * @param {number} degrees - Angle en degrés
   * @returns {number} - Angle en radians
   */
  function toRadians(degrees) {
    return degrees * (Math.PI / 180)
  }
  
  /**
   * Estime le temps de trajet en fonction de la distance
   * @param {number} distanceInMeters - Distance en mètres
   * @param {string} travelMode - Mode de transport (driving, walking, etc.)
   * @returns {number} - Temps estimé en secondes
   */
  export function estimateTravelTime(distanceInMeters, travelMode = 'driving') {
    if (!distanceInMeters || distanceInMeters <= 0) {
      return 0
    }
    
    // Vitesses moyennes en m/s
    const speeds = {
      driving: 13.9, // 50 km/h
      walking: 1.4,  // 5 km/h
      bicycling: 4.2, // 15 km/h
      transit: 8.3    // 30 km/h
    }
    
    const speed = speeds[travelMode] || speeds.driving
    
    // Temps de base en secondes
    let time = distanceInMeters / speed
    
    // Ajout d'un facteur pour les arrêts, feux rouges, etc.
    if (travelMode === 'driving') {
      // Plus la distance est grande, moins on est impacté par les arrêts
      const stopFactor = Math.min(1.3, 1 + (2000 / distanceInMeters))
      time *= stopFactor
      
      // Ajouter du temps pour la circulation en zone urbaine
      // (plus d'impact sur les courtes distances)
      if (distanceInMeters < 10000) {
        time *= 1.2
      }
    }
    
    // Arrondir au nombre entier
    return Math.round(time)
  }
  
  /**
   * Vérifie si une adresse semble être un aéroport
   * @param {string} address - Adresse à vérifier
   * @returns {boolean} - Vrai si l'adresse semble être un aéroport
   */
  export function isAirportAddress(address) {
    if (!address || typeof address !== 'string') {
      return false
    }
    
    const addressLower = address.toLowerCase()
    
    // Mots-clés pour détecter un aéroport
    const airportKeywords = [
      'aéroport', 'airport', 'aeroport',
      'cdg', 'charles de gaulle',
      'orly', 'orly sud', 'orly ouest',
      'beauvais', 'roissy',
      'terminal', 'aérogare', 'aerogare'
    ]
    
    return airportKeywords.some(keyword => addressLower.includes(keyword))
  }
  
  /**
   * Vérifie si une adresse semble être une gare
   * @param {string} address - Adresse à vérifier
   * @returns {boolean} - Vrai si l'adresse semble être une gare
   */
  export function isTrainStationAddress(address) {
    if (!address || typeof address !== 'string') {
      return false
    }
    
    const addressLower = address.toLowerCase()
    
    // Mots-clés pour détecter une gare
    const stationKeywords = [
      'gare', 'station', 'sncf', 'tgv', 'train',
      'montparnasse', 'lyon', 'saint-lazare', 'nord', 'est',
      'austerlitz', 'bercy'
    ]
    
    return stationKeywords.some(keyword => addressLower.includes(keyword))
  }
  
  /**
   * Vérifie si une adresse est dans la zone de service (Essonne - 91)
   * @param {string} address - Adresse à vérifier
   * @returns {boolean} - Vrai si l'adresse est dans la zone de service
   */
  export function isInServiceArea(address) {
    if (!address || typeof address !== 'string') {
      return true // Par défaut, on accepte l'adresse
    }
    
    const addressLower = address.toLowerCase()
    
    // Vérifier si l'adresse contient "91" ou "essonne"
    if (addressLower.includes('91') || addressLower.includes('essonne')) {
      return true
    }
    
    // Liste des communes principales de l'Essonne
    const essonneCommunes = [
      'évry', 'evry', 'courcouronnes', 'massy', 'palaiseau', 'savigny', 
      'athis-mons', 'viry', 'sainte-geneviève-des-bois', 'corbeil', 'draveil',
      'grigny', 'brunoy', 'vigneux', 'montgeron', 'ris-orangis', 'yerres',
      'bretigny', 'epinay', 'longjumeau'
    ]
    
    return essonneCommunes.some(commune => addressLower.includes(commune))
  }
  
  /**
   * Estime le prix d'un trajet en fonction de la distance et de la durée
   * (estimation simplifiée, le calcul réel est fait côté serveur)
   * @param {number} distanceInMeters - Distance en mètres
   * @param {number} durationInSeconds - Durée en secondes
   * @param {string} vehicleType - Type de véhicule
   * @returns {number} - Prix estimé en euros
   */
  export function estimatePrice(distanceInMeters, durationInSeconds, vehicleType = 'sedan') {
    if (!distanceInMeters || !durationInSeconds) {
      return 0
    }
    
    // Tarifs de base par type de véhicule
    const baseFares = {
      'sedan': 30,
      'premium': 50,
      'green': 40,
      'suv': 45,
      'van': 60
    }
    
    // Tarif au kilomètre
    const kmRates = {
      'sedan': 1.5,
      'premium': 2.2,
      'green': 1.8,
      'suv': 2.0,
      'van': 2.5
    }
    
    // Tarif à la minute
    const minuteRates = {
      'sedan': 0.5,
      'premium': 0.7,
      'green': 0.6,
      'suv': 0.65,
      'van': 0.8
    }
    
    // Récupérer les tarifs pour le type de véhicule
    const baseFare = baseFares[vehicleType] || baseFares.sedan
    const kmRate = kmRates[vehicleType] || kmRates.sedan
    const minuteRate = minuteRates[vehicleType] || minuteRates.sedan
    
    // Calculer le prix
    const distanceInKm = distanceInMeters / 1000
    const durationInMinutes = durationInSeconds / 60
    
    const distanceCharge = distanceInKm * kmRate
    const timeCharge = durationInMinutes * minuteRate
    
    // Prix total
    const total = baseFare + distanceCharge + timeCharge
    
    // Arrondir à l'euro supérieur
    return Math.ceil(total)
  }
  
  export default {
    generateSessionToken,
    calculateDistance,
    estimateTravelTime,
    isAirportAddress,
    isTrainStationAddress,
    isInServiceArea,
    estimatePrice
  }