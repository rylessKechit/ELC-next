import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock,
  faCalendarAlt,
  faPlayCircle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

/**
 * Section historique des dates importantes
 */
const BookingHistory = ({ booking }) => {
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

  // Afficher seulement si il y a des dates importantes à montrer
  if (!booking.startedAt && !booking.completedAt) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        <FontAwesomeIcon icon={faClock} className="mr-2 text-primary" />
        Historique
      </h2>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Créée le</p>
            <p className="font-medium">{formatDateTime(booking.createdAt)}</p>
          </div>
        </div>
        
        {booking.startedAt && (
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faPlayCircle} className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Démarrée le</p>
              <p className="font-medium">{formatDateTime(booking.startedAt)}</p>
            </div>
          </div>
        )}
        
        {booking.completedAt && (
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Terminée le</p>
              <p className="font-medium">{formatDateTime(booking.completedAt)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;