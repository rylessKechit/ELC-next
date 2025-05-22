// app/(pages)/page.js - Version SEO équilibrée avec phrases optimales
"use client"

import { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'

// Lazy loading optimisé
const BookingForm = dynamic(() => import('@/components/booking/BookingForm'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
})

// Images optimisées
import TeslaModel3 from '@/public/assets/images/tesla-model-3.webp'
import MercedesClassS from '@/public/assets/images/mercedes-classe-s.webp'
import BmwSerie7 from '@/public/assets/images/bmw-7-series.webp'

export default function VTCBallainvilliersPage() {
  // Animation controls simplifiés
  const heroControls = useAnimation()
  const servicesControls = useAnimation()
  const fleetControls = useAnimation()

  // Intersection observers optimisés
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [fleetRef, fleetInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // État témoignages
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Rotation témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Animations
  useEffect(() => {
    if (heroInView) heroControls.start('visible')
    if (servicesInView) servicesControls.start('visible')
    if (fleetInView) fleetControls.start('visible')
  }, [heroInView, servicesInView, fleetInView, heroControls, servicesControls, fleetControls])

  // Données avec phrases équilibrées (15-20 mots par phrase)
  const fleetItems = [
    {
      name: 'Tesla Model 3 VTC Ballainvilliers',
      image: TeslaModel3,
      description: 'Notre VTC Ballainvilliers propose des véhicules Tesla écologiques. Chauffeur privé Essonne expert en transport électrique premium. Service respectueux de l\'environnement avec confort garanti. Réservation VTC Ballainvilliers disponible 24h/24.',
      features: ['VTC Ballainvilliers écologique', 'Chauffeur privé Essonne Tesla', 'Transport premium électrique', 'Service 24h disponible']
    },
    {
      name: 'Mercedes Classe S VTC Premium',
      image: MercedesClassS,
      description: 'VTC Ballainvilliers avec Mercedes Classe S haut de gamme. Notre chauffeur privé Essonne garantit excellence et confort. Transport luxe pour clientèle exigeante dans l\'Essonne. Service VTC Ballainvilliers d\'exception reconnu.',
      features: ['VTC Ballainvilliers Mercedes premium', 'Chauffeur privé Essonne expert', 'Confort exceptionnel garanti', 'Service personnalisé sur mesure']
    },
    {
      name: 'BMW Série 7 Chauffeur Affaires',
      image: BmwSerie7,
      description: 'Chauffeur privé Essonne spécialisé transport d\'affaires BMW. VTC Ballainvilliers pour professionnels exigeants uniquement. Véhicules équipés espace travail mobile intégré. Discrétion et ponctualité garanties pour rendez-vous.',
      features: ['Chauffeur privé Essonne affaires', 'VTC Ballainvilliers professionnel', 'Espace travail mobile', 'Confidentialité absolue garantie']
    }
  ]

  // Témoignages avec phrases équilibrées
  const testimonials = [
    {
      name: 'Sophie Dubois-Martin',
      role: 'Résidente Ballainvilliers',
      text: 'J\'utilise régulièrement ce service VTC Ballainvilliers depuis deux ans. La qualité du chauffeur privé Essonne dépasse mes attentes. Véhicules toujours propres et chauffeurs très courtois. Je recommande vivement ce VTC Ballainvilliers à tous.',
      rating: '5/5'
    },
    {
      name: 'Michel Rousseau-Dupont',
      role: 'Directeur Commercial Essonne',
      text: 'Excellent chauffeur privé Essonne pour mes déplacements professionnels. VTC Ballainvilliers ponctuel et discret comme j\'aime. Service irréprochable qui me permet de travailler sereinement. Parfait pour le transport d\'affaires en Essonne.',
      rating: '5/5'
    },
    {
      name: 'Caroline Martinez-Leroy',
      role: 'Organisatrice événements',
      text: 'Ce VTC Ballainvilliers transforme nos événements en succès. Chauffeur privé Essonne toujours impeccable et professionnel. Connaissance parfaite du territoire et adaptation remarquable. Service VTC Ballainvilliers recommandé pour événements.',
      rating: '5/5'
    }
  ]

  // Services avec descriptions équilibrées
  const vtcServices = [
    {
      title: 'VTC Ballainvilliers Premium',
      description: 'Service VTC Ballainvilliers haut de gamme dans l\'Essonne. Chauffeur privé Essonne expérimenté pour vos déplacements. Transport premium avec véhicules luxueux sélectionnés. Confort et élégance garantis pour chaque trajet.',
      icon: 'fa-crown'
    },
    {
      title: 'Chauffeur Privé Événements',
      description: 'Chauffeur privé Essonne spécialisé dans les événements spéciaux. VTC Ballainvilliers pour mariages, galas et célébrations. Accompagnement professionnel de vos moments importants. Service personnalisé selon vos besoins événementiels.',
      icon: 'fa-glass-cheers'
    },
    {
      title: 'Transport Longue Distance',
      description: 'VTC Ballainvilliers pour voyages longue distance confortables. Chauffeur privé Essonne expert des trajets interrégionaux. Véhicules équipés pour longs déplacements optimaux. Service fiable vers toute la France.',
      icon: 'fa-route'
    },
    {
      title: 'VTC Ballainvilliers Affaires',
      description: 'Transport d\'affaires avec chauffeur privé Essonne professionnel. VTC Ballainvilliers pour entreprises et dirigeants. Discrétion et ponctualité pour rendez-vous importants. Facturation entreprise simplifiée et transparente.',
      icon: 'fa-briefcase'
    }
  ]

  // Variants d'animation
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
      
      {/* Hero Section avec titre parfaitement intégré */}
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
            {/* H1 avec mots du titre intégrés */}
            <h1 className="mb-6 text-4xl md:text-5xl font-bold">
              <span className="text-primary block">VTC BALLAINVILLIERS</span>
              <span className="text-white block">CHAUFFEUR PRIVÉ ESSONNE</span>
            </h1>
            
            <p className="font-tertiary text-xl italic text-primary mb-6">
              Service VTC Ballainvilliers premium • Chauffeur privé Essonne 24h/24
            </p>
            
            <div className="text-lg mb-8 space-y-4 max-w-3xl mx-auto">
              <p>
                Découvrez notre service VTC Ballainvilliers de qualité supérieure. 
                Chauffeur privé Essonne expérimenté disponible jour et nuit. 
                Transport premium dans tout le département 91.
              </p>
              <p>
                Notre VTC Ballainvilliers propose véhicules haut de gamme. 
                Chauffeur privé Essonne formé pour satisfaction client. 
                Réservation simple et tarifs transparents garantis.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#reservation"
                className="py-3 px-6 bg-primary text-white font-medium uppercase tracking-wider text-sm hover:bg-primary-dark transition-all"
              >
                <i className="fas fa-calendar-alt mr-2" />
                Réserver Votre VTC
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

      {/* Services Section */}
      <section 
        id="services" 
        ref={servicesRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Services VTC Ballainvilliers & Chauffeur Privé Essonne</h2>
            <p className="subtitle">Transport premium département 91 avec chauffeurs experts</p>
            
            <p className="text-gray-600 max-w-4xl mx-auto mt-6">
              Notre entreprise VTC Ballainvilliers vous accompagne quotidiennement. 
              Chauffeur privé Essonne disponible pour tous vos besoins. 
              Transport professionnel et personnel dans tout le département. 
              Service adapté à votre rythme de vie.
            </p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {vtcServices.map((service, index) => (
              <motion.div 
                key={index}
                variants={fadeInVariant} 
                className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border-t-4 border-primary"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <i className={`fas ${service.icon} text-primary text-2xl`} />
                </div>
                <h3 className="text-xl mb-4 font-semibold">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="text-center">
                  <Link 
                    href="#reservation" 
                    className="text-primary font-medium hover:text-primary-dark transition-colors"
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

      {/* Section réservation */}
      <section 
        id="reservation" 
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Réserver VTC Ballainvilliers</h2>
            <p className="subtitle">Chauffeur privé Essonne réservation en ligne simple</p>
            
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Réservez votre VTC Ballainvilliers en quelques clics seulement. 
              Chauffeur privé Essonne disponible immédiatement ou sur rendez-vous. 
              Système de réservation sécurisé et confirmation instantanée. 
              Service client disponible pour toute assistance.
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
          >
            <Suspense fallback={<div className="h-64 bg-white rounded-lg animate-pulse" />}>
              <BookingForm />
            </Suspense>
          </motion.div>
        </div>
      </section>
      
      {/* Fleet Section */}
      <section 
        id="vehicules" 
        ref={fleetRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Flotte VTC Ballainvilliers</h2>
            <p className="subtitle">Véhicules premium chauffeur privé Essonne sélectionnés</p>
            
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Notre flotte VTC Ballainvilliers comprend véhicules haut de gamme. 
              Chaque chauffeur privé Essonne conduit voitures récentes et entretenues. 
              Sélection rigoureuse pour votre confort et sécurité. 
              Véhicules adaptés à tous types de déplacements.
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
                <div className="w-full md:w-2/5 relative h-[300px] md:h-auto">
                  <Image 
                    src={item.image}
                    alt={`${item.name} service VTC Ballainvilliers chauffeur privé Essonne`}
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
                      <li key={i} className="flex items-center">
                        <i className="fas fa-check text-primary mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="#reservation" 
                    className="btn btn-primary"
                  >
                    Réserver VTC Ballainvilliers
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Avis VTC Ballainvilliers</h2>
            <p className="subtitle">Témoignages clients chauffeur privé Essonne satisfaits</p>
            
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Découvrez les avis de nos clients VTC Ballainvilliers. 
              Chauffeur privé Essonne apprécié pour son professionnalisme. 
              Satisfaction client au cœur de nos priorités. 
              Service évalué 5 étoiles par nos utilisateurs.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-yellow-400 text-2xl mb-4">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-lg italic mb-6 text-gray-700 leading-relaxed">
                  {testimonials[currentTestimonial].text}
                </p>
                <div>
                  <h4 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-primary italic">{testimonials[currentTestimonial].role}</p>
                  <p className="text-sm text-gray-500 mt-1">Note : {testimonials[currentTestimonial].rating}</p>
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
      
      {/* Call to Action final */}
      <section className="py-20 bg-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            VTC Ballainvilliers & Chauffeur Privé Essonne
          </h2>
          <p className="text-xl mb-10 max-w-4xl mx-auto">
            Choisissez l\'excellence avec notre VTC Ballainvilliers reconnu. 
            Chauffeur privé Essonne professionnel à votre service. 
            Transport premium dans tout le département 91. 
            Réservation simple et service garanti 24h/24.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="#reservation" className="btn btn-primary btn-lg">
              <i className="fas fa-calendar-alt mr-2" />
              Réserver VTC Ballainvilliers
            </Link>
            <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary btn-lg">
              <i className="fas fa-phone mr-2" />
              Chauffeur Privé Essonne
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}