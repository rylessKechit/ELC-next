"use client";

import VehicleSelector from './VehicleSelector';

const BookingStepTwo = ({ 
  filteredVehicles, 
  selectedVehicle, 
  onSelect, 
  passengers, 
  luggage, 
  goBack, 
  goToNextStep 
}) => {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">Véhicules disponibles pour votre trajet</h4>
        <p className="text-gray-600 text-sm mb-4">
          Sélectionnez un véhicule adapté à vos besoins. Nous n'affichons que les véhicules compatibles avec votre nombre de passagers ({passengers}) et de bagages ({luggage}).
        </p>
        
        {filteredVehicles.length > 0 ? (
          <VehicleSelector 
            vehicles={filteredVehicles}
            selectedVehicle={selectedVehicle}
            onSelect={onSelect}
            passengers={passengers}
            luggage={luggage}
          />
        ) : (
          <div className="p-8 text-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Aucun véhicule disponible pour {passengers} passagers et {luggage} bagages.</p>
            <button 
              type="button" 
              onClick={goBack}
              className="mt-4 py-2 px-4 bg-secondary text-white rounded-full font-medium hover:bg-secondary-dark transition-colors duration-300"
            >
              Modifier mes critères
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button 
          type="button" 
          className="py-3 px-6 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center sm:w-1/3"
          onClick={goBack}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Retour
        </button>
        
        <button 
          type="button" 
          className="py-3 px-6 bg-primary text-white font-medium rounded-full hover:bg-primary-dark hover:text-white transition-colors duration-300 flex items-center justify-center sm:w-2/3"
          onClick={goToNextStep}
          disabled={!selectedVehicle}
        >
          Continuer
          <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

export default BookingStepTwo;