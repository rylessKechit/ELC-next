"use client";

import RouteMap from './RouteMap';
import { useState } from 'react';

const BookingStepThree = ({
  register,
  formValues,
  errors,
  setValue,
  priceEstimate,
  availableVehicles,
  mapReady,
  goBack,
  setError,
  handleBookingSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price) => {
    if (typeof price !== 'number') {
      return '0,00 €';
    }
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleSubmitBooking = async () => {
    if (!document.getElementById('terms').checked) {
      setError('Veuillez accepter les conditions générales pour continuer');
      return;
    }

    if (!formValues.vehicleType) {
      setError('Veuillez sélectionner un véhicule');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const bookingData = {
        pickupAddress: formValues.pickupAddress,
        dropoffAddress: formValues.dropoffAddress,
        pickupDate: formValues.pickupDate,
        pickupTime: formValues.pickupTime,
        passengers: formValues.passengers,
        luggage: formValues.luggage,
        vehicleType: formValues.vehicleType,
        roundTrip: formValues.roundTrip,
        returnDate: formValues.returnDate,
        returnTime: formValues.returnTime,
        flightNumber: formValues.flightNumber,
        trainNumber: formValues.trainNumber,
        specialRequests: formValues.specialRequests,
        customerInfo: formValues.customerInfo,
        priceEstimate: priceEstimate
      };
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.booking) {
          setIsSubmitting(false);
          
          setTimeout(() => {
            handleBookingSuccess(result.booking);
          }, 100);
          
          return;
        } else {
          console.error('❌ Structure de réponse invalide:', result);
          setError(result.message || result.error || "Erreur lors de la confirmation de la réservation.");
        }
      } else {
        const errorData = await response.json();
        console.error('❌ Erreur HTTP:', response.status, errorData);
        setError(errorData.error || "Erreur lors de la confirmation de la réservation.");
      }
    } catch (error) {
      console.error('❌ Erreur de requête:', error);
      setError("Une erreur est survenue lors de la communication avec le serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <h3 className="text-xl font-medium text-gray-800 text-center mb-6">Vos informations</h3>
      
      <div className="mb-6">
        <input
          type="hidden"
          {...register('vehicleType', { required: 'Le type de véhicule est obligatoire' })}
          value={formValues.vehicleType || ''}
        />
        
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
          Nom complet <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="customerName"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          {...register('customerInfo.name', { required: 'Ce champ est requis' })}
          placeholder="Entrez votre nom complet"
        />
        {errors.customerInfo?.name && <p className="mt-1 text-sm text-red-600">{errors.customerInfo.name.message}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="customerEmail"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            {...register('customerInfo.email', { 
              required: 'Ce champ est requis',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Adresse email invalide'
              } 
            })}
            placeholder="Entrez votre adresse email"
          />
          {errors.customerInfo?.email && <p className="mt-1 text-sm text-red-600">{errors.customerInfo.email.message}</p>}
        </div>
        
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="customerPhone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            {...register('customerInfo.phone', { required: 'Ce champ est requis' })}
            placeholder="Entrez votre numéro de téléphone"
          />
          {errors.customerInfo?.phone && <p className="mt-1 text-sm text-red-600">{errors.customerInfo.phone.message}</p>}
        </div>
      </div>
      
      {/* Route Map - RESTAURÉE */}
      {formValues.pickupAddress && formValues.dropoffAddress && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Itinéraire</h4>
          <RouteMap 
            pickupAddress={formValues.pickupAddress}
            dropoffAddress={formValues.dropoffAddress}
            pickupPlaceId={formValues.pickupAddressPlaceId}
            dropoffPlaceId={formValues.dropoffAddressPlaceId}
          />
        </div>
      )}
      
      {/* Résumé de réservation complet */}
      <div className="bg-gray-50 rounded-lg p-6 mt-8 mb-6">
        <h4 className="text-lg font-medium text-center text-gray-800 mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-0.5 after:bg-primary">
          Résumé de votre réservation
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1">
            <span className="text-sm text-gray-500">Départ:</span>
            <span className="block font-medium">{formValues.pickupAddress}</span>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm text-gray-500">Arrivée:</span>
            <span className="block font-medium">{formValues.dropoffAddress}</span>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm text-gray-500">Date et heure:</span>
            <span className="block font-medium">
              {new Date(`${formValues.pickupDate}T${formValues.pickupTime}`).toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          
          {formValues.roundTrip && (
            <div className="space-y-1">
              <span className="text-sm text-gray-500">Retour:</span>
              <span className="block font-medium">
                {new Date(`${formValues.returnDate}T${formValues.returnTime}`).toLocaleString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
          
          <div className="space-y-1">
            <span className="text-sm text-gray-500">Véhicule:</span>
            <span className="block font-medium">
              {availableVehicles.find(v => v.id === formValues.vehicleType)?.name || 'Non sélectionné'}
            </span>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm text-gray-500">Passagers:</span>
            <span className="block font-medium">{formValues.passengers}</span>
          </div>
          
          <div className="space-y-1">
            <span className="text-sm text-gray-500">Bagages:</span>
            <span className="block font-medium">{formValues.luggage}</span>
          </div>
          
          {formValues.flightNumber && (
            <div className="space-y-1">
              <span className="text-sm text-gray-500">N° de vol:</span>
              <span className="block font-medium">{formValues.flightNumber}</span>
            </div>
          )}
          
          {formValues.trainNumber && (
            <div className="space-y-1">
              <span className="text-sm text-gray-500">N° de train:</span>
              <span className="block font-medium">{formValues.trainNumber}</span>
            </div>
          )}
          
          <div className="space-y-1 col-span-full flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
            <span className="text-sm font-semibold text-gray-700">Prix total:</span>
            <span className="text-xl font-bold text-primary">
              {formatPrice(priceEstimate?.exactPrice || 0)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Conditions de réservation */}
      <div className="p-6 bg-gray-50 rounded-lg mb-6">
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
          onClick={goBack}
          disabled={isSubmitting}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Retour
        </button>
        
        <button 
          type="button" 
          className={`py-3 px-6 font-medium rounded-full transition-colors duration-300 flex items-center justify-center sm:w-2/3 ${
            isSubmitting 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
          onClick={handleSubmitBooking}
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
  );
};

export default BookingStepThree;