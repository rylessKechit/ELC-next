"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AddressInput from './AddressInput';
import DateTimePicker from './DateTimePicker';
import VehicleSelector from './VehicleSelector';
import BookingSuccess from './BookingSuccess';
import BookingConfirmation from './BookingConfirmation';
import RouteMap from './RouteMap';
import { api } from '@/lib/api';

const BookingForm = () => {
  // États pour les étapes du formulaire
  const [currentStep, setCurrentStep] = useState(1);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [mapReady, setMapReady] = useState(false)
  // États pour les champs conditionnels
  const [isAirport, setIsAirport] = useState(false);
  const [isTrainStation, setIsTrainStation] = useState(false);

  // Utilisation de react-hook-form pour la gestion du formulaire
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      pickupAddress: '',
      dropoffAddress: '',
      pickupDate: '',
      pickupTime: '',
      passengers: 2,
      luggage: 1,
      roundTrip: false,
      returnDate: '',
      returnTime: '',
      pickupAddressPlaceId: '',
      dropoffAddressPlaceId: '',
      flightNumber: '',
      trainNumber: '',
      specialRequests: '',
      customerInfo: {
        name: '',
        email: '',
        phone: ''
      }
    }
  });

  const formValues = watch();
  const roundTrip = watch('roundTrip');

  // Initialiser les champs de date et heure
  useEffect(() => {
    // Date de demain
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = formatDate(tomorrow);
    
    // Heure actuelle + 2 heures
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours() + 2);
    const formattedTime = formatTime(defaultTime);
    
    setValue('pickupDate', formattedDate);
    setValue('pickupTime', formattedTime);
  }, [setValue]);

  // Vérifier si l'adresse contient un aéroport ou une gare
  useEffect(() => {
    const checkAddressType = (address) => {
      if (!address) return;
      
      const airportKeywords = ['aéroport', 'airport', 'cdg', 'orly', 'beauvais', 'roissy'];
      const trainKeywords = ['gare', 'station', 'sncf', 'tgv', 'train'];
      
      const lowerCaseAddress = address.toLowerCase();
      
      setIsAirport(airportKeywords.some(keyword => lowerCaseAddress.includes(keyword)));
      setIsTrainStation(trainKeywords.some(keyword => lowerCaseAddress.includes(keyword)));
    };
    
    checkAddressType(formValues.pickupAddress);
    checkAddressType(formValues.dropoffAddress);
  }, [formValues.pickupAddress, formValues.dropoffAddress]);

  // When round trip is toggled
  useEffect(() => {
    if (roundTrip && !formValues.returnDate) {
      // Default return date is pickup date + 3 days
      const returnDate = new Date(formValues.pickupDate);
      returnDate.setDate(returnDate.getDate() + 3);
      
      setValue('returnDate', formatDate(returnDate));
      setValue('returnTime', formValues.pickupTime);
    }
  }, [roundTrip, formValues.pickupDate, formValues.pickupTime, formValues.returnDate, setValue]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // Gestion des adresses et places IDs
  const handleAddressSelect = (name, address, placeId) => {
    setValue(name, address);
    setValue(`${name}PlaceId`, placeId);
    setPriceEstimate(null);
    setAvailableVehicles([]);
  };

  // Gestion des véhicules
  const handleVehicleSelect = (vehicleType, priceInfo) => {
    setValue('vehicleType', vehicleType);
    setPriceEstimate(priceInfo);
    
    // Réinitialiser l'état de la carte pour qu'elle se charge correctement
    // après la sélection du véhicule
    setMapReady(false);
    
    // Retarder légèrement l'activation de la carte pour permettre au DOM de se mettre à jour
    setTimeout(() => {
      setMapReady(true);
    }, 500);
  };
  
  // Calcul du prix
  const calculatePrice = async () => {
    // Validation du formulaire
    if (!formValues.pickupAddress || !formValues.dropoffAddress || !formValues.pickupDate || !formValues.pickupTime) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (!formValues.pickupAddressPlaceId || !formValues.dropoffAddressPlaceId) {
      setError('Veuillez sélectionner des adresses valides dans les suggestions');
      return;
    }
    
    setError('');
    setIsCalculating(true);
    
    try {
      // Dans un environnement de développement, simuler une réponse
      if (process.env.NODE_ENV === 'development') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simuler les différentes options de véhicules disponibles avec les prix
        const basePrice = Math.floor(Math.random() * 50) + 70; // Entre 70 et 120€
        
        const estimate = {
          exactPrice: basePrice,
          minPrice: Math.floor(basePrice * 0.9),
          maxPrice: Math.ceil(basePrice * 1.1),
          currency: 'EUR',
          breakdown: {
            baseFare: 30,
            distanceCharge: basePrice - 50,
            timeCharge: 20,
            luggageCharge: formValues.luggage > 2 ? (formValues.luggage - 2) * 5 : 0,
            isPeakHour: false,
            isAdvanceBooking: true,
            roundTrip: formValues.roundTrip
          },
          details: {
            distanceInKm: 25,
            durationInMinutes: 40,
            formattedDistance: "25 km",
            formattedDuration: "40 min"
          }
        };
        
        const vehicleOptions = [
          {
            id: 'sedan',
            name: 'Berline de Luxe',
            desc: 'Mercedes Classe E ou similaire',
            capacity: 'Jusqu\'à 3 passagers',
            price: estimate.exactPrice,
            estimate: estimate
          },
          {
            id: 'green',
            name: 'Green - Tesla Model 3',
            desc: 'Véhicule 100% électrique, écologique et luxueux',
            capacity: 'Jusqu\'à 4 passagers',
            price: estimate.exactPrice * 1.1, // 10% plus cher
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 1.1,
              minPrice: estimate.minPrice * 1.1,
              maxPrice: estimate.maxPrice * 1.1,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 1.1,
                distanceCharge: estimate.breakdown.distanceCharge * 1.1,
                timeCharge: estimate.breakdown.timeCharge * 1.1,
                greenSupplement: estimate.exactPrice * 0.1
              }
            }
          },
          {
            id: 'premium',
            name: 'Berline Premium',
            desc: 'Mercedes Classe S ou similaire',
            capacity: 'Jusqu\'à 3 passagers',
            price: estimate.exactPrice * 1.3, // 30% plus cher
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 1.3,
              minPrice: estimate.minPrice * 1.3,
              maxPrice: estimate.maxPrice * 1.3,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 1.3,
                distanceCharge: estimate.breakdown.distanceCharge * 1.3,
                timeCharge: estimate.breakdown.timeCharge * 1.3,
                premiumSupplement: estimate.exactPrice * 0.3
              }
            }
          },
          {
            id: 'suv',
            name: 'SUV de Luxe',
            desc: 'BMW X5 ou similaire',
            capacity: 'Jusqu\'à 5 passagers',
            price: estimate.exactPrice * 1.5, // 50% plus cher
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 1.5,
              minPrice: estimate.minPrice * 1.5,
              maxPrice: estimate.maxPrice * 1.5,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 1.5,
                distanceCharge: estimate.breakdown.distanceCharge * 1.5,
                timeCharge: estimate.breakdown.timeCharge * 1.5,
                suvSupplement: estimate.exactPrice * 0.5
              }
            }
          },
          {
            id: 'van',
            name: 'Van VIP',
            desc: 'Mercedes Classe V ou similaire',
            capacity: 'Jusqu\'à 7 passagers',
            price: estimate.exactPrice * 1.8, // 80% plus cher
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 1.8,
              minPrice: estimate.minPrice * 1.8,
              maxPrice: estimate.maxPrice * 1.8,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 1.8,
                distanceCharge: estimate.breakdown.distanceCharge * 1.8,
                timeCharge: estimate.breakdown.timeCharge * 1.8,
                vanSupplement: estimate.exactPrice * 0.8
              }
            }
          }
        ];
        
        setAvailableVehicles(vehicleOptions);
        setCurrentStep(2); // Avancer à l'étape 2 (sélection du véhicule)
        return;
      }
      
      // Requête API pour le calcul du prix
      const response = await api.post('/api/price/estimate', {
        pickupPlaceId: formValues.pickupAddressPlaceId,
        dropoffPlaceId: formValues.dropoffAddressPlaceId,
        pickupDateTime: `${formValues.pickupDate}T${formValues.pickupTime}`,
        passengers: parseInt(formValues.passengers),
        luggage: parseInt(formValues.luggage),
        roundTrip: formValues.roundTrip,
        returnDateTime: formValues.roundTrip && formValues.returnDate ? `${formValues.returnDate}T${formValues.returnTime}` : null
      });
      
      if (response.data && response.data.success) {
        // Convertir en options de véhicules avec les prix
        const estimate = response.data.data.estimate;
        
        const vehicleOptions = [
          {
            id: 'sedan',
            name: 'Berline de Luxe',
            desc: 'Mercedes Classe E ou similaire',
            capacity: 'Jusqu\'à 3 passagers',
            price: estimate.exactPrice,
            estimate: estimate
          },
          {
            id: 'green',
            name: 'Green - Tesla Model 3',
            desc: 'Véhicule 100% électrique, écologique et luxueux',
            capacity: 'Jusqu\'à 4 passagers',
            price: estimate.exactPrice * 1.1, // 10% plus cher
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 1.1,
              minPrice: estimate.minPrice * 1.1,
              maxPrice: estimate.maxPrice * 1.1,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 1.1,
                distanceCharge: estimate.breakdown.distanceCharge * 1.1,
                timeCharge: estimate.breakdown.timeCharge * 1.1,
                greenSupplement: estimate.exactPrice * 0.1
              }
            }
          },
          {
            id: 'premium',
            name: 'Berline Premium',
            desc: 'Mercedes Classe S ou similaire',
            capacity: 'Jusqu\'à 3 passagers',
            price: estimate.exactPrice * 1.3, // 30% plus cher
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 1.3,
              minPrice: estimate.minPrice * 1.3,
              maxPrice: estimate.maxPrice * 1.3,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 1.3,
                distanceCharge: estimate.breakdown.distanceCharge * 1.3,
                timeCharge: estimate.breakdown.timeCharge * 1.3,
                premiumSupplement: estimate.exactPrice * 0.3
              }
            }
          },
          {
            id: 'suv',
            name: 'SUV de Luxe',
            desc: 'BMW X5 ou similaire',
            capacity: 'Jusqu\'à 5 passagers',
            price: estimate.exactPrice * 1.5, // 50% plus cher
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 1.5,
              minPrice: estimate.minPrice * 1.5,
              maxPrice: estimate.maxPrice * 1.5,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 1.5,
                distanceCharge: estimate.breakdown.distanceCharge * 1.5,
                timeCharge: estimate.breakdown.timeCharge * 1.5,
                suvSupplement: estimate.exactPrice * 0.5
              }
            }
          },
          {
            id: 'van',
            name: 'Van VIP',
            desc: 'Mercedes Classe V ou similaire',
            capacity: 'Jusqu\'à 7 passagers',
            price: estimate.exactPrice * 1.8, // 80% plus cher
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 1.8,
              minPrice: estimate.minPrice * 1.8,
              maxPrice: estimate.maxPrice * 1.8,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 1.8,
                distanceCharge: estimate.breakdown.distanceCharge * 1.8,
                timeCharge: estimate.breakdown.timeCharge * 1.8,
                vanSupplement: estimate.exactPrice * 0.8
              }
            }
          }
        ];
        
        setAvailableVehicles(vehicleOptions);
        setCurrentStep(2); // Avancer à l'étape 2 (sélection du véhicule)
      } else {
        setError(response.data?.error || "Erreur lors du calcul du prix.");
      }
    } catch (err) {
      console.error('Erreur lors du calcul du prix:', err);
      
      if (err.response) {
        setError(`Erreur ${err.response.status}: ${err.response.data.error || 'Erreur serveur'}`);
      } else if (err.request) {
        setError('Pas de réponse du serveur. Veuillez réessayer plus tard.');
      } else {
        setError(`Erreur: ${err.message}`);
      }
    } finally {
      setIsCalculating(false);
    }
  };
  
  const onFirstStepSubmit = (data) => {
    calculatePrice();
  };
  
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleBookingSuccess = (result) => {
    setBookingResult(result);
    setBookingSuccess(true);
  };
  
  // Formatage du prix pour l'affichage
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Afficher le composant de confirmation de réservation
  if (bookingSuccess && bookingResult) {
    return <BookingSuccess bookingData={bookingResult} />;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-custom overflow-hidden">
      {/* Header with steps */}
      <div className="bg-gray-50 p-6 md:p-8 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <div className={`flex flex-col items-center relative z-10 ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>
              1
            </span>
            <span className="text-xs mt-2 font-medium">Détails du trajet</span>
          </div>
          
          <div className={`w-16 md:w-24 h-0.5 transition-all duration-300 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
          
          <div className={`flex flex-col items-center relative z-10 ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>
              2
            </span>
            <span className="text-xs mt-2 font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 md:mx-8 mt-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-red-500"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onFirstStepSubmit)}>
        {/* Step 1: Travel Details */}
        {currentStep === 1 && (
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse de départ <span className="text-red-500">*</span>
                </label>
                <AddressInput
                  id="pickupAddress"
                  value={formValues.pickupAddress}
                  onChange={(value) => setValue('pickupAddress', value)}
                  onSelect={(address, placeId) => handleAddressSelect('pickupAddress', address, placeId)}
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
                  onChange={(value) => setValue('dropoffAddress', value)}
                  onSelect={(address, placeId) => handleAddressSelect('dropoffAddress', address, placeId)}
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
                    >
                      <i className="fas fa-plus text-xs"></i>
                    </button>
                  </div>
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
                    >
                      <i className="fas fa-minus text-xs"></i>
                    </button>
                    <span className="flex-1 text-center font-medium">{formValues.luggage}</span>
                    <button 
                      type="button" 
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:bg-gray-50 transition-colors duration-150"
                      onClick={() => {
                        const current = parseInt(formValues.luggage);
                        if (current < 10) setValue('luggage', current + 1);
                      }}
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
        )}
        
        {/* Step 2: Confirmation */}
        {currentStep === 2 && (
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-medium text-gray-800 text-center mb-6">Vos informations</h3>
            
            <div className="mb-6">
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="customerName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                {...register('customerInfo.name', { required: 'Ce champ est requis' })}
                placeholder="Entrez votre nom complet"
              />
              {errors.customerInfo?.name && <p className="mt-1 text-sm text-red-600">{errors.customerInfo.name.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  {...register('customerInfo.email', { 
                    required: 'Ce champ est requis',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Adresse email invalide'
                    } 
                  })}
                  placeholder="Entrez votre adresse email"
                />
                {errors.customerInfo?.email && <p className="mt-1 text-sm text-red-600">{errors.customerInfo.email.message}</p>}
              </div>
              
              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  {...register('customerInfo.phone', { required: 'Ce champ est requis' })}
                  placeholder="Entrez votre numéro de téléphone"
                />
                {errors.customerInfo?.phone && <p className="mt-1 text-sm text-red-600">{errors.customerInfo.phone.message}</p>}
              </div>
            </div>
            
            {/* Vehicle Selection */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4">Sélectionnez votre véhicule</h4>
              <VehicleSelector 
                vehicles={availableVehicles}
                selectedVehicle={formValues.vehicleType}
                onSelect={handleVehicleSelect}
                passengers={formValues.passengers}
                luggage={formValues.luggage}
              />
            </div>
            
            {/* Tous les éléments ci-dessous ne s'affichent que si un véhicule est sélectionné */}
            {formValues.vehicleType && (
              <>
                {/* Route Map if we have addresses */}
                {formValues.pickupAddress && formValues.dropoffAddress && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4">Itinéraire</h4>
                    <div className={mapReady ? 'block' : 'hidden'}>
                      <RouteMap 
                        pickupAddress={formValues.pickupAddress}
                        dropoffAddress={formValues.dropoffAddress}
                        pickupPlaceId={formValues.pickupAddressPlaceId}
                        dropoffPlaceId={formValues.dropoffAddressPlaceId}
                      />
                    </div>
                    {!mapReady && (
                      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-gray-100">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mt-8 mb-6">
                  <h4 className="text-lg font-medium text-center text-gray-800 mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-0.5 after:bg-primary">
                    Résumé de votre réservation
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500">Départ:</span>
                      <span className="block font-medium">{formValues.pickupAddress}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500">Arrivée:</span>
                      <span className="block font-medium">{formValues.dropoffAddress}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500">Date et heure:</span>
                      <span className="block font-medium">
                        {new Date(`${formValues.pickupDate}T${formValues.pickupTime}`).toLocaleString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    
                    {formValues.roundTrip && (
                      <div className="space-y-1">
                        <span className="text-sm text-gray-500">Retour:</span>
                        <span className="block font-medium">
                          {new Date(`${formValues.returnDate}T${formValues.returnTime}`).toLocaleString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500">Véhicule:</span>
                      <span className="block font-medium">
                        {availableVehicles.find(v => v.id === formValues.vehicleType)?.name || 'Non sélectionné'}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500">Passagers:</span>
                      <span className="block font-medium">{formValues.passengers}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-sm text-gray-500">Bagages:</span>
                      <span className="block font-medium">{formValues.luggage}</span>
                    </div>
                    
                    {formValues.flightNumber && (
                      <div className="space-y-1">
                        <span className="text-sm text-gray-500">N° de vol:</span>
                        <span className="block font-medium">{formValues.flightNumber}</span>
                      </div>
                    )}
                    
                    {formValues.trainNumber && (
                      <div className="space-y-1">
                        <span className="text-sm text-gray-500">N° de train:</span>
                        <span className="block font-medium">{formValues.trainNumber}</span>
                      </div>
                    )}
                    
                    <div className="space-y-1 col-span-full flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                      <span className="text-sm font-semibold text-gray-700">Prix total:</span>
                      <span className="text-xl font-bold text-primary">{formatPrice(priceEstimate?.exactPrice || 0)}</span>
                    </div>
                  </div>
                </div>
                
                {/* BookingConfirmation Component */}
                <BookingConfirmation 
                  bookingData={formValues}
                  priceEstimate={priceEstimate}
                  onSuccess={handleBookingSuccess}
                  onCancel={goBack}
                />
              </>
            )}
            
            {/* Si aucun véhicule n'est sélectionné, afficher un message ou une indication */}
            {!formValues.vehicleType && (
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
                <div className="flex items-center">
                  <i className="fas fa-info-circle mr-3"></i>
                  <p>Veuillez sélectionner un véhicule pour continuer votre réservation.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;