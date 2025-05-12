"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import longDistanceHero from '@/public/assets/images/longdistance-hero.webp'
import interCity from '@/public/assets/images/intercity-travel.webp'
import multicityTour from '@/public/assets/images/multicity-tour.webp'
import dayTrip from '@/public/assets/images/day-trip.webp'

export default function ServicesLongueDistancePage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const servicesControls = useAnimation()
  const featuresControls = useAnimation()
  const destinationsControls = useAnimation()
  const pricingControls = useAnimation()
  const faqControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [destinationsRef, destinationsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [pricingRef, pricingInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [faqRef, faqInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const slideInLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const slideInRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  // Animate sections when in view
  useEffect(() => {
    if (headerInView) headerControls.start('visible')
    if (introInView) introControls.start('visible')
    if (servicesInView) servicesControls.start('visible')
    if (featuresInView) featuresControls.start('visible')
    if (destinationsInView) destinationsControls.start('visible')
    if (pricingInView) pricingControls.start('visible')
    if (faqInView) faqControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, servicesInView, featuresInView, destinationsInView, pricingInView, faqInView, ctaInView,
    headerControls, introControls, servicesControls, featuresControls, destinationsControls, pricingControls, faqControls, ctaControls
  ])

  // Services longue distance
  const longDistanceServices = [
    {
      title: 'Trajets Inter-Villes',
      description: 'Service de transport confortable et luxueux pour vos déplacements entre Paris, l\'Essonne et toutes les grandes villes françaises.',
      icon: 'fa-route',
      features: [
        'Trajet point à point',
        'Chauffeur expert des longues distances',
        'Véhicule adapté au long trajet',
        'Pauses programmées selon vos souhaits'
      ],
      image: interCity
    },
    {
      title: 'Circuits Multi-Villes',
      description: 'Voyagez en toute sérénité avec le même chauffeur et véhicule pour l\'ensemble de votre itinéraire à travers plusieurs villes ou régions.',
      icon: 'fa-map-marked',
      features: [
        'Planification d\'itinéraire personnalisée',
        'Même chauffeur pour tout le circuit',
        'Flexibilité pour les arrêts',
        'Service de conciergerie en déplacement'
      ],
      image: multicityTour
    },
    {
      title: 'Excursions à la Journée',
      description: 'Découvrez les plus beaux sites touristiques et culturels avec un chauffeur privé à votre disposition toute la journée.',
      icon: 'fa-sun',
      features: [
        'Chauffeur à disposition pour 10h',
        'Itinéraire sur mesure',
        'Recommandations locales',
        'Retour à votre point de départ'
      ],
      image: dayTrip
    }
  ]

  // Caractéristiques
  const features = [
    {
      icon: 'fa-car-side',
      title: 'Confort Supérieur',
      description: 'Véhicules spacieux spécialement équipés pour les longs trajets avec sièges ergonomiques et isolation acoustique renforcée.'
    },
    {
      icon: 'fa-user-tie',
      title: 'Chauffeurs Expérimentés',
      description: 'Nos chauffeurs sont spécifiquement formés pour les longues distances, connaissent les meilleurs itinéraires et lieux d\'arrêt.'
    },
    {
      icon: 'fa-wifi',
      title: 'Connectivité 4G/5G',
      description: 'Restez connecté pendant tout votre trajet grâce à notre connexion Wi-Fi haut débit et nos prises de charge.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Sécurité Renforcée',
      description: 'Véhicules parfaitement entretenus, équipés des dernières technologies de sécurité et conduits par des chauffeurs prudents.'
    },
    {
      icon: 'fa-glass-cheers',
      title: 'Rafraîchissements Premium',
      description: 'Eau minérale, boissons fraîches et collations haut de gamme disponibles pour votre confort durant le voyage.'
    },
    {
      icon: 'fa-snowflake',
      title: 'Climatisation Multi-zone',
      description: 'Température personnalisable pour chaque passager, garantissant un confort optimal quelles que soient les conditions extérieures.'
    }
  ]

  // Destinations populaires
  const popularDestinations = [
    { name: 'Lyon', distance: '465 km', time: '4h30', price: 'À partir de 590€' },
    { name: 'Marseille', distance: '775 km', time: '7h15', price: 'À partir de 890€' },
    { name: 'Bordeaux', distance: '590 km', time: '5h45', price: 'À partir de 690€' },
    { name: 'Strasbourg', distance: '490 km', time: '4h45', price: 'À partir de 620€' },
    { name: 'Lille', distance: '225 km', time: '2h30', price: 'À partir de 380€' },
    { name: 'Nantes', distance: '385 km', time: '3h45', price: 'À partir de 540€' },
    { name: 'Nice', distance: '930 km', time: '8h45', price: 'À partir de 980€' },
    { name: 'Cannes', distance: '890 km', time: '8h15', price: 'À partir de 950€' },
    { name: 'Deauville', distance: '215 km', time: '2h15', price: 'À partir de 360€' },
  ]

  // FAQ
  const faqs = [
    {
      question: 'Quelle est la durée maximale d\'un trajet longue distance ?',
      answer: 'Il n\'y a pas de durée maximale. Nous assurons des trajets nationaux et même internationaux selon vos besoins. Pour les trajets particulièrement longs (plus de 8h de conduite), nous prévoyons généralement une rotation de chauffeurs pour garantir une sécurité optimale.'
    },
    {
      question: 'Est-il possible de faire des arrêts pendant le trajet ?',
      answer: 'Absolument ! Vous pouvez planifier autant d\'arrêts que souhaité lors de votre réservation, et notre chauffeur peut également s\'adapter à vos demandes pendant le trajet. Des pauses régulières sont d\'ailleurs recommandées pour les longs voyages.'
    },
    {
      question: 'Comment sont calculés les prix pour les longues distances ?',
      answer: 'Nos tarifs longue distance sont basés sur la distance parcourue, la durée estimée du trajet, le type de véhicule choisi et les éventuels services additionnels demandés. Nous proposons des forfaits tout compris incluant le carburant, les péages et le retour à vide du chauffeur.'
    },
    {
      question: 'Est-ce possible de réserver un aller simple sans retour ?',
      answer: 'Oui, nous proposons des services aller simple. Notez cependant que dans ce cas, le prix peut inclure les frais de retour à vide du véhicule à notre base en Essonne, sauf si nous avons une autre course prévue dans la région de destination.'
    },
    {
      question: 'Les chauffeurs connaissent-ils les destinations touristiques ?',
      answer: 'Nos chauffeurs sont sélectionnés pour leur expertise des régions desservies. Ils peuvent vous recommander des sites à visiter, des restaurants ou des activités, et adapter l\'itinéraire selon vos centres d\'intérêt. Ce service de conciergerie est particulièrement apprécié de nos clients internationaux.'
    }
  ]

  return (
    <div className="services-longue-distance-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/longdistance-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-primary">VOYAGES LONGUE DISTANCE</h1>
            
            <p className="font-tertiary text-2xl italic text-primary mb-6">
              Le luxe et le confort pour tous vos déplacements inter-villes
            </p>
            
            <p className="text-xl mb-10">
              Voyagez sereinement entre les villes françaises avec notre service de chauffeur privé 
              longue distance. Une alternative élégante et confortable au train ou à l'avion, 
              avec toute la flexibilité d'un transport personnalisé.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver maintenant
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Demander un devis personnalisé
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section 
        ref={introRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            animate={introControls}
            variants={fadeInVariant}
            className="text-center max-w-3xl mx-auto"
          >
            <h2>LE CONFORT D'UN VOYAGE SUR MESURE</h2>
            <p className="subtitle">Une alternative premium aux transports conventionnels</p>
            
            <p className="text-gray-600 mb-8">
              Oubliez les contraintes des horaires imposés, des correspondances stressantes et 
              du manque d'intimité des transports en commun. Avec Elysian Luxury Chauffeurs, 
              votre voyage longue distance devient une expérience agréable et productive.
            </p>
            
            <p className="text-gray-600 mb-8">
              Notre service de chauffeur privé pour les longues distances offre une flexibilité totale : 
              départ à l'heure qui vous convient, arrêts selon vos souhaits, et la possibilité de 
              travailler, vous détendre ou dormir pendant tout le trajet dans un environnement 
              luxueux et parfaitement confortable.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">750+</h3>
                <p className="text-gray-600">Villes desservies</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-road"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">500K+</h3>
                <p className="text-gray-600">Kilomètres parcourus</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-user-friends"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">3000+</h3>
                <p className="text-gray-600">Clients satisfaits</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">100%</h3>
                <p className="text-gray-600">Sécurité garantie</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOS SERVICES LONGUE DISTANCE</h2>
            <p className="subtitle">Des solutions adaptées à tous vos besoins de voyage</p>
          </div>
          
          <div className="space-y-16">
            {longDistanceServices.map((service, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                animate={servicesControls}
                variants={index % 2 === 0 ? slideInLeftVariant : slideInRightVariant}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}
              >
                <div className="lg:w-1/2 relative">
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <Image 
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-6 ${index % 2 === 0 ? '-right-6' : '-left-6'} w-24 h-24 border-${index % 2 === 0 ? 'r' : 'l'}-2 border-b-2 border-primary`}></div>
                </div>
                
                <div className="lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <i className={`fas ${service.icon} text-primary text-xl`}></i>
                    </div>
                    <h3 className="text-2xl ml-4">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <i className="fas fa-check text-primary mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/#booking" className="btn btn-primary">
                    Réserver maintenant
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>UNE EXPÉRIENCE DE VOYAGE EXCEPTIONNELLE</h2>
            <p className="subtitle">Pourquoi choisir nos services longue distance</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={featuresControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInVariant}
                className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <i className={`fas ${feature.icon} text-primary text-2xl`}></i>
                </div>
                <h3 className="text-xl mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Voyagez sans compromis sur le confort et la qualité de service
            </p>
            <Link href="/contact" className="btn btn-primary">
              Demander plus d'informations
            </Link>
          </div>
        </div>
      </section>
      
      {/* Destinations Section */}
      <section 
        ref={destinationsRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>DESTINATIONS POPULAIRES</h2>
            <p className="subtitle">De l'Essonne vers toute la France</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={destinationsControls}
            variants={fadeInVariant}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {popularDestinations.map((destination, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-t-2 border-primary/30 hover:border-primary transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600"><i className="fas fa-road text-primary mr-2"></i> {destination.distance}</span>
                  <span className="text-gray-600"><i className="fas fa-clock text-primary mr-2"></i> {destination.time}</span>
                </div>
                <p className="font-medium text-primary">{destination.price}</p>
              </div>
            ))}
          </motion.div>
          
          <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-3/4">
                <h3 className="text-xl font-bold mb-2">Destinations sur mesure</h3>
                <p className="text-gray-600">
                  Nous desservons toutes les villes de France métropolitaine et certaines destinations 
                  européennes. Contactez-nous pour un devis personnalisé vers votre destination, 
                  quelle que soit la distance.
                </p>
              </div>
              <div className="md:w-1/4">
                <Link href="/contact" className="btn btn-primary w-full">
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section 
        ref={pricingRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>FORFAITS LONGUE DISTANCE</h2>
            <p className="subtitle">Des solutions transparentes pour vos voyages</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={pricingControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-1 bg-primary"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Forfait Journée</h3>
                <p className="text-gray-600 mb-6">
                  Chauffeur et véhicule à disposition pour une journée entière (10h).
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="text-xl font-bold text-primary">À partir de 650€</div>
                  <p className="text-gray-500 text-sm">Kilométrage limité à 350km</p>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Berline de luxe</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Chauffeur à disposition 10h</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Arrêts illimités</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Boissons fraîches incluses</span>
                  </li>
                </ul>
                <Link href="/#booking" className="btn btn-primary w-full">
                  Réserver
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-primary hover:shadow-lg transition-all duration-300 transform md:-translate-y-4"
            >
              <div className="p-1 bg-primary"></div>
              <div className="p-6">
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-xs font-bold py-1 px-4 rounded-bl-lg">
                    POPULAIRE
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Forfait Inter-Villes</h3>
                <p className="text-gray-600 mb-6">
                  Solution économique et confortable pour vos trajets de ville à ville.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="text-xl font-bold text-primary">Prix au kilomètre</div>
                  <p className="text-gray-500 text-sm">Tarif dégressif selon la distance</p>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Berline ou SUV premium</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Prix tout compris</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>WiFi et chargeurs</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Arrêts planifiés inclus</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Devis personnalisé</span>
                  </li>
                </ul>
                <Link href="/#booking" className="btn btn-primary w-full">
                  Réserver
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-1 bg-primary"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Forfait Multi-Villes</h3>
                <p className="text-gray-600 mb-6">
                  Service complet pour vos circuits touristiques ou professionnels multi-destinations.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="text-xl font-bold text-primary">Sur mesure</div>
                  <p className="text-gray-500 text-sm">Selon itinéraire et durée</p>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Véhicule au choix</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Itinéraire personnalisé</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Service de conciergerie</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Réservations hôtels (option)</span>
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-primary w-full">
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-calculator text-primary text-3xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-2">Calculateur de prix</h3>
                <p className="text-gray-600">Obtenez une estimation instantanée pour votre trajet longue distance</p>
              </div>
              
              <div className="lg:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-600 mb-4">
                    Nos prix longue distance sont calculés sur mesure en fonction de plusieurs critères :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start">
                      <i className="fas fa-road text-primary mt-1 mr-3"></i>
                      <div>
                        <span className="font-medium">Distance totale</span>
                        <p className="text-sm text-gray-500">La longueur exacte de votre trajet</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-clock text-primary mt-1 mr-3"></i>
                      <div>
                        <span className="font-medium">Durée estimée</span>
                        <p className="text-sm text-gray-500">Le temps prévu pour le trajet</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-car text-primary mt-1 mr-3"></i>
                      <div>
                        <span className="font-medium">Type de véhicule</span>
                        <p className="text-sm text-gray-500">Berline, Premium, SUV ou Van</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className="fas fa-calendar-alt text-primary mt-1 mr-3"></i>
                      <div>
                        <span className="font-medium">Durée du séjour</span>
                        <p className="text-sm text-gray-500">Pour les trajets aller-retour</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/#booking" className="btn btn-primary w-full">
                    Calculer votre tarif
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
      </section>
      
      {/* FAQ Section */}
      <section 
        ref={faqRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>QUESTIONS FRÉQUENTES</h2>
            <p className="subtitle">Tout ce que vous devez savoir sur nos services longue distance</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={faqControls}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={fadeInVariant}
                className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Vous avez d'autres questions sur nos services longue distance ?
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-secondary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 z-0"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden"
            animate={ctaControls}
            variants={fadeInVariant}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Voyagez sans stress, partout en France</h2>
            <p className="text-gray-300 text-lg mb-10">
              Ne laissez pas les longues distances vous fatiguer. Profitez du confort et de l'élégance
              de nos véhicules premium pour vos trajets longue distance, avec un chauffeur expérimenté
              qui s'occupe de tout pendant que vous vous détendez.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver maintenant
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}