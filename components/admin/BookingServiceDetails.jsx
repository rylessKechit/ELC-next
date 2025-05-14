import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCar,
  faUsers,
  faSuitcase,
  faEuroSign,
  faPlane,
  faTrain,
  faFileText
} from '@fortawesome/free-solid-svg-icons';

/**
 * Section détails du service
 */
const BookingServiceDetails = ({ booking }) => {
  // Fonction pour formater le prix
  const formatPrice = (price) => {
    if (typeof price === 'object' && price.amount) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: price.currency || 'EUR'
      }).format(price.amount);
    }
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Fonction pour obtenir le nom du véhicule
  const getVehicleTypeName = (type) => {
    const vehicleTypes = {
      'green': 'Green - Tesla Model 3',
      'premium': 'Berline Premium',
      'sedan': 'Berline de Luxe',
      'van': 'Van VIP'
    };
    return vehicleTypes[type] || type;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        <FontAwesomeIcon icon={faCar} className="mr-2 text-primary" />
        Détails du service
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faCar} className="text-2xl text-blue-500 mb-2" />
          <p className="text-sm text-gray-500">Véhicule</p>
          <p className="font-semibold">{getVehicleTypeName(booking.vehicleType)}</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faUsers} className="text-2xl text-green-500 mb-2" />
          <p className="text-sm text-gray-500">Passagers</p>
          <p className="font-semibold">{booking.passengers}</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faSuitcase} className="text-2xl text-orange-500 mb-2" />
          <p className="text-sm text-gray-500">Bagages</p>
          <p className="font-semibold">{booking.luggage}</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <FontAwesomeIcon icon={faEuroSign} className="text-2xl text-green-600 mb-2" />
          <p className="text-sm text-gray-500">Prix</p>
          <p className="font-semibold">{formatPrice(booking.price)}</p>
        </div>
      </div>
      
      {(booking.flightNumber || booking.trainNumber) && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
          {booking.flightNumber && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faPlane} className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Numéro de vol</p>
                <p className="font-medium">{booking.flightNumber}</p>
              </div>
            </div>
          )}
          
          {booking.trainNumber && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faTrain} className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Numéro de train</p>
                <p className="font-medium">{booking.trainNumber}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {booking.specialRequests && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-start space-x-3">
            <FontAwesomeIcon icon={faFileText} className="text-yellow-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Demandes spéciales</p>
              <p className="font-medium">{booking.specialRequests}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingServiceDetails;