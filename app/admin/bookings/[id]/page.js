"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

// Import des composants
import BookingDetailsHeader from '@/components/admin/BookingDetailsHeader';
import RouteMap from '@/components/booking/RouteMap';
import BookingTripDetails from '@/components/admin/BookingTripDetails';
import BookingServiceDetails from '@/components/admin/BookingServiceDetails';
import BookingHistory from '@/components/admin/BookingHistory';
import BookingStatusActions from '@/components/admin/BookingStatusActions';
import BookingCustomerInfo from '@/components/admin/BookingCustomerInfo';
import BookingNotes from '@/components/admin/BookingNotes';
import BookingNotesModal from '@/components/admin/BookingNotesModal';
import { 
  BookingLoadingState, 
  BookingErrorState, 
  BookingNotFoundState 
} from '@/components/admin/BookingStates';

export default function BookingDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const bookingId = params.id;
  
  // États principaux
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour les actions
  const [statusChanging, setStatusChanging] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  
  // Récupérer les détails de la réservation
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/bookings/${bookingId}`);
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || 'Erreur lors de la récupération de la réservation');
        }
        
        setBooking(data.data);
        setNotes(data.data.notes || '');
        setAdminNotes(data.data.adminNotes || '');
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);
  
  // Fonction pour changer le statut
  const handleStatusChange = async (newStatus) => {
    try {
      setStatusChanging(true);
      
      // Confirmation pour certains changements
      let confirmMessage = '';
      switch (newStatus) {
        case 'in_progress':
          confirmMessage = 'Êtes-vous sûr de vouloir démarrer cette course ?';
          break;
        case 'completed':
          confirmMessage = 'Êtes-vous sûr de marquer cette course comme terminée ?';
          break;
        case 'cancelled':
          confirmMessage = 'Êtes-vous sûr de vouloir annuler cette réservation ?';
          break;
        default:
          confirmMessage = `Êtes-vous sûr de vouloir changer le statut vers "${newStatus}" ?`;
      }
      
      if (!confirm(confirmMessage)) {
        setStatusChanging(false);
        return;
      }
      
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la mise à jour');
      }
      
      const data = await response.json();
      setBooking(data.data);
      alert(`Statut mis à jour avec succès: ${newStatus}`);
    } catch (error) {
      console.error('Erreur:', error);
      alert(`Erreur lors de la mise à jour: ${error.message}`);
    } finally {
      setStatusChanging(false);
    }
  };
  
  // Fonction pour sauvegarder les notes
  const handleSaveNotes = async () => {
    try {
      setSavingNotes(true);
      
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          notes: notes,
          adminNotes: adminNotes 
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la sauvegarde');
      }
      
      const data = await response.json();
      setBooking(data.data);
      setShowNotesModal(false);
      alert('Notes sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      alert(`Erreur lors de la sauvegarde: ${error.message}`);
    } finally {
      setSavingNotes(false);
    }
  };
  
  // Fonction pour appeler le client
  const handleCallClient = () => {
    if (booking?.customerInfo?.phone) {
      window.location.href = `tel:${booking.customerInfo.phone}`;
    }
  };
  
  // Fonction pour envoyer un email
  const handleEmailClient = () => {
    if (booking?.customerInfo?.email) {
      const formatDateTime = (dateString) => {
        if (!dateString) return 'Non spécifié';
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      };
      
      const subject = `Concernant votre réservation ${booking.bookingId}`;
      const body = `Bonjour ${booking.customerInfo.name},\n\nConcernant votre réservation ${booking.bookingId} prévue le ${formatDateTime(booking.pickupDateTime)}.\n\nCordialement,\nElysian Luxury Chauffeurs`;
      window.location.href = `mailto:${booking.customerInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  };
  
  // Gestion des états de chargement
  if (loading) {
    return <BookingLoadingState />;
  }
  
  if (error) {
    return <BookingErrorState error={error} />;
  }
  
  if (!booking) {
    return <BookingNotFoundState />;
  }
  
  return (
    <div className="space-y-6">
      {/* En-tête avec navigation */}
      <BookingDetailsHeader 
        booking={booking}
        onNotesClick={() => setShowNotesModal(true)}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale - Détails de la réservation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Carte du trajet */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Carte du trajet
            </h2>
            <div className="h-64 rounded-lg overflow-hidden">
              <RouteMap 
                pickupAddress={booking.pickupAddress}
                dropoffAddress={booking.dropoffAddress}
                pickupPlaceId={booking.pickupAddressPlaceId}
                dropoffPlaceId={booking.dropoffAddressPlaceId}
                polyline={booking.polyline}
              />
            </div>
          </div>
          
          <BookingTripDetails booking={booking} />
          <BookingServiceDetails booking={booking} />
          <BookingHistory booking={booking} />
        </div>
        
        {/* Colonne latérale - Actions et informations client */}
        <div className="space-y-6">
          <BookingStatusActions 
            booking={booking}
            onStatusChange={handleStatusChange}
            statusChanging={statusChanging}
          />
          <BookingCustomerInfo 
            booking={booking}
            onCallClient={handleCallClient}
            onEmailClient={handleEmailClient}
          />
          <BookingNotes booking={booking} />
        </div>
      </div>
      
      {/* Modal de gestion des notes */}
      <BookingNotesModal 
        showModal={showNotesModal}
        notes={notes}
        adminNotes={adminNotes}
        onNotesChange={setNotes}
        onAdminNotesChange={setAdminNotes}
        onSave={handleSaveNotes}
        onClose={() => setShowNotesModal(false)}
        saving={savingNotes}
      />
    </div>
  );
}