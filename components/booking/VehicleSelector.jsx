// components/booking/VehicleSelector.jsx - Version simplifiée sans détails de calcul
"use client"

import { useState } from 'react'

const VehicleSelector = ({ vehicles, selectedVehicle, onSelect, passengers, luggage }) => {
  const [showDetails, setShowDetails] = useState(null)
  const formValues = { vehicleType: selectedVehicle };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  const toggleDetails = (vehicleId) => {
    if (showDetails === vehicleId) {
      setShowDetails(null)
    } else {
      setShowDetails(vehicleId)
    }
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Aucun véhicule disponible pour {passengers} passagers et {luggage} bagages.</p>
      </div>
    )
  }

  const recommendedVehicle = vehicles.find(v => v.id === 'premium')?.id || vehicles[0]?.id;

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => {
        if (!vehicle || !vehicle.estimate) {
          return null;
        }

        const exactPrice = vehicle.estimate.exactPrice || vehicle.price || 0;
        
        return (
          <div key={vehicle.id} className="space-y-4">
            <div 
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedVehicle === vehicle.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${vehicle.id === recommendedVehicle ? 'relative' : ''}`}
              onClick={() => onSelect(vehicle.id, vehicle.estimate)}
            >
              {vehicle.id === recommendedVehicle && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-primary text-white text-xs font-bold py-1 px-3 rounded-full">
                  Recommandé
                </div>
              )}
              
              <div className="flex flex-col md:flex-row p-4">
                <div className="flex items-center justify-center md:w-14 md:mr-4 mb-3 md:mb-0">
                  {vehicle.id === 'green' && <i className="fas fa-leaf text-green-500 text-2xl"></i>}
                  {vehicle.id === 'premium' && <i className="fas fa-car text-primary text-2xl"></i>}
                  {vehicle.id === 'sedan' && <i className="fas fa-car-side text-primary text-2xl"></i>}
                  {vehicle.id === 'van' && <i className="fas fa-shuttle-van text-primary text-2xl"></i>}
                </div>
                
                <div className="md:flex-1 text-center md:text-left mb-4 md:mb-0">
                  <h4 className="font-bold text-gray-800">{vehicle.name || 'Véhicule'}</h4>
                  <p className="text-sm text-gray-500">{vehicle.desc || 'Description non disponible'}</p>
                  <div className="mt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="text-xs text-gray-600">
                      <i className="fas fa-users mr-1"></i> 
                      {vehicle.capacity || 'Non spécifié'}
                    </span>
                    <span className="text-xs text-gray-600">
                      <i className="fas fa-suitcase mr-1"></i> 
                      {vehicle.luggage || 'Non spécifié'}
                    </span>
                  </div>
                </div>
                
                <div className="text-center md:text-right flex flex-col items-center md:items-end">
                  <span className="font-bold text-xl text-primary">{formatPrice(exactPrice)}</span>
                  <button 
                    type="button" 
                    className="mt-2 text-sm text-gray-500 hover:text-primary flex items-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleDetails(vehicle.id)
                    }}
                  >
                    Détails
                    <i className={`fas fa-chevron-${showDetails === vehicle.id ? 'up' : 'down'} ml-1 text-xs`}></i>
                  </button>
                </div>
              </div>
            </div>
            
            {showDetails === vehicle.id && (
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 animate-fadeIn">
                <h4 className="font-semibold text-gray-800 mb-4">Caractéristiques du véhicule</h4>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> {vehicle.capacity || 'Capacité non spécifiée'}</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> {vehicle.luggage || 'Bagages non spécifiés'}</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Wifi gratuit à bord</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Bouteille d'eau offerte</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Sièges en cuir</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Chargeurs pour téléphone</li>
                  {vehicle.id === 'green' && (
                    <>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> 100% électrique (Model 3)</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Zéro émission CO2</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Écran tactile</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Système de divertissement</li>
                    </>
                  )}
                  {vehicle.id === 'premium' && (
                    <>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Mercedes Classe E</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Intérieur premium</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Éclairage d'ambiance</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Confort supérieur</li>
                    </>
                  )}
                  {vehicle.id === 'sedan' && (
                    <>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Mercedes Classe S</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Finitions luxueuses</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Sièges massants</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Système audio premium</li>
                    </>
                  )}
                  {vehicle.id === 'van' && (
                    <>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Mercedes Classe V</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Espace intérieur spacieux</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Configuration salon privé</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Séparation chauffeur</li>
                    </>
                  )}
                </ul>
                
                {/* Section prix (simplifiée) */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-lg">Prix total</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(exactPrice)}</span>
                  </div>
                </div>
                
                {formValues && formValues.vehicleType === vehicle.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Véhicule sélectionné
                    </button>
                  </div>
                )}
                
                {(!formValues || formValues.vehicleType !== vehicle.id) && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full py-2 px-4 bg-white border border-primary text-primary font-medium rounded-md hover:bg-primary/10 transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(vehicle.id, vehicle.estimate);
                      }}
                    >
                      Sélectionner ce véhicule
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default VehicleSelector