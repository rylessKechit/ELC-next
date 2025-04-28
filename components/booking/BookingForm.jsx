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
    setValue(name, address);
    setValue(`${name}PlaceId`, placeId);
    setPriceEstimate(null);
    setAvailableVehicles([]);
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
            id: 'green',
            name: 'Green Eco',
            desc: 'Tesla Model 3 - 100% électrique',
            capacity: 'Jusqu\'à 4 passagers',
            luggage: 'Jusqu\'à 3 bagages',
            price: estimate.exactPrice * 0.9, // 10% moins cher (le moins cher)
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 0.9,
              minPrice: estimate.minPrice * 0.9,
              maxPrice: estimate.maxPrice * 0.9,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 0.9,
                distanceCharge: estimate.breakdown.distanceCharge * 0.9,
                timeCharge: estimate.breakdown.timeCharge * 0.9,
                greenDiscount: estimate.exactPrice * 0.1
              }
            }
          },
          {
            id: 'premium',
            name: 'Berline Premium',
            desc: 'Mercedes Classe E ou similaire',
            capacity: 'Jusqu\'à 4 passagers',
            luggage: 'Jusqu\'à 4 bagages',
            price: estimate.exactPrice, // Prix de base (2ème moins cher)
            estimate: estimate
          },
          {
            id: 'sedan',
            name: 'Berline de Luxe',
            desc: 'Mercedes Classe S ou similaire',
            capacity: 'Jusqu\'à 4 passagers',
            luggage: 'Jusqu\'à 3 bagages',
            price: estimate.exactPrice * 1.1, // 10% plus cher (3ème moins cher)
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
                sedanSupplement: estimate.exactPrice * 0.1
              }
            }
          },
          {
            id: 'van',
            name: 'Van VIP',
            desc: 'Mercedes Classe V ou similaire',
            capacity: 'Jusqu\'à 7 passagers',
            luggage: 'Bagages multiples',
            price: estimate.exactPrice * 1.5, // 50% plus cher (le plus cher)
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
                vanSupplement: estimate.exactPrice * 0.5
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
            id: 'green',
            name: 'Green Eco',
            desc: 'Tesla Model 3 - 100% électrique',
            capacity: 'Jusqu\'à 4 passagers',
            luggage: 'Jusqu\'à 3 bagages',
            price: estimate.exactPrice * 0.9, // 10% moins cher (le moins cher)
            estimate: {
              ...estimate,
              exactPrice: estimate.exactPrice * 0.9,
              minPrice: estimate.minPrice * 0.9,
              maxPrice: estimate.maxPrice * 0.9,
              breakdown: {
                ...estimate.breakdown,
                baseFare: estimate.breakdown.baseFare * 0.9,
                distanceCharge: estimate.breakdown.distanceCharge * 0.9,
                timeCharge: estimate.breakdown.timeCharge * 0.9,
                greenDiscount: estimate.exactPrice * 0.1
              }
            }
          },
          {
            id: 'premium',
            name: 'Berline Premium',
            desc: 'Mercedes Classe E ou similaire',
            capacity: 'Jusqu\'à 4 passagers',
            luggage: 'Jusqu\'à 4 bagages',
            price: estimate.exactPrice, // Prix de base (2ème moins cher)
            estimate: estimate
          },
          {
            id: 'sedan',
            name: 'Berline de Luxe',
            desc: 'Mercedes Classe S ou similaire',
            capacity: 'Jusqu\'à 4 passagers',
            luggage: 'Jusqu\'à 3 bagages',
            price: estimate.exactPrice * 1.1, // 10% plus cher (3ème moins cher)
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
                sedanSupplement: estimate.exactPrice * 0.1
              }
            }
          },
          {
            id: 'van',
            name: 'Van VIP',
            desc: 'Mercedes Classe V ou similaire',
            capacity: 'Jusqu\'à 7 passagers',
            luggage: 'Bagages multiples',
            price: estimate.exactPrice * 1.5, // 50% plus cher (le plus cher)
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
                vanSupplement: estimate.exactPrice * 0.5
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