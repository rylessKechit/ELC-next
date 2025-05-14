import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';

/**
 * Section notes si disponibles
 */
const BookingNotes = ({ booking }) => {
  // Afficher seulement si il y a des notes
  if (!booking.notes && !booking.adminNotes) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        <FontAwesomeIcon icon={faStickyNote} className="mr-2 text-primary" />
        Notes
      </h2>
      
      {booking.notes && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Notes client</p>
          <p className="text-gray-700 bg-gray-50 p-3 rounded">{booking.notes}</p>
        </div>
      )}
      
      {booking.adminNotes && (
        <div>
          <p className="text-sm text-gray-500 mb-2">Notes administrateur</p>
          <p className="text-gray-700 bg-yellow-50 p-3 rounded">{booking.adminNotes}</p>
        </div>
      )}
    </div>
  );
};

export default BookingNotes;