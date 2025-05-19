"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUserShield, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import BookingStepsHeader from '@/components/booking/BookingStepsHeader';
import BookingStepOne from '@/components/booking/BookingStepOne';
import BookingStepTwo from '@/components/booking/BookingStepTwo';
import BookingStepThree from '@/components/booking/BookingStepThree';
import BookingSuccess from '@/components/booking/BookingSuccess';

const AdminBookingForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  
  // États pour les étapes du formulaire
  const [currentStep, setCurrentStep] = useState(1);
  const [formValues, setFormValues] = useState({
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
  });
  const [availableVehicles, setAvailableVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [priceEstimate, setPriceEstimate] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  
  // Fonction pour mettre à jour les champs du formulaire
  const updateFormValue = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormValues(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  // Gestionnaire de sélection d'adresse
  const handleAddressSelect = (name, address, placeId) => {
    // Mettre à jour l'adresse
    updateFormValue(name, address);
    
    // Mettre à jour le place_id correspondant
    const placeIdField = `${name}PlaceId`;
    updateFormValue(placeIdField, placeId || '');
    
    // Réinitialiser l'estimation de prix quand les adresses changent
    setPriceEstimate(null);
    setAvailableVehicles([]);
    
    // Si c'est une modification d'adresse après calcul, revenir à l'étape 1
    if (currentStep > 1) {
      setCurrentStep(1);
      updateFormValue('vehicleType', '');
    }
  };
  
  // Fonction pour calculer le prix (admin, simplifiée)
  const calculatePrice = async () => {
    // Validation des champs requis
    if (!formValues.pickupAddress || !formValues.dropoffAddress || !formValues.pickupDate || !formValues.pickupTime) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setError('');
    setIsCalculating(true);
    
    try {
      // En mode admin, on peut créer des estimations simples
      const estimate = createSimpleEstimate();
      setPriceEstimate(estimate);
      
      const vehicleOptions = [
        {
          id: 'sedan',
          name: 'Berline de Luxe',
          desc: 'Mercedes Classe S ou similaire',
          capacity: '4 passagers',
          luggage: '3 bagages',
          estimate: estimate,
          price: 120
        },
        {
          id: 'premium',
          name: 'Berline Premium',
          desc: 'Mercedes Classe E ou similaire',
          capacity: '4 passagers',
          luggage: '4 bagages',
          estimate: estimate,
          price: 90
        },
        {
          id: 'green',
          name: 'Green Eco',
          desc: 'Tesla Model 3 - 100% électrique',
          capacity: '4 passagers',
          luggage: '3 bagages',
          estimate: estimate,
          price: 90
        },
        {
          id: 'van',
          name: 'Van VIP',
          desc: 'Mercedes Classe V ou similaire',
          capacity: '7 passagers',
          luggage: '7+ bagages',
          estimate: estimate,
          price: 150
        }
      ];
      
      setAvailableVehicles(vehicleOptions);
      
      // Filtrer les véhicules selon le nombre de passagers et bagages
      const filtered = vehicleOptions.filter(v => {
        if (v.id === 'van') return formValues.passengers <= 7;
        return formValues.passengers <= 4;
      });
      
      setFilteredVehicles(filtered);
      setCurrentStep(2);
    } catch (err) {
      console.error('Erreur lors du calcul du prix:', err);
      setError(err.message || 'Erreur lors du calcul du prix');
    } finally {
      setIsCalculating(false);
    }
  };
  
  // Créer un estimate simple pour l'admin
  const createSimpleEstimate = () => {
    // Prix de base selon les options
    let basePrice = 45;
    if (formValues.roundTrip) basePrice *= 2;
    if (formValues.luggage > 2) basePrice += formValues.luggage * 5;
    
    return {
      basePrice,
      approachFee: 10,
      totalPrice: basePrice + 10,
      exactPrice: basePrice + 10,
      priceRanges: {
        standard: {
          min: basePrice + 10,
          max: basePrice + 20
        },
        van: {
          min: basePrice + 25,
          max: basePrice + 35
        }
      },
      currency: 'EUR',
      selectedRate: 'A',
      rateName: 'Tarif administrateur',
      breakdown: {
        baseFare: 2.60,
        distanceCharge: basePrice - 2.60,
        pricePerKm: 1.50,
        actualDistance: 15,
        minimumCourse: 20,
        approachFee: 10,
        isNightTime: false,
        isWeekendOrHoliday: false,
        roundTrip: formValues.roundTrip,
        selectedTariff: 'A',
        conditions: {
          timeOfDay: 'jour',
          dayType: 'semaine',
          returnType: formValues.roundTrip ? 'en charge' : 'à vide'
        }
      },
      details: {
        distanceInKm: 15,
        durationInMinutes: 25,
        formattedDistance: '15 km (estimation)',
        formattedDuration: '25 min (estimation)',
        polyline: null,
        isEstimated: true
      }
    };
  };
  
  // Gestion des véhicules
  const handleVehicleSelect = (vehicleType) => {
    updateFormValue('vehicleType', vehicleType);
    setCurrentStep(3);
    
    // Réinitialiser l'état de la carte pour qu'elle se charge correctement
    setMapReady(false);
    setTimeout(() => setMapReady(true), 500);
  };
  
  // Navigation entre les étapes
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Gérer la soumission finale
  const handleSubmit = async () => {
    try {
      // Validation
      if (!formValues.customerInfo.name || !formValues.customerInfo.email || !formValues.customerInfo.phone) {
        setError('Veuillez remplir tous les champs obligatoires');
        return;
      }
      
      setError('');
      
      // Construction de l'objet de réservation
      const bookingData = {
        pickupAddress: formValues.pickupAddress,
        dropoffAddress: formValues.dropoffAddress,
        pickupDateTime: `${formValues.pickupDate}T${formValues.pickupTime}`,
        passengers: parseInt(formValues.passengers),
        luggage: parseInt(formValues.luggage),
        roundTrip: formValues.roundTrip,
        returnDateTime: formValues.roundTrip ? `${formValues.returnDate}T${formValues.returnTime}` : null,
        flightNumber: formValues.flightNumber || null,
        trainNumber: formValues.trainNumber || null,
        specialRequests: formValues.specialRequests || '',
        customerInfo: {
          name: formValues.customerInfo.name,
          email: formValues.customerInfo.email,
          phone: formValues.customerInfo.phone
        },
        price: {
          amount: priceEstimate.exactPrice,
          currency: 'EUR',
          priceRange: priceEstimate.priceRanges?.standard || null
        },
        vehicleType: formValues.vehicleType,
        status: 'confirmed', // Admin création = automatiquement confirmé
        createdBy: session?.user?.email || 'admin',
        isAdminCreated: true
      };
      
      // Appel à l'API pour créer la réservation
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setBookingResult(result.data);
        setBookingSuccess(true);
        
        // Redirection vers la page de détail après 2 secondes
        setTimeout(() => {
          router.push(`/admin/bookings/${result.data.id || result.data._id}`);
        }, 2000);
      } else {
        setError(result.error || "Une erreur est survenue lors de la réservation.");
      }
    } catch (err) {
      console.error('Erreur lors de la création de la réservation:', err);
      setError("Une erreur est survenue lors de la réservation. Veuillez réessayer.");
    }
  };
  
  // Formater prix pour affichage
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };
  
  // Obtenir le titre de l'étape actuelle
  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Détails du trajet";
      case 2: return "Sélection du véhicule";
      case 3: return "Informations client";
      default: return "";
    }
  };
  
  // Afficher la confirmation en cas de succès
  if (bookingSuccess && bookingResult) {
    return (
      <div className="pb-6">
        <div className="flex items-center mb-6">
          <Link 
            href="/admin/bookings"
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg mr-3"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Réservation créée avec succès</h1>
            <p className="text-sm text-gray-600">Vous allez être redirigé vers la page de détails</p>
          </div>
        </div>
        
        <BookingSuccess bookingData={bookingResult} />
      </div>
    );
  }
  
  return (
    <div className="pb-6">
      {/* Header avec indication admin */}
      <div className="flex items-center mb-6">
        <Link 
          href="/admin/bookings"
          className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg mr-3"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-800">Nouvelle réservation</h1>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <FontAwesomeIcon icon={faUserShield} className="h-4 w-4 mr-2 text-primary" />
            <span>Création par l'administrateur</span>
          </div>
        </div>
      </div>
      
      {/* Formulaire de réservation */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Étapes du formulaire */}
          <BookingStepsHeader currentStep={currentStep} title={getStepTitle()} />
          
          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 md:mx-8 mt-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Étape 1: Détails du trajet */}
          {currentStep === 1 && (
            <BookingStepOne
              formValues={formValues}
              handleInputChange={updateFormValue}
              handleAddressSelect={handleAddressSelect}
              register={(name) => ({
                onChange: (e) => updateFormValue(name, e.target.value),
                name
              })}
              errors={{}}
              isCalculating={isCalculating}
              onSubmit={calculatePrice}
              isAdminContext={true}
            />
          )}
          
          {/* Étape 2: Sélection de véhicule */}
          {currentStep === 2 && (
            <BookingStepTwo
              formValues={formValues}
              availableVehicles={filteredVehicles}
              selectedVehicle={formValues.vehicleType}
              onVehicleSelect={handleVehicleSelect}
              onBack={goBack}
              showPriceRange={true}
            />
          )}
          
          {/* Étape 3: Informations client et confirmation */}
          {currentStep === 3 && (
            <BookingStepThree
              formValues={formValues}
              priceEstimate={priceEstimate}
              selectedVehicle={formValues.vehicleType}
              availableVehicles={availableVehicles}
              register={(name) => ({
                onChange: (e) => {
                  if (name.includes('customerInfo.')) {
                    const field = name.split('.')[1];
                    updateFormValue(`customerInfo.${field}`, e.target.value);
                  } else {
                    updateFormValue(name, e.target.value);
                  }
                },
                name,
                value: name.includes('customerInfo.') 
                  ? formValues.customerInfo[name.split('.')[1]] 
                  : formValues[name]
              })}
              errors={{}}
              onSubmit={handleSubmit}
              onBack={goBack}
              mapReady={mapReady}
              showPriceRange={true}
              isAdminContext={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookingForm;