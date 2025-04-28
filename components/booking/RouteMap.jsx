"use client";

import { useEffect, useRef, useState } from 'react';

const RouteMap = ({ pickupAddress, dropoffAddress, pickupPlaceId, dropoffPlaceId, polyline }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [map, setMap] = useState(null);
  const [loadingError, setLoadingError] = useState(null);
  
  // État pour suivre si les adresses ont changé
  const [addressesChanged, setAddressesChanged] = useState(false);
  
  // Surveiller les changements d'adresses
  useEffect(() => {
    setAddressesChanged(true);
  }, [pickupAddress, dropoffAddress, pickupPlaceId, dropoffPlaceId]);

  // Charger le script Google Maps avec une gestion d'erreur améliorée
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }
      
      if (window.googleMapsLoading) return;
      window.googleMapsLoading = true;
      
      window.initMap = () => {
        window.googleMapsLoading = false;
        setMapLoaded(true);
      };
      
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places,geometry&v=weekly&loading=async`;
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        console.error('Impossible de charger le script Google Maps');
        setLoadingError('Impossible de charger le script Google Maps');
        window.googleMapsLoading = false;
      };
      
      document.head.appendChild(script);
    };
    
    loadGoogleMapsScript();
    
    // Nettoyage lors du démontage
    return () => {
      if (map) {
        window.google?.maps?.event.clearInstanceListeners(map);
      }
    };
  }, []);
  
  // Initialiser la carte quand le script est chargé ou quand le composant est remonté
  useEffect(() => {
    // Vérifier que:
    // 1. Le script est chargé
    // 2. La référence au conteneur de la carte existe
    // 3. Soit la carte n'est pas initialisée, soit les adresses ont changé
    if (!mapLoaded || !mapRef.current || (mapInitialized && !addressesChanged)) return;
    
    console.log('Initialisation/actualisation de la carte avec:', { 
      pickupAddress, 
      dropoffAddress,
      pickupPlaceId,
      dropoffPlaceId
    });
    
    const initializeMap = async () => {
      try {
        // Personnalisation du style de la carte pour correspondre à votre thème
        const mapStyles = [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{ "lightness": "0" }, { "gamma": "1" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{ "visibility": "simplified" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{ "color": "#f5f5f5" }]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "transit.station",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "simplified" }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#a3ccff" }, { "visibility": "on" }]
          }
        ];
        
        // Créer ou récupérer l'instance de carte
        let mapInstance = map;
        if (!mapInstance) {
          // Créer une nouvelle carte
          mapInstance = new window.google.maps.Map(mapRef.current, {
            zoom: 12,
            center: { lat: 48.856614, lng: 2.3522219 }, // Paris
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            zoomControl: true,
            styles: mapStyles,
            disableDefaultUI: true,
            scrollwheel: false,
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_BOTTOM
            }
          });
          
          setMap(mapInstance);
        }
        
        // Nettoyer les marqueurs et polylines existants
        mapInstance.overlayMapTypes.clear();
        const overlays = mapInstance.__overlays || [];
        overlays.forEach(overlay => {
          if (overlay) overlay.setMap(null);
        });
        mapInstance.__overlays = [];
        
        // Si nous avons déjà les identifiants de lieu, nous pouvons afficher la route
        if (pickupPlaceId && dropoffPlaceId) {
          await displayRoute(mapInstance, pickupPlaceId, dropoffPlaceId, polyline);
        } else if (pickupAddress && dropoffAddress) {
          // Sinon, convertir les adresses en coordonnées
          await displayRouteFromAddresses(mapInstance, pickupAddress, dropoffAddress);
        }
        
        setMapInitialized(true);
        setAddressesChanged(false);
      } catch (error) {
        console.error("Erreur lors de l'initialisation de la carte:", error);
        setLoadingError(`Erreur lors de l'initialisation de la carte: ${error.message}`);
      }
    };
    
    initializeMap();
  }, [mapLoaded, addressesChanged, pickupAddress, dropoffAddress, pickupPlaceId, dropoffPlaceId, polyline, map, mapInitialized]);
  
  // Fonction pour afficher l'itinéraire à partir d'adresses
  const displayRouteFromAddresses = async (mapInstance, pickup, dropoff) => {
    // Convertir les adresses en coordonnées
    const geocoder = new window.google.maps.Geocoder();
    
    try {
      // Obtenir les coordonnées du point de départ
      const pickupResults = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: pickup }, (results, status) => {
          if (status === 'OK') resolve(results[0]);
          else reject(new Error(`Géocodage impossible pour ${pickup}: ${status}`));
        });
      });
      
      // Obtenir les coordonnées du point d'arrivée
      const dropoffResults = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: dropoff }, (results, status) => {
          if (status === 'OK') resolve(results[0]);
          else reject(new Error(`Géocodage impossible pour ${dropoff}: ${status}`));
        });
      });
      
      // Calculer et afficher l'itinéraire
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map: mapInstance,
        suppressMarkers: true, // On va créer nos propres marqueurs personnalisés
        polylineOptions: {
          strokeColor: '#d4af37', // Couleur primaire
          strokeWeight: 5,
          strokeOpacity: 0.8
        }
      });
      
      // Sauvegarder le renderer pour nettoyage ultérieur
      mapInstance.__overlays = mapInstance.__overlays || [];
      mapInstance.__overlays.push(directionsRenderer);
      
      const result = await new Promise((resolve, reject) => {
        directionsService.route({
          origin: pickupResults.geometry.location,
          destination: dropoffResults.geometry.location,
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: false,
          provideRouteAlternatives: false,
          avoidFerries: true,
          avoidHighways: false,
          avoidTolls: false,
        }, (response, status) => {
          if (status === 'OK') resolve(response);
          else reject(new Error(`Calcul d'itinéraire impossible: ${status}`));
        });
      });
      
      directionsRenderer.setDirections(result);
      
      // Ajouter des marqueurs personnalisés
      const marker1 = addCustomMarker(mapInstance, pickupResults.geometry.location, 'A', 'Départ');
      const marker2 = addCustomMarker(mapInstance, dropoffResults.geometry.location, 'B', 'Arrivée');
      
      // Sauvegarder les marqueurs pour nettoyage ultérieur
      mapInstance.__overlays.push(marker1, marker2);
      
      // Ajuster la vue pour voir l'ensemble de l'itinéraire
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(pickupResults.geometry.location);
      bounds.extend(dropoffResults.geometry.location);
      mapInstance.fitBounds(bounds);
    } catch (error) {
      console.error("Erreur lors de l'affichage de l'itinéraire:", error);
      
      // Fallback: Afficher juste des marqueurs pour le départ et l'arrivée
      try {
        const parisCoords = { lat: 48.856614, lng: 2.3522219 };
        const marker1 = addCustomMarker(mapInstance, parisCoords, 'A', 'Départ');
        
        const coordsB = { 
          lat: parisCoords.lat + (Math.random() * 0.1 - 0.05), 
          lng: parisCoords.lng + (Math.random() * 0.1 - 0.05) 
        };
        const marker2 = addCustomMarker(mapInstance, coordsB, 'B', 'Arrivée');
        
        // Sauvegarder les marqueurs pour nettoyage ultérieur
        mapInstance.__overlays = mapInstance.__overlays || [];
        mapInstance.__overlays.push(marker1, marker2);
        
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(parisCoords);
        bounds.extend(coordsB);
        mapInstance.fitBounds(bounds);
      } catch (markerError) {
        console.error("Impossible d'afficher les marqueurs:", markerError);
      }
    }
  };
  
  // Fonction pour ajouter des marqueurs personnalisés avec le style
  const addCustomMarker = (mapInstance, position, label, title) => {
    const backgroundColor = label === 'A' ? '#d4af37' : '#1c2938'; // Couleurs primaire et secondaire
    
    const marker = new window.google.maps.Marker({
      position: position,
      map: mapInstance,
      label: {
        text: label,
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold'
      },
      title: title,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: backgroundColor,
        fillOpacity: 1,
        strokeColor: 'white',
        strokeWeight: 2,
        scale: 12
      },
      animation: window.google.maps.Animation.DROP,
      zIndex: 10
    });
    
    return marker;
  };
  
  // Fonction pour afficher l'itinéraire à partir des identifiants de lieu
  const displayRoute = async (mapInstance, originPlaceId, destinationPlaceId, encodedPolyline) => {
    if (encodedPolyline && window.google.maps.geometry) {
      // Si nous avons un polyline encodé, l'utiliser
      try {
        const decodedPath = window.google.maps.geometry.encoding.decodePath(encodedPolyline);
        
        const polyline = new window.google.maps.Polyline({
          path: decodedPath,
          geodesic: true,
          strokeColor: '#d4af37', // Couleur primaire
          strokeOpacity: 0.8,
          strokeWeight: 5,
          map: mapInstance
        });
        
        // Sauvegarder le polyline pour nettoyage ultérieur
        mapInstance.__overlays = mapInstance.__overlays || [];
        mapInstance.__overlays.push(polyline);
        
        // Ajouter des marqueurs personnalisés pour les points de départ et d'arrivée
        if (decodedPath.length > 0) {
          const startPoint = decodedPath[0];
          const endPoint = decodedPath[decodedPath.length - 1];
          
          const marker1 = addCustomMarker(mapInstance, startPoint, 'A', 'Départ');
          const marker2 = addCustomMarker(mapInstance, endPoint, 'B', 'Arrivée');
          
          // Sauvegarder les marqueurs pour nettoyage ultérieur
          mapInstance.__overlays.push(marker1, marker2);
          
          // Ajuster la vue
          const bounds = new window.google.maps.LatLngBounds();
          decodedPath.forEach(point => bounds.extend(point));
          mapInstance.fitBounds(bounds);
        }
        
        return;
      } catch (error) {
        console.error("Erreur lors du décodage du polyline:", error);
        // Continuer avec l'autre méthode si le décodage échoue
      }
    }
    
    // Utiliser le service Directions
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: true, // On va créer nos propres marqueurs personnalisés
      polylineOptions: {
        strokeColor: '#d4af37', // Couleur primaire
        strokeWeight: 5,
        strokeOpacity: 0.8
      }
    });
    
    // Sauvegarder le renderer pour nettoyage ultérieur
    mapInstance.__overlays = mapInstance.__overlays || [];
    mapInstance.__overlays.push(directionsRenderer);
    
    try {
      const response = await new Promise((resolve, reject) => {
        directionsService.route({
          origin: { placeId: originPlaceId },
          destination: { placeId: destinationPlaceId },
          travelMode: window.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: false,
          provideRouteAlternatives: false,
          avoidFerries: true,
          avoidHighways: false,
          avoidTolls: false,
        }, (response, status) => {
          if (status === 'OK') resolve(response);
          else reject(new Error(`Calcul d'itinéraire impossible avec placeIds: ${status}`));
        });
      });
    
      directionsRenderer.setDirections(response);
      
      // Ajouter des marqueurs personnalisés
      const route = response.routes[0].legs[0];
      const marker1 = addCustomMarker(mapInstance, route.start_location, 'A', 'Départ');
      const marker2 = addCustomMarker(mapInstance, route.end_location, 'B', 'Arrivée');
      
      // Sauvegarder les marqueurs pour nettoyage ultérieur
      mapInstance.__overlays.push(marker1, marker2);
    } catch (error) {
      console.error("Erreur lors du calcul de l'itinéraire:", error);
      
      // Fallback: utiliser les adresses textuelles
      if (pickupAddress && dropoffAddress) {
        await displayRouteFromAddresses(mapInstance, pickupAddress, dropoffAddress);
      }
    }
  };
  
  return (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {loadingError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-red-500 text-center p-4">
            <p className="font-medium">Erreur lors du chargement de la carte</p>
            <p className="text-sm mt-2">{loadingError}</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ display: mapLoaded && !loadingError ? 'block' : 'none' }}
        aria-label="Carte montrant l'itinéraire du trajet"
        role="application"
      ></div>
      
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 px-2 py-1 rounded-md text-xs">
        <p className="text-gray-600">Itinéraire approximatif</p>
      </div>
    </div>
  );
};

export default RouteMap;