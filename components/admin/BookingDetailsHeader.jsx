import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import BookingStatusBadge from '@/components/admin/BookingStatusBadge';

/**
 * En-tête de la page de détails de réservation
 */
const BookingDetailsHeader = ({ booking, onNotesClick }) => {
  // Fonction pour formater la date de création
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
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link 
          href="/admin/bookings" 
          className="text-gray-600 hover:text-primary transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Réservation #{booking.bookingId}
          </h1>
          <p className="text-gray-600 text-sm">
            Créée le {formatDateTime(booking.createdAt)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <BookingStatusBadge status={booking.status} />
        <button
          onClick={onNotesClick}
          className="btn btn-outline flex items-center"
        >
          <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
          Notes
        </button>
      </div>
    </div>
  );
};

export default BookingDetailsHeader;