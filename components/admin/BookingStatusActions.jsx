import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle,
  faTimesCircle,
  faPlayCircle,
  faCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

/**
 * Actions de changement de statut
 */
const BookingStatusActions = ({ booking, onStatusChange, statusChanging }) => {
  // Fonction pour obtenir les actions disponibles selon le statut
  const getStatusActions = (currentStatus) => {
    const actions = [];
    
    switch (currentStatus) {
      case 'confirmed':
        actions.push(
          { status: 'in_progress', label: 'Démarrer', icon: faPlayCircle, color: 'text-blue-600' },
          { status: 'cancelled', label: 'Annuler', icon: faTimesCircle, color: 'text-red-600' }
        );
        break;
      case 'in_progress':
        actions.push(
          { status: 'completed', label: 'Terminer', icon: faCheckCircle, color: 'text-green-600' },
          { status: 'cancelled', label: 'Annuler', icon: faTimesCircle, color: 'text-red-600' }
        );
        break;
      case 'completed':
        // Aucune action disponible
        break;
      case 'cancelled':
        actions.push(
          { status: 'confirmed', label: 'Réactiver', icon: faCircle, color: 'text-green-600' }
        );
        break;
    }
    
    return actions;
  };

  const statusActions = getStatusActions(booking.status);

  if (statusActions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions</h2>
      
      <div className="space-y-3">
        {statusActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onStatusChange(action.status)}
            disabled={statusChanging}
            className={`w-full flex items-center justify-center py-2 px-4 rounded-md border transition-colors ${action.color} hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {statusChanging ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
            ) : (
              <FontAwesomeIcon icon={action.icon} className="mr-2" />
            )}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingStatusActions;