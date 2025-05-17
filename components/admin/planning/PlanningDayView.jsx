import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDay,
  faClock,
  faMapMarkerAlt,
  faUser,
  faPhone,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import BookingStatusBadge from '../BookingStatusBadge';

const PlanningDayView = ({ bookings, currentDate, groupBookingsByDay }) => {
  const dayBookings = groupBookingsByDay(bookings, currentDate);

  // Format address for display
  const formatAddress = (address, maxLength = 35) => {
    if (!address) return '';
    if (address.length <= maxLength) return address;
    return address.substring(0, maxLength) + '...';
  };

  // Get booking ID for URL
  const getBookingIdForUrl = (booking) => {
    return booking.bookingId || booking._id;
  };

  if (dayBookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
        <FontAwesomeIcon icon={faCalendarDay} className="text-4xl mb-3 text-gray-300" />
        <p>Aucune réservation aujourd'hui</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="divide-y divide-gray-200">
        {dayBookings.map((booking) => (
          <div key={booking._id || booking.bookingId} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="text-primary" />
                  <span className="font-semibold">
                    {new Date(booking.pickupDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <BookingStatusBadge status={booking.status} />
                </div>
                <h3 className="font-semibold text-lg mt-1">
                  {booking.customerInfo?.name}
                </h3>
              </div>
              <Link 
                href={`/admin/bookings/${getBookingIdForUrl(booking)}`}
                className="p-2 text-primary hover:bg-primary-50 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 font-medium">De:</p>
                  <p className="text-sm">{formatAddress(booking.pickupAddress)}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 font-medium">À:</p>
                  <p className="text-sm">{formatAddress(booking.dropoffAddress)}</p>
                </div>
              </div>
              
              {booking.customerInfo?.phone && (
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faPhone} className="text-blue-500 flex-shrink-0" />
                  <a 
                    href={`tel:${booking.customerInfo.phone}`} 
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {booking.customerInfo.phone}
                  </a>
                </div>
              )}
            </div>
            
            {/* Bouton voir détails sur mobile */}
            <div className="mt-3 pt-3 border-t border-gray-100 lg:hidden">
              <Link 
                href={`/admin/bookings/${getBookingIdForUrl(booking)}`}
                className="w-full flex items-center justify-center py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary-50 transition-colors"
              >
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanningDayView;