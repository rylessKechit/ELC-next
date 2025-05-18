"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import BookingSuccess from './BookingSuccess';
import BookingStepOne from './BookingStepOne';
import BookingStepTwo from './BookingStepTwo.jsx';
import BookingStepThree from './BookingStepThree';
import BookingStepsHeader from './BookingStepsHeader';
import { api } from '@/lib/api';

const BookingForm = () => {
  // États pour les étapes du formulaire
  const [currentStep, setCurrentStep] = useState(1);
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  
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
      vehicleType: '',
      customerInfo: {
        name: '',
        email: '',
        phone: ''
      }
    }
  });

  const formValues = watch();
  const roundTrip = watch('roundTrip');
  const passengers = watch('passengers');
  const luggage = watch('luggage');

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

  // Filtrer les véhicules disponibles en fonction du nombre de passagers et de bagages
  useEffect(() => {
    if (availableVehicles.length === 0) return;

    // Définir les contraintes de chaque type de véhicule
    const vehicleConstraints = {
      'green': { maxPassengers: 4, maxLuggage: 3 },
      'premium': { maxPassengers: 4, maxLuggage: 4 },
      'sedan': { maxPassengers: 4, maxLuggage: 3 },
      'van': { maxPassengers: 7, maxLuggage: 999 } // pas de limite pratique
    };

    // Filtrer les véhicules qui répondent aux attentes du client
    const filtered = availableVehicles.filter(vehicle => {
      const constraints = vehicleConstraints[vehicle.id];
      if (!constraints) return false;
      
      return passengers <= constraints.maxPassengers && luggage <= constraints.maxLuggage;
    });

    setFilteredVehicles(filtered);

    // Si aucun véhicule ne correspond, afficher un message d'erreur
    if (filtered.length === 0 && availableVehicles.length > 0) {
      setError('Aucun véhicule disponible ne correspond à vos critères. Veuillez réduire le nombre de passagers ou de bagages.');
    } else {
      setError('');
    }
  }, [availableVehicles, passengers, luggage]);

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
  // Mettre à jour l'adresse
  setValue(name, address);
  
  // Mettre à jour le place_id correspondant
  const placeIdField = `${name}PlaceId`;
  setValue(placeIdField, placeId || '');
  
  // Réinitialiser l'estimation de prix quand les adresses changent
  setPriceEstimate(null);
  setAvailableVehicles([]);
  
  // Si c'est une modification d'adresse après calcul, revenir à l'étape 1
  if (currentStep > 1) {
    setCurrentStep(1);
    setValue('vehicleType', '');
  }
};

  // Gestion des véhicules
  const handleVehicleSelect = (vehicleType, priceInfo) => {
    setValue('vehicleType', vehicleType);
    setPriceEstimate(priceInfo);
  };

  // Passer à l'étape suivante après la sélection du véhicule
  const goToNextStep = () => {
    if (formValues.vehicleType) {
      setCurrentStep(3);
      // Réinitialiser l'état de la carte pour qu'elle se charge correctement
      setMapReady(false);
      
      // Retarder légèrement l'activation de la carte pour permettre au DOM de se mettre à jour
      setTimeout(() => {
        setMapReady(true);
      }, 500);
    } else {
      setError('Veuillez sélectionner un véhicule pour continuer');
    }
  };
  
  // Calcul du prix
  const calculatePrice = async () => {
  if (!formValues.pickupAddress || !formValues.dropoffAddress || !formValues.pickupDate || !formValues.pickupTime) {
    setError('Veuillez remplir tous les champs obligatoires')
    return
  }
  
  // VALIDATION CRITIQUE - Vérifier que les Place IDs existent et ne sont pas vides
  if (!formValues.pickupAddressPlaceId || !formValues.dropoffAddressPlaceId) {
    setError('Veuillez sélectionner des adresses valides dans les suggestions')
    return
  }

  // Validation supplémentaire - Vérifier que les Place IDs ne sont pas juste des chaînes vides
  if (formValues.pickupAddressPlaceId.trim() === '' || formValues.dropoffAddressPlaceId.trim() === '') {
    setError('Les adresses sélectionnées ne sont pas valides. Veuillez les sélectionner à nouveau.')
    return
  }
  
  setError('')
  setIsCalculating(true)
  
  try {
    // Calculer pour tous les types de véhicules
    const vehicleTypes = ['green', 'premium', 'sedan', 'van']
    const vehicleEstimates = []
    
    for (const vehicleType of vehicleTypes) {
      try {
        const response = await api.post('/price/estimate', {
          pickupPlaceId: formValues.pickupAddressPlaceId,
          dropoffPlaceId: formValues.dropoffAddressPlaceId,
          pickupDateTime: `${formValues.pickupDate}T${formValues.pickupTime}`,
          passengers: parseInt(formValues.passengers),
          luggage: parseInt(formValues.luggage),
          roundTrip: formValues.roundTrip,
          returnDateTime: formValues.roundTrip && formValues.returnDate ? `${formValues.returnDate}T${formValues.returnTime}` : null,
          vehicleType: vehicleType
        })
        
        if (response.data && response.data.success && response.data.data && response.data.data.estimate) {
          vehicleEstimates.push({
            vehicleType,
            estimate: response.data.data.estimate
          })
        } else {
          console.warn(`⚠️ [BookingForm] Réponse incomplète pour ${vehicleType}:`, response.data)
        }
      } catch (err) {
        console.error(`❌ [BookingForm] Erreur pour ${vehicleType}:`, err)
        // Continuer avec les autres véhicules même si un calcul échoue
        continue
      }
    }
    
    if (vehicleEstimates.length === 0) {
      throw new Error('Impossible de calculer le prix pour aucun véhicule. Veuillez vérifier vos adresses.')
    }
    
    // Créer les options de véhicules avec les prix réels
    const vehicleOptions = [
      {
        id: 'green',
        name: 'Green Eco',
        desc: 'Tesla Model 3 - 100% électrique',
        capacity: 'Jusqu\'à 4 passagers',
        luggage: 'Jusqu\'à 3 bagages',
        estimate: vehicleEstimates.find(v => v.vehicleType === 'green')?.estimate || null,
        price: vehicleEstimates.find(v => v.vehicleType === 'green')?.estimate?.exactPrice || 0
      },
      {
        id: 'premium',
        name: 'Berline Premium',
        desc: 'Mercedes Classe E ou similaire',
        capacity: 'Jusqu\'à 4 passagers',
        luggage: 'Jusqu\'à 4 bagages',
        estimate: vehicleEstimates.find(v => v.vehicleType === 'premium')?.estimate || null,
        price: vehicleEstimates.find(v => v.vehicleType === 'premium')?.estimate?.exactPrice || 0
      },
      {
        id: 'sedan',
        name: 'Berline de Luxe',
        desc: 'Mercedes Classe S ou similaire',
        capacity: 'Jusqu\'à 4 passagers',
        luggage: 'Jusqu\'à 3 bagages',
        estimate: vehicleEstimates.find(v => v.vehicleType === 'sedan')?.estimate || null,
        price: vehicleEstimates.find(v => v.vehicleType === 'sedan')?.estimate?.exactPrice || 0
      },
      {
        id: 'van',
        name: 'Van VIP',
        desc: 'Mercedes Classe V ou similaire',
        capacity: 'Jusqu\'à 7 passagers',
        luggage: 'Bagages multiples',
        estimate: vehicleEstimates.find(v => v.vehicleType === 'van')?.estimate || null,
        price: vehicleEstimates.find(v => v.vehicleType === 'van')?.estimate?.exactPrice || 0
      }
    ]
    
    // Filtrer les véhicules qui ont pu être calculés
    const validVehicles = vehicleOptions.filter(v => v.estimate !== null)
    
    if (validVehicles.length === 0) {
      throw new Error('Aucun véhicule n\'a pu être calculé correctement.')
    }
    
    setAvailableVehicles(validVehicles)
    setCurrentStep(2)
  } catch (err) {
    console.error('❌ [BookingForm] Erreur générale:', err)
    setError(err.message || 'Erreur lors du calcul du prix')
  } finally {
    setIsCalculating(false)
  }
}
  
  const onFirstStepSubmit = (data) => {
    calculatePrice();
  };
  
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      // Si on revient à l'étape 2, réinitialiser le véhicule sélectionné
      if (currentStep === 3) {
        setValue('vehicleType', '');
        setPriceEstimate(null);
      }
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

  // Titre de l'étape en cours
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Détails de votre trajet";
      case 2:
        return "Choisissez votre véhicule";
      case 3:
        return "Vos informations";
      default:
        return "";
    }
  };

  // Afficher le composant de confirmation de réservation
  if (bookingSuccess && bookingResult) {
    return <BookingSuccess bookingData={bookingResult} />;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-custom overflow-hidden">
      {/* Header with steps */}
      <BookingStepsHeader 
        currentStep={currentStep} 
        title={getStepTitle()} 
      />

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
          <BookingStepOne 
            register={register}
            formValues={formValues}
            setValue={setValue}
            errors={errors}
            isAirport={isAirport}
            isTrainStation={isTrainStation}
            roundTrip={roundTrip}
            isCalculating={isCalculating}
            handleAddressSelect={handleAddressSelect}
          />
        )}
        
        {/* Step 2: Vehicle Selection */}
        {currentStep === 2 && (
          <BookingStepTwo 
            filteredVehicles={filteredVehicles}
            selectedVehicle={formValues.vehicleType}
            onSelect={handleVehicleSelect}
            passengers={passengers}
            luggage={luggage}
            goBack={goBack}
            goToNextStep={goToNextStep}
          />
        )}
        
        {/* Step 3: Customer Information and Confirmation */}
        {currentStep === 3 && (
          <BookingStepThree 
            register={register}
            formValues={formValues}
            errors={errors}
            setValue={setValue}
            priceEstimate={priceEstimate}
            availableVehicles={availableVehicles}
            mapReady={mapReady}
            goBack={goBack}
            setError={setError}
            handleBookingSuccess={handleBookingSuccess}
            formatPrice={formatPrice}
          />
        )}
      </form>
    </div>
  );
};

export default BookingForm;