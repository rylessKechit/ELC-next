// app/(pages)/services-aeroport-gare/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import airportHero from '@/public/assets/images/airport-hero.jpg'
import airportTransfer from '@/public/assets/images/airport-transfer.jpg'
import trainTransfer from '@/public/assets/images/train-transfer.jpg'
import meetGreet from '@/public/assets/images/meet-greet.jpg'

export default function ServicesAeroportGarePage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const servicesControls = useAnimation()
  const processControls = useAnimation()
  const pricingControls = useAnimation()
  const airportsControls = useAnimation()
  const faqControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [processRef, processInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [pricingRef, pricingInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [airportsRef, airportsInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (processInView) processControls.start('visible')
    if (pricingInView) pricingControls.start('visible')
    if (airportsInView) airportsControls.start('visible')
    if (faqInView) faqControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, servicesInView, processInView, pricingInView, airportsInView, faqInView, ctaInView,
    headerControls, introControls, servicesControls, processControls, pricingControls, airportsControls, faqControls, ctaControls
  ])

  // Services aéroport & gare
  const transferServices = [
    {
      title: 'Transferts Aéroport',
      description: 'Un service premium pour tous vos trajets vers et depuis les aéroports de Paris et la région Essonne.',
      icon: 'fa-plane',
      features: [
        'Suivi des vols en temps réel',
        'Attente gratuite en cas de retard',
        'Assistance bagages',
        'Boissons fraîches à bord'
      ],
      image: airportTransfer
    },
    {
      title: 'Transferts Gare',
      description: 'Service ponctuel et confortable pour vos déplacements depuis et vers toutes les gares parisiennes.',
      icon: 'fa-train',
      features: [
        'Suivi des trains en temps réel',
        'Prise en charge sur le quai (option)',
        'Véhicules spacieux pour les bagages',
        'WiFi gratuit à bord'
      ],
      image: trainTransfer
    },
    {
      title: 'Service Meet & Greet',
      description: 'Accueil personnalisé et prise en charge VIP directement à la sortie de votre avion ou de votre train.',
      icon: 'fa-handshake',
      features: [
        'Chauffeur avec panneau nominatif',
        'Escorte jusqu\'au véhicule',
        'Service prioritaire',
        'Aide aux formalités (option)'
      ],
      image: meetGreet
    }
  ]

  // Étapes du processus
  const processSteps = [
    {
      icon: 'fa-calendar-alt',
      title: 'Réservation',
      description: 'Réservez en ligne ou par téléphone en indiquant vos détails de vol ou de train.'
    },
    {
      icon: 'fa-plane-arrival',
      title: 'Suivi en temps réel',
      description: 'Nous surveillons le statut de votre vol ou train pour ajuster votre prise en charge.'
    },
    {
      icon: 'fa-user-check',
      title: 'Accueil personnalisé',
      description: 'Votre chauffeur vous attend avec un panneau à votre nom à la sortie.'
    },
    {
      icon: 'fa-suitcase',
      title: 'Assistance bagages',
      description: 'Notre chauffeur vous aide avec vos bagages jusqu\'au véhicule.'
    },
    {
      icon: 'fa-car',
      title: 'Trajet confortable',
      description: 'Profitez d\'un voyage paisible dans notre véhicule de luxe.'
    }
  ]

  // FAQ
  const faqs = [
    {
      question: 'Que se passe-t-il si mon vol est retardé ?',
      answer: 'Nous suivons en temps réel le statut de votre vol. Si votre vol est retardé, votre chauffeur ajustera son horaire d\'arrivée en conséquence, sans frais supplémentaires pour les premières 60 minutes de retard.'
    },
    {
      question: 'Comment puis-je identifier mon chauffeur à l\'aéroport ?',
      answer: 'Votre chauffeur vous attendra à la sortie avec un panneau indiquant votre nom ou celui de votre entreprise. Il portera un costume et sera facilement identifiable. Vous recevrez également ses coordonnées par SMS avant votre arrivée.'
    },
    {
      question: 'Dois-je payer des frais de parking ou de péage ?',
      answer: 'Non, tous les frais de parking, péages et autres coûts liés au transport sont inclus dans le prix qui vous est indiqué au moment de la réservation.'
    },
    {
      question: 'Puis-je modifier ou annuler ma réservation ?',
      answer: 'Oui, vous pouvez modifier ou annuler votre réservation jusqu\'à 24 heures avant l\'heure prévue sans frais. Pour les modifications de dernière minute, veuillez nous contacter directement.'
    },
    {
      question: 'Combien de bagages puis-je apporter ?',
      answer: 'Le nombre de bagages dépend du véhicule réservé. En général, nos berlines peuvent accueillir jusqu\'à 3 valises standard et nos SUV ou vans jusqu\'à 7 valises. Si vous avez des bagages particulièrement volumineux, veuillez nous en informer lors de votre réservation.'
    }
  ]

  // Les aéroports et gares desservis
  const airports = [
    { name: 'Paris Charles de Gaulle (CDG)', distance: '70 km', time: '1h15' },
    { name: 'Paris Orly (ORY)', distance: '38 km', time: '40 min' },
    { name: 'Paris Beauvais (BVA)', distance: '125 km', time: '1h45' },
  ]
  
  const stations = [
    { name: 'Gare de Lyon', distance: '30 km', time: '35 min' },
    { name: 'Gare du Nord', distance: '35 km', time: '40 min' },
    { name: 'Gare Montparnasse', distance: '32 km', time: '38 min' },
    { name: 'Gare de l\'Est', distance: '36 km', time: '42 min' },
    { name: 'Gare Saint-Lazare', distance: '34 km', time: '40 min' },
    { name: 'Gare d\'Austerlitz', distance: '31 km', time: '36 min' },
  ]

  return (
    <div className="services-aeroport-gare-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/airport-hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6">TRANSFERTS <span className="text-primary">AÉROPORT & GARE</span></h1>
            
            <p className="font-tertiary text-2xl italic text-primary mb-6">
              Des transferts haut de gamme pour commencer votre voyage en toute sérénité
            </p>
            
            <p className="text-xl mb-10">
              Commencez ou terminez votre voyage dans les meilleures conditions avec notre service 
              de transfert premium vers tous les aéroports et gares de Paris. Ponctualité, confort 
              et service personnalisé garantis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver un transfert
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Nous contacter
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
            <h2>VOYAGEZ SANS STRESS</h2>
            <p className="subtitle">Un début et une fin de voyage à la hauteur de vos attentes</p>
            
            <p className="text-gray-600 mb-8">
              Les transferts aéroport et gare sont souvent les moments les plus stressants d'un voyage. 
              Chez Elysian Luxury Chauffeurs, nous transformons ces instants potentiellement anxiogènes en une 
              expérience agréable et détendue grâce à notre service premium et notre attention aux détails.
            </p>
            
            <p className="text-gray-600 mb-8">
              Notre équipe surveille en temps réel le statut de vos vols et trains, s'adapte aux imprévus, et 
              vous assure une prise en charge personnalisée. Que vous voyagiez pour affaires ou loisirs, seul ou 
              en famille, nous garantissons un transfert impeccable entre l'Essonne et tous les aéroports et gares 
              de Paris.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-plane"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">5000+</h3>
                <p className="text-gray-600">Transferts par an</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">99.8%</h3>
                <p className="text-gray-600">Taux de ponctualité</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-star"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">4.9/5</h3>
                <p className="text-gray-600">Note satisfaction</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-language"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">6+</h3>
                <p className="text-gray-600">Langues parlées</p>
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
            <h2>NOS SERVICES DE TRANSFERT</h2>
            <p className="subtitle">Des solutions adaptées à vos besoins</p>
          </div>
          
          <div className="space-y-16">
            {transferServices.map((service, index) => (
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
      
      {/* Process Section */}
      <section 
        ref={processRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>COMMENT ÇA FONCTIONNE</h2>
            <p className="subtitle">Un processus simple et transparent</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={processControls}
            variants={staggerContainer}
            className="relative"
          >
            {/* Line connector */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInVariant}
                  className="flex flex-col items-center text-center relative z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                    <i className={`fas ${step.icon} text-primary text-2xl`}></i>
                    <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse"></div>
                  </div>
                  <h3 className="text-xl mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Airports & Stations Section */}
      <section 
        ref={airportsRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>DESTINATIONS DESSERVIES</h2>
            <p className="subtitle">Les aéroports et gares que nous couvrons</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={airportsControls}
            variants={fadeInVariant}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <i className="fas fa-plane text-primary text-xl"></i>
                </div>
                <h3 className="text-2xl ml-4">Aéroports</h3>
              </div>
              
              <div className="space-y-4">
                {airports.map((airport, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">{airport.name}</p>
                      <p className="text-sm text-gray-500">Depuis Évry-Courcouronnes (91)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-medium">{airport.distance}</p>
                      <p className="text-sm text-gray-500">~{airport.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Nous desservons également tous les aéroports privés de la région parisienne</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <i className="fas fa-train text-primary text-xl"></i>
                </div>
                <h3 className="text-2xl ml-4">Gares Parisiennes</h3>
              </div>
              
              <div className="space-y-4">
                {stations.map((station, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">{station.name}</p>
                      <p className="text-sm text-gray-500">Depuis Évry-Courcouronnes (91)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-medium">{station.distance}</p>
                      <p className="text-sm text-gray-500">~{station.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Et toutes les gares de Paris et de l'Essonne</p>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Vous ne trouvez pas votre destination dans la liste ?
            </p>
            <Link href="/contact" className="btn btn-outline">
              Contactez-nous pour une demande spécifique
            </Link>
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
            <h2>NOS FORFAITS TRANSFERT</h2>
            <p className="subtitle">Des tarifs transparents pour tous vos besoins</p>
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
                <h3 className="text-xl font-bold mb-2">Forfait Essentiel</h3>
                <p className="text-gray-600 mb-6">
                  Transfert standard avec tous les services de base pour un voyage confortable.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="text-xl font-bold text-primary">À partir de 85€</div>
                  <p className="text-gray-500 text-sm">Trajet simple vers Orly</p>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Berline de luxe</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Suivi de vol/train</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Assistance bagages</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>30 min d'attente incluses</span>
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
                <h3 className="text-xl font-bold mb-2">Forfait Premium</h3>
                <p className="text-gray-600 mb-6">
                  Expérience VIP avec services personnalisés et confort supérieur.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="text-xl font-bold text-primary">À partir de 120€</div>
                  <p className="text-gray-500 text-sm">Trajet simple vers CDG</p>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Berline ou SUV premium</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Accueil personnalisé</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Boissons fraîches incluses</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>60 min d'attente incluses</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>WiFi et chargeurs</span>
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
                <h3 className="text-xl font-bold mb-2">Forfait Famille</h3>
                <p className="text-gray-600 mb-6">
                  Solution adaptée aux familles avec espace pour tous vos bagages.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="text-xl font-bold text-primary">À partir de 150€</div>
                  <p className="text-gray-500 text-sm">Trajet simple (jusqu'à 6 personnes)</p>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Van de luxe spacieux</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Sièges enfants disponibles</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Capacité bagages étendue</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Commodités adaptées aux enfants</span>
                  </li>
                </ul>
                <Link href="/#booking" className="btn btn-primary w-full">
                  Réserver
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Tous nos prix incluent les taxes, péages et frais de stationnement
            </p>
            <Link href="/contact" className="btn btn-outline">
              Demander un devis personnalisé
            </Link>
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
            <p className="subtitle">Tout ce que vous devez savoir sur nos transferts</p>
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
              Vous avez d'autres questions sur nos services de transfert ?
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
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Voyagez sans stress, commencez par un transfert d'exception</h2>
            <p className="text-gray-300 text-lg mb-10">
              Ne laissez pas les transferts aéroport ou gare gâcher votre voyage. Faites confiance 
              à Elysian Luxury Chauffeurs pour un service ponctuel, confortable et entièrement adapté à vos besoins.
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