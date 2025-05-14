import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faMapMarkerAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

/**
 * Composant carte simple pour afficher le trajet dans l'admin
 */
const AdminRouteMap = ({ pickupAddress, dropoffAddress, height = "256px" }) => {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let map;
    let directionsService;
    let directionsRenderer;

    const initializeMap = async () => {
      try {
        setLoading(true);
        setError(null);

        // Vérifier si Google Maps est chargé
        if (!window.google || !window.google.maps) {
          // Attendre un peu et réessayer
          setTimeout(initializeMap, 500);
          return;
        }

        // Initialiser la carte
        map = new window.google.maps.Map(mapRef.current, {
          zoom: 10,
          center: { lat: 48.8566, lng: 2.3522 }, // Paris par défaut
          mapTypeId: 'roadmap',
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Si on a les deux adresses, calculer l'itinéraire
        if (pickupAddress && dropoffAddress) {
          directionsService = new window.google.maps.DirectionsService();
          directionsRenderer = new window.google.maps.DirectionsRenderer({
            draggable: false,
            polylineOptions: {
              strokeColor: '#d4af37',
              strokeWeight: 4,
              strokeOpacity: 0.8
            }
          });

          directionsRenderer.setMap(map);

          const request = {
            origin: pickupAddress,
            destination: dropoffAddress,
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC
          };

          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
              setLoading(false);
              setMapReady(true);
            } else {
              console.error('Erreur directions:', status);
              // Fallback: géocoder les adresses individuellement
              geocodeAddresses();
            }
          });
        } else {
          // Si on n'a qu'une adresse ou aucune, essayer de la géocoder
          geocodeAddresses();
        }

        function geocodeAddresses() {
          const geocoder = new window.google.maps.Geocoder();
          const bounds = new window.google.maps.LatLngBounds();
          let markersAdded = 0;

          // Géocoder l'adresse de départ
          if (pickupAddress) {
            geocoder.geocode({ address: pickupAddress }, (results, status) => {
              if (status === 'OK') {
                const marker = new window.google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title: 'Départ: ' + pickupAddress,
                  icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    scaledSize: new window.google.maps.Size(32, 32)
                  }
                });
                bounds.extend(results[0].geometry.location);
                markersAdded++;
                checkBounds();
              }
            });
          }

          // Géocoder l'adresse d'arrivée
          if (dropoffAddress) {
            geocoder.geocode({ address: dropoffAddress }, (results, status) => {
              if (status === 'OK') {
                const marker = new window.google.maps.Marker({
                  position: results[0].geometry.location,
                  map: map,
                  title: 'Arrivée: ' + dropoffAddress,
                  icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    scaledSize: new window.google.maps.Size(32, 32)
                  }
                });
                bounds.extend(results[0].geometry.location);
                markersAdded++;
                checkBounds();
              }
            });
          }

          function checkBounds() {
            if (markersAdded > 0) {
              if (markersAdded === 1) {
                map.setCenter(bounds.getCenter());
                map.setZoom(13);
              } else {
                map.fitBounds(bounds);
              }
              setLoading(false);
              setMapReady(true);
            }
          }

          // Si aucune adresse n'est fournie, arrêter le chargement après un timeout
          if (!pickupAddress && !dropoffAddress) {
            setTimeout(() => {
              setLoading(false);
              setError('Aucune adresse fournie');
            }, 1000);
          }
        }

      } catch (err) {
        console.error('Erreur lors de l\'initialisation de la carte:', err);
        setError('Erreur lors du chargement de la carte');
        setLoading(false);
      }
    };

    // Démarrer l'initialisation après un court délai
    const timeoutId = setTimeout(initializeMap, 100);

    // Nettoyage
    return () => {
      clearTimeout(timeoutId);
      if (map) {
        // Nettoyer la carte si elle existe
      }
    };
  }, [pickupAddress, dropoffAddress]);

  // État de chargement
  if (loading) {
    return (
      <div 
        style={{ height }} 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-2xl text-primary mb-2" />
          <p className="text-sm text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div 
        style={{ height }} 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
      >
        <div className="text-center">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl text-orange-500 mb-2" />
          <p className="text-sm text-gray-600">{error}</p>
          <div className="mt-2 text-xs text-gray-500">
            <div>Départ: {pickupAddress || 'Non spécifié'}</div>
            <div>Arrivée: {dropoffAddress || 'Non spécifiée'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height }} className="w-full">
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default AdminRouteMap;