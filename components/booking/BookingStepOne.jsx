// Exemple de mise à jour dans BookingStepOne.jsx
"use client";

import AddressInput from './AddressInput';
import DateTimePicker from './DateTimePicker';

const BookingStepOne = ({ 
  register, 
  formValues, 
  setValue, 
  errors, 
  isAirport, 
  isTrainStation,
  roundTrip,
  isCalculating,
  handleAddressSelect
}) => {
  // Amélioration: Fonction individuelle pour chaque champ d'adresse
  const handlePickupAddressChange = (value) => {
    console.log("Changement adresse départ:", value);
    setValue('pickupAddress', value);
  };

  const handleDropoffAddressChange = (value) => {
    console.log("Changement adresse arrivée:", value);
    setValue('dropoffAddress', value);
  };

  const handlePickupAddressSelect = (address, placeId) => {
    console.log("Sélection adresse départ:", address, placeId);
    handleAddressSelect('pickupAddress', address, placeId);
  };

  const handleDropoffAddressSelect = (address, placeId) => {
    console.log("Sélection adresse arrivée:", address, placeId);
    handleAddressSelect('dropoffAddress', address, placeId);
  };

  return (
    <div className="p-6 md:p-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 mb-2">
            Adresse de départ <span className="text-red-500">*</span>
          </label>
          <AddressInput
            id="pickupAddress"
            value={formValues.pickupAddress}
            onChange={handlePickupAddressChange}
            onSelect={handlePickupAddressSelect}
            placeholder="Entrez l'adresse de départ"
          />
          {errors.pickupAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.pickupAddress.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="dropoffAddress" className="block text-sm font-medium text-gray-700 mb-2">
            Adresse d'arrivée <span className="text-red-500">*</span>
          </label>
          <AddressInput
            id="dropoffAddress"
            value={formValues.dropoffAddress}
            onChange={handleDropoffAddressChange}
            onSelect={handleDropoffAddressSelect}
            placeholder="Entrez l'adresse d'arrivée"
          />
          {errors.dropoffAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.dropoffAddress.message}</p>
          )}
        </div>
        
        {/* Flight number field */}
        {isAirport && (
          <div>
            <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de vol
            </label>
            <input
              id="flightNumber"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Ex: AF1234"
              {...register('flightNumber')}
            />
            <p className="mt-1 text-xs text-gray-500">
              Ce numéro nous permettra de suivre votre vol et d'ajuster notre service en cas de retard
            </p>
          </div>
        )}
        
        {/* Train number field */}
        {isTrainStation && (
          <div>
            <label htmlFor="trainNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Numéro de train
            </label>
            <input
              id="trainNumber"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Ex: TGV6214"
              {...register('trainNumber')}
            />
            <p className="mt-1 text-xs text-gray-500">
              Ce numéro nous permettra de suivre votre train et d'ajuster notre service en cas de retard
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-2">
              Date et heure de départ <span className="text-red-500">*</span>
            </label>
            <DateTimePicker
              dateId="pickupDate"
              timeId="pickupTime"
              dateValue={formValues.pickupDate}
              timeValue={formValues.pickupTime}
              onDateChange={(val) => setValue('pickupDate', val)}
              onTimeChange={(val) => setValue('pickupTime', val)}
            />
          </div>
          
          <div>
            <div className="flex items-center h-10 mb-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formValues.roundTrip}
                  onChange={(e) => setValue('roundTrip', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <span className="ms-3 text-sm font-medium text-gray-700">Aller-retour</span>
              </label>
            </div>
            
            {roundTrip && (
              <div className="bg-gray-50 p-4 rounded-md border-l-4 border-primary">
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Date et heure de retour <span className="text-red-500">*</span>
                </label>
                <DateTimePicker
                  dateId="returnDate"
                  timeId="returnTime"
                  dateValue={formValues.returnDate}
                  timeValue={formValues.returnTime}
                  onDateChange={(val) => setValue('returnDate', val)}
                  onTimeChange={(val) => setValue('returnTime', val)}
                  minDate={formValues.pickupDate}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de passagers <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button 
                type="button" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => {
                  const current = parseInt(formValues.passengers);
                  if (current > 1) setValue('passengers', current - 1);
                }}
                aria-label="Diminuer le nombre de passagers"
              >
                <i className="fas fa-minus text-xs"></i>
              </button>
              <span className="flex-1 text-center font-medium">{formValues.passengers}</span>
              <button 
                type="button" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => {
                  const current = parseInt(formValues.passengers);
                  if (current < 7) setValue('passengers', current + 1);
                }}
                aria-label="Augmenter le nombre de passagers"
              >
                <i className="fas fa-plus text-xs"></i>
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Maximum 7 passagers
            </p>
          </div>
          
          <div>
            <label htmlFor="luggage" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de bagages <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button 
                type="button" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => {
                  const current = parseInt(formValues.luggage);
                  if (current > 0) setValue('luggage', current - 1);
                }}
                aria-label="Diminuer le nombre de bagages"
              >
                <i className="fas fa-minus text-xs"></i>
              </button>
              <span className="flex-1 text-center font-medium">{formValues.luggage}</span>
              <button 
                type="button" 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-50 transition-colors duration-150"
                onClick={() => {
                  const current = parseInt(formValues.luggage);
                  setValue('luggage', current + 1);
                }}
                aria-label="Augmenter le nombre de bagages"
              >
                <i className="fas fa-plus text-xs"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
            Demandes spéciales
          </label>
          <textarea
            id="specialRequests"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            rows="3"
            placeholder="Indiquez-nous toute demande particulière pour votre trajet"
            {...register('specialRequests')}
          ></textarea>
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full py-3 px-6 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center mt-6"
        disabled={isCalculating}
      >
        {isCalculating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Recherche des véhicules disponibles...
          </>
        ) : 'Rechercher des véhicules'}
      </button>
    </div>
  );
};

export default BookingStepOne;