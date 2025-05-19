"use client";

import BookingForm from '@/components/booking/BookingForm';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NewBookingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link 
          href="/admin/bookings"
          className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg mr-3"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-800">Nouvelle réservation</h1>
          <p className="text-sm text-gray-500">Créer une réservation depuis l'administration</p>
        </div>
      </div>
      
      <BookingForm />
    </div>
  );
}