import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRoute,
  faMapMarkerAlt,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

/**
 * Section détails du trajet
 */
const BookingTripDetails = ({ booking }) => {
  // Fonction pour formater la date et heure
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Non spécifié';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        <FontAwesomeIcon icon={faRoute} className="mr-2 text-primary" />
        Détails du trajet
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Adresse de départ</p>
            <p className="font-medium">{booking.pickupAddress}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Adresse d'arrivée</p>
            <p className="font-medium">{booking.dropoffAddress}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Date et heure de départ</p>
              <p className="font-medium">{formatDateTime(booking.pickupDateTime)}</p>
            </div>
          </div>
          
          {booking.roundTrip && booking.returnDateTime && (
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Date et heure de retour</p>
                <p className="font-medium">{formatDateTime(booking.returnDateTime)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingTripDetails;