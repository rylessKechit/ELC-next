// app/(pages)/page.js - Version SEO optimisée
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

  // Intersection observers
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [fleetRef, fleetInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [bookingRef, bookingInView] = useInView({ threshold: 0.1, triggerOnce: true })

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
  }, [
    heroInView, servicesInView, fleetInView, testimonialsInView, bookingInView,
    heroControls, servicesControls, fleetControls, testimonialsControls, bookingControls
  ])

  // Vehicle fleet carousel items
  const fleetItems = [
    {
      name: 'Tesla Model 3 - VTC Écologique',
      image: TeslaModel3,
      description: 'VTC écologique premium à Ballainvilliers. Chauffeur privé Essonne avec véhicule 100% électrique pour vos déplacements responsables.',
      features: ['Transport VTC zéro émission', 'Chauffeur privé certifié', 'Service premium Ballainvilliers', 'Réservation VTC 24h/24']
    },
    {
      name: 'Mercedes-Benz Classe S - VTC Prestige',
      image: MercedesClassS,
      description: 'Service VTC prestige Ballainvilliers avec chauffeur privé expérimenté. Transport haut de gamme dans l\'Essonne pour vos déplacements d\'exception.',
      features: ['VTC luxe Ballainvilliers', 'Chauffeur privé professionnel', 'Transport affaires Essonne', 'Service VTC personnalisé']
    },
    {
      name: 'BMW Série 7 - Chauffeur Affaires',
      image: BmwSerie7,
      description: 'Chauffeur privé spécialisé transport d\'affaires Ballainvilliers. VTC professionnel Essonne avec véhicules executive premium.',
      features: ['Transport professionnel VTC', 'Chauffeur affaires Essonne', 'VTC corporate Ballainvilliers', 'Service entreprise 24/7']
    },
    {
      name: 'Mercedes Classe V - VTC Groupe',
      image: MercedesVClass,
      description: 'VTC groupe Ballainvilliers avec chauffeur privé. Transport familial et professionnel dans l\'Essonne jusqu\'à 7 passagers.',
      features: ['VTC famille Ballainvilliers', 'Transport groupe Essonne', 'Chauffeur privé groupe', 'VTC événements']
    }
  ]

  // Testimonials optimisés SEO
  const testimonials = [
    {
      name: 'Sophie Dubois',
      role: 'Résidente Ballainvilliers',
      text: 'Excellent service VTC à Ballainvilliers ! Le chauffeur privé connaît parfaitement la ville et les environs. Transport fiable vers Paris, tarifs VTC transparents. Je recommande ce service de chauffeur privé dans l\'Essonne.',
      location: 'Ballainvilliers'
    },
    {
      name: 'Michel Rousseau', 
      role: 'Directeur Commercial',
      text: 'Le meilleur service de chauffeurs privés de l\'Essonne ! VTC professionnel Ballainvilliers parfait pour mes déplacements d\'affaires. Chauffeur ponctuel, véhicule impeccable, service VTC d\'excellence.',
      location: 'Essonne'
    },
    {
      name: 'Caroline Martinez',
      role: 'Wedding Planner',
      text: 'Service VTC événements exceptionnel ! Les chauffeurs privés Ballainvilliers sont parfaits pour nos mariages. VTC haut de gamme, nos clients adorent ce transport premium dans l\'Essonne.',
      location: 'Longjumeau'
    }
  ]

  // Services VTC optimisés
  const vtcServices = [
    {
      title: 'VTC Premium Ballainvilliers',
      description: 'Service VTC haut de gamme à Ballainvilliers avec chauffeurs privés d\'élite. Transport luxe Essonne pour clientèle exigeante.',
      icon: 'fa-crown',
      keywords: ['vtc premium ballainvilliers', 'chauffeur privé luxe', 'transport haut gamme essonne']
    },
    {
      title: 'Chauffeur Événements Essonne',
      description: 'Chauffeurs privés spécialisés événements dans l\'Essonne. VTC mariages Ballainvilliers, transport galas, soirées prestigieuses.',
      icon: 'fa-glass-cheers', 
      keywords: ['chauffeur mariage essonne', 'vtc événements ballainvilliers', 'transport soirée']
    },
    {
      title: 'VTC Longue Distance Essonne',
      description: 'Service VTC longue distance depuis Ballainvilliers. Chauffeur privé interrégional Essonne, voyages confort premium.',
      icon: 'fa-route',
      keywords: ['vtc longue distance', 'chauffeur privé voyage', 'transport interrégional essonne']
    },
    {
      title: 'Transport Affaires Ballainvilliers',
      description: 'Chauffeurs privés dédiés professionnels Ballainvilliers. VTC affaires Essonne, transport corporate, mise à disposition.',
      icon: 'fa-briefcase',
      keywords: ['vtc affaires ballainvilliers', 'chauffeur privé professionnel', 'transport entreprise essonne']
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
    <div className="home-page">
      {/* Social Share Component */}
      <SocialShare 
        url="https://www.elysian-luxury-chauffeurs.com" 
        title="VTC Ballainvilliers - Chauffeur Privé Essonne Premium" 
      />

      {/* Hero Section optimisé SEO */}
      <section 
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black"
        aria-label="Service VTC Ballainvilliers avec chauffeur privé"
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
            </h1>
            
            <p className="text-center md:text-left font-tertiary text-xl italic text-primary mb-6">
              Service VTC premium Ballainvilliers • Chauffeurs privés professionnels Essonne (91)
            </p>
            
            <p className="text-center md:text-left text-lg mb-8 text-white">
              VTC Ballainvilliers de luxe avec chauffeurs privés expérimentés dans l'Essonne. Transport premium 24h/24 
              pour vos déplacements professionnels, transferts aéroport CDG/Orly, événements prestigieux. 
              Réservez votre chauffeur privé Essonne maintenant.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start">
              <a 
                href="#booking"
                className="py-3 px-6 bg-primary text-white font-medium rounded-none uppercase tracking-wider text-sm text-center hover:bg-primary-dark transition-all"
                aria-label="Réserver VTC Ballainvilliers maintenant"
              >
                Réserver VTC Ballainvilliers
              </a>
              <a 
                href="tel:+33643537653"
                className="py-3 px-6 border border-white text-white font-medium rounded-none uppercase tracking-wider text-sm text-center hover:bg-white hover:text-secondary transition-all"
                aria-label="Appeler chauffeur privé Essonne"
              >
                <i className="fas fa-phone mr-2"></i>
                Chauffeur Privé Direct
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <a 
            href="#services" 
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-bounce"
            aria-label="Découvrir services VTC Ballainvilliers"
          >
            <i className="fas fa-chevron-down text-white"></i>
          </a>
        </div>
      </section>
      
      {/* Services Section optimisé */}
      <section 
        id="services" 
        ref={servicesRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Services VTC Ballainvilliers & Chauffeurs Privé Essonne</h2>
            <p className="subtitle">Transport premium avec chauffeurs expérimentés dans le département 91</p>
            
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Découvrez nos services VTC Ballainvilliers avec chauffeurs privés professionnels. 
              Transport haut de gamme dans l'Essonne : transferts aéroport, événements, voyages d'affaires, 
              mise à disposition. Votre chauffeur privé Essonne vous attend 24h/24.
            </p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {vtcServices.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInVariant} 
                className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <i className={`fas ${service.icon} text-primary text-2xl`}></i>
                </div>
                <h3 className="text-xl mb-4 text-center font-semibold">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-center text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="text-center">
                  <Link 
                    href={`/${service.keywords[0].replace(/ /g, '-')}`} 
                    className="text-primary font-medium hover:text-primary-dark transition-colors inline-flex items-center text-sm"
                    aria-label={`Découvrir ${service.title}`}
                  >
                    En savoir plus
                    <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
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
            <h2>Réserver Votre VTC Ballainvilliers</h2>
            <p className="subtitle">Chauffeur privé Essonne disponible 24h/24 - Réservation immédiate</p>
            
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Réservez votre VTC Ballainvilliers en quelques clics. Chauffeurs privés professionnels, 
              véhicules premium, service personnalisé dans l'Essonne. Transport immédiat ou programmé.
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={bookingControls}
            variants={fadeInVariant}
          >
            <BookingForm />
          </motion.div>
        </div>
      </section>
      
      {/* Fleet Section optimisé */}
      <section 
        id="fleet" 
        ref={fleetRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Notre Flotte VTC Ballainvilliers</h2>
            <p className="subtitle">Véhicules premium avec chauffeurs privés expérimentés Essonne</p>
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
                    alt={`${item.name} - Service ${item.features[0]}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
                <div className="w-full md:w-3/5 p-8 md:p-10">
                  <h3 className="text-2xl mb-4 font-semibold">{item.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  <ul className="mb-8 space-y-3">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <i className="fas fa-check text-primary mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/#booking" 
                    className="btn btn-primary"
                    aria-label={`Réserver ${item.name} à Ballainvilliers`}
                  >
                    Réserver ce VTC
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section optimisé */}
      <section 
        id="testimonials" 
        ref={testimonialsRef} 
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Avis VTC Ballainvilliers</h2>
            <p className="subtitle">Témoignages clients sur notre service de chauffeur privé Essonne</p>
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
                <p className="text-lg italic font-tertiary mb-8 leading-relaxed text-gray-700">
                  {testimonial.text}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
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
        </div>
      </section>
      
      {/* CTA Section final */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 z-0"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-white text-3xl md:text-4xl mb-6">
              Votre Chauffeur Privé Ballainvilliers Vous Attend
            </h2>
            <p className="text-gray-300 text-lg mb-10">
              Service VTC premium Ballainvilliers avec chauffeurs privés professionnels dans l'Essonne. 
              Réservation 24h/24, véhicules haut de gamme, tarifs transparents. 
              Votre transport de luxe dans le département 91.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/#booking" 
                className="btn btn-primary"
                aria-label="Réserver VTC Ballainvilliers maintenant"
              >
                Réserver VTC Maintenant
              </Link>
              <a 
                href="tel:+33643537653" 
                className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary"
                aria-label="Appeler chauffeur privé Essonne directement"
              >
                <i className="fas fa-phone mr-2"></i>
                Chauffeur Privé Direct
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}