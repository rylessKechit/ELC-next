// app/(pages)/page.js - Version optimisée pour "vtc ballainvilliers" et "chauffeurs privé essonne"
"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import BookingForm from '@/components/booking/BookingForm'
import Head from 'next/head'

// Images
import TeslaModel3 from '@/public/assets/images/tesla-model-3.webp'
import MercedesClassS from '@/public/assets/images/mercedes-classe-s.webp'
import BmwSerie7 from '@/public/assets/images/bmw-7-series.webp'
import MercedesVClass from '@/public/assets/images/mercedes-v-class.webp'
import ExperienceVip from '@/public/assets/images/experience-vip.webp'
import logoCannesFestival from '@/public/assets/images/logo-cannes-festival.webp'
import logoRitzParis from '@/public/assets/images/logo-ritz-paris.webp'
import logoLouisVuitton from '@/public/assets/images/logo-louis-vuitton.webp'
import logoChanel from '@/public/assets/images/logo-chanel.webp'
import logoAirFrance from '@/public/assets/images/logo-air-france.webp'

export default function HomePage() {
  // Animation controls
  const heroControls = useAnimation()
  const servicesControls = useAnimation()
  const fleetControls = useAnimation()
  const experienceControls = useAnimation()
  const testimonialsControls = useAnimation()
  const bookingControls = useAnimation()
  const partnersControls = useAnimation()
  const locationsControls = useAnimation()

  // Intersection observers
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [fleetRef, fleetInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [experienceRef, experienceInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [bookingRef, bookingInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [partnersRef, partnersInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [locationsRef, locationsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // Current testimonial index for carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  // Animate sections when in view
  useEffect(() => {
    if (heroInView) heroControls.start('visible')
    if (servicesInView) servicesControls.start('visible')
    if (fleetInView) fleetControls.start('visible')
    if (experienceInView) experienceControls.start('visible')
    if (testimonialsInView) testimonialsControls.start('visible')
    if (bookingInView) bookingControls.start('visible')
    if (partnersInView) partnersControls.start('visible')
    if (locationsInView) locationsControls.start('visible')
  }, [
    heroInView, servicesInView, fleetInView, experienceInView, 
    testimonialsInView, bookingInView, partnersInView, locationsInView,
    heroControls, servicesControls, fleetControls, experienceControls,
    testimonialsControls, bookingControls, partnersControls, locationsControls
  ])

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Vehicle fleet carousel items
  const fleetItems = [
    {
      name: 'Tesla Model 3',
      image: TeslaModel3,
      description: 'VTC écologique à Ballainvilliers avec confort premium.',
      features: ['Jusqu\'à 3 passagers', 'Wi-Fi gratuit', 'Boissons fraîches', 'Sièges en cuir premium']
    },
    {
      name: 'Mercedes-Benz Classe S',
      image: MercedesClassS,
      description: 'Chauffeur privé Essonne avec véhicule de prestige.',
      features: ['Jusqu\'à 3 passagers', 'Wi-Fi gratuit', 'Boissons fraîches', 'Sièges en cuir premium']
    },
    {
      name: 'BMW Série 7',
      image: BmwSerie7,
      description: 'VTC de luxe à Ballainvilliers pour vos déplacements d\'affaires.',
      features: ['Jusqu\'à 3 passagers', 'Écrans tactiles individuels', 'Système audio haut de gamme', 'Ambiance lumineuse personnalisable']
    },
    {
      name: 'Mercedes-Benz Classe V VIP',
      image: MercedesVClass,
      description: 'Transport de groupe avec chauffeur privé dans l\'Essonne.',
      features: ['Jusqu\'à 7 passagers', 'Configuration salon privé', 'Bar intégré', 'Isolation acoustique renforcée']
    }
  ]

  // Zone d'intervention - Mise à jour pour Ballainvilliers
  const serviceAreas = [
    {
      title: "VTC BALLAINVILLIERS",
      description: "Service VTC premium à Ballainvilliers avec chauffeurs expérimentés disponibles 24h/24",
      cities: ["Ballainvilliers", "Longjumeau", "Massy", "Antony", "Chilly-Mazarin", "Wissous", "Fresnes", "L'Haÿ-les-Roses", "Chevilly-Larue", "Rungis"],
      specialFeatures: ["VTC aéroport depuis Ballainvilliers", "Chauffeur privé événements", "Transport d'affaires Ballainvilliers", "Service VTC 24/7"],
      link: "/vtc-ballainvilliers"
    },
    {
      title: "CHAUFFEURS PRIVÉ ESSONNE",
      description: "Chauffeurs privés professionnels dans tout le département de l'Essonne (91)",
      cities: ["Évry-Courcouronnes", "Corbeil-Essonnes", "Savigny-sur-Orge", "Palaiseau", "Athis-Mons", "Viry-Châtillon", "Sainte-Geneviève-des-Bois", "Brétigny-sur-Orge", "Yerres", "Montgeron"],
      specialFeatures: ["Transferts aéroport CDG/Orly", "Chauffeurs d'affaires", "Transport événementiel", "VTC longue distance"],
      link: "/chauffeurs-prive-essonne"
    },
    {
      title: "PARIS & ÎLE-DE-FRANCE",
      description: "Service VTC et chauffeurs privés dans toute la région parisienne depuis Ballainvilliers",
      highlights: ["Aéroports (CDG, Orly, Beauvais)", "Gares parisiennes", "Sites touristiques", "Centres d'affaires", "Événements spéciaux"],
      link: "/vtc-paris-ile-de-france"
    }
  ]

  // Testimonials data - Adaptés pour Ballainvilliers
  const testimonials = [
    {
      name: 'Sophie D.',
      role: 'Résidente Ballainvilliers',
      text: 'Excellent service VTC à Ballainvilliers ! Je fais régulièrement appel à leurs chauffeurs privés pour mes déplacements vers Paris. Toujours ponctuel, véhicule impeccable et tarifs transparents.'
    },
    {
      name: 'Michel R.',
      role: 'Chef d\'entreprise - Essonne',
      text: 'Le meilleur service de chauffeurs privés de l\'Essonne ! Leurs VTC sont parfaits pour mes rendez-vous d\'affaires depuis Ballainvilliers. Professionnalisme et discrétion garantis.'
    },
    {
      name: 'Caroline M.',
      role: 'Organisatrice événements',
      text: 'Parfait pour nos événements ! Les chauffeurs privés Essonne d\'Elysian connaissent parfaitement Ballainvilliers et les environs. Service VTC haut de gamme, nos clients sont toujours ravis.'
    }
  ]

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

  return (
    <div className="home-page">
      {/* Hero Section avec position d'arrière-plan ajustée */}
      <section 
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black"
      >
        {/* Image d'arrière-plan avec position ajustée */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center md:bg-right-top"
          style={{ 
            backgroundImage: 'url(/assets/images/hero.webp)',
            backgroundPosition: 'center left 35%',
            backgroundSize: 'cover'
          }}
        ></div>
        
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        <div className="container relative z-20 mx-auto px-6 md:ml-[10%] md:max-w-[650px] text-white">
          <h1 className="text-center md:text-left mb-6">
            <span className="text-primary block font-bold text-5xl">VTC</span>
            <span className="text-white block font-bold text-5xl">BALLAINVILLIERS</span>
            <span className="text-white block font-bold text-4xl">CHAUFFEURS PRIVÉ</span>
          </h1>
          
          <p className="text-center md:text-left font-tertiary text-xl italic text-primary mb-6">
            <span className="px-2 py-1 rounded">Service VTC premium à Ballainvilliers et chauffeurs privés dans l'Essonne (91)</span>
          </p>
          
          <p className="text-center md:text-left text-lg mb-8 text-white">
            VTC Ballainvilliers et chauffeurs privés Essonne : service haut de gamme pour vos déplacements 
            professionnels, événements prestigieux et voyages d'affaires depuis Ballainvilliers vers Paris et l'Île-de-France.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start">
            <a 
              href="#booking"
              className="py-3 px-6 bg-primary text-white font-medium rounded-none uppercase tracking-wider text-sm text-center hover:bg-primary-dark hover:text-white transition-all"
            >
              Réserver Maintenant
            </a>
          </div>
        </div>
        
        {/* Indicateur de défilement en bas */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <a 
            href="#services" 
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-bounce"
            aria-label="Défiler vers le bas"
          >
            <i className="fas fa-chevron-down text-white"></i>
          </a>
        </div>
      </section>
      
      {/* Services Section */}
      <section 
        id="services" 
        ref={servicesRef} 
        className="py-24 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>VTC BALLAINVILLIERS & CHAUFFEURS PRIVÉ ESSONNE</h2>
            <p className="subtitle">Service VTC premium à Ballainvilliers avec chauffeurs expérimentés dans l'Essonne</p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-crown text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">VTC PREMIUM BALLAINVILLIERS</h3>
              <p className="text-gray-600 mb-6 text-center">
                Service VTC de luxe à Ballainvilliers avec chauffeurs privés expérimentés. 
                Véhicules haut de gamme et service personnalisé pour tous vos déplacements depuis Ballainvilliers.
              </p>
              <Link href="/experience-vip" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir VTC Ballainvilliers
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-glass-cheers text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">CHAUFFEURS ÉVÉNEMENTS ESSONNE</h3>
              <p className="text-gray-600 mb-6 text-center">
                Chauffeurs privés Essonne pour vos événements spéciaux depuis Ballainvilliers. 
                Service VTC professionnel pour mariages, galas et soirées prestigieuses.
              </p>
              <Link href="/services-evenements" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Chauffeurs événements
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-route text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">VTC LONGUE DISTANCE</h3>
              <p className="text-gray-600 mb-6 text-center">
                Service VTC longue distance depuis Ballainvilliers avec chauffeurs privés Essonne. 
                Confort et luxe pour vos déplacements vers toute la France.
              </p>
              <Link href="/services-longue-distance" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                VTC longue distance
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-briefcase text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">CHAUFFEURS AFFAIRES BALLAINVILLIERS</h3>
              <p className="text-gray-600 mb-6 text-center">
                Chauffeurs privés dédiés aux professionnels de Ballainvilliers et de l'Essonne. 
                Service VTC d'affaires avec confidentialité et ponctualité garanties.
              </p>
              <Link href="/services-affaires" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Chauffeurs d'affaires
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section 
        id="booking" 
        ref={bookingRef} 
        className="py-24 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>RÉSERVER VTC BALLAINVILLIERS</h2>
            <p className="subtitle">Service VTC et chauffeurs privés à Ballainvilliers et dans l'Essonne</p>
          </div>
          
          <BookingForm />
        </div>
      </section>
      
      {/* Fleet Section */}
      <section 
        id="fleet" 
        ref={fleetRef} 
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>FLOTTE VTC BALLAINVILLIERS</h2>
            <p className="subtitle">Véhicules premium avec chauffeurs privés pour vos déplacements dans l'Essonne</p>
          </div>
          
          <div className="space-y-16">
            {fleetItems.map((item, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                animate={fleetControls}
                variants={fadeInVariant}
                custom={index}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
              >
                <div className="w-full md:w-2/5 relative h-[300px] md:h-auto overflow-hidden">
                  <Image 
                    src={item.image}
                    alt={`${item.name} VTC Ballainvilliers avec chauffeur privé`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={index === 0}
                  />
                </div>
                <div className="w-full md:w-3/5 p-8 md:p-10">
                  <h3 className="text-2xl mb-4">{item.name}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <ul className="mb-8 space-y-4">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <i className="fas fa-check text-primary mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/flotte-vehicules" className="btn btn-primary">
                    Réserver ce VTC à Ballainvilliers
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/flotte-vehicules" className="inline-flex items-center text-primary text-lg font-medium hover:text-primary-dark transition-colors">
              Découvrir notre flotte VTC Ballainvilliers
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Zones d'intervention - Section Ballainvilliers */}
      <section 
        id="locations" 
        ref={locationsRef} 
        className="py-24 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>VTC BALLAINVILLIERS & CHAUFFEURS PRIVÉ ESSONNE</h2>
            <p className="subtitle">Service de transport VTC premium à Ballainvilliers et dans tout le département 91</p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={locationsControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {serviceAreas.map((area, index) => (
              <motion.div 
                key={index}
                variants={fadeInVariant}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-primary p-4">
                  <h3 className="text-xl text-white font-bold text-center">{area.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4 text-center">{area.description}</p>
                  
                  {area.cities && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-800">Villes desservies:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {area.cities.slice(0, 8).map((city, cityIndex) => (
                          <li key={cityIndex} className="flex items-center text-sm">
                            <i className="fas fa-check text-primary mr-2 text-xs"></i>
                            {city}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {area.specialFeatures && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-800">Nos services VTC:</h4>
                      <ul className="space-y-1">
                        {area.specialFeatures.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <i className="fas fa-star text-primary mr-2 text-xs"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {area.highlights && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-800">Destinations:</h4>
                      <p className="text-sm text-gray-600">{area.highlights.join(' • ')}</p>
                    </div>
                  )}
                  
                  <div className="text-center mt-4">
                    <Link href={area.link} className="inline-block px-4 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-300 text-sm font-medium">
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Nos chauffeurs privés connaissent parfaitement Ballainvilliers et tout le département de l'Essonne (91). 
              Service VTC disponible 24h/24 pour tous vos déplacements.
            </p>
            <a href="#booking" className="inline-block py-3 px-6 bg-primary text-white font-medium rounded-full hover:bg-primary-dark hover:text-white transition-colors duration-300">
              Réserver VTC Ballainvilliers
            </a>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section 
        id="experience" 
        ref={experienceRef} 
        className="py-24 bg-gray-50"
      >
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate={experienceControls}
              variants={slideInLeftVariant}
              className="lg:w-1/2"
            >
              <div className="mb-6">
                <h2 className="text-left">EXPÉRIENCE VTC BALLAINVILLIERS</h2>
                <div className="h-0.5 w-12 bg-primary my-6"></div>
                <p className="text-gray-600">Service VTC premium avec chauffeurs privés Essonne</p>
              </div>
              <p className="text-gray-600 mb-8">
                Chaque trajet VTC depuis Ballainvilliers est une expérience raffinée avec nos chauffeurs privés 
                de l'Essonne, où chaque détail est pensé pour répondre à vos attentes les plus exigeantes.
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-gem text-primary"></i>
                  </div>
                  <span className="ml-4">Chauffeurs privés d'élite formés à Ballainvilliers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-glass-martini-alt text-primary"></i>
                  </div>
                  <span className="ml-4">Boissons premium dans tous nos VTC</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-wifi text-primary"></i>
                  </div>
                  <span className="ml-4">WiFi haut débit dans nos VTC Ballainvilliers</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-shield-alt text-primary"></i>
                  </div>
                  <span className="ml-4">Confidentialité garantie avec nos chauffeurs Essonne</span>
                </li>
              </ul>
              <Link href="/experience-vip" className="btn btn-primary">
                Découvrir VTC Premium Ballainvilliers
              </Link>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={experienceControls}
              variants={slideInRightVariant}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl relative">
                <Image 
                  src={ExperienceVip}
                  alt="VTC Ballainvilliers et chauffeurs privés Essonne"
                  width={600}
                  height={500}
                  className="object-cover w-full h-[500px]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-full border-l-2 border-b-2 border-primary"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        ref={testimonialsRef} 
        className="py-24 bg-white relative"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>AVIS VTC BALLAINVILLIERS</h2>
            <p className="subtitle">Ce que disent nos clients sur notre service VTC à Ballainvilliers et nos chauffeurs privés Essonne</p>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: index === currentTestimonial ? 1 : 0, 
                  x: index === currentTestimonial ? 0 : 50,
                  zIndex: index === currentTestimonial ? 10 : 0,
                }}
                transition={{ duration: 0.6 }}
                className={`bg-white p-10 rounded-lg shadow-lg absolute w-full top-0 left-0 ${index === currentTestimonial ? 'relative' : 'hidden'}`}
              >
                <div className="text-3xl text-primary mb-6">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="text-lg italic font-tertiary mb-8 leading-relaxed text-gray-700 relative z-10 pl-5">
                  {testimonial.text}
                </p>
                <div className="flex items-center">
                  <div className="ml-4">
                    <h4 className="font-bold text-lg mb-0">{testimonial.name}</h4>
                    <p className="text-primary italic">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`w-3 h-3 flex items-center justify-center p-2 mx-2 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentTestimonial ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Témoignage ${index + 1} de ${testimonials[index].name}`}
              >
                <span className="w-1.5 h-1.5 rounded-full block" style={{
                  backgroundColor: index === currentTestimonial ? 'white' : '#d4af37'
                }}></span>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section 
        id="partners" 
        ref={partnersRef} 
        className="py-24 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>PARTENAIRES VTC BALLAINVILLIERS</h2>
            <p className="subtitle">Ils font confiance à notre service VTC à Ballainvilliers et nos chauffeurs privés Essonne</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={partnersControls}
            variants={fadeInVariant}
            className="flex flex-wrap justify-center items-center gap-12 lg:gap-16"
          >
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoCannesFestival} alt="Festival de Cannes - VTC Ballainvilliers partenaire" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoRitzParis} alt="Ritz Paris - chauffeurs privés Essonne" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoLouisVuitton} alt="Louis Vuitton - VTC premium Ballainvilliers" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoChanel} alt="Chanel - service chauffeurs Essonne" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoAirFrance} alt="Air France - VTC aéroport Ballainvilliers" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section - Nouvelle section pour SEO Ballainvilliers */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>FAQ VTC BALLAINVILLIERS</h2>
            <p className="subtitle">Questions fréquentes sur notre service VTC à Ballainvilliers et chauffeurs privés Essonne</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Comment réserver un VTC à Ballainvilliers ?</h3>
                <p className="text-gray-600">
                  Vous pouvez réserver votre VTC à Ballainvilliers en quelques clics via notre formulaire en ligne, 
                  en appelant notre service client au +33 6 43 53 76 53 ou par email. Nos chauffeurs privés Essonne 
                  sont disponibles 24h/24 et 7j/7 à Ballainvilliers et dans tout le département 91.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Quels sont les tarifs VTC à Ballainvilliers ?</h3>
                <p className="text-gray-600">
                  Nos tarifs VTC Ballainvilliers débutent à partir de 25€, avec un prix au kilomètre compétitif. 
                  Nos chauffeurs privés Essonne proposent des tarifs transparents sans surprise. 
                  Utilisez notre calculateur en ligne pour une estimation précise de votre trajet depuis Ballainvilliers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Vos chauffeurs connaissent-ils bien Ballainvilliers ?</h3>
                <p className="text-gray-600">
                  Absolument ! Nos chauffeurs privés sont des experts de Ballainvilliers et de l'ensemble du département 
                  de l'Essonne (91). Leur connaissance locale garantit des trajets VTC optimisés et une expertise 
                  des meilleurs itinéraires depuis Ballainvilliers vers Paris et l'Île-de-France.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Proposez-vous des transferts aéroport depuis Ballainvilliers ?</h3>
                <p className="text-gray-600">
                  Oui, nous proposons des services VTC transfert aéroport depuis Ballainvilliers vers tous les aéroports 
                  parisiens (Orly, Roissy CDG, Le Bourget). Nos chauffeurs privés Essonne assurent des transferts ponctuels 
                  et confortables, avec suivi des vols en temps réel depuis Ballainvilliers.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Peut-on réserver un chauffeur privé pour toute la journée à Ballainvilliers ?</h3>
                <p className="text-gray-600">
                  Bien sûr, nous proposons des services VTC mise à disposition avec chauffeur privé à la journée 
                  ou à la demi-journée à Ballainvilliers. Service idéal pour vos rendez-vous professionnels multiples 
                  dans l'Essonne ou pour découvrir la région en toute sérénité avec un chauffeur dédié.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 z-0"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Réservez votre VTC à Ballainvilliers maintenant</h2>
            <p className="text-gray-300 text-lg mb-10">
              Service VTC premium à Ballainvilliers avec chauffeurs privés professionnels dans l'Essonne. 
              Réservez en ligne ou contactez-nous directement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="btn btn-primary">
                Nous contacter
              </Link>
              <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                <i className="fas fa-phone mr-2"></i>
                Appeler VTC Ballainvilliers
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}