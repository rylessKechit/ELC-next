"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,
  faList,
  faSpinner,
  faExclamationTriangle,
  faFilter,
  faCalendarDay,
  faCalendarWeek,
  faCalendar,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

// Import des composants
import PlanningDayView from '@/components/admin/planning/PlanningDayView';
import PlanningWeekView from '@/components/admin/planning/PlanningWeekView';
import PlanningMonthView from '@/components/admin/planning/PlanningMonthView';
import PlanningListView from '@/components/admin/planning/PlanningListView';

export default function PlanningPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  
  // Navigation dans le calendrier
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    
    setCurrentDate(newDate);
  };
  
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    
    setCurrentDate(newDate);
  };
  
  const navigateToday = () => {
    setCurrentDate(new Date());
  };
  
  // Récupérer les réservations
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Calculer les dates de début et de fin
        let startDate, endDate;
        
        if (view === 'day') {
          startDate = new Date(currentDate);
          startDate.setHours(0, 0, 0, 0);
          
          endDate = new Date(currentDate);
          endDate.setHours(23, 59, 59, 999);
        } else if (view === 'week') {
          const day = currentDate.getDay();
          startDate = new Date(currentDate);
          startDate.setDate(currentDate.getDate() - (day === 0 ? 6 : day - 1));
          startDate.setHours(0, 0, 0, 0);
          
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);
          endDate.setHours(23, 59, 59, 999);
        } else if (view === 'month') {
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          endDate.setHours(23, 59, 59, 999);
        } else {
          // Vue liste - prochains 30 jours
          startDate = new Date();
          startDate.setHours(0, 0, 0, 0);
          endDate = new Date();
          endDate.setDate(endDate.getDate() + 30);
          endDate.setHours(23, 59, 59, 999);
        }
        
        let url = `/api/bookings?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&limit=100`;
        
        if (statusFilter) {
          url += `&status=${statusFilter}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des réservations');
        }
        
        const data = await response.json();
        setBookings(data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [currentDate, view, statusFilter]);
  
  // Fonction utilitaire pour obtenir l'ID de réservation
  const getBookingIdForUrl = (booking) => {
    return booking.bookingId || booking._id;
  };

  // Fonction pour formater le temps
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  // Fonction pour grouper les réservations par jour
  const groupBookingsByDay = (bookingsArray, date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    return bookingsArray.filter(booking => {
      const bookingDate = new Date(booking.pickupDateTime);
      return bookingDate.toISOString().split('T')[0] === dateStr;
    }).sort((a, b) => {
      return new Date(a.pickupDateTime) - new Date(b.pickupDateTime);
    });
  };
  
  // Formatage du titre de la vue
  const formatViewTitle = () => {
    if (view === 'day') {
      return currentDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else if (view === 'week') {
      const day = currentDate.getDay();
      const firstDay = new Date(currentDate);
      firstDay.setDate(currentDate.getDate() - (day === 0 ? 6 : day - 1));
      
      const lastDay = new Date(firstDay);
      lastDay.setDate(firstDay.getDate() + 6);
      
      if (firstDay.getMonth() === lastDay.getMonth()) {
        return `${firstDay.getDate()} - ${lastDay.getDate()} ${firstDay.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
      } else if (firstDay.getFullYear() === lastDay.getFullYear()) {
        return `${firstDay.getDate()} ${firstDay.toLocaleDateString('fr-FR', { month: 'long' })} - ${lastDay.getDate()} ${lastDay.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
      } else {
        return `${firstDay.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} - ${lastDay.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`;
      }
    } else if (view === 'month') {
      return currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    } else {
      return 'Réservations à venir';
    }
  };
  
  // Rendu du contenu selon la vue
  const renderContent = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-primary text-2xl mb-2" />
          <p className="text-gray-500">Chargement du planning...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-red-500">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl mb-2" />
          <p>{error}</p>
        </div>
      );
    }
    
    switch (view) {
      case 'day':
        return <PlanningDayView bookings={bookings} currentDate={currentDate} groupBookingsByDay={groupBookingsByDay} />;
      case 'week':
        return <PlanningWeekView bookings={bookings} currentDate={currentDate} groupBookingsByDay={groupBookingsByDay} getBookingIdForUrl={getBookingIdForUrl} />;
      case 'month':
        return <PlanningMonthView bookings={bookings} currentDate={currentDate} groupBookingsByDay={groupBookingsByDay} getBookingIdForUrl={getBookingIdForUrl} formatTime={formatTime} />;
      case 'list':
        return <PlanningListView bookings={bookings} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="pb-4">
      {/* Header mobile optimisé */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Planning</h2>
          <div className="text-sm text-gray-500">
            {bookings.length} réservation{bookings.length > 1 ? 's' : ''} 
            {view !== 'list' && ` - ${formatViewTitle()}`}
          </div>
        </div>
        
        {/* Boutons d'action */}
        <div className="grid grid-cols-2 gap-3">
          <Link 
            href="/admin/bookings/new" 
            className="flex items-center justify-center bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark hover:text-white transition-colors text-sm font-medium"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Nouvelle réservation
          </Link>
          <Link 
            href="/admin/bookings" 
            className="flex items-center justify-center bg-secondary text-white px-4 py-3 rounded-lg hover:bg-secondary-dark transition-colors text-sm font-medium"
          >
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Liste des réservations
          </Link>
        </div>
      </div>
      
      {/* Contrôles du planning */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
        {/* Sélecteur de vue */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('day')}
              className={`flex flex-col items-center py-2 px-1 rounded-md text-xs font-medium transition-colors ${
                view === 'day'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FontAwesomeIcon icon={faCalendarDay} className="h-4 w-4 mb-1" />
              Jour
            </button>
            <button
              onClick={() => setView('week')}
              className={`flex flex-col items-center py-2 px-1 rounded-md text-xs font-medium transition-colors ${
                view === 'week'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FontAwesomeIcon icon={faCalendarWeek} className="h-4 w-4 mb-1" />
              Semaine
            </button>
            <button
              onClick={() => setView('month')}
              className={`flex flex-col items-center py-2 px-1 rounded-md text-xs font-medium transition-colors ${
                view === 'month'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mb-1" />
              Mois
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex flex-col items-center py-2 px-1 rounded-md text-xs font-medium transition-colors ${
                view === 'list'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FontAwesomeIcon icon={faList} className="h-4 w-4 mb-1" />
              Liste
            </button>
          </div>
        </div>
        
        {/* Navigation et filtres */}
        <div className="p-4">
          {view !== 'list' && (
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={navigatePrevious}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Période précédente"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
              </button>
              
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {formatViewTitle()}
                </h3>
                <button
                  onClick={navigateToday}
                  className="text-xs text-primary hover:underline mt-1"
                >
                  Aller à aujourd'hui
                </button>
              </div>
              
              <button
                onClick={navigateNext}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Période suivante"
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
              </button>
            </div>
          )}
          
          <div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <FontAwesomeIcon icon={faFilter} className="text-gray-500 mr-2" />
                <span className="font-medium text-gray-700">Filtres</span>
                {statusFilter && (
                  <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {statusFilter}
                  </span>
                )}
              </div>
              <FontAwesomeIcon 
                icon={faChevronLeft} 
                className={`text-gray-500 transition-transform duration-200 ${showFilters ? 'rotate-90' : '-rotate-90'}`} 
              />
            </button>
            
            {showFilters && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-base"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="in_progress">En cours</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div>
        {renderContent()}
      </div>
    </div>
  );
}