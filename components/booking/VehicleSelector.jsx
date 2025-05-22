// components/booking/VehicleSelector.jsx
"use client"

import { useState } from 'react'

const VehicleSelector = ({ vehicles, selectedVehicle, onSelect, passengers, luggage }) => {
  // Vérifie que vehicles est toujours un tableau
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  if (safeVehicles.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Aucun véhicule disponible pour {passengers} passagers et {luggage} bagages.</p>
      </div>
    )
  }

  // Définir la voiture recommandée comme 'green'
  const recommendedVehicle = 'green';

  return (
    <div className="space-y-4">
      {safeVehicles.map((vehicle) => {
        if (!vehicle) {
          return null;
        }

        // Utiliser directement le prix spécifique du véhicule
        const vehiclePrice = vehicle.price || 0;
        
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
                <div className="absolute bottom-0 right-0 bg-green-500 text-white text-xs font-bold py-1 px-4 rounded-tl-lg">
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
                  <span className="font-bold text-xl text-primary">{formatPrice(vehiclePrice)}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VehicleSelector