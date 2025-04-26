// components/booking/BookingSuccess.jsx
"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const BookingSuccess = ({ bookingData }) => {
  // Pour sauvegarder le numéro de réservation dans l'historique
  useEffect(() => {
    // Dans une vraie implémentation, on pourrait sauvegarder dans localStorage
    // ou envoyer des analytics
    console.log('Réservation confirmée:', bookingData)
  }, [bookingData])

  // Formater le prix pour l'affichage
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }

  // Formater la date
  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return 'Non spécifié'
    
    const date = new Date(dateTimeString)
    return date.toLocaleString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="text-center"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
          <i className="fas fa-check-circle text-5xl"></i>
        </div>
      </motion.div>
      
      <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-800 mb-2">
        Réservation confirmée !
      </motion.h3>
      
      <motion.p variants={itemVariants} className="text-gray-600 mb-8">
        Votre chauffeur privé vous attend le {formatDate(bookingData.pickupDateTime)}
      </motion.p>
      
      <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <h4 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">Détails de la réservation</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Numéro de réservation</p>
            <p className="font-medium">{bookingData.bookingId || 'ELC-' + Math.floor(Math.random() * 10000)}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Prix total</p>
            <p className="font-medium text-primary">{formatPrice(bookingData.price || 0)}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Date et heure</p>
            <p className="font-medium">{formatDate(bookingData.pickupDateTime)}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Véhicule</p>
            <p className="font-medium">{bookingData.vehicleType || 'Non spécifié'}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Départ</p>
            <p className="font-medium">{bookingData.pickupAddress}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Arrivée</p>
            <p className="font-medium">{bookingData.dropoffAddress}</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-8 text-left">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="fas fa-info-circle text-blue-500"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Informations importantes</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Un email de confirmation a été envoyé à votre adresse {bookingData.customerEmail}</li>
                <li>Votre chauffeur vous contactera environ 2 heures avant l'heure prévue</li>
                <li>N'oubliez pas que vous pouvez annuler gratuitement jusqu'à 24h avant le départ</li>
                <li>En cas d'urgence, contactez-nous au 01 23 45 67 89</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-4">
        <p className="text-gray-600">
          Des questions sur votre réservation ? Besoin de faire une modification ?
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/" 
            className="py-3 px-6 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            Retour à l'accueil
          </Link>
          
          <Link 
            href="/contact" 
            className="py-3 px-6 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors duration-300"
          >
            Nous contacter
          </Link>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-16">
        <p className="text-gray-500 text-sm">
          Merci d'avoir choisi Elysian Luxury Chauffeurs. Nous vous souhaitons un excellent trajet !
        </p>
      </motion.div>
    </motion.div>
  )
}

export default BookingSuccess