// app/(pages)/page.js
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
  const locationsControls = useAnimation() // Nouveau pour la section zones d'intervention

  // Intersection observers
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [fleetRef, fleetInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [experienceRef, experienceInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [bookingRef, bookingInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [partnersRef, partnersInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [locationsRef, locationsInView] = useInView({ threshold: 0.1, triggerOnce: true }) // Nouveau

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
    if (locationsInView) locationsControls.start('visible') // Nouveau
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
      description: 'Élégance et confort écologique pour vos déplacements en Essonne et dans toute l\'Île-de-France.',
      features: ['Jusqu\'à 3 passagers', 'Wi-Fi gratuit', 'Boissons fraîches', 'Sièges en cuir premium']
    },
    {
      name: 'Mercedes-Benz Classe S',
      image: MercedesClassS,
      description: 'Élégance et confort inégalés pour vos déplacements d\'affaires à Longjumeau et dans le 91.',
      features: ['Jusqu\'à 3 passagers', 'Wi-Fi gratuit', 'Boissons fraîches', 'Sièges en cuir premium']
    },
    {
      name: 'BMW Série 7',
      image: BmwSerie7,
      description: 'L\'alliance parfaite entre technologie de pointe et luxe raffiné pour vos trajets dans l\'Essonne.',
      features: ['Jusqu\'à 3 passagers', 'Écrans tactiles individuels', 'Système audio haut de gamme', 'Ambiance lumineuse personnalisable']
    },
    {
      name: 'Mercedes-Benz Classe V VIP',
      image: MercedesVClass,
      description: 'Espace généreux et aménagements luxueux pour vos déplacements en groupe dans le département 91.',
      features: ['Jusqu\'à 7 passagers', 'Configuration salon privé', 'Bar intégré', 'Isolation acoustique renforcée']
    }
  ]

  // Zone d'intervention - Nouvelle section
  const serviceAreas = [
    {
      title: "ESSONNE (91)",
      description: "Service de chauffeurs privés premium dans tout le département de l'Essonne",
      cities: ["Évry-Courcouronnes", "Longjumeau", "Massy", "Palaiseau", "Savigny-sur-Orge", "Athis-Mons", "Viry-Châtillon", "Sainte-Geneviève-des-Bois", "Brétigny-sur-Orge", "Corbeil-Essonnes"],
      link: "/chauffeurs-essonne-91"
    },
    {
      title: "LONGJUMEAU",
      description: "Chauffeurs professionnels à Longjumeau pour tous vos déplacements",
      nearby: ["Massy", "Chilly-Mazarin", "Morangis", "Épinay-sur-Orge", "Saulx-les-Chartreux"],
      specialFeatures: ["Transferts aéroport", "Transports d'affaires", "Événements à Longjumeau", "Service 24/7"],
      link: "/chauffeurs-longjumeau"
    },
    {
      title: "PARIS & ÎLE-DE-FRANCE",
      description: "Transport VTC haut de gamme dans toute la région parisienne",
      highlights: ["Aéroports (CDG, Orly, Beauvais)", "Gares parisiennes", "Sites touristiques", "Centres d'affaires", "Événements spéciaux"],
      link: "/service-chauffeurs-ile-de-france"
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      name: 'Marie L.',
      role: 'Cliente régulière',
      text: 'Un service exceptionnel ! J\'utilise régulièrement ce service de chauffeurs pour mes déplacements professionnels entre Longjumeau et Paris. Toujours ponctuel, véhicule impeccable et chauffeur très professionnel.',
      image: '/assets/images/testimonial-1.webp'
    },
    {
      name: 'Jean-Pierre M.',
      role: 'Dirigeant d\'entreprise',
      text: 'Je recommande vivement ce service de chauffeurs dans l\'Essonne. Pour mes rendez-vous d\'affaires à Massy et dans le 91, c\'est devenu indispensable. Discrétion et qualité au rendez-vous.',
      image: '/assets/images/testimonial-2.webp'
    },
    {
      name: 'Sylvie B.',
      role: 'Organisatrice d\'événements',
      text: 'Parfait pour nos événements à Évry-Courcouronnes ! Le chauffeur connaît parfaitement le département 91, véhicule luxueux et service impeccable. Nos invités sont toujours ravis.',
      image: '/assets/images/testimonial-3.webp'
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
            backgroundPosition: 'center left 35%', // Décalage vers la gauche pour mieux centrer visuellement
            backgroundSize: 'cover'
          }}
        ></div>
        
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        <div className="container relative z-20 mx-auto px-6 md:ml-[10%] md:max-w-[650px] text-white">
          <h1 className="text-center md:text-left mb-6">
            <span className="text-primary block font-bold text-5xl">ELYSIAN</span>
            <span className="text-white block font-bold text-5xl">CHAUFFEURS</span>
            <span className="text-white block font-bold text-5xl">ESSONNE (91)</span>
          </h1>
          
          <p className="text-center md:text-left font-tertiary text-xl italic text-primary mb-6">
            <span className="px-2 py-1 rounded">Service de chauffeurs privés de luxe à Longjumeau et dans tout le département 91</span>
          </p>
          
          <p className="text-center md:text-left text-lg mb-8 text-white">
            Service de chauffeurs privés haut de gamme pour vos déplacements professionnels, 
            événements prestigieux et voyages d'affaires en Essonne et Île-de-France.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start">
            <a 
              href="#booking"
              className="py-3 px-6 bg-primary text-white font-medium rounded-none uppercase tracking-wider text-sm text-center hover:bg-primary-dark hover:text-white transition-all"
            >
              Réserver maintenant
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
            <h2>NOS SERVICES DE CHAUFFEURS PRIVÉS</h2>
            <p className="subtitle">Des chauffeurs expérimentés pour vos exigences les plus élevées dans l'Essonne</p>
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
              <h3 className="text-xl mb-4 text-center">TRANSFERT VIP AVEC CHAUFFEUR</h3>
              <p className="text-gray-600 mb-6 text-center">
                Une expérience d'exception avec chauffeur privé dédié dans l'Essonne (91), véhicule de luxe et service personnalisé. 
                Confidentialité, élégance et attention aux moindres détails pour vos déplacements exclusifs à Longjumeau et environs.
              </p>
              <Link href="/experience-vip" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-glass-cheers text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">CHAUFFEURS POUR ÉVÉNEMENTS</h3>
              <p className="text-gray-600 mb-6 text-center">
                Service de chauffeurs professionnels pour vos événements spéciaux à Longjumeau et dans tout le département 91, soirées de gala et premières. Arrivez avec style et distinction.
              </p>
              <Link href="/services-evenements" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-route text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">CHAUFFEURS LONGUE DISTANCE</h3>
              <p className="text-gray-600 mb-6 text-center">
                Confort et luxe avec nos chauffeurs pour vos déplacements entre l'Essonne et les autres villes françaises. Service sur-mesure sans limite de kilométrage au départ du 91.
              </p>
              <Link href="/services-longue-distance" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-briefcase text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">CHAUFFEURS PROFESSIONNELS</h3>
              <p className="text-gray-600 mb-6 text-center">
                Chauffeurs dédiés aux entreprises et dirigeants exigeants de Longjumeau et de l'Essonne. Confidentialité, ponctualité et excellence pour vos rendez-vous professionnels.
              </p>
              <Link href="/services-affaires" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir
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
            <h2>RÉSERVEZ VOTRE CHAUFFEUR PRIVÉ EN ESSONNE</h2>
            <p className="subtitle">Un service de chauffeurs sur-mesure pour répondre à toutes vos exigences dans le 91</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={bookingControls}
            variants={fadeInVariant}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 lg:p-12"
          >
            <BookingForm />
          </motion.div>
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
            <h2>NOTRE FLOTTE DE VÉHICULES AVEC CHAUFFEUR</h2>
            <p className="subtitle">Des véhicules d'exception avec chauffeur pour une expérience inoubliable en Essonne</p>
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
                    alt={`${item.name} avec chauffeur privé dans l'Essonne`}
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
                    Réserver ce véhicule avec chauffeur
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/flotte-vehicules" className="inline-flex items-center text-primary text-lg font-medium hover:text-primary-dark transition-colors">
              Découvrir toute notre flotte avec chauffeur
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Zones d'intervention - Nouvelle section */}
      <section 
        id="locations" 
        ref={locationsRef} 
        className="py-24 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOS CHAUFFEURS DANS L'ESSONNE ET À LONGJUMEAU</h2>
            <p className="subtitle">Service de transport de qualité dans le département 91 et ses environs</p>
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
                      <h4 className="font-semibold mb-2 text-gray-800">Principales communes desservies:</h4>
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
                  
                  {area.nearby && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-800">Villes proches:</h4>
                      <p className="text-sm text-gray-600">{area.nearby.join(', ')}</p>
                    </div>
                  )}
                  
                  {area.specialFeatures && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-gray-800">Nos services spécifiques:</h4>
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
                      <h4 className="font-semibold mb-2 text-gray-800">Destinations prisées:</h4>
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
              Nos chauffeurs professionnels connaissent parfaitement le département de l'Essonne (91) et sont à votre disposition 24h/24 pour tous vos déplacements à Longjumeau et dans toute la région.
            </p>
            <a href="#booking" className="inline-block py-3 px-6 bg-primary text-white font-medium rounded-full hover:bg-primary-dark hover:text-white transition-colors duration-300">
              Réserver un chauffeur
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
                <h2 className="text-left">L'EXPÉRIENCE VIP AVEC NOS CHAUFFEURS</h2>
                <div className="h-0.5 w-12 bg-primary my-6"></div>
                <p className="text-gray-600">Plus qu'un simple transport, une expérience unique avec des chauffeurs professionnels</p>
              </div>
              <p className="text-gray-600 mb-8">
                Chaque voyage avec notre service de chauffeurs privés dans l'Essonne (91) est une expérience raffinée, 
                où chaque détail est pensé pour répondre à vos attentes les plus exigeantes.
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-gem text-primary"></i>
                  </div>
                  <span className="ml-4">Chauffeurs d'élite formés au protocole et à l'étiquette</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-glass-martini-alt text-primary"></i>
                  </div>
                  <span className="ml-4">Sélection de boissons et rafraîchissements premium</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-wifi text-primary"></i>
                  </div>
                  <span className="ml-4">Connectivité haut débit et équipements high-tech</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-shield-alt text-primary"></i>
                  </div>
                  <span className="ml-4">Discrétion absolue et confidentialité garantie</span>
                </li>
              </ul>
              <Link href="/experience-vip" className="btn btn-primary">
                Découvrir l'expérience VIP avec nos chauffeurs
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
                  alt="Expérience chauffeur VIP en Essonne (91)"
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
            <h2>AVIS SUR NOS CHAUFFEURS</h2>
            <p className="subtitle">Ce que disent nos clients sur notre service de chauffeurs en Essonne</p>
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
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image 
                      src={testimonial.image} 
                      alt={`Avis client sur chauffeurs Essonne - ${testimonial.name}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
                className={`w-12 h-12 flex items-center justify-center p-2 mx-2 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentTestimonial ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Témoignage ${index + 1} de ${testimonials[index].name}`}
              >
                <span className="w-3 h-3 rounded-full block" style={{
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
            <h2>NOS PARTENAIRES EN ESSONNE ET ÎLE-DE-FRANCE</h2>
            <p className="subtitle">Ils font confiance à nos chauffeurs professionnels au quotidien</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={partnersControls}
            variants={fadeInVariant}
            className="flex flex-wrap justify-center items-center gap-12 lg:gap-16"
          >
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoCannesFestival} alt="Festival de Cannes - partenaire chauffeurs VIP" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoRitzParis} alt="Ritz Paris - service de chauffeurs de luxe" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoLouisVuitton} alt="Louis Vuitton - transport VIP avec chauffeur" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoChanel} alt="Chanel - chauffeurs professionnels événementiel" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoAirFrance} alt="Air France - service chauffeurs aéroport Essonne" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section - Nouvelle section pour SEO */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>QUESTIONS FRÉQUENTES SUR NOS CHAUFFEURS</h2>
            <p className="subtitle">Tout ce que vous devez savoir sur notre service de chauffeurs en Essonne</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Comment réserver un chauffeur à Longjumeau et dans l'Essonne ?</h3>
                <p className="text-gray-600">
                  Vous pouvez réserver un chauffeur pour Longjumeau et toute l'Essonne en quelques clics via notre formulaire en ligne, en appelant notre service client au +33 6 43 53 76 53 ou par email. Nos chauffeurs sont disponibles 24h/24 et 7j/7 dans tout le département 91.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Quels sont les tarifs pour un service de chauffeur dans le 91 ?</h3>
                <p className="text-gray-600">
                  Nos tarifs de chauffeurs dans l'Essonne débutent à partir de 30€, avec un prix au kilomètre qui varie selon le type de véhicule. Vous pouvez obtenir une estimation précise en utilisant notre calculateur en ligne qui prend en compte votre trajet spécifique dans le 91.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Vos chauffeurs connaissent-ils bien Longjumeau et l'Essonne ?</h3>
                <p className="text-gray-600">
                  Absolument ! Nos chauffeurs sont des professionnels qui connaissent parfaitement Longjumeau et l'ensemble du département de l'Essonne (91). Leur expertise locale garantit des trajets optimisés et une connaissance précise des meilleurs itinéraires dans la région.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Proposez-vous des transferts aéroport depuis l'Essonne ?</h3>
                <p className="text-gray-600">
                  Oui, nous proposons des services de transfert avec chauffeur entre tous les points de l'Essonne (91) et les aéroports parisiens (Orly, Roissy CDG, Le Bourget). Nos chauffeurs assurent des transferts ponctuels et confortables, avec suivi des vols en temps réel.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Peut-on réserver un chauffeur pour toute la journée à Longjumeau ?</h3>
                <p className="text-gray-600">
                  Bien sûr, nous proposons des services de mise à disposition avec chauffeur à la journée ou à la demi-journée à Longjumeau et dans toute l'Essonne. Idéal pour vos rendez-vous professionnels multiples ou pour découvrir la région en toute sérénité.
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
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Réservez votre chauffeur en Essonne dès maintenant</h2>
            <p className="text-gray-300 text-lg mb-10">Un service de chauffeurs professionnels est à votre disposition dans tout le département 91, y compris à Longjumeau.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="btn btn-primary">
                Nous contacter
              </Link>
              <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                <i className="fas fa-phone mr-2"></i>
                Appeler directement
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}