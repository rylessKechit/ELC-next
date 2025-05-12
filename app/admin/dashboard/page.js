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
  const [chartError, setChartError] = useState(null);
  const [chartLoading, setChartLoading] = useState(false);
  
  // Récupérer les statistiques et les réservations à venir
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les statistiques
        console.log('Fetching stats...');
        const statsResponse = await fetch('/api/dashboard/stats');
        
        if (!statsResponse.ok) {
          throw new Error(`Erreur lors de la récupération des statistiques: ${statsResponse.status} - ${statsResponse.statusText}`);
        }
        
        const statsData = await statsResponse.json();
        console.log('Stats received:', statsData);
        
        if (statsData.success) {
          setStats(statsData.data);
        } else {
          throw new Error(statsData.error || 'Erreur inconnue lors de la récupération des statistiques');
        }
        
        // Récupérer les réservations à venir
        console.log('Fetching upcoming bookings...');
        const bookingsResponse = await fetch('/api/bookings/upcoming?limit=5');
        
        if (!bookingsResponse.ok) {
          throw new Error(`Erreur lors de la récupération des réservations: ${bookingsResponse.status} - ${bookingsResponse.statusText}`);
        }
        
        const bookingsData = await bookingsResponse.json();
        console.log('Upcoming bookings received:', bookingsData);
        
        if (bookingsData.success) {
          setUpcomingBookings(bookingsData.data);
        } else {
          throw new Error(bookingsData.error || 'Erreur inconnue lors de la récupération des réservations');
        }
        
        // Récupérer les données pour le graphique
        await fetchChartData('week');
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du tableau de bord:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const fetchChartData = async (period = 'week') => {
    try {
      setChartLoading(true);
      setChartError(null);
      
      console.log(`Fetching chart data for period: ${period}`);
      const chartResponse = await fetch(`/api/dashboard/chart-data?period=${period}`);
      
      if (!chartResponse.ok) {
        throw new Error(`Erreur lors de la récupération des données du graphique: ${chartResponse.status} - ${chartResponse.statusText}`);
      }
      
      const chartData = await chartResponse.json();
      console.log('Chart data received:', chartData);
      
      if (chartData.success) {
        setBookingData(chartData.data);
      } else {
        throw new Error(chartData.error || 'Erreur inconnue lors de la récupération des données du graphique');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données du graphique:', error);
      setChartError(error.message);
      // En cas d'erreur, afficher des données vides
      setBookingData([]);
    } finally {
      setChartLoading(false);
    }
  };
  
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
              defaultValue="week"
              onChange={(e) => fetchChartData(e.target.value)}
            >
              <option value="day">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>
          
          {chartLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : chartError ? (
            <div className="flex items-center justify-center h-64 text-red-500">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {chartError}
            </div>
          ) : bookingData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <i className="fas fa-chart-line text-4xl mb-4"></i>
                <p>Aucune donnée disponible pour le graphique</p>
              </div>
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
              <p className="text-sm mt-2">Créez une nouvelle réservation ou vérifiez vos filtres</p>
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
      
      {/* Message d'aide si aucune donnée */}
      {!loading && !error && stats.totalBookings === 0 && (
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-blue-400"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Premiers pas</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Il semble que vous n'ayez pas encore de réservations dans votre système.</p>
                <p className="mt-1">
                  Commencez par créer votre première réservation ou vérifiez que votre base de données est correctement configurée.
                </p>
                <Link 
                  href="/admin/bookings/new"
                  className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Créer une réservation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}