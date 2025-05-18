// components/booking/BookingVehicleDetails.jsx - Version simplifiée
import React from 'react';

const BookingVehicleDetails = ({ vehicleType, priceEstimate, availableVehicles }) => {
  // Trouver les informations du véhicule sélectionné
  const vehicle = availableVehicles.find(v => v.id === vehicleType) || {};
  
  // Formater le prix pour l'affichage
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Fonction pour obtenir l'icône du véhicule
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'green':
        return <i className="fas fa-leaf text-green-500 text-xl"></i>;
      case 'premium':
        return <i className="fas fa-car text-primary text-xl"></i>;
      case 'sedan':
        return <i className="fas fa-car-side text-primary text-xl"></i>;
      case 'van':
        return <i className="fas fa-shuttle-van text-primary text-xl"></i>;
      default:
        return <i className="fas fa-car text-gray-500 text-xl"></i>;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="mr-3">
          {getVehicleIcon(vehicleType)}
        </div>
        <div>
          <h3 className="font-bold text-lg">{vehicle.name || 'Véhicule'}</h3>
          <p className="text-sm text-gray-600">{vehicle.desc || 'Description non disponible'}</p>
        </div>
        <div className="ml-auto">
          <span className="text-xl font-semibold text-primary">
            {formatPrice(priceEstimate?.exactPrice || 0)}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center">
          <i className="fas fa-users text-gray-500 mr-2"></i>
          <span>{vehicle.capacity}</span>
        </div>
        <div className="flex items-center">
          <i className="fas fa-suitcase text-gray-500 mr-2"></i>
          <span>{vehicle.luggage}</span>
        </div>
      </div>
      
      {priceEstimate?.minimumFareApplied && (
        <div className="bg-yellow-50 p-3 rounded-md mb-4">
          <div className="flex items-center text-sm text-yellow-700">
            <i className="fas fa-info-circle mr-2"></i>
            <span>Tarif minimum de 20€ appliqué</span>
          </div>
        </div>
      )}
      
      <div className="text-sm text-gray-600">
        <p>Le prix inclut la prise en charge, le service professionnel, et toutes les options de confort.</p>
      </div>
    </div>
  );
};

export default BookingVehicleDetails;