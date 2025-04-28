"use client"

import { useState } from 'react'

const VehicleSelector = ({ vehicles, selectedVehicle, onSelect, passengers, luggage }) => {
  const [showDetails, setShowDetails] = useState(null)
  const formValues = { vehicleType: selectedVehicle };

  // Fonction pour formater le prix
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

  if (vehicles.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Aucun véhicule disponible pour {passengers} passagers et {luggage} bagages.</p>
      </div>
    )
  }

  // Identifier le véhicule recommandé (le 2ème moins cher si disponible, sinon le moins cher)
  const sortedByPrice = [...vehicles].sort((a, b) => a.price - b.price);
  const recommendedVehicle = sortedByPrice.length > 1 ? sortedByPrice[1].id : sortedByPrice[0].id;

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => (
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
                <h4 className="font-bold text-gray-800">{vehicle.name}</h4>
                <p className="text-sm text-gray-500">{vehicle.desc}</p>
                <div className="mt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="text-xs text-gray-600"><i className="fas fa-users mr-1"></i> {vehicle.capacity}</span>
                  <span className="text-xs text-gray-600"><i className="fas fa-suitcase mr-1"></i> {vehicle.luggage}</span>
                </div>
              </div>
              
              <div className="text-center md:text-right flex flex-col items-center md:items-end">
                <span className="font-bold text-xl text-primary">{formatPrice(vehicle.price)}</span>
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
              <h4 className="font-semibold text-gray-800 mb-4">Détails du prix</h4>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                  <span>Prix de base</span>
                  <span>{formatPrice(vehicle.estimate.breakdown?.baseFare || 0)}</span>
                </div>
                
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                  <span>Distance</span>
                  <span>{formatPrice(vehicle.estimate.breakdown?.distanceCharge || 0)}</span>
                </div>
                
                <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                  <span>Service et taxes</span>
                  <span>{formatPrice(vehicle.estimate.breakdown?.timeCharge || 0)}</span>
                </div>
                
                {vehicle.estimate.breakdown?.luggageCharge > 0 && (
                  <div className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                    <span>Supplément bagages ({luggage})</span>
                    <span>{formatPrice(vehicle.estimate.breakdown.luggageCharge)}</span>
                  </div>
                )}
                
                {vehicle.id === 'green' && vehicle.estimate.breakdown?.greenDiscount > 0 && (
                  <div className="flex justify-between border-b border-dashed border-gray-200 pb-2 text-green-600">
                    <span>Réduction Green</span>
                    <span>-{formatPrice(vehicle.estimate.breakdown.greenDiscount)}</span>
                  </div>
                )}
                
                {vehicle.id === 'premium' && vehicle.estimate.breakdown?.premiumSupplement > 0 && (
                  <div className="flex justify-between border-b border-dashed border-gray-200 pb-2 text-purple-600">
                    <span>Supplément premium</span>
                    <span>{formatPrice(vehicle.estimate.breakdown.premiumSupplement)}</span>
                  </div>
                )}
                
                {vehicle.id === 'sedan' && vehicle.estimate.breakdown?.sedanSupplement > 0 && (
                  <div className="flex justify-between border-b border-dashed border-gray-200 pb-2 text-orange-600">
                    <span>Supplément luxe</span>
                    <span>{formatPrice(vehicle.estimate.breakdown.sedanSupplement)}</span>
                  </div>
                )}
                
                {vehicle.id === 'van' && vehicle.estimate.breakdown?.vanSupplement > 0 && (
                  <div className="flex justify-between border-b border-dashed border-gray-200 pb-2 text-blue-600">
                    <span>Supplément Van</span>
                    <span>{formatPrice(vehicle.estimate.breakdown.vanSupplement)}</span>
                  </div>
                )}
                
                <div className="flex justify-between pt-2 font-bold text-lg">
                  <span>Prix total</span>
                  <span className="text-primary">{formatPrice(vehicle.estimate.exactPrice)}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Caractéristiques du véhicule</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> {vehicle.capacity}</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> {vehicle.luggage}</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Wifi gratuit à bord</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Bouteille d'eau offerte</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Sièges en cuir</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Chargeurs pour téléphone</li>
                  {vehicle.id === 'green' && (
                    <>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> 100% électrique</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Zéro émission CO2</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Écran tactile</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Système de divertissement</li>
                    </>
                  )}
                  {vehicle.id === 'premium' && (
                    <>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Intérieur haut de gamme</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Minibar</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Éclairage d'ambiance</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Confort supérieur</li>
                    </>
                  )}
                  {vehicle.id === 'sedan' && (
                    <>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Finitions luxueuses</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Sièges massants</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Système audio premium</li>
                    </>
                  )}
                  {vehicle.id === 'van' && (
                    <>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Espace intérieur spacieux</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Configuration salon privé</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Séparation chauffeur</li>
                      <li className="flex items-center"><i className="fas fa-check text-primary mr-2"></i> Tables de travail</li>
                    </>
                  )}
                </ul>
              </div>
              
              {formValues && formValues.vehicleType === vehicle.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      // La fonction onSelect est déjà appelée lors du clic sur la div parente
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
      ))}
    </div>
  )
}

export default VehicleSelector