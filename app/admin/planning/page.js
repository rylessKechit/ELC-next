"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import BookingCalendar from '@/components/admin/BookingCalendar';

export default function PlanningPage() {
  const { data: session } = useSession();
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Informations de l'utilisateur connecté
  const isAdmin = session?.user?.role === 'admin';
  const isDriver = session?.user?.role === 'driver';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Planning des courses</h2>
        <div className="flex space-x-4">
          {/* Seuls les admins peuvent créer de nouvelles réservations */}
          {isAdmin && (
            <Link 
              href="/admin/bookings/new" 
              className="px-4 py-2 bg-primary text-white rounded-md flex items-center hover:bg-primary-dark transition-colors duration-300"
            >
              <i className="fas fa-plus mr-2"></i>
              Nouvelle réservation
            </Link>
          )}
          
          <Link 
            href="/admin/bookings" 
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md flex items-center hover:bg-gray-50 transition-colors duration-300"
          >
            <i className="fas fa-calendar-check mr-2"></i>
            Liste des réservations
          </Link>
        </div>
      </div>
      
      {/* Options de filtrage */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <i className="fas fa-filter text-gray-400 mr-2"></i>
            <span className="text-sm font-medium text-gray-700">Filtres :</span>
            
            <div className="ml-4">
              <select 
                className="rounded-md border-gray-300 text-sm focus:ring-primary focus:border-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="confirmed">Confirmés</option>
                <option value="in_progress">En cours</option>
                <option value="completed">Terminés</option>
                <option value="cancelled">Annulés</option>
              </select>
            </div>
          </div>
          
          {/* Indicateur pour les chauffeurs */}
          {isDriver && (
            <div className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-md">
              <i className="fas fa-info-circle mr-1"></i>
              Affichage de vos réservations uniquement
            </div>
          )}
        </div>
      </div>
      
      {/* Message d'information si aucune réservation */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <BookingCalendar statusFilter={statusFilter} />
        </div>
      </div>
      
      {/* Aide pour les utilisateurs */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="fas fa-lightbulb text-blue-400"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Astuces d'utilisation</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Utilisez les filtres pour afficher uniquement les réservations qui vous intéressent</li>
                <li>Cliquez sur une réservation pour voir ses détails</li>
                <li>Naviguez entre les vues jour/semaine/mois selon vos besoins</li>
                {isAdmin && <li>Vous pouvez voir toutes les réservations et créer de nouvelles réservations</li>}
                {isDriver && <li>Vous voyez uniquement les réservations qui vous sont assignées</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}