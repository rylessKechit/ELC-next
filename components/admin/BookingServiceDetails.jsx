// components/admin/BookingServiceDetails.jsx
import React from 'react';

const BookingServiceDetails = ({ booking }) => {
  // Définir les types de véhicules et leurs noms
  const vehicleNames = {
    'sedan': 'Berline de Luxe',
    'premium': 'Berline Premium',
    'green': 'Green - Tesla Model 3',
    'suv': 'SUV de Luxe',
    'van': 'Van VIP'
  };

  // Formater le prix pour l'affichage
  const formatPrice = (price) => {
    if (!price) return '0,00 €';
    
    if (typeof price === 'object' && price.amount) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: price.currency || 'EUR'
      }).format(price.amount);
    }
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Fonction pour obtenir l'icône du véhicule
  const getVehicleIcon = (type) => {
    switch (type) {
      case 'green':
        return <i className="fas fa-leaf text-green-500 text-xl"></i>;
      case 'premium':
        return <i className="fas fa-car text-primary text-xl"></i>;
      case 'sedan':
        return <i className="fas fa-car-side text-primary text-xl"></i>;
      case 'van':
        return <i className="fas fa-shuttle-van text-primary text-xl"></i>;
      case 'suv':
        return <i className="fas fa-truck text-primary text-xl"></i>;
      default:
        return <i className="fas fa-car text-gray-500 text-xl"></i>;
    }
  };

  // Si booking est null ou undefined, afficher un message d'attente
  if (!booking) {
    return <div className="bg-gray-100 p-4 rounded-lg">Chargement des détails...</div>;
  }

  // Obtenir le nom du véhicule en fonction du type
  const vehicleName = vehicleNames[booking.vehicleType] || 'Véhicule';
  
  // Obtenir la description du véhicule
  const getVehicleDescription = (type) => {
    switch (type) {
      case 'green':
        return 'Tesla Model 3 - 100% électrique';
      case 'premium':
        return 'Mercedes Classe E ou similaire';
      case 'sedan':
        return 'Mercedes Classe S ou similaire';
      case 'van':
        return 'Mercedes Classe V ou similaire';
      case 'suv':
        return 'SUV de luxe - Range Rover ou similaire';
      default:
        return 'Description non disponible';
    }
  };
  
  // Obtenir la capacité du véhicule
  const getVehicleCapacity = (type) => {
    switch (type) {
      case 'van':
        return 'Jusqu\'à 7 passagers';
      default:
        return 'Jusqu\'à 4 passagers';
    }
  };
  
  // Obtenir la capacité de bagages
  const getVehicleLuggage = (type) => {
    switch (type) {
      case 'van':
        return 'Bagages multiples';
      case 'premium':
        return 'Jusqu\'à 4 bagages';
      default:
        return 'Jusqu\'à 3 bagages';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="mr-3">
          {getVehicleIcon(booking.vehicleType)}
        </div>
        <div>
          <h3 className="font-bold text-lg">{vehicleName}</h3>
          <p className="text-sm text-gray-600">{getVehicleDescription(booking.vehicleType)}</p>
        </div>
        <div className="ml-auto">
          <span className="text-xl font-semibold text-primary">
            {formatPrice(booking.price)}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center">
          <i className="fas fa-users text-gray-500 mr-2"></i>
          <span>{getVehicleCapacity(booking.vehicleType)}</span>
        </div>
        <div className="flex items-center">
          <i className="fas fa-suitcase text-gray-500 mr-2"></i>
          <span>{getVehicleLuggage(booking.vehicleType)}</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-600">
        <p>Le prix inclut la prise en charge, le service professionnel, et toutes les options de confort.</p>
      </div>
    </div>
  );
};

export default BookingServiceDetails;