import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpinner,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

/**
 * États de chargement et d'erreur pour la page de détails
 */

// Composant pour l'état de chargement
export const BookingLoadingState = () => (
  <div className="flex items-center justify-center min-h-96">
    <div className="text-center">
      <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-primary mb-4" />
      <p className="text-gray-600">Chargement des détails de la réservation...</p>
    </div>
  </div>
);

// Composant pour l'état d'erreur
export const BookingErrorState = ({ error }) => (
  <div className="flex items-center justify-center min-h-96">
    <div className="text-center">
      <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Erreur</h2>
      <p className="text-gray-600 mb-4">{error}</p>
      <Link href="/admin/bookings" className="btn btn-primary">
        Retour aux réservations
      </Link>
    </div>
  </div>
);

// Composant pour l'état non trouvé
export const BookingNotFoundState = () => (
  <div className="flex items-center justify-center min-h-96">
    <div className="text-center">
      <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Réservation non trouvée</h2>
      <p className="text-gray-600 mb-4">Aucune réservation n'a été trouvée avec cet identifiant.</p>
      <Link href="/admin/bookings" className="btn btn-primary">
        Retour aux réservations
      </Link>
    </div>
  </div>
);