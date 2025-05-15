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

  useEffect(() => {
  // Diagnostic des variables d'environnement
  console.log('🔍 === DIAGNOSTIC ENVIRONNEMENT ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY présente:', !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  console.log('Longueur clé API:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.length);
  
  // Test de la configuration
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    console.error('❌ Clé API Google Maps manquante côté client !');
  } else {
    console.log('✅ Clé API Google Maps configurée côté client');
  }
}, []);

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
  // Gestion des adresses et places IDs - VERSION CORRIGÉE
const handleAddressSelect = (name, address, placeId) => {
  console.log('📍 [BookingForm] Adresse sélectionnée:', {
    field: name,
    address,
    placeId: placeId ? placeId.substring(0, 20) + '...' : 'VIDE',
    hasPlaceId: !!placeId
  });
  
  // Mettre à jour l'adresse
  setValue(name, address);
  
  // Mettre à jour le place_id correspondant
  const placeIdField = `${name}PlaceId`;
  setValue(placeIdField, placeId || '');
  
  console.log('💾 [BookingForm] Valeurs mises à jour:', {
    [name]: address,
    [placeIdField]: placeId || 'VIDE'
  });
  
  // Réinitialiser l'estimation de prix quand les adresses changent
  setPriceEstimate(null);
  setAvailableVehicles([]);
  
  // Si c'est une modification d'adresse après calcul, revenir à l'étape 1
  if (currentStep > 1) {
    setCurrentStep(1);
    setValue('vehicleType', '');
  }
};

// Alternative: Fonction pour diagnostiquer les problèmes de place_id
const diagnoseAddressIssues = () => {
  console.log('🔍 [BookingForm] Diagnostic des adresses:');
  console.log('Pickup:', {
    address: formValues.pickupAddress,
    placeId: formValues.pickupAddressPlaceId,
    hasPlaceId: !!formValues.pickupAddressPlaceId,
    isEmptyString: formValues.pickupAddressPlaceId === ''
  });
  console.log('Dropoff:', {
    address: formValues.dropoffAddress,
    placeId: formValues.dropoffAddressPlaceId,
    hasPlaceId: !!formValues.dropoffAddressPlaceId,
    isEmptyString: formValues.dropoffAddressPlaceId === ''
  });
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

  function estimateDistanceFromAddresses(pickup, dropoff) {
  // Logique très basique - vous pourriez l'améliorer
  const isAirport = addr => /aéroport|airport|cdg|orly|beauvais/i.test(addr)
  const isParis = addr => /paris|75\d{3}/i.test(addr)
  const isEssonne = addr => /91|essonne|longjumeau|massy|évry/i.test(addr)
  
  if (isAirport(pickup) || isAirport(dropoff)) return 35
  if (isParis(pickup) && isEssonne(dropoff) || isParis(dropoff) && isEssonne(pickup)) return 25
  if (isEssonne(pickup) && isEssonne(dropoff)) return 15
  
  return 20 // Distance par défaut
}

function createVehicleOptions(vehicleEstimates) {
  const vehicleInfo = {
    'green': {
      name: 'Green Eco',
      desc: 'Tesla Model 3 - 100% électrique',
      capacity: 'Jusqu\'à 4 passagers',
      luggage: 'Jusqu\'à 3 bagages'
    },
    'premium': {
      name: 'Berline Premium',
      desc: 'Mercedes Classe E ou similaire',
      capacity: 'Jusqu\'à 4 passagers',
      luggage: 'Jusqu\'à 4 bagages'
    },
    'sedan': {
      name: 'Berline de Luxe',
      desc: 'Mercedes Classe S ou similaire',
      capacity: 'Jusqu\'à 4 passagers',
      luggage: 'Jusqu\'à 3 bagages'
    },
    'van': {
      name: 'Van VIP',
      desc: 'Mercedes Classe V ou similaire',
      capacity: 'Jusqu\'à 7 passagers',
      luggage: 'Bagages multiples'
    }
  }
  
  return vehicleEstimates.map(({ vehicleType, estimate }) => ({
    id: vehicleType,
    ...vehicleInfo[vehicleType],
    price: estimate.exactPrice,
    estimate: estimate
  }))
}

  // Fonction fallback locale si tout échoue
function createFallbackEstimates(formValues) {
  const vehicleTypes = {
    'green': { name: 'Green Eco', baseFare: 10, perKm: 2.30 },
    'premium': { name: 'Berline Premium', baseFare: 18, perKm: 2.90 },
    'sedan': { name: 'Berline de Luxe', baseFare: 45, perKm: 3.80 },
    'van': { name: 'Van VIP', baseFare: 28, perKm: 3.10 }
  }
  
  // Estimation approximative basée sur les adresses
  const estimatedDistance = estimateDistanceFromAddresses(formValues.pickupAddress, formValues.dropoffAddress)
  
  return Object.entries(vehicleTypes).map(([type, config]) => {
    const distance = Math.max(estimatedDistance, type === 'sedan' ? 10 : 0)
    let price = config.baseFare + (distance * config.perKm)
    
    if (formValues.roundTrip) price *= 2
    
    return {
      id: type,
      name: config.name,
      desc: `Estimation approximative`,
      capacity: type === 'van' ? 'Jusqu\'à 7 passagers' : 'Jusqu\'à 4 passagers',
      luggage: type === 'van' ? 'Bagages multiples' : 'Jusqu\'à 3-4 bagages',
      price: Math.round(price),
      estimate: {
        exactPrice: Math.round(price),
        minPrice: Math.round(price * 0.9),
        maxPrice: Math.round(price * 1.1),
        currency: 'EUR',
        breakdown: {
          baseFare: config.baseFare,
          distanceCharge: distance * config.perKm,
          actualDistance: estimatedDistance,
          chargeableDistance: distance,
          pricePerKm: config.perKm,
          roundTrip: formValues.roundTrip,
          vehicleType: type
        },
        details: {
          distanceInKm: estimatedDistance,
          formattedDistance: `~${estimatedDistance} km`,
          formattedDuration: `~${Math.round(estimatedDistance * 1.5)} min`
        }
      }
    }
  })
}
  
  // Calcul du prix
  const calculatePrice = async () => {
  // Validation des champs obligatoires
  diagnoseAddressIssues();
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
    console.log('🚗 [BookingForm] Début du calcul avec:', {
      pickup: formValues.pickupAddress,
      dropoff: formValues.dropoffAddress,
      pickupPlaceId: formValues.pickupAddressPlaceId.substring(0, 20) + '...',
      dropoffPlaceId: formValues.dropoffAddressPlaceId.substring(0, 20) + '...'
    })
    
    // Calculer pour tous les types de véhicules
    const vehicleTypes = ['green', 'premium', 'sedan', 'van']
    const vehicleEstimates = []
    
    for (const vehicleType of vehicleTypes) {
      try {
        console.log(`🚙 [BookingForm] Calcul pour ${vehicleType}...`)
        
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
        
        console.log(`📊 [BookingForm] Réponse pour ${vehicleType}:`, {
          success: response.data?.success,
          hasEstimate: !!response.data?.data?.estimate,
          distance: response.data?.data?.estimate?.details?.formattedDistance,
          price: response.data?.data?.estimate?.exactPrice
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
    
    console.log(`✅ [BookingForm] ${vehicleEstimates.length} véhicules calculés avec succès`)
    
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
    
    console.log(`🚗 [BookingForm] ${validVehicles.length} véhicules valides après filtrage`)
    
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

// Nouvelle fonction pour créer les options de véhicules
function createVehicleOptions(baseEstimate, formValues) {
  // Récupérer les détails du trajet depuis l'estimation de base
  const distanceInKm = baseEstimate.details?.distanceInKm || 25;
  const roundTrip = formValues.roundTrip;
  
  // Vos tarifs
  const BASE_FARES = { green: 10, premium: 18, sedan: 45, van: 28 };
  const PER_KM_RATES = { green: 2.30, premium: 2.90, sedan: 3.80, van: 3.10 };
  const MIN_DISTANCE_KM = { green: 0, premium: 0, sedan: 10, van: 0 };
  
  // Fonction pour calculer le prix d'un véhicule
  function calculateVehiclePrice(vehicleType) {
    const baseFare = BASE_FARES[vehicleType];
    const perKmRate = PER_KM_RATES[vehicleType];
    const minDistance = MIN_DISTANCE_KM[vehicleType];
    
    const chargeableDistance = Math.max(distanceInKm, minDistance);
    const distanceCharge = chargeableDistance * perKmRate;
    
    let exactPrice = baseFare + distanceCharge;
    if (roundTrip) exactPrice *= 2;
    
    exactPrice = Math.round(exactPrice * 100) / 100;
    
    return {
      exactPrice,
      minPrice: Math.round(exactPrice * 0.95 * 100) / 100,
      maxPrice: Math.round(exactPrice * 1.05 * 100) / 100,
      currency: 'EUR',
      breakdown: {
        baseFare,
        distanceCharge,
        actualDistance: distanceInKm,
        chargeableDistance,
        pricePerKm: perKmRate,
        roundTrip,
        vehicleType
      },
      details: {
        distanceInKm,
        chargeableDistanceInKm: chargeableDistance,
        durationInMinutes: baseEstimate.details?.durationInMinutes || 40,
        formattedDistance: baseEstimate.details?.formattedDistance || `${distanceInKm} km`,
        formattedDuration: baseEstimate.details?.formattedDuration || "40 min"
      }
    };
  }
  
  // Créer toutes les options de véhicules
  return [
    {
      id: 'green',
      name: 'Green Eco',
      desc: 'Tesla Model 3 - 100% électrique',
      capacity: 'Jusqu\'à 4 passagers',
      luggage: 'Jusqu\'à 3 bagages',
      price: calculateVehiclePrice('green').exactPrice,
      estimate: calculateVehiclePrice('green')
    },
    {
      id: 'premium',
      name: 'Berline Premium',
      desc: 'Mercedes Classe E ou similaire',
      capacity: 'Jusqu\'à 4 passagers',
      luggage: 'Jusqu\'à 4 bagages',
      price: calculateVehiclePrice('premium').exactPrice,
      estimate: calculateVehiclePrice('premium')
    },
    {
      id: 'sedan',
      name: 'Berline de Luxe',
      desc: 'Mercedes Classe S ou similaire',
      capacity: 'Jusqu\'à 4 passagers',
      luggage: 'Jusqu\'à 3 bagages',
      price: calculateVehiclePrice('sedan').exactPrice,
      estimate: calculateVehiclePrice('sedan')
    },
    {
      id: 'van',
      name: 'Van VIP',
      desc: 'Mercedes Classe V ou similaire',
      capacity: 'Jusqu\'à 7 passagers',
      luggage: 'Bagages multiples',
      price: calculateVehiclePrice('van').exactPrice,
      estimate: calculateVehiclePrice('van')
    }
  ];
}

// Fonction pour estimer le prix pour un véhicule spécifique (version rapide)
const estimatePriceForVehicle = (vehicleType, data) => {
  // Tarifs selon votre barème
  const BASE_FARES = {
    'green': 10,
    'premium': 18,
    'sedan': 45,
    'van': 28
  };
  
  const PER_KM_RATES = {
    'green': 2.30,
    'premium': 2.90,
    'sedan': 3.80,
    'van': 3.10
  };
  
  const MIN_DISTANCE_KM = {
    'green': 0,
    'premium': 0,
    'sedan': 10,  // Minimum 10km pour la Classe S
    'van': 0
  };
  
  // Estimation approximative de distance (à remplacer par calcul réel)
  const estimatedDistance = 25; // 25km en moyenne
  const chargeableDistance = Math.max(estimatedDistance, MIN_DISTANCE_KM[vehicleType] || 0);
  
  const baseFare = BASE_FARES[vehicleType] || BASE_FARES.premium;
  const distanceCharge = chargeableDistance * (PER_KM_RATES[vehicleType] || PER_KM_RATES.premium);
  
  let price = baseFare + distanceCharge;
  
  if (data.roundTrip) {
    price *= 2;
  }
  
  return Math.round(price * 100) / 100;
};

// Fonction pour calculer le prix complet pour un véhicule (version détaillée)
const calculatePriceForVehicle = async (vehicleType, data) => {
  try {
    const response = await api.post('/price/estimate', {
      pickupPlaceId: data.pickupAddressPlaceId,
      dropoffPlaceId: data.dropoffAddressPlaceId,
      pickupDateTime: `${data.pickupDate}T${data.pickupTime}`,
      passengers: parseInt(data.passengers),
      luggage: parseInt(data.luggage),
      roundTrip: data.roundTrip,
      returnDateTime: data.roundTrip && data.returnDate ? `${data.returnDate}T${data.returnTime}` : null,
      vehicleType: vehicleType
    });
    
    if (response.data && response.data.success) {
      return response.data.data.estimate;
    }
  } catch (error) {
    console.error(`Erreur calcul prix pour ${vehicleType}:`, error);
  }
  
  // Fallback avec votre barème
  return createDefaultEstimate(vehicleType, data);
};

// Fonction fallback pour créer une estimation par défaut
const createDefaultEstimate = (vehicleType, data) => {
  const BASE_FARES = {
    'green': 10,
    'premium': 18,
    'sedan': 45,
    'van': 28
  };
  
  const PER_KM_RATES = {
    'green': 2.30,
    'premium': 2.90,
    'sedan': 3.80,
    'van': 3.10
  };
  
  const MIN_DISTANCE_KM = {
    'green': 0,
    'premium': 0,
    'sedan': 10,
    'van': 0
  };
  
  const defaultDistance = 25;
  const chargeableDistance = Math.max(defaultDistance, MIN_DISTANCE_KM[vehicleType] || 0);
  
  const baseFare = BASE_FARES[vehicleType] || BASE_FARES.premium;
  const perKmRate = PER_KM_RATES[vehicleType] || PER_KM_RATES.premium;
  const distanceCharge = chargeableDistance * perKmRate;
  
  let exactPrice = baseFare + distanceCharge;
  
  if (data.roundTrip) {
    exactPrice *= 2;
  }
  
  exactPrice = Math.round(exactPrice * 100) / 100;
  
  return {
    exactPrice,
    minPrice: Math.round(exactPrice * 0.95 * 100) / 100,
    maxPrice: Math.round(exactPrice * 1.05 * 100) / 100,
    currency: 'EUR',
    breakdown: {
      baseFare,
      distanceCharge,
      actualDistance: defaultDistance,
      chargeableDistance,
      pricePerKm: perKmRate,
      roundTrip: data.roundTrip,
      vehicleType
    },
    details: {
      distanceInKm: defaultDistance,
      chargeableDistanceInKm: chargeableDistance,
      durationInMinutes: 40,
      formattedDistance: `${defaultDistance} km`,
      formattedDuration: "40 min"
    }
  };
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