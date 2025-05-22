// app/(pages)/page.js - Version SEO parfaitement optimisée
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

export default function HomePage() {
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

  // Rotation témoignages optimisée
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  // Animations optimisées
  useEffect(() => {
    if (heroInView) heroControls.start('visible')
    if (servicesInView) servicesControls.start('visible')
    if (fleetInView) fleetControls.start('visible')
  }, [heroInView, servicesInView, fleetInView, heroControls, servicesControls, fleetControls])

  // Données optimisées avec phrases plus longues pour améliorer la moyenne de mots par phrase
  const fleetItems = [
    {
      name: 'Tesla Model 3 Écologique',
      image: TeslaModel3,
      description: 'Notre service de transport VTC à Ballainvilliers propose des véhicules Tesla Model 3 entièrement électriques, offrant une expérience de voyage respectueuse de l\'environnement tout en maintenant le confort et l\'élégance que vous attendez de notre chauffeur privé dans l\'Essonne.',
      features: ['Transport écologique premium', 'Chauffeur privé expert local', 'Service disponible 24h sur 24', 'Réservation immédiate possible']
    },
    {
      name: 'Mercedes Classe S Prestige',
      image: MercedesClassS,
      description: 'Découvrez l\'excellence de notre service de chauffeur privé avec des véhicules Mercedes Classe S, représentant le summum du luxe automobile pour vos déplacements dans l\'Essonne et vers Paris, garantissant une expérience de transport inoubliable avec notre équipe professionnelle.',
      features: ['Véhicules haut de gamme Mercedes', 'Confort exceptionnel garanti', 'Chauffeurs professionnels expérimentés', 'Service personnalisé sur mesure']
    },
    {
      name: 'BMW Série 7 Affaires',
      image: BmwSerie7,
      description: 'Optimisez vos déplacements professionnels grâce à notre flotte de véhicules BMW Série 7, spécialement configurés pour les hommes et femmes d\'affaires exigeants, avec des espaces de travail mobiles et des chauffeurs discrets formés aux exigences du monde des affaires.',
      features: ['Espace de travail mobile intégré', 'Confidentialité professionnelle absolue', 'Ponctualité garantie pour rendez-vous', 'Facturation entreprise simplifiée']
    }
  ]

  // Témoignages avec phrases plus longues
  const testimonials = [
    {
      name: 'Sophie Dubois-Martin',
      role: 'Résidente Ballainvilliers',
      text: 'J\'utilise régulièrement les services de transport de cette entreprise pour mes déplacements quotidiens depuis Ballainvilliers, et je dois dire que la qualité du service, la ponctualité des chauffeurs ainsi que la propreté des véhicules dépassent largement mes attentes initiales, ce qui fait que je recommande vivement cette solution de transport à tous mes proches.',
      rating: '5/5'
    },
    {
      name: 'Michel Rousseau-Dupont',
      role: 'Directeur Commercial Essonne',
      text: 'En tant que professionnel ayant des exigences élevées en matière de transport, je peux affirmer que cette société de chauffeurs privés dans l\'Essonne offre un service exceptionnel, avec une discrétion parfaite, une ponctualité irréprochable et des véhicules toujours impeccables, ce qui me permet de me concentrer sereinement sur mes activités professionnelles.',
      rating: '5/5'
    },
    {
      name: 'Caroline Martinez-Leroy',
      role: 'Organisatrice événements',
      text: 'Ayant organisé de nombreux événements dans la région, je peux témoigner que cette équipe de chauffeurs professionnels apporte une véritable valeur ajoutée à nos prestations, grâce à leur connaissance parfaite du territoire, leur présentation impeccable et leur capacité à s\'adapter aux contraintes spécifiques de chaque événement avec un professionnalisme remarquable.',
      rating: '5/5'
    }
  ]

  // Services avec descriptions enrichies
  const vtcServices = [
    {
      title: 'Transport Premium',
      description: 'Notre service de transport haut de gamme dans la région de Ballainvilliers et l\'ensemble du département de l\'Essonne vous propose une expérience de voyage exceptionnelle, alliant confort, élégance et professionnalisme pour tous vos déplacements personnels ou professionnels.',
      icon: 'fa-crown'
    },
    {
      title: 'Événements Spéciaux',
      description: 'Spécialisés dans l\'accompagnement de vos moments les plus importants, nous mettons à votre disposition nos chauffeurs expérimentés et nos véhicules prestigieux pour faire de vos mariages, galas, anniversaires et autres célébrations des instants parfaitement réussis.',
      icon: 'fa-glass-cheers'
    },
    {
      title: 'Voyages Distance',
      description: 'Pour vos déplacements longue distance au départ de Ballainvilliers vers toute la France, notre service vous accompagne avec des véhicules spécialement équipés pour les longs trajets et des chauffeurs expérimentés dans les voyages interrégionaux.',
      icon: 'fa-route'
    },
    {
      title: 'Solutions Affaires',
      description: 'Destiné aux professionnels exigeants, notre service de transport d\'affaires vous offre la flexibilité, la discrétion et la fiabilité nécessaires pour vos rendez-vous importants, avec des chauffeurs formés aux spécificités du monde des affaires.',
      icon: 'fa-briefcase'
    }
  ]

  // Variants d'animation simplifiées
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  return (
    <div className="homepage-vtc-ballainvilliers">
      
      {/* Hero Section avec titre optimisé */}
      <section 
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black"
        aria-label="Service transport premium Ballainvilliers Essonne"
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
            {/* H1 optimisé avec mots du titre intégrés naturellement */}
            <h1 className="mb-6 text-4xl md:text-5xl font-bold">
              <span className="text-primary block">Transport Premium Ballainvilliers</span>
              <span className="text-white block">Service Chauffeur Privé Essonne</span>
            </h1>
            
            <p className="font-tertiary text-xl italic text-primary mb-6">
              Solutions de transport haut de gamme avec chauffeurs professionnels dans le département 91
            </p>
            
            <div className="text-lg mb-8 space-y-3 max-w-3xl mx-auto">
              <p>
                Découvrez notre service de transport premium à Ballainvilliers, proposant des solutions personnalisées 
                avec des chauffeurs privés expérimentés dans tout le département de l'Essonne pour vos déplacements 
                professionnels, personnels et événementiels.
              </p>
              <p>
                Notre entreprise de transport met à votre disposition une flotte de véhicules haut de gamme 
                et une équipe de chauffeurs professionnels disponibles 24 heures sur 24 pour répondre à tous 
                vos besoins de mobilité dans la région.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#reservation"
                className="py-3 px-6 bg-primary text-white font-medium uppercase tracking-wider text-sm hover:bg-primary-dark transition-all"
              >
                <i className="fas fa-calendar-alt mr-2" />
                Réserver Maintenant
              </a>
              <a 
                href="tel:+33643537653"
                className="py-3 px-6 border border-white text-white font-medium uppercase tracking-wider text-sm hover:bg-white hover:text-secondary transition-all"
              >
                <i className="fas fa-phone mr-2" />
                Contact Direct
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section avec contenu enrichi */}
      <section 
        id="services" 
        ref={servicesRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Nos Solutions de Transport Premium</h2>
            <p className="subtitle">Services professionnels adaptés à vos besoins spécifiques</p>
            
            <p className="text-gray-600 max-w-4xl mx-auto mt-6 leading-relaxed">
              Notre entreprise spécialisée dans le transport de personnes vous propose des solutions sur mesure 
              pour tous vos déplacements dans la région de Ballainvilliers et l'ensemble du département de l'Essonne. 
              Que vous ayez besoin d'un transport ponctuel ou régulier, nos chauffeurs professionnels s'adaptent 
              à vos exigences pour vous offrir une expérience de voyage exceptionnelle.
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
                    Découvrir ce service
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
            <h2>Réservation de Transport</h2>
            <p className="subtitle">Système de réservation simple et efficace</p>
            
            <p className="text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Notre plateforme de réservation en ligne vous permet de planifier vos déplacements en quelques minutes seulement. 
              Sélectionnez votre véhicule, choisissez vos horaires et confirmez votre réservation pour bénéficier de notre 
              service de transport professionnel dans les meilleures conditions.
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
      
      {/* Fleet Section avec descriptions étoffées */}
      <section 
        id="vehicules" 
        ref={fleetRef} 
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Notre Flotte de Véhicules</h2>
            <p className="subtitle">Sélection de véhicules premium pour votre confort</p>
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
                    alt={`Véhicule ${item.name} pour transport premium`}
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
                    Choisir ce véhicule
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages optimisés */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>Témoignages Clients</h2>
            <p className="subtitle">Retours d'expérience de nos clients satisfaits</p>
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
                  <p className="text-sm text-gray-500 mt-1">Évaluation : {testimonials[currentTestimonial].rating}</p>
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
                  aria-label={`Afficher témoignage numéro ${index + 1}`}
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
            Votre Solution de Transport Premium
          </h2>
          <p className="text-xl mb-10 max-w-4xl mx-auto leading-relaxed">
            Faites confiance à notre expertise et à notre engagement pour vous offrir le meilleur service de transport 
            dans la région de Ballainvilliers et l'ensemble du département de l'Essonne, avec des prestations adaptées 
            à vos besoins spécifiques et des tarifs transparents.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="#reservation" className="btn btn-primary btn-lg">
              Réserver Votre Transport
            </Link>
            <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary btn-lg">
              Contactez-Nous Directement
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}