import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faPhone,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

/**
 * Section informations client
 */
const BookingCustomerInfo = ({ booking, onCallClient, onEmailClient }) => {
  // Fonction pour formater le numéro de téléphone
  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    // Format français
    return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        <FontAwesomeIcon icon={faUser} className="mr-2 text-primary" />
        Informations client
      </h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Nom</p>
          <p className="font-medium text-lg">{booking.customerInfo.name}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{booking.customerInfo.email}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Téléphone</p>
          <p className="font-medium">{formatPhoneNumber(booking.customerInfo.phone)}</p>
        </div>
        
        {/* Boutons d'action client */}
        <div className="pt-4 border-t space-y-3">
          <button
            onClick={onCallClient}
            className="w-full btn btn-primary flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            Appeler le client
          </button>
          
          <button
            onClick={onEmailClient}
            className="w-full btn btn-outline flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Envoyer un email
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCustomerInfo;