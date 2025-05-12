// components/admin/UpcomingBookings.jsx
import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Composant pour afficher la liste des réservations à venir
 * 
 * @param {Object} props
 * @param {Array} props.bookings - Tableau des réservations à afficher
 */
const UpcomingBookings = ({ bookings }) => {
  // Fonction pour déterminer la couleur et l'icône en fonction du statut
  const getStatusInfo = (status) => {
    switch (status) {
      case 'confirmed':
        return { color: 'text-green-500', icon: 'fas fa-check-circle', label: 'Confirmée' };
      case 'pending':
        return { color: 'text-yellow-500', icon: 'fas fa-exclamation-circle', label: 'En attente' };
      case 'cancelled':
        return { color: 'text-red-500', icon: 'fas fa-times-circle', label: 'Annulée' };
      case 'completed':
        return { color: 'text-blue-500', icon: 'fas fa-check-circle', label: 'Terminée' };
      case 'in_progress':
        return { color: 'text-blue-500', icon: 'fas fa-circle', label: 'En cours' };
      default:
        return { color: 'text-gray-500', icon: 'fas fa-circle', label: status };
    }
  };
  
  // Fonction pour formater la date et heure
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Non spécifié';
    
    try {
      const date = new Date(dateString);
      
      // Vérifier si la date est valide
      if (isNaN(date.getTime())) return 'Date invalide';
      
      // Formater la date
      const dateFormatted = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      // Formater l'heure
      const timeFormatted = date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      return `${dateFormatted} ${timeFormatted}`;
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error);
      return 'Erreur de format';
    }
  };
  
  // Fonction pour calculer le temps restant avant la réservation
  const getTimeRemaining = (dateString) => {
    try {
      if (!dateString) return 'Date non spécifiée';
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date invalide';
      
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: fr
      });
    } catch (error) {
      console.error('Erreur lors du calcul du temps restant:', error);
      return 'Temps non calculable';
    }
  };
  
  // Fonction pour tronquer le texte
  const truncate = (text, maxLength = 30) => {
    if (!text) return '';
    if (typeof text !== 'string') return String(text);
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Gérer le cas où il n'y a pas de réservations
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-gray-500">
        <i className="fas fa-calendar-check text-3xl mb-2"></i>
        <p className="text-sm">Aucune réservation à venir</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        if (!booking) return null;
        
        const statusInfo = getStatusInfo(booking.status);
        const bookingId = booking.bookingId || booking._id;
        
        return (
          <div key={bookingId} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-1">
                  <i className={`${statusInfo.icon} ${statusInfo.color} mr-2`}></i>
                  <span className="text-sm font-medium">{bookingId || 'ID manquant'}</span>
                </div>
                <h4 className="font-medium mb-1">
                  {truncate(booking.customerInfo?.name || 'Client non spécifié')}
                </h4>
              </div>
              <Link 
                href={`/admin/bookings/${bookingId}`}
                className="text-primary hover:text-primary-dark"
              >
                <i className="fas fa-eye"></i>
              </Link>
            </div>
            
            <div className="mt-2 space-y-1">
              <div className="text-sm">
                <span className="text-gray-500">De:</span> {truncate(booking.pickupAddress || 'Adresse non spécifiée')}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">À:</span> {truncate(booking.dropoffAddress || 'Adresse non spécifiée')}
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Quand:</span> {formatDateTime(booking.pickupDateTime)}
              </div>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <span className={`text-xs ${statusInfo.color} font-medium`}>
                {statusInfo.label}
              </span>
              <span className="text-xs text-gray-500">
                {getTimeRemaining(booking.pickupDateTime)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingBookings;