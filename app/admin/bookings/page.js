"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import BookingStatusBadge from '@/components/admin/BookingStatusBadge';

export default function BookingsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const bookingsPerPage = 10;
  
  // État pour les filtres
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  
  // Récupérer les réservations
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Si nous sommes en mode développement, utiliser des données simulées
        if (process.env.NODE_ENV === 'development') {
          // Simuler un délai réseau
          await new Promise((resolve) => setTimeout(resolve, 800));
          
          // Générer des données simulées
          const mockBookings = [];
          const statuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
          
          for (let i = 0; i < 20; i++) {
            const today = new Date();
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + Math.floor(Math.random() * 14));
            
            mockBookings.push({
              _id: `mock-id-${i}`,
              bookingId: `ELC-${100000 + i}`,
              status: statuses[Math.floor(Math.random() * statuses.length)],
              pickupAddress: `Adresse de départ ${i}`,
              dropoffAddress: `Adresse d'arrivée ${i}`,
              pickupDateTime: futureDate.toISOString(),
              customerInfo: {
                name: `Client ${i}`,
                email: `client${i}@example.com`,
                phone: `+3361234567${i}`
              }
            });
          }
          
          // Appliquer les filtres
          let filteredBookings = [...mockBookings];
          
          if (statusFilter) {
            filteredBookings = filteredBookings.filter(booking => booking.status === statusFilter);
          }
          
          if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredBookings = filteredBookings.filter(booking => 
              booking.bookingId.toLowerCase().includes(term) ||
              booking.customerInfo.name.toLowerCase().includes(term) ||
              booking.customerInfo.email.toLowerCase().includes(term) ||
              booking.pickupAddress.toLowerCase().includes(term) ||
              booking.dropoffAddress.toLowerCase().includes(term)
            );
          }
          
          if (dateRange.startDate) {
            const startDate = new Date(dateRange.startDate);
            startDate.setHours(0, 0, 0, 0);
            
            filteredBookings = filteredBookings.filter(booking => {
              const bookingDate = new Date(booking.pickupDateTime);
              return bookingDate >= startDate;
            });
          }
          
          if (dateRange.endDate) {
            const endDate = new Date(dateRange.endDate);
            endDate.setHours(23, 59, 59, 999);
            
            filteredBookings = filteredBookings.filter(booking => {
              const bookingDate = new Date(booking.pickupDateTime);
              return bookingDate <= endDate;
            });
          }
          
          // Trier par date
          filteredBookings.sort((a, b) => new Date(a.pickupDateTime) - new Date(b.pickupDateTime));
          
          // Pagination
          const total = filteredBookings.length;
          const totalPages = Math.ceil(total / bookingsPerPage);
          const start = (currentPage - 1) * bookingsPerPage;
          const end = start + bookingsPerPage;
          
          setBookings(filteredBookings.slice(start, end));
          setTotalBookings(total);
          setTotalPages(totalPages);
          setLoading(false);
        } else {
          // Construire l'URL avec les paramètres de requête
          let url = `/api/bookings?skip=${(currentPage - 1) * bookingsPerPage}&limit=${bookingsPerPage}`;
          
          if (statusFilter) {
            url += `&status=${statusFilter}`;
          }
          
          // Ajouter la plage de dates si définie
          if (dateRange.startDate) {
            url += `&startDate=${dateRange.startDate}`;
          }
          
          if (dateRange.endDate) {
            url += `&endDate=${dateRange.endDate}`;
          }
          
          // Ajouter la recherche si elle existe
          if (searchTerm) {
            url += `&search=${encodeURIComponent(searchTerm)}`;
          }
          
          const response = await fetch(url);
          
          if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des réservations: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          if (!data.success) {
            throw new Error(data.error || "Erreur inconnue");
          }
          
          setBookings(data.data);
          setTotalBookings(data.meta.total);
          setTotalPages(Math.ceil(data.meta.total / bookingsPerPage));
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [currentPage, statusFilter, searchTerm, dateRange]);
  
  // Fonction pour changer le statut d'une réservation
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      // Vérifier que l'ID est défini
      if (!bookingId) {
        alert('ID de réservation manquant');
        return;
      }
      
      // Confirmation pour certains changements de statut
      if (newStatus === 'in_progress') {
        if (!confirm('Êtes-vous sûr de vouloir démarrer cette course ?')) {
          return;
        }
      } else if (newStatus === 'completed') {
        if (!confirm('Êtes-vous sûr de marquer cette course comme terminée ?')) {
          return;
        }
      } else if (newStatus === 'cancelled') {
        if (!confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
          return;
        }
      }
      
      // En mode développement, simuler une mise à jour
      if (process.env.NODE_ENV === 'development') {
        // Simuler un délai réseau
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Mettre à jour l'état des réservations
        setBookings(bookings.map(booking => 
          (booking._id === bookingId || booking.bookingId === bookingId)
            ? { ...booking, status: newStatus }
            : booking
        ));
        
        // Message de confirmation
        alert(`La réservation a été mise à jour avec le statut: ${newStatus}`);
        return;
      }
      
      const response = await fetch(`/api/bookings/${encodeURIComponent(bookingId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut');
      }
      
      // Mettre à jour l'état des réservations
      setBookings(bookings.map(booking => 
        (booking._id === bookingId || booking.bookingId === bookingId)
          ? { ...booking, status: newStatus }
          : booking
      ));
      
      // Message de confirmation
      alert(`La réservation a été mise à jour avec le statut: ${newStatus}`);
    } catch (error) {
      console.error('Erreur:', error);
      // Afficher un message d'erreur à l'utilisateur
      alert('Erreur lors de la mise à jour du statut. Veuillez réessayer.');
    }
  };
  
  // Fonction pour formater la date et heure
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Non spécifié';
    
    const date = new Date(dateString);
    
    // Formater la date
    const dateFormatted = date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    // Formater l'heure
    const timeFormatted = date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return `${dateFormatted} ${timeFormatted}`;
  };
  
  // Fonction pour formater l'adresse
  const truncateAddress = (address, maxLength = 30) => {
    if (!address) return '';
    if (address.length <= maxLength) return address;
    return address.substring(0, maxLength) + '...';
  };
  
  // Fonction pour changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Fonction pour gérer la soumission du formulaire de recherche
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search');
    const status = formData.get('status');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    
    setSearchTerm(search);
    setStatusFilter(status);
    setDateRange({ startDate, endDate });
    setCurrentPage(1); // Revenir à la première page lors d'une nouvelle recherche
  };
  
  // Fonction pour réinitialiser les filtres
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDateRange({ startDate: '', endDate: '' });
    setCurrentPage(1);
    document.getElementById('searchForm').reset();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Gestion des réservations</h2>
        <div className="flex space-x-4">
          <Link 
            href="/admin/bookings/new" 
            className="px-4 py-2 bg-primary text-white rounded-md flex items-center hover:bg-primary-dark transition-colors duration-300"
          >
            <i className="fas fa-plus mr-2"></i>
            Nouvelle réservation
          </Link>
          <Link 
            href="/admin/planning" 
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md flex items-center hover:bg-gray-50 transition-colors duration-300"
          >
            <i className="fas fa-calendar-alt mr-2"></i>
            Planning
          </Link>
        </div>
      </div>
      
      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow p-4">
        <form id="searchForm" onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Nom, email, adresse..."
                defaultValue={searchTerm}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              defaultValue={statusFilter}
            >
              <option value="">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmé</option>
              <option value="in_progress">En cours</option>
              <option value="completed">Terminé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Période</label>
            <div className="flex space-x-2">
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue={dateRange.startDate}
              />
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue={dateRange.endDate}
              />
            </div>
          </div>
          
          <div className="flex items-end space-x-2">
            <button 
              type="submit" 
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
            >
              <i className="fas fa-filter mr-2"></i>
              Filtrer
            </button>
            <button 
              type="button" 
              onClick={handleResetFilters}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
            >
              Réinitialiser
            </button>
          </div>
        </form>
      </div>
      
      {/* Tableau des réservations */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center p-12 text-red-500">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            <span>{error}</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500">
            <i className="fas fa-exclamation-triangle text-5xl mb-4"></i>
            <h3 className="text-lg font-medium mb-2">Aucune réservation trouvée</h3>
            <p>Essayez de modifier vos filtres ou de créer une nouvelle réservation.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Référence
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Heure
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trajet
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id || booking.bookingId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.bookingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.customerInfo?.name}</div>
                      <div className="text-sm text-gray-500">{booking.customerInfo?.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(booking.pickupDateTime)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{truncateAddress(booking.pickupAddress)}</div>
                      <div className="text-sm text-gray-500">{truncateAddress(booking.dropoffAddress)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <Link href={`/admin/bookings/${booking._id || booking.bookingId}`} className="text-indigo-600 hover:text-indigo-900">
                          <i className="fas fa-eye mr-1"></i>
                          Voir
                        </Link>
                        
                        {booking.status === 'pending' && (
                          <button 
                            onClick={() => handleStatusChange(booking._id || booking.bookingId, 'confirmed')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <i className="fas fa-check-circle mr-1"></i>
                            Confirmer
                          </button>
                        )}
                        
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <button 
                            onClick={() => handleStatusChange(booking._id || booking.bookingId, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <i className="fas fa-times-circle mr-1"></i>
                            Annuler
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {!loading && !error && bookings.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Affichage de <span className="font-medium">{(currentPage - 1) * bookingsPerPage + 1}</span> à <span className="font-medium">{Math.min(currentPage * bookingsPerPage, totalBookings)}</span> sur <span className="font-medium">{totalBookings}</span> réservations
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Précédent</span>
                    <i className="fas fa-chevron-left h-5 w-5"></i>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? 'z-10 bg-primary border-primary text-white'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Suivant</span>
                    <i className="fas fa-chevron-right h-5 w-5"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}