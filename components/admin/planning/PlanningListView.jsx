import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faList,
  faMapMarkerAlt,
  faClock,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import BookingStatusBadge from '../BookingStatusBadge';

const PlanningListView = ({ bookings }) => {
  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(a.pickupDateTime) - new Date(b.pickupDateTime)
  );
  
  if (sortedBookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
        <FontAwesomeIcon icon={faList} className="text-4xl mb-3 text-gray-300" />
        <p>Aucune réservation à venir</p>
      </div>
    );
  }
  
  // Format date for display
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Non spécifié';
    
    const date = new Date(dateTimeString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Si c'est aujourd'hui
    if (date.toDateString() === today.toDateString()) {
      return `Aujourd'hui ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Si c'est demain
    if (date.toDateString() === tomorrow.toDateString()) {
      return `Demain ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Sinon format date et heure
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
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
  
  // Grouper par jour
  const groupedByDay = {};
  sortedBookings.forEach(booking => {
    const dateKey = new Date(booking.pickupDateTime).toDateString();
    if (!groupedByDay[dateKey]) {
      groupedByDay[dateKey] = [];
    }
    groupedByDay[dateKey].push(booking);
  });
  
  return (
    <div className="space-y-4">
      {Object.entries(groupedByDay).map(([dateKey, dayBookings]) => {
        const date = new Date(dateKey);
        const isToday = date.toDateString() === new Date().toDateString();
        const isTomorrow = date.toDateString() === new Date(Date.now() + 86400000).toDateString();
        
        let dateLabel = date.toLocaleDateString('fr-FR', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
        });
        
        if (isToday) dateLabel = `Aujourd'hui - ${dateLabel}`;
        if (isTomorrow) dateLabel = `Demain - ${dateLabel}`;
        
        return (
          <div key={dateKey} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className={`p-3 border-b ${isToday ? 'bg-primary-50 border-primary' : 'border-gray-200'}`}>
              <h3 className={`font-semibold ${isToday ? 'text-primary' : 'text-gray-900'}`}>
                {dateLabel}
              </h3>
              <span className="text-sm text-gray-500">
                {dayBookings.length} réservation{dayBookings.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="divide-y divide-gray-200">
              {dayBookings.map((booking) => (
                <div key={getBookingIdForUrl(booking)} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-primary" />
                        <span className="font-medium">
                          {new Date(booking.pickupDateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <BookingStatusBadge status={booking.status} />
                      </div>
                      <h3 className="font-medium text-lg mt-1">
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
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex items-start text-sm">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 mt-1 mr-2" />
                      <div className="space-y-1">
                        <div>{formatAddress(booking.pickupAddress)}</div>
                        <div className="h-4 border-l border-dotted border-gray-300 ml-2"></div>
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-2" />
                          {formatAddress(booking.dropoffAddress)}
                        </div>
                      </div>
                    </div>
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
      })}
    </div>
  );
};

export default PlanningListView;