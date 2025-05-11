"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import DashboardStats from '@/components/admin/DashboardStats';
import UpcomingBookings from '@/components/admin/UpcomingBookings';
import BookingChart from '@/components/admin/BookingChart';

export default function Dashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    todayBookings: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Récupérer les statistiques et les réservations à venir
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // En mode développement, utiliser des données simulées
        if (process.env.NODE_ENV === 'development') {
          // Simuler un délai de chargement
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Statistiques simulées
          setStats({
            totalBookings: 157,
            pendingBookings: 12,
            confirmedBookings: 89,
            cancelledBookings: 8,
            completedBookings: 48,
            todayBookings: 5,
            totalUsers: 42,
            totalRevenue: 12540
          });
          
          // Réservations à venir simulées
          setUpcomingBookings([
            {
              _id: '1',
              bookingId: 'ELC-123456',
              status: 'confirmed',
              pickupAddress: 'Gare de Lyon, Paris',
              dropoffAddress: 'Aéroport Charles de Gaulle',
              pickupDateTime: new Date(Date.now() + 3600000).toISOString(),
              customerInfo: {
                name: 'Jean Dupont',
                email: 'jean@example.com',
                phone: '+33612345678'
              }
            },
            {
              _id: '2',
              bookingId: 'ELC-123457',
              status: 'pending',
              pickupAddress: 'Hôtel Ritz Paris',
              dropoffAddress: 'Château de Versailles',
              pickupDateTime: new Date(Date.now() + 86400000).toISOString(),
              customerInfo: {
                name: 'Marie Lambert',
                email: 'marie@example.com',
                phone: '+33687654321'
              }
            },
            {
              _id: '3',
              bookingId: 'ELC-123458',
              status: 'confirmed',
              pickupAddress: 'Aéroport d\'Orly',
              dropoffAddress: 'Tour Eiffel',
              pickupDateTime: new Date(Date.now() + 172800000).toISOString(),
              customerInfo: {
                name: 'Pierre Martin',
                email: 'pierre@example.com',
                phone: '+33698765432'
              }
            }
          ]);
          
          // Données du graphique simulées
          const demoData = [];
          const today = new Date();
          
          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            
            const formattedDate = date.toLocaleDateString('fr-FR', {
              weekday: 'short',
              day: '2-digit',
              month: '2-digit'
            });
            
            demoData.push({
              date: formattedDate,
              confirmées: Math.floor(Math.random() * 8) + 1,
              enAttente: Math.floor(Math.random() * 5),
              annulées: Math.floor(Math.random() * 3)
            });
          }
          
          setBookingData(demoData);
        } else {
          // Dans un environnement de production, récupérer les données réelles
          const statsResponse = await fetch('/api/dashboard/stats');
          
          if (!statsResponse.ok) {
            throw new Error('Erreur lors de la récupération des statistiques');
          }
          
          const statsData = await statsResponse.json();
          setStats(statsData.data);
          
          // Récupérer les réservations à venir
          const today = new Date();
          const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
          const endOfWeek = new Date(today);
          endOfWeek.setDate(today.getDate() + 7);
          endOfWeek.setHours(23, 59, 59, 999);
          
          const bookingsResponse = await fetch(`/api/bookings?startDate=${startOfDay}&endDate=${endOfWeek.toISOString()}&limit=5`);
          
          if (!bookingsResponse.ok) {
            throw new Error('Erreur lors de la récupération des réservations');
          }
          
          const bookingsData = await bookingsResponse.json();
          setUpcomingBookings(bookingsData.data);
          
          // Récupérer les données pour le graphique
          const chartResponse = await fetch('/api/dashboard/chart-data');
          
          if (!chartResponse.ok) {
            throw new Error('Erreur lors de la récupération des données du graphique');
          }
          
          const chartData = await chartResponse.json();
          setBookingData(chartData.data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Données pour les statistiques
  const statsItems = [
    {
      title: 'Réservations totales',
      value: stats.totalBookings,
      icon: 'fas fa-calendar-check',
      color: 'bg-blue-500',
      link: '/admin/bookings'
    },
    {
      title: 'Réservations en attente',
      value: stats.pendingBookings,
      icon: 'fas fa-exclamation-triangle',
      color: 'bg-yellow-500',
      link: '/admin/bookings?status=pending'
    },
    {
      title: 'Réservations confirmées',
      value: stats.confirmedBookings,
      icon: 'fas fa-check-circle',
      color: 'bg-green-500',
      link: '/admin/bookings?status=confirmed'
    },
    {
      title: "Aujourd'hui",
      value: stats.todayBookings,
      icon: 'fas fa-calendar-day',
      color: 'bg-purple-500',
      link: '/admin/bookings'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Vue d'ensemble</h2>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsItems.map((item, index) => (
          <DashboardStats 
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
            link={item.link}
          />
        ))}
      </div>
      
      {/* Graphique et réservations à venir */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique des réservations */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Activité des réservations</h3>
            <select 
              className="rounded-md border-gray-300 text-sm focus:ring-primary focus:border-primary"
              defaultValue="thisWeek"
            >
              <option value="today">Aujourd'hui</option>
              <option value="thisWeek">Cette semaine</option>
              <option value="thisMonth">Ce mois</option>
              <option value="lastMonth">Mois dernier</option>
            </select>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-500">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          ) : (
            <div className="h-64">
              <BookingChart data={bookingData} />
            </div>
          )}
        </div>
        
        {/* Réservations à venir */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Réservations à venir</h3>
            <Link 
              href="/admin/bookings" 
              className="text-sm text-primary hover:text-primary-dark"
            >
              Tout voir
            </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-500">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          ) : upcomingBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <i className="fas fa-calendar-check text-4xl mb-2"></i>
              <p>Aucune réservation à venir</p>
            </div>
          ) : (
            <UpcomingBookings bookings={upcomingBookings} />
          )}
        </div>
      </div>
      
      {/* Section réservée aux administrateurs */}
      {session?.user?.role === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Statistiques des revenus */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Revenus</h3>
              <select 
                className="rounded-md border-gray-300 text-sm focus:ring-primary focus:border-primary"
                defaultValue="thisMonth"
              >
                <option value="today">Aujourd'hui</option>
                <option value="thisWeek">Cette semaine</option>
                <option value="thisMonth">Ce mois</option>
                <option value="lastMonth">Mois dernier</option>
              </select>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <i className="fas fa-chart-line text-3xl text-green-500 mr-2"></i>
                <h4 className="text-lg font-semibold">Revenu total</h4>
              </div>
              <p className="text-3xl font-bold text-green-600">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(stats.totalRevenue)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}