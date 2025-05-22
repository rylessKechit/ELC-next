// app/(pages)/page.js - Version avec corrections SEO critiques
"use client"

import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'

// Lazy loading des composants pour améliorer les performances
const BookingForm = dynamic(() => import('@/components/booking/BookingForm'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
})

// Images optimisées avec lazy loading
import TeslaModel3 from '@/public/assets/images/tesla-model-3.webp'
import MercedesClassS from '@/public/assets/images/mercedes-classe-s.webp'
import BmwSerie7 from '@/public/assets/images/bmw-7-series.webp'
import MercedesVClass from '@/public/assets/images/mercedes-v-class.webp'
import ExperienceVip from '@/public/assets/images/experience-vip.webp'

export default function HomePage() {
  // Animation controls (réduits pour les performances)
  const heroControls = useAnimation()
  const servicesControls = useAnimation()
  const fleetControls = useAnimation()
  const bookingControls = useAnimation()

  // Intersection observers optimisés
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [fleetRef, fleetInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [bookingRef, bookingInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // État pour les témoignages
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto rotate testimonials optimisé
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Augmenté pour réduire les re-renders
    
    return () => clearInterval(interval)
  }, [])

  // Animations optimisées
  useEffect(() => {
    if (heroInView) heroControls.start('visible')
    if (servicesInView) servicesControls.start('visible')
    if (fleetInView) fleetControls.start('visible')
    if (bookingInView) bookingControls.start('visible')
  }, [heroInView, servicesInView, fleetInView, bookingInView, heroControls, servicesControls, fleetControls, bookingControls])

  // Données optimisées et simplifiées
  const fleetItems = [
    {
      name: 'Tesla Model 3 VTC Ballainvilliers',
      image: TeslaModel3,
      description: 'VTC écologique Ballainvilliers avec chauffeur privé Essonne. Service Tesla premium, transport électrique Ballainvilliers.',
      features: ['VTC Tesla Ballainvilliers', 'Chauffeur privé Essonne Tesla', 'Transport écologique premium', 'Service VTC 24h/24']
    },
    {
      name: 'Mercedes Classe S VTC Premium',
      image: MercedesClassS,
      description: 'VTC Mercedes Ballainvilliers avec chauffeur privé Essonne. Transport prestige, service Mercedes VTC haut de gamme.',
      features: ['VTC Mercedes Ballainvilliers', 'Chauffeur privé Essonne expert', 'Transport luxe Mercedes', 'Service VTC prestige']
    },
    {
      name: 'BMW Série 7 Chauffeur Privé',
      image: BmwSerie7,
      description: 'Chauffeur privé BMW Ballainvilliers, VTC BMW Essonne. Transport affaires BMW, chauffeur privé Essonne BMW.',
      features: ['Chauffeur privé BMW', 'VTC BMW Essonne', 'Transport affaires', 'Chauffeur Essonne executive']
    }
  ]

  // Témoignages optimisés
  const testimonials = [
    {
      name: 'Sophie D.',
      role: 'Résidente Ballainvilliers',
      text: 'Excellent service VTC Ballainvilliers ! Chauffeur privé Essonne ponctuel, véhicule impeccable. Je recommande ce VTC Ballainvilliers pour tous vos trajets.',
      rating: '5/5'
    },
    {
      name: 'Michel R.',
      role: 'Directeur Commercial Essonne',
      text: 'Le meilleur chauffeur privé Essonne ! VTC Ballainvilliers parfait pour mes déplacements. Service chauffeur privé Essonne d\'excellence.',
      rating: '5/5'
    },
    {
      name: 'Caroline M.',
      role: 'Wedding Planner',
      text: 'VTC Ballainvilliers événements exceptionnel ! Chauffeur privé Essonne parfait pour nos mariages. Service VTC Ballainvilliers premium.',
      rating: '5/5'
    }
  ]

  // Services VTC simplifiés
  const vtcServices = [
    {
      title: 'VTC Premium Ballainvilliers',
      description: 'Service VTC Ballainvilliers haut de gamme avec chauffeur privé Essonne d\'élite. Transport premium VTC Ballainvilliers.',
      icon: 'fa-crown'
    },
    {
      title: 'Chauffeur Événements Essonne',
      description: 'Chauffeur privé Essonne spécialisé événements, VTC Ballainvilliers mariages. Transport événements chauffeur privé Essonne.',
      icon: 'fa-glass-cheers'
    },
    {
      title: 'VTC Longue Distance',
      description: 'VTC Ballainvilliers longue distance, chauffeur privé Essonne voyages. Transport longue distance VTC Ballainvilliers.',
      icon: 'fa-route'
    },
    {
      title: 'Transport Affaires Ballainvilliers',
      description: 'Chauffeur privé Essonne transport affaires, VTC Ballainvilliers corporate. Transport professionnel chauffeur privé Essonne.',
      icon: 'fa-briefcase'
    }
  ]

  // Animation variants simplifiées
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  return (
    <div className="vtc-ballainvilliers-chauffeur-prive-essonne">
      
      {/* Hero Section optimisé SEO */}
      <section 
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black"
        aria-label="VTC Ballainvilliers chauffeur privé Essonne service premium"
      >
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(/assets/images/hero.webp)',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="container relative z-20 mx-auto px-6 text-white max-w-4xl">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroControls}
            variants={fadeInVariant}
            className="text-center"
          >
            {/* H1 optimisé avec mots-clés du titre */}
            <h1 className="mb-6 text-4xl md:text-5xl font-bold">
              <span className="text-primary block">VTC BALLAINVILLIERS</span>
              <span className="text-white block">CHAUFFEUR PRIVÉ ESSONNE</span>
            </h1>
            
            <p className="font-tertiary text-xl italic text-primary mb-6">
              Service VTC premium Ballainvilliers • Chauffeur privé Essonne professionnel 24h/24
            </p>
            
            <div className="text-lg mb-8 space-y-2 max-w-3xl mx-auto">
              <p>
                <strong>VTC Ballainvilliers</strong> de luxe avec <strong>chauffeur privé Essonne</strong> expert. 
                Service <strong>VTC Ballainvilliers</strong> haut de gamme, <strong>chauffeur privé Essonne</strong> disponible 24h/24.
              </p>
              <p>
                Transport premium : <strong>VTC Ballainvilliers</strong> aéroports, <strong>chauffeur privé Essonne</strong> événements, 
                voyages d'affaires. Réservation <strong>VTC Ballainvilliers</strong> immédiate.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#booking"
                className="py-3 px-6 bg-primary text-white font-medium uppercase tracking-wider text-sm hover:bg-primary-dark transition-all"
              >
                <i className="fas fa-calendar-alt mr-2" />
                Réserver VTC Ballainvilliers
              </a>
              <a 
                href="tel:+33643537653"
                className="py-3 px-6 border border-white text-white font-medium uppercase tracking-wider text-sm hover:bg-white hover:text-secondary transition-all"
              >
                <i className="fas fa-phone mr-2" />
                Chauffeur Privé Direct
              </a>
            </div>
          </motion.div>
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
            <h2>Services VTC Ballainvilliers & Chauffeur Privé Essonne</h2>
            <p className="subtitle">Transport premium avec chauffeurs expérimentés département 91</p>
            
            <p className="text-gray-600 max-w-3xl mx-auto mt-6">
              Découvrez nos services <strong>VTC Ballainvilliers</strong> avec <strong>chauffeur privé Essonne</strong> expert. 
              Notre <strong>VTC Ballainvilliers</strong> couvre tous vos besoins transport dans l'Essonne.
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
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border-t-4 border-primary"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <i className={`fas ${service.icon} text-primary text-2xl`} />
                </div>
                <h3 className="text-xl mb-4 text-center font-semibold">{service.title}</h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="text-center">
                  <Link 
                    href="/#booking" 
                    className="text-primary font-medium hover:text-primary-dark transition-colors text-sm"
                  >
                    Réserver ce service
                    <i className="fas fa-arrow-right ml-2 text-xs" />
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
            <h2>Réserver VTC Ballainvilliers</h2>
            <p className="subtitle">Service chauffeur privé Essonne disponible 24h/24</p>
            
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Réservez votre <strong>VTC Ballainvilliers</strong> ou <strong>chauffeur privé Essonne</strong> 
              en 2 minutes. Transport premium garanti.
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={bookingControls}
            variants={fadeInVariant}
          >
            <Suspense fallback={<div className="h-64 bg-white rounded-lg animate-pulse" />}>
              <BookingForm />
            </Suspense>
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
            <h2>Flotte VTC Ballainvilliers</h2>
            <p className="subtitle">Véhicules premium chauffeur privé Essonne</p>
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
                <div className="w-full md:w-2/5 relative h-[300px] md:h-auto">
                  <Image 
                    src={item.image}
                    alt={`${item.name} service VTC Ballainvilliers`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="w-full md:w-3/5 p-8">
                  <h3 className="text-2xl mb-4 font-semibold">{item.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>
                  <ul className="mb-8 space-y-3">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <i className="fas fa-check text-primary mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/#booking" 
                    className="btn btn-primary"
                  >
                    Réserver ce VTC
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section simplifié */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Avis VTC Ballainvilliers</h2>
            <p className="subtitle">Témoignages clients chauffeur privé Essonne</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-yellow-400 text-2xl mb-4">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-lg italic mb-6 text-gray-700">
                  {testimonials[currentTestimonial].text}
                </p>
                <div>
                  <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-primary italic">{testimonials[currentTestimonial].role}</p>
                  <p className="text-sm text-gray-500 mt-1">{testimonials[currentTestimonial].rating}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-3 h-3 mx-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA final */}
      <section className="py-20 bg-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            VTC Ballainvilliers & Chauffeur Privé Essonne
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Service <strong>VTC Ballainvilliers</strong> premium et <strong>chauffeur privé Essonne</strong> 
            professionnel. Transport d'exception département 91.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/#booking" className="btn btn-primary btn-lg">
              Réserver VTC Ballainvilliers
            </Link>
            <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary btn-lg">
              Chauffeur Privé Direct
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}