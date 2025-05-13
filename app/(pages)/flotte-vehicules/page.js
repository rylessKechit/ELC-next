// app/(pages)/flotte-vehicules/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import teslaModel3 from '@/public/assets/images/tesla-model-3.webp'
import mercedesClasseE from '@/public/assets/images/mercedes-classe-e.webp'
mercedesClasseE
import bmwSerie7 from '@/public/assets/images/bmw-7-series.webp'
import mercedesVClass from '@/public/assets/images/mercedes-v-class.webp'

export default function FlotteVehiculesPage() {
  // État pour suivre le véhicule sélectionné
  const [selectedVehicle, setSelectedVehicle] = useState('sedan')
  
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const fleetControls = useAnimation()
  const specialsControls = useAnimation()
  const faqControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [fleetRef, fleetInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [specialsRef, specialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (fleetInView) fleetControls.start('visible')
    if (specialsInView) specialsControls.start('visible')
    if (faqInView) faqControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, fleetInView, specialsInView, faqInView, ctaInView,
    headerControls, introControls, fleetControls, specialsControls, faqControls, ctaControls
  ])

  // Données de notre flotte
  const vehicles = [
    {
      id: 'green',
      name: 'Véhicule Green',
      model: 'Tesla Model 3',
      description: 'Conjuguez luxe et démarche écologique avec notre option 100% électrique. Profitez d\'une expérience silencieuse, confortable et respectueuse de l\'environnement.',
      capacity: 'Jusqu\'à 4 passagers',
      luggage: 'Jusqu\'à 3 bagages',
      features: [
        'Zéro émission',
        'Conduite silencieuse',
        'Intérieur végan',
        'Écran tactile central',
        'WiFi haute vitesse',
        'Toit panoramique en verre',
        'Autopilot avancé'
      ],
      image: teslaModel3,
      ideal: 'Idéal pour: Clients éco-responsables, zones à faibles émissions, trajets urbains'
    },
    {
      id: 'sedan',
      name: 'Berline de Luxe',
      model: 'Mercedes-Benz Classe E',
      description: 'Alliance parfaite entre élégance et confort pour vos déplacements professionnels et privés. La référence pour tous vos trajets d\'affaires.',
      capacity: 'Jusqu\'à 3 passagers',
      luggage: 'Jusqu\'à 3 bagages',
      features: [
        'Intérieur cuir',
        'Climatisation multi-zone',
        'WiFi gratuit',
        'Chargeurs pour téléphones',
        'Bouteilles d\'eau offertes',
        'Espace de travail confortable'
      ],
      image: mercedesClasseE,
      ideal: 'Idéal pour: Trajets d\'affaires, transferts aéroport, déplacements urbains'
    },
    {
      id: 'premium',
      name: 'Berline Premium',
      model: 'Mercedes-Benz Classe S / BMW Série 7',
      description: 'Le summum du luxe et du confort pour les clients les plus exigeants. Un cocon de sérénité pour vos déplacements de prestige.',
      capacity: 'Jusqu\'à 3 passagers',
      luggage: 'Jusqu\'à 3 bagages',
      features: [
        'Intérieur cuir Nappa',
        'Sièges massants',
        'Système audio haute-fidélité',
        'Éclairage d\'ambiance personnalisable',
        'Réfrigérateur avec boissons',
        'Écrans individuels',
        'Isolation acoustique renforcée'
      ],
      image: bmwSerie7,
      ideal: 'Idéal pour: Événements VIP, délégations importantes, clients exigeants'
    },
    {
      id: 'van',
      name: 'Van de Luxe',
      model: 'Mercedes-Benz Classe V VIP',
      description: 'Espace, confort et raffinement pour vos déplacements en groupe. La solution idéale pour voyager ensemble sans compromis sur le luxe.',
      capacity: 'Jusqu\'à 7 passagers',
      luggage: 'Jusqu\'à 8 bagages',
      features: [
        'Configuration salon privé',
        'Sièges en cuir face-à-face',
        'Tables de travail intégrées',
        'Cloison de séparation chauffeur',
        'Équipement multimédia complet',
        'Réfrigérateur',
        'WiFi haut débit'
      ],
      image: mercedesVClass,
      ideal: 'Idéal pour: Groupes, familles, transferts avec bagages volumineux, événements d\'entreprise'
    }
  ]

  // Données pour les questions fréquentes
  const faqs = [
    {
      question: 'Les véhicules sont-ils disponibles 24h/24 et 7j/7 ?',
      answer: 'Oui, notre service est disponible tous les jours, 24h/24. Nous nous adaptons à vos horaires, qu\'il s\'agisse d\'un vol tôt le matin ou d\'un événement tardif.'
    },
    {
      question: 'Peut-on choisir un véhicule spécifique lors de la réservation ?',
      answer: 'Absolument, vous pouvez sélectionner le modèle exact que vous souhaitez lors de votre réservation. Nous garantissons le modèle réservé ou proposons une alternative supérieure en cas d\'indisponibilité.'
    },
    {
      question: 'Les véhicules sont-ils tous équipés du WiFi ?',
      answer: 'Oui, tous nos véhicules sont équipés d\'une connexion WiFi haut débit gratuite, vous permettant de rester connecté pendant vos déplacements.'
    },
    {
      question: 'Proposez-vous des sièges enfants dans vos véhicules ?',
      answer: 'Nous offrons des sièges adaptés pour les enfants de tous âges sur demande. Il suffit de préciser vos besoins lors de la réservation.'
    },
    {
      question: 'Les véhicules sont-ils non-fumeurs ?',
      answer: 'Tous nos véhicules sont strictement non-fumeurs pour garantir une expérience agréable à tous nos clients.'
    }
  ]

  return (
    <div className="flotte-vehicules-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[50vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/fleet-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white text-center">
          <motion.h1 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="mb-6 text-primary"
          >
            NOTRE FLOTTE D'EXCEPTION
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="font-tertiary text-2xl italic text-primary mb-6 max-w-3xl mx-auto"
          >
            Des véhicules de prestige pour une expérience de transport incomparable
          </motion.p>
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
            <h2>L'EXCELLENCE AUTOMOBILE</h2>
            <p className="subtitle">Une sélection rigoureuse pour votre confort</p>
            
            <p className="text-gray-600 mb-8">
              Chez Elysian Luxury Chauffeurs, nous avons constitué une flotte de véhicules haut de gamme 
              méticuleusement sélectionnés pour leur confort, leur élégance et leurs performances. 
              Chaque véhicule est entretenu selon les standards les plus exigeants pour vous 
              garantir une expérience de transport exceptionnelle.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-car-side"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">10+</h3>
                <p className="text-gray-600">Véhicules de luxe</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-star"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">100%</h3>
                <p className="text-gray-600">Satisfaction client</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-recycle"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">30%</h3>
                <p className="text-gray-600">Véhicules écologiques</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">Daily</h3>
                <p className="text-gray-600">Inspection rigoureuse</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Fleet Section */}
      <section 
        id="fleet" 
        ref={fleetRef} 
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>DÉCOUVREZ NOTRE FLOTTE</h2>
            <p className="subtitle">Des véhicules adaptés à toutes vos exigences</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                className={`py-4 px-6 rounded-lg transition-all duration-300 ${
                  selectedVehicle === vehicle.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <div className="text-2xl mb-2">
                  {vehicle.id === 'sedan' && <i className="fas fa-car-side"></i>}
                  {vehicle.id === 'premium' && <i className="fas fa-car"></i>}
                  {vehicle.id === 'green' && <i className="fas fa-leaf"></i>}
                  {vehicle.id === 'van' && <i className="fas fa-shuttle-van"></i>}
                </div>
                <span className="font-medium">{vehicle.name}</span>
              </button>
            ))}
          </div>
          
          {vehicles.map((vehicle) => (
            <motion.div 
              key={vehicle.id}
              initial="hidden"
              animate={fleetControls}
              variants={fadeInVariant}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${selectedVehicle === vehicle.id ? 'block' : 'hidden'}`}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 relative overflow-hidden">
                  <Image 
                    src={vehicle.image}
                    alt={vehicle.name}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-6">
                    <h3 className="text-2xl font-bold">{vehicle.model}</h3>
                  </div>
                </div>
                
                <div className="lg:w-1/2 p-8">
                  <h3 className="text-3xl font-bold mb-4">{vehicle.name}</h3>
                  <p className="text-gray-600 mb-6">{vehicle.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-users text-primary mr-2"></i>
                        <span className="font-medium">Capacité</span>
                      </div>
                      <p>{vehicle.capacity}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-suitcase text-primary mr-2"></i>
                        <span className="font-medium">Bagages</span>
                      </div>
                      <p>{vehicle.luggage}</p>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3">Équipements et services</h4>
                  <ul className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {vehicle.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <i className="fas fa-check text-primary mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700 italic">{vehicle.ideal}</p>
                  </div>
                  
                  <Link href="/#booking" className="btn btn-primary">
                    Réserver ce véhicule
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
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
            <p className="subtitle">Tout ce que vous devez savoir sur notre flotte</p>
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
              Vous avez d'autres questions sur notre flotte de véhicules ?
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
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Prêt à vivre une expérience de transport d'exception ?</h2>
            <p className="text-gray-300 text-lg mb-10">
              Réservez dès maintenant l'un de nos véhicules de luxe pour votre prochain déplacement 
              et découvrez pourquoi Elysian Luxury Chauffeurs est la référence du transport haut de gamme dans l'Essonne.
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