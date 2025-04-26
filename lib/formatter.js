// lib/formatters.js

/**
 * Formate une date au format YYYY-MM-DD
 * @param {Date} date - Date à formater
 * @returns {string} - Date formatée
 */
export function formatDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return ''
  }
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

/**
 * Formate une heure au format HH:MM
 * @param {Date} date - Date contenant l'heure à formater
 * @returns {string} - Heure formatée
 */
export function formatTime(date) {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return ''
  }
  
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `${hours}:${minutes}`
}

/**
 * Formate un prix en euros
 * @param {number} price - Prix à formater
 * @returns {string} - Prix formaté
 */
export function formatPrice(price) {
  if (typeof price !== 'number') {
    return '0,00 €'
  }
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

/**
 * Formate une distance en kilomètres
 * @param {number} distance - Distance en mètres
 * @returns {string} - Distance formatée
 */
export function formatDistance(distance) {
  if (typeof distance !== 'number') {
    return '0 km'
  }
  
  const km = distance / 1000
  
  if (km < 1) {
    // Moins d'un kilomètre, afficher en mètres
    return `${Math.round(distance)} m`
  } else if (km < 10) {
    // Moins de 10 km, afficher avec une décimale
    return `${km.toFixed(1)} km`
  } else {
    // 10 km ou plus, arrondir au kilomètre
    return `${Math.round(km)} km`
  }
}

/**
 * Formate une durée en minutes
 * @param {number} duration - Durée en secondes
 * @returns {string} - Durée formatée
 */
export function formatDuration(duration) {
  if (typeof duration !== 'number') {
    return '0 min'
  }
  
  const minutes = Math.floor(duration / 60)
  
  if (minutes < 60) {
    // Moins d'une heure, afficher en minutes
    return `${minutes} min`
  } else {
    // Plus d'une heure, afficher en heures et minutes
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    
    if (remainingMinutes === 0) {
      return `${hours} h`
    } else {
      return `${hours} h ${remainingMinutes} min`
    }
  }
}

/**
 * Formate un numéro de téléphone français
 * @param {string} phone - Numéro de téléphone à formater
 * @returns {string} - Numéro formaté
 */
export function formatPhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') {
    return ''
  }
  
  // Supprimer tous les caractères non numériques
  const cleanPhone = phone.replace(/\D/g, '')
  
  // Si le numéro commence par un 0 et a 10 chiffres (format français)
  if (cleanPhone.length === 10 && cleanPhone.startsWith('0')) {
    return cleanPhone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
  }
  
  // Si le numéro commence par 33 (indicatif France) et a 11 chiffres
  if (cleanPhone.length === 11 && cleanPhone.startsWith('33')) {
    return `+${cleanPhone.replace(/(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6')}`
  }
  
  // Si le numéro commence par un + (format international)
  if (phone.startsWith('+')) {
    return phone
  }
  
  // Si aucun format ne correspond, retourner tel quel
  return phone
}

/**
 * Tronque un texte à une longueur maximale et ajoute des points de suspension
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string} - Texte tronqué
 */
export function truncateText(text, maxLength = 100) {
  if (!text || typeof text !== 'string') {
    return ''
  }
  
  if (text.length <= maxLength) {
    return text
  }
  
  return text.substring(0, maxLength) + '...'
}

/**
 * Formate une date au format localisé
 * @param {string} dateStr - Chaîne de date (YYYY-MM-DD)
 * @param {string} timeStr - Chaîne d'heure (HH:MM)
 * @returns {string} - Date formatée en français
 */
export function formatDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) {
    return 'Non spécifié'
  }
  
  try {
    const date = new Date(`${dateStr}T${timeStr}:00`)
    
    if (isNaN(date.getTime())) {
      return 'Date invalide'
    }
    
    return date.toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('Erreur lors du formatage de la date:', error)
    return 'Erreur de format'
  }
}

export default {
  formatDate,
  formatTime,
  formatPrice,
  formatDistance,
  formatDuration,
  formatPhoneNumber,
  truncateText,
  formatDateTime
}