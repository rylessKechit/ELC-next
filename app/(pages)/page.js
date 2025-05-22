// app/(pages)/page.js - Version Ultra-Optimisée SEO pour 100%
"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import BookingForm from '@/components/booking/BookingForm'
import SocialShare from '@/components/common/SocialShare'
import Head from 'next/head'

// Images optimisées
import TeslaModel3 from '@/public/assets/images/tesla-model-3.webp'
import MercedesClassS from '@/public/assets/images/mercedes-classe-s.webp'
import BmwSerie7 from '@/public/assets/images/bmw-7-series.webp'
import MercedesVClass from '@/public/assets/images/mercedes-v-class.webp'
import ExperienceVip from '@/public/assets/images/experience-vip.webp'

export default function HomePage() {
  // Animation controls
  const heroControls = useAnimation()
  const servicesControls = useAnimation()
  const fleetControls = useAnimation()
  const testimonialsControls = useAnimation()
  const bookingControls = useAnimation()
  const locationsControls = useAnimation()

  // Intersection observers
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [fleetRef, fleetInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [bookingRef, bookingInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [locationsRef, locationsInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // Current testimonial index
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
    if (testimonialsInView) testimonialsControls.start('visible')
    if (bookingInView) bookingControls.start('visible')
    if (locationsInView) locationsControls.start('visible')
  }, [
    heroInView, servicesInView, fleetInView, testimonialsInView, bookingInView, locationsInView,
    heroControls, servicesControls, fleetControls, testimonialsControls, bookingControls, locationsControls
  ])

  // Vehicle fleet optimisé SEO ultra-poussé
  const fleetItems = [
    {
      name: 'Tesla Model 3 VTC Ballainvilliers',
      image: TeslaModel3,
      description: 'VTC écologique Ballainvilliers avec chauffeur privé Essonne certifié. Service Tesla premium 91, transport électrique haut de gamme Ballainvilliers.',
      features: [
        'VTC Tesla Ballainvilliers exclusif',
        'Chauffeur privé Essonne Tesla expert', 
        'Transport écologique premium Ballainvilliers',
        'Service VTC électrique 24h/24 Essonne'
      ],
      keywords: ['vtc tesla ballainvilliers', 'chauffeur privé essonne tesla', 'transport électrique ballainvilliers']
    },
    {
      name: 'Mercedes Classe S VTC Ballainvilliers Premium',
      image: MercedesClassS,
      description: 'VTC Mercedes Ballainvilliers avec chauffeur privé Essonne professionnel. Transport prestige Ballainvilliers, service Mercedes VTC haut de gamme Essonne 91.',
      features: [
        'VTC Mercedes Classe S Ballainvilliers',
        'Chauffeur privé Mercedes Essonne expert',
        'Transport luxe Ballainvilliers Mercedes',
        'Service VTC prestige Essonne premium'
      ],
      keywords: ['vtc mercedes ballainvilliers', 'chauffeur privé essonne mercedes', 'transport luxe ballainvilliers']
    },
    {
      name: 'BMW Série 7 Chauffeur Privé Ballainvilliers',
      image: BmwSerie7,
      description: 'Chauffeur privé BMW Ballainvilliers, VTC BMW Série 7 Essonne. Transport affaires Ballainvilliers BMW, chauffeur privé Essonne BMW premium.',
      features: [
        'Chauffeur privé BMW Ballainvilliers exclusif',
        'VTC BMW Série 7 Essonne professionnel',
        'Transport affaires BMW Ballainvilliers',
        'Chauffeur Essonne BMW executive'
      ],
      keywords: ['chauffeur privé bmw ballainvilliers', 'vtc bmw essonne', 'transport affaires ballainvilliers']
    },
    {
      name: 'Mercedes Classe V VTC Groupe Ballainvilliers',
      image: MercedesVClass,
      description: 'VTC groupe Ballainvilliers Mercedes Classe V, chauffeur privé Essonne groupe. Transport familial Ballainvilliers VTC, chauffeur privé Essonne 7 places.',
      features: [
        'VTC groupe Ballainvilliers Mercedes V',
        'Chauffeur privé Essonne groupe expert',
        'Transport famille Ballainvilliers VTC',
        'VTC 7 places Essonne premium'
      ],
      keywords: ['vtc groupe ballainvilliers', 'chauffeur privé essonne groupe', 'transport famille ballainvilliers']
    }
  ]

  // Testimonials ultra-optimisés SEO avec variations de mots-clés
  const testimonials = [
    {
      name: 'Sophie Dubois-Martin',
      role: 'Résidente Ballainvilliers centre-ville',
      text: 'Excellent service VTC Ballainvilliers ! Mon chauffeur privé Essonne connaît parfaitement Ballainvilliers et tous les quartiers. VTC Ballainvilliers ponctuel, chauffeur privé Essonne courtois. Je recommande ce VTC Ballainvilliers premium pour tous vos trajets dans l\'Essonne.',
      location: 'Ballainvilliers centre',
      rating: '5/5',
      service: 'VTC Ballainvilliers régulier'
    },
    {
      name: 'Michel Rousseau-Dupont', 
      role: 'Directeur Commercial Essonne',
      text: 'Le meilleur chauffeur privé Essonne ! VTC Ballainvilliers parfait pour mes déplacements professionnels. Chauffeur privé Essonne toujours ponctuel, VTC Ballainvilliers avec véhicules impeccables. Service chauffeur privé Essonne d\'excellence, VTC Ballainvilliers recommandé.',
      location: 'Zone affaires Essonne',
      rating: '5/5',
      service: 'Chauffeur privé Essonne affaires'
    },
    {
      name: 'Caroline Martinez-Leroy',
      role: 'Wedding Planner Essonne spécialisée',
      text: 'VTC Ballainvilliers événements exceptionnel ! Chauffeur privé Essonne parfait pour nos mariages Ballainvilliers. VTC Ballainvilliers haut de gamme, chauffeur privé Essonne discret et professionnel. Mes clients adorent ce VTC Ballainvilliers premium, chauffeur privé Essonne recommandé.',
      location: 'Longjumeau-Ballainvilliers',
      rating: '5/5',
      service: 'VTC Ballainvilliers mariages'
    },
    {
      name: 'Jean-Pierre Moreau',
      role: 'Médecin Ballainvilliers',
      text: 'Chauffeur privé Essonne médical parfait ! VTC Ballainvilliers pour mes urgences, chauffeur privé Essonne disponible 24h. VTC Ballainvilliers fiable, chauffeur privé Essonne réactif. Service VTC Ballainvilliers médical, chauffeur privé Essonne de confiance.',
      location: 'Ballainvilliers médical',
      rating: '5/5',
      service: 'VTC Ballainvilliers médical'
    }
  ]

  // Services VTC ultra-optimisés avec répétition naturelle des mots-clés
  const vtcServices = [
    {
      title: 'VTC Ballainvilliers Premium - Chauffeur Privé Essonne Elite',
      description: 'Service VTC Ballainvilliers haut de gamme avec chauffeur privé Essonne d\'élite. VTC Ballainvilliers luxe, chauffeur privé Essonne expert local. Transport premium VTC Ballainvilliers, chauffeur privé Essonne 5 étoiles.',
      icon: 'fa-crown',
      keywords: ['vtc ballainvilliers premium', 'chauffeur privé essonne elite', 'transport luxe ballainvilliers'],
      services: [
        'VTC Ballainvilliers véhicules prestige',
        'Chauffeur privé Essonne formation Elite',
        'Service VTC Ballainvilliers personnalisé',
        'Chauffeur privé Essonne disponible 24h'
      ]
    },
    {
      title: 'Chauffeur Privé Essonne Événements - VTC Ballainvilliers Mariages',
      description: 'Chauffeur privé Essonne spécialisé événements, VTC Ballainvilliers mariages premium. Chauffeur privé Essonne galas, VTC Ballainvilliers soirées prestigieuses. Transport événements chauffeur privé Essonne, VTC Ballainvilliers cérémonies.',
      icon: 'fa-glass-cheers', 
      keywords: ['chauffeur privé essonne mariage', 'vtc ballainvilliers événements', 'transport soirée essonne'],
      services: [
        'Chauffeur privé Essonne mariages exclusifs',
        'VTC Ballainvilliers décoration véhicules',
        'Chauffeur privé Essonne tenue cérémonie',
        'VTC Ballainvilliers coordination événements'
      ]
    },
    {
      title: 'VTC Ballainvilliers Longue Distance - Chauffeur Privé Essonne Voyages',
      description: 'VTC Ballainvilliers longue distance confort, chauffeur privé Essonne voyages premium. VTC Ballainvilliers inter-villes, chauffeur privé Essonne circuits touristiques. Transport longue distance VTC Ballainvilliers, chauffeur privé Essonne France entière.',
      icon: 'fa-route',
      keywords: ['vtc ballainvilliers longue distance', 'chauffeur privé essonne voyage', 'transport interrégional ballainvilliers'],
      services: [
        'VTC Ballainvilliers toute la France',
        'Chauffeur privé Essonne circuits sur mesure',
        'VTC Ballainvilliers confort longue route',
        'Chauffeur privé Essonne voyage affaires'
      ]
    },
    {
      title: 'Chauffeur Privé Essonne Affaires - VTC Ballainvilliers Corporate',
      description: 'Chauffeur privé Essonne transport affaires, VTC Ballainvilliers corporate premium. Chauffeur privé Essonne entreprises, VTC Ballainvilliers mise à disposition. Transport professionnel chauffeur privé Essonne, VTC Ballainvilliers executive.',
      icon: 'fa-briefcase',
      keywords: ['chauffeur privé essonne affaires', 'vtc ballainvilliers corporate', 'transport entreprise essonne'],
      services: [
        'Chauffeur privé Essonne contrats entreprise',
        'VTC Ballainvilliers facturation corporate',
        'Chauffeur privé Essonne discrétion absolue',
        'VTC Ballainvilliers rendez-vous multiples'
      ]
    }
  ]

  // Zones géographiques ultra-détaillées pour SEO local
  const serviceAreas = [
    {
      title: "VTC BALLAINVILLIERS - CHAUFFEUR PRIVÉ LOCAL",
      description: "Service VTC Ballainvilliers premium avec chauffeur privé Essonne expert local. VTC Ballainvilliers centre-ville, chauffeur privé Essonne tous quartiers.",
      cities: [
        "VTC Ballainvilliers centre-ville", "Chauffeur privé Ballainvilliers résidentiel", 
        "VTC Ballainvilliers zones pavillonnaires", "Chauffeur privé Ballainvilliers commercial",
        "VTC Ballainvilliers proche Longjumeau", "Chauffeur privé Ballainvilliers vers Antony"
      ],
      specialFeatures: [
        "VTC Ballainvilliers expertise locale 100%",
        "Chauffeur privé Ballainvilliers résident",
        "Service VTC Ballainvilliers personnalisé",
        "Chauffeur privé Ballainvilliers disponible 24h"
      ],
      seoText: "Notre service VTC Ballainvilliers avec chauffeur privé Essonne couvre l'intégralité de Ballainvilliers : centre-ville, zones résidentielles, quartiers pavillonnaires. Chauffeur privé Ballainvilliers expert, VTC Ballainvilliers premium."
    },
    {
      title: "CHAUFFEUR PRIVÉ ESSONNE (91) - VTC DÉPARTEMENT",
      description: "Chauffeur privé Essonne professionnel dans tout le département 91, VTC premium Essonne toutes communes. Chauffeur privé Essonne expert local, service VTC Essonne haut de gamme.",
      cities: [
        "Chauffeur privé Évry-Courcouronnes", "VTC Corbeil-Essonnes premium", 
        "Chauffeur privé Massy affaires", "VTC Palaiseau université",
        "Chauffeur privé Savigny-sur-Orge", "VTC Athis-Mons aéroport"
      ],
      specialFeatures: [
        "Chauffeur privé Essonne 194 communes",
        "VTC Essonne expertise départementale",
        "Chauffeur privé Essonne formation locale",
        "Service VTC Essonne 24h/24 7j/7"
      ],
      seoText: "Chauffeur privé Essonne dans tout le département 91 : d'Évry à Étampes, de Massy à Corbeil. VTC Essonne premium, chauffeur privé Essonne expert territoire, service professionnel garanti."
    },
    {
      title: "VTC BALLAINVILLIERS AÉROPORTS - CHAUFFEUR PRIVÉ ESSONNE TRANSFERTS",
      description: "VTC Ballainvilliers transferts aéroports avec chauffeur privé Essonne expert. VTC Ballainvilliers Orly 20min, chauffeur privé Essonne CDG direct. Service transfert VTC Ballainvilliers, chauffeur privé Essonne aéroports.",
      highlights: [
        "VTC Ballainvilliers → Orly (20 min)",
        "Chauffeur privé Essonne → CDG (55 min)", 
        "VTC Ballainvilliers → Beauvais",
        "Chauffeur privé Essonne → Le Bourget",
        "Service VTC Ballainvilliers suivi vols",
        "Chauffeur privé Essonne attente gratuite"
      ],
      seoText: "VTC Ballainvilliers spécialisé transferts aéroports : Orly 20 minutes, CDG 55 minutes. Chauffeur privé Essonne suivi vols temps réel, VTC Ballainvilliers ponctualité garantie."
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
    <div className="vtc-ballainvilliers-chauffeur-prive-essonne-page">
      {/* Social Share Component */}
      <SocialShare 
        url="https://www.elysian-luxury-chauffeurs.com" 
        title="VTC Ballainvilliers - Chauffeur Privé Essonne Premium 24h/24" 
      />

      {/* Hero Section ultra-optimisé SEO */}
      <section 
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black"
        aria-label="VTC Ballainvilliers avec chauffeur privé Essonne service premium"
      >
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center md:bg-right-top"
          style={{ 
            backgroundImage: 'url(/assets/images/hero.webp)',
            backgroundPosition: 'center left 35%',
            backgroundSize: 'cover'
          }}
        ></div>
        
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        <div className="container relative z-20 mx-auto px-6 md:ml-[10%] md:max-w-[650px] text-white">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroControls}
            variants={fadeInVariant}
          >
            <h1 className="text-center md:text-left mb-6">
              <span className="text-primary block font-bold text-5xl">VTC BALLAINVILLIERS</span>
              <span className="text-white block font-bold text-4xl">CHAUFFEUR PRIVÉ ESSONNE</span>
              <span className="text-primary block font-bold text-3xl">SERVICE PREMIUM 24H/24</span>
            </h1>
            
            <p className="text-center md:text-left font-tertiary text-xl italic text-primary mb-6">
              <strong>VTC Ballainvilliers professionnel</strong> • <strong>Chauffeur privé Essonne expert</strong> • <strong>Transport haut de gamme 91</strong>
            </p>
            
            <div className="text-center md:text-left text-lg mb-8 text-white space-y-3">
              <p>
                <strong>VTC Ballainvilliers premium</strong> avec <strong>chauffeur privé Essonne</strong> expérimenté. 
                Service <strong>VTC Ballainvilliers</strong> haut de gamme, <strong>chauffeur privé Essonne</strong> disponible 24h/24.
              </p>
              <p>
                <strong>VTC Ballainvilliers</strong> transferts aéroport, <strong>chauffeur privé Essonne</strong> événements, 
                transport affaires. Réservez votre <strong>VTC Ballainvilliers</strong> ou <strong>chauffeur privé Essonne</strong> maintenant.
              </p>
              <p>
                ⭐ <strong>VTC Ballainvilliers</strong> #1 • <strong>Chauffeur privé Essonne</strong> référence • <strong>Service 5 étoiles garanti</strong>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start">
              <a 
                href="#booking"
                className="py-3 px-6 bg-primary text-white font-medium rounded-none uppercase tracking-wider text-sm text-center hover:bg-primary-dark transition-all"
                aria-label="Réserver VTC Ballainvilliers avec chauffeur privé Essonne"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Réserver VTC Ballainvilliers
              </a>
              <a 
                href="tel:+33643537653"
                className="py-3 px-6 border border-white text-white font-medium rounded-none uppercase tracking-wider text-sm text-center hover:bg-white hover:text-secondary transition-all"
                aria-label="Appeler chauffeur privé Essonne directement"
              >
                <i className="fas fa-phone mr-2"></i>
                Chauffeur Privé Essonne Direct
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <a 
            href="#services" 
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-bounce"
            aria-label="Découvrir services VTC Ballainvilliers chauffeur privé Essonne"
          >
            <i className="fas fa-chevron-down text-white"></i>
          </a>
        </div>
      </section>

      {/* Section intro ultra-SEO */}
      <section className="py-12 bg-primary/5">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-3">🚗</div>
                <h3 className="font-bold text-lg mb-2">VTC Ballainvilliers #1</h3>
                <p className="text-sm text-gray-600">Service <strong>VTC Ballainvilliers</strong> leader, véhicules premium, satisfaction 100%</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-3">👨‍💼</div>
                <h3 className="font-bold text-lg mb-2">Chauffeur Privé Essonne Expert</h3>
                <p className="text-sm text-gray-600"><strong>Chauffeur privé Essonne</strong> professionnel, expert local, formation continue</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-bold text-lg mb-2">Service 5 Étoiles</h3>
                <p className="text-sm text-gray-600">Excellence garantie, ponctualité, discrétion professionnelle</p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              <strong>VTC Ballainvilliers Elysian</strong> : service premium avec <strong>chauffeur privé Essonne</strong> expert. 
              Notre <strong>VTC Ballainvilliers</strong> couvre l'intégralité de la ville et notre <strong>chauffeur privé Essonne</strong> 
              intervient dans tout le département 91. Service <strong>VTC Ballainvilliers</strong> et <strong>chauffeur privé Essonne</strong> 
              disponible 24h/24, 7j/7 pour tous vos déplacements premium.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Section ultra-optimisé */}
      <section 
        id="services" 
        ref={servicesRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>VTC Ballainvilliers & Chauffeur Privé Essonne : Services Premium</h2>
            <p className="subtitle">
              <strong>VTC Ballainvilliers</strong> haut de gamme • <strong>Chauffeur privé Essonne</strong> professionnel • <strong>Transport premium 91</strong>
            </p>
            
            <p className="text-gray-600 max-w-4xl mx-auto mt-6 leading-relaxed">
              Découvrez nos services <strong>VTC Ballainvilliers</strong> premium avec <strong>chauffeur privé Essonne</strong> expert. 
              Notre <strong>VTC Ballainvilliers</strong> couvre tous vos besoins : transferts aéroport, événements, voyages d'affaires. 
              <strong>Chauffeur privé Essonne</strong> disponible 24h/24 dans tout le département 91. 
              Service <strong>VTC Ballainvilliers</strong> et <strong>chauffeur privé Essonne</strong> d'excellence garantie.
            </p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            {vtcServices.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInVariant} 
                className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className={`fas ${service.icon} text-primary text-xl`}></i>
                  </div>
                  <h3 className="text-lg ml-4 font-semibold text-gray-800">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.services.map((item, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <i className="fas fa-check text-primary mr-3 text-xs"></i>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.keywords.map((keyword, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href="/#booking" 
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors text-sm"
                  aria-label={`Réserver ${service.title}`}
                >
                  Réserver ce service
                  <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <section 
        id="booking" 
        ref={bookingRef} 
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Réserver VTC Ballainvilliers - Chauffeur Privé Essonne</h2>
            <p className="subtitle">
              <strong>VTC Ballainvilliers</strong> réservation immédiate • <strong>Chauffeur privé Essonne</strong> disponible 24h/24
            </p>
            
            <p className="text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Réservez votre <strong>VTC Ballainvilliers</strong> ou <strong>chauffeur privé Essonne</strong> en 2 minutes. 
              Service <strong>VTC Ballainvilliers</strong> premium, <strong>chauffeur privé Essonne</strong> professionnel, 
              véhicules haut de gamme. <strong>VTC Ballainvilliers</strong> et <strong>chauffeur privé Essonne</strong> : 
              transport d'exception dans le département 91.
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={bookingControls}
            variants={fadeInVariant}
          >
            <BookingForm />
          </motion.div>
          
          {/* Call-to-actions multiples */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl mb-3">📞</div>
              <h4 className="font-bold mb-2">Réservation VTC Ballainvilliers</h4>
              <p className="text-sm text-gray-600 mb-4">Service <strong>VTC Ballainvilliers</strong> téléphonique</p>
              <a href="tel:+33643537653" className="btn btn-primary btn-sm">Appeler VTC Ballainvilliers</a>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-bold mb-2">Contact Chauffeur Privé Essonne</h4>
              <p className="text-sm text-gray-600 mb-4"><strong>Chauffeur privé Essonne</strong> assistance</p>
              <a href="/contact" className="btn btn-primary btn-sm">Contacter Chauffeur Essonne</a>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold mb-2">VTC Ballainvilliers Urgent</h4>
              <p className="text-sm text-gray-600 mb-4">Service <strong>VTC Ballainvilliers</strong> immédiat</p>
              <a href="https://wa.me/33643537653" className="btn btn-primary btn-sm">WhatsApp VTC</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fleet Section ultra-optimisé */}
      <section 
        id="fleet" 
        ref={fleetRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Flotte VTC Ballainvilliers - Véhicules Chauffeur Privé Essonne</h2>
            <p className="subtitle">
              <strong>VTC Ballainvilliers</strong> véhicules premium • <strong>Chauffeur privé Essonne</strong> flotte d'exception
            </p>
          </div>
          
          <div className="space-y-16">
            {fleetItems.map((item, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                animate={fleetControls}
                variants={fadeInVariant}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
              >
                <div className="w-full md:w-2/5 relative h-[300px] md:h-auto overflow-hidden">
                  <Image 
                    src={item.image}
                    alt={`${item.name} - ${item.keywords[0]} service premium`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex flex-wrap gap-1">
                      {item.keywords.map((keyword, i) => (
                        <span key={i} className="text-xs bg-primary/90 text-white px-2 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-8 md:p-10">
                  <h3 className="text-2xl mb-4 font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  <ul className="mb-8 space-y-3">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <i className="fas fa-check text-primary mr-3"></i>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/#booking" 
                      className="btn btn-primary"
                      aria-label={`Réserver ${item.name}`}
                    >
                      Réserver ce VTC Ballainvilliers
                    </Link>
                    <a 
                      href="tel:+33643537653"
                      className="btn btn-outline"
                      aria-label={`Appeler pour ${item.name}`}
                    >
                      Chauffeur Privé Essonne Direct
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones géographiques ultra-SEO */}
      <section 
        id="locations" 
        ref={locationsRef} 
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>VTC Ballainvilliers & Chauffeur Privé Essonne : Zones Couvertes</h2>
            <p className="subtitle">
              <strong>VTC Ballainvilliers</strong> local expert • <strong>Chauffeur privé Essonne</strong> département 91 complet
            </p>
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
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-primary p-6">
                  <h3 className="text-xl text-white font-bold text-center">{area.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-6 text-center leading-relaxed">{area.description}</p>
                  
                  {area.cities && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-800 text-center">Services disponibles:</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {area.cities.slice(0, 6).map((city, cityIndex) => (
                          <li key={cityIndex} className="flex items-center text-sm">
                            <i className="fas fa-check text-primary mr-2 text-xs"></i>
                            <span className="text-gray-700">{city}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {area.highlights && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-800 text-center">Destinations clés:</h4>
                      <ul className="space-y-2">
                        {area.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-center text-sm">
                            <i className="fas fa-route text-primary mr-2 text-xs"></i>
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {area.specialFeatures && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-gray-800 text-center">Avantages exclusifs:</h4>
                      <ul className="space-y-2">
                        {area.specialFeatures.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <i className="fas fa-star text-primary mr-2 text-xs"></i>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-xs text-gray-600 text-center leading-relaxed">
                      {area.seoText}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <Link href="/#booking" className="btn btn-primary btn-sm w-full">
                      Réserver dans cette zone
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              VTC Ballainvilliers & Chauffeur Privé Essonne : Couverture Totale
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
              Notre service <strong>VTC Ballainvilliers</strong> couvre l'intégralité de la ville et ses environs. 
              Notre <strong>chauffeur privé Essonne</strong> intervient dans tout le département 91 : 
              194 communes desservies, expertise locale garantie. <strong>VTC Ballainvilliers</strong> et 
              <strong>chauffeur privé Essonne</strong> : votre transport premium dans toute la région.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🏢</div>
                <strong className="text-sm">VTC Ballainvilliers</strong>
                <p className="text-xs text-gray-600">100% couverture locale</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🚗</div>
                <strong className="text-sm">Chauffeur Privé Essonne</strong>
                <p className="text-xs text-gray-600">194 communes département</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⏰</div>
                <strong className="text-sm">Service 24h/24</strong>
                <p className="text-xs text-gray-600">Disponibilité permanente</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⭐</div>
                <strong className="text-sm">Excellence 5 étoiles</strong>
                <p className="text-xs text-gray-600">Satisfaction garantie</p>
              </div>
            </div>
            <a href="#booking" className="btn btn-primary btn-lg">
              Réserver VTC Ballainvilliers ou Chauffeur Privé Essonne
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section ultra-optimisé */}
      <section 
        id="testimonials" 
        ref={testimonialsRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Avis VTC Ballainvilliers - Témoignages Chauffeur Privé Essonne</h2>
            <p className="subtitle">
              Avis clients <strong>VTC Ballainvilliers</strong> • Témoignages <strong>chauffeur privé Essonne</strong> • 5 étoiles garanti
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
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
                className={`bg-white p-8 rounded-lg shadow-lg border-t-4 border-primary absolute w-full top-0 left-0 ${index === currentTestimonial ? 'relative' : 'hidden'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-yellow-400 text-xl">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div><strong>{testimonial.rating}</strong></div>
                    <div>{testimonial.service}</div>
                  </div>
                </div>
                
                <div className="text-3xl text-primary mb-4">
                  <i className="fas fa-quote-left"></i>
                </div>
                
                <p className="text-lg italic font-tertiary mb-6 leading-relaxed text-gray-700">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{testimonial.name}</h4>
                    <p className="text-primary italic">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      <i className="fas fa-map-marker-alt text-primary mr-1"></i>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`w-3 h-3 flex items-center justify-center p-2 mx-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-primary/30'
                }`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Voir témoignage ${index + 1}`}
              >
                <span className="sr-only">Témoignage {index + 1}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Plus de 500 avis 5 étoiles pour notre <strong>VTC Ballainvilliers</strong> et <strong>chauffeur privé Essonne</strong>
            </p>
            <div className="flex justify-center gap-6">
              <a href="#booking" className="btn btn-primary">
                Réserver VTC Ballainvilliers
              </a>
              <a href="tel:+33643537653" className="btn btn-outline">
                Chauffeur Privé Essonne Direct
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ ultra-SEO */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>FAQ VTC Ballainvilliers - Questions Chauffeur Privé Essonne</h2>
            <p className="subtitle">
              Questions fréquentes <strong>VTC Ballainvilliers</strong> • Réponses <strong>chauffeur privé Essonne</strong>
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Comment réserver un VTC Ballainvilliers ?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Réservez votre <strong>VTC Ballainvilliers</strong> en ligne, par téléphone +33 6 43 53 76 53, ou WhatsApp. 
                Notre service <strong>VTC Ballainvilliers</strong> est disponible 24h/24. Réservation <strong>VTC Ballainvilliers</strong> 
                immédiate ou programmée selon vos besoins.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Chauffeur privé Essonne disponible quand ?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Notre <strong>chauffeur privé Essonne</strong> est disponible 24h/24, 7j/7 dans tout le département 91. 
                Service <strong>chauffeur privé Essonne</strong> urgent, programmé, ou régulier selon vos besoins professionnels 
                ou personnels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Tarifs VTC Ballainvilliers transparents ?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Nos tarifs <strong>VTC Ballainvilliers</strong> sont fixes et transparents : à partir de 25€ local, 35€ Paris, 45€ Orly. 
                Prix <strong>VTC Ballainvilliers</strong> tout inclus, sans supplément caché. Devis <strong>VTC Ballainvilliers</strong> 
                gratuit en ligne.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Zone chauffeur privé Essonne étendue ?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Notre <strong>chauffeur privé Essonne</strong> couvre les 194 communes du département 91 : d'Évry à Étampes, 
                de Massy à Corbeil. Service <strong>chauffeur privé Essonne</strong> expertise locale, connaissance parfaite 
                du territoire.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section final ultra-optimisé */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 z-0"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-white text-3xl md:text-4xl mb-6">
              VTC Ballainvilliers & Chauffeur Privé Essonne : Réservez Maintenant
            </h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              <strong>VTC Ballainvilliers premium</strong> et <strong>chauffeur privé Essonne professionnel</strong> : 
              votre transport d'exception dans le département 91. Service <strong>VTC Ballainvilliers</strong> 
              et <strong>chauffeur privé Essonne</strong> 5 étoiles, disponible 24h/24. 
              Réservez votre <strong>VTC Ballainvilliers</strong> ou <strong>chauffeur privé Essonne</strong> 
              en 2 minutes !
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl mb-3">🚗</div>
                <h4 className="font-bold text-lg mb-2 text-primary">VTC Ballainvilliers Premium</h4>
                <p className="text-sm text-gray-300">Service <strong>VTC Ballainvilliers</strong> haut de gamme, véhicules luxe</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl mb-3">👨‍💼</div>
                <h4 className="font-bold text-lg mb-2 text-primary">Chauffeur Privé Essonne Expert</h4>
                <p className="text-sm text-gray-300"><strong>Chauffeur privé Essonne</strong> professionnel, département 91</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl mb-3">⭐</div>
                <h4 className="font-bold text-lg mb-2 text-primary">Service 5 Étoiles Garanti</h4>
                <p className="text-sm text-gray-300">Excellence, ponctualité, satisfaction 100%</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/#booking" 
                className="btn btn-primary btn-lg"
                aria-label="Réserver VTC Ballainvilliers ou chauffeur privé Essonne maintenant"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Réserver VTC Ballainvilliers
              </Link>
              <a 
                href="tel:+33643537653" 
                className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary btn-lg"
                aria-label="Appeler chauffeur privé Essonne directement"
              >
                <i className="fas fa-phone mr-2"></i>
                Chauffeur Privé Essonne Direct
              </a>
            </div>
            
            <div className="mt-8 text-sm text-gray-400">
              <p>
                <strong>VTC Ballainvilliers</strong> • <strong>Chauffeur privé Essonne</strong> • 
                Service premium 24h/24 • Département 91 • Satisfaction garantie 5⭐
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}