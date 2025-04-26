// components/booking/BookingConfirmation.jsx
"use client"

import { useState } from 'react'
import { api } from '@/lib/api'

const BookingConfirmation = ({ bookingData, priceEstimate, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Formater le prix pour l'affichage
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  // Formater la date
  const formatDate = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return 'Non spécifié'
    
    const date = new Date(`${dateStr}T${timeStr}`)
    return date.toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Confirmer la réservation
  const confirmBooking = async () => {
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await api.post('/api/booking', {
        ...bookingData,
        priceEstimate
      })
      
      if (response.data && response.data.success) {
        onSuccess(response.data.booking)
      } else {
        setError(response.data?.error || "Erreur lors de la confirmation de la réservation.")
      }
    } catch (err) {
      console.error('Erreur lors de la confirmation de la réservation:', err)
      
      if (err.response) {
        setError(`Erreur ${err.response.status}: ${err.response.data.error || 'Erreur serveur'}`)
      } else if (err.request) {
        setError('Pas de réponse du serveur. Veuillez réessayer plus tard.')
      } else {
        setError(`Erreur: ${err.message}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Récupérer le nom du véhicule sélectionné
  const getVehicleName = () => {
    const vehicleTypes = {
      'sedan': 'Berline de Luxe',
      'premium': 'Berline Premium',
      'green': 'Green - Tesla Model 3',
      'suv': 'SUV de Luxe',
      'van': 'Van VIP'
    }
    
    return vehicleTypes[bookingData.vehicleType] || 'Véhicule non spécifié'
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-800 text-center mb-6">Confirmation de votre réservation</h3>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-red-500"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-medium text-center text-gray-800 mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-0.5 after:bg-primary">
          Récapitulatif de votre réservation
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Date et heure :</span>
            <span className="font-medium">{formatDate(bookingData.pickupDate, bookingData.pickupTime)}</span>
          </div>
          
          {bookingData.roundTrip && (
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-500">Retour :</span>
              <span className="font-medium">{formatDate(bookingData.returnDate, bookingData.returnTime)}</span>
            </div>
          )}
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Départ :</span>
            <span className="font-medium">{bookingData.pickupAddress}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Destination :</span>
            <span className="font-medium">{bookingData.dropoffAddress}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Véhicule :</span>
            <span className="font-medium">{getVehicleName()}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Passagers :</span>
            <span className="font-medium">{bookingData.passengers}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Bagages :</span>
            <span className="font-medium">{bookingData.luggage}</span>
          </div>
          
          {bookingData.flightNumber && (
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-500">N° de vol :</span>
              <span className="font-medium">{bookingData.flightNumber}</span>
            </div>
          )}
          
          {bookingData.trainNumber && (
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-500">N° de train :</span>
              <span className="font-medium">{bookingData.trainNumber}</span>
            </div>
          )}
          
          {bookingData.specialRequests && (
            <div className="flex justify-between pb-3 border-b border-gray-200">
              <span className="text-gray-500">Demandes spéciales :</span>
              <span className="font-medium">{bookingData.specialRequests}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
          <span className="text-lg font-medium text-gray-700">Prix total :</span>
          <span className="text-2xl font-bold text-primary">{formatPrice(priceEstimate?.exactPrice || 0)}</span>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-medium text-center text-gray-800 mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-0.5 after:bg-primary">
          Informations client
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Nom :</span>
            <span className="font-medium">{bookingData.customerInfo.name}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Email :</span>
            <span className="font-medium">{bookingData.customerInfo.email}</span>
          </div>
          
          <div className="flex justify-between pb-3 border-b border-gray-200">
            <span className="text-gray-500">Téléphone :</span>
            <span className="font-medium">{bookingData.customerInfo.phone}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Conditions de réservation :</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600 mb-4">
          <li>Aucun prépaiement n'est nécessaire. Le paiement s'effectuera auprès du chauffeur.</li>
          <li>Annulation gratuite jusqu'à 24h avant le départ.</li>
          <li>Un mail de confirmation vous sera envoyé après validation de la réservation.</li>
          <li>Nous vous contacterons 2h avant l'heure prévue pour confirmer l'arrivée du chauffeur.</li>
        </ul>
        
        <div className="flex items-center mb-6">
          <input 
            id="terms" 
            type="checkbox" 
            className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-700">
            J'accepte les <a href="/legals" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">conditions générales</a> d'Elysian Luxury Chauffeurs
          </label>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button 
          type="button" 
          className="py-3 px-6 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center sm:w-1/3"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Modifier
        </button>
        
        <button 
          type="button" 
          className="py-3 px-6 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center sm:w-2/3"
          onClick={confirmBooking}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Confirmation en cours...
            </>
          ) : (
            <>
              Confirmer la réservation
              <i className="fas fa-check ml-2"></i>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default BookingConfirmation