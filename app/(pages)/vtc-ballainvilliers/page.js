// app/(pages)/vtc-ballainvilliers/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import ballainvilliersHero from '@/public/assets/images/ballainvilliers-hero.webp'
import vtcBallainvilliers from '@/public/assets/images/vtc-ballainvilliers.webp'
import chauffeurBallainvilliers from '@/public/assets/images/chauffeur-ballainvilliers.webp'

import {metadata} from './metadata'

export default function VtcBallainvilliersPage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const servicesControls = useAnimation()
  const advantagesControls = useAnimation()
  const tarifControls = useAnimation()
  const faqControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [advantagesRef, advantagesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [tarifRef, tarifInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (advantagesInView) advantagesControls.start('visible')
    if (tarifInView) tarifControls.start('visible')
    if (faqInView) faqControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, servicesInView, advantagesInView, tarifInView, faqInView, ctaInView,
    headerControls, introControls, servicesControls, advantagesControls, tarifControls, faqControls, ctaControls
  ])

  // Services VTC Ballainvilliers
  const vtcServices = [
    {
      title: 'VTC Aéroport Ballainvilliers',
      description: 'Service VTC transfert aéroport depuis Ballainvilliers vers CDG, Orly et Beauvais.',
      icon: 'fa-plane',
      features: [
        'Suivi des vols en temps réel',
        'Chauffeur avec panneau nominatif',
        'Tarif fixe garanti',
        'Service 24h/24 depuis Ballainvilliers'
      ]
    },
    {
      title: 'VTC Gare Ballainvilliers',
      description: 'Transport VTC vers toutes les gares parisiennes depuis Ballainvilliers.',
      icon: 'fa-train',
      features: [
        'Desserte toutes gares de Paris',
        'Prise en charge ponctuelle',
        'Véhicules spacieux pour bagages',
        'Tarifs préférentiels résidents Ballainvilliers'
      ]
    },
    {
      title: 'VTC Événements Ballainvilliers',
      description: 'Service VTC pour vos événements spéciaux : mariages, soirées, galas.',
      icon: 'fa-glass-cheers',
      features: [
        'Véhicules de prestige',
        'Chauffeur en tenue',
        'Service personnalisé',
        'Forfaits événements Ballainvilliers'
      ]
    },
    {
      title: 'VTC Affaires Ballainvilliers',
      description: 'Transport professionnel avec chauffeur privé pour vos rendez-vous d\'affaires.',
      icon: 'fa-briefcase',
      features: [
        'Ponctualité garantie',
        'Confidentialité absolue',
        'Facturation entreprise',
        'Mise à disposition journée'
      ]
    }
  ]

  // Avantages VTC Ballainvilliers
  const vtcAvantages = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Expertise Locale Ballainvilliers',
      description: 'Nos chauffeurs connaissent parfaitement Ballainvilliers et ses environs pour des trajets optimisés.'
    },
    {
      icon: 'fa-clock',
      title: 'Disponibilité 24h/24',
      description: 'Service VTC disponible 24h/24 et 7j/7 à Ballainvilliers pour tous vos déplacements urgents.'
    },
    {
      icon: 'fa-euro-sign',
      title: 'Tarifs Transparents',
      description: 'Tarifs VTC Ballainvilliers fixes et transparents, sans surprise ni supplément caché.'
    },
    {
      icon: 'fa-car',
      title: 'Flotte Premium',  
      description: 'Véhicules haut de gamme entretenus régulièrement pour votre confort à Ballainvilliers.'
    },
    {
      icon: 'fa-user-tie',
      title: 'Chauffeurs Professionnels',
      description: 'Chauffeurs privés licenciés, formés et expérimentés pour un service VTC d\'excellence.'
    },
    {
      icon: 'fa-mobile-alt',
      title: 'Réservation Facile',
      description: 'Réservez votre VTC Ballainvilliers en ligne, par téléphone ou via notre application mobile.'
    }
  ]

  // Tarifs VTC Ballainvilliers
  const tarifVTC = [
    { destination: 'Ballainvilliers → Paris Centre', prix: '35€', duree: '25 min' },
    { destination: 'Ballainvilliers → Aéroport Orly', prix: '45€', duree: '20 min' },
    { destination: 'Ballainvilliers → Aéroport CDG', prix: '75€', duree: '55 min' },
    { destination: 'Ballainvilliers → Gare Montparnasse', prix: '40€', duree: '30 min' },
    { destination: 'Ballainvilliers → La Défense', prix: '50€', duree: '40 min' },
    { destination: 'Ballainvilliers → Disneyland Paris', prix: '85€', duree: '60 min' }
  ]

  // FAQ VTC Ballainvilliers
  const faqVTC = [
    {
      question: 'Comment réserver un VTC à Ballainvilliers ?',
      answer: 'Réservez votre VTC Ballainvilliers facilement : en ligne sur notre site, par téléphone au +33 6 43 53 76 53, ou via notre application mobile. Réservation possible 24h/24 pour tous vos trajets depuis Ballainvilliers.'
    },
    {
      question: 'Quels sont les tarifs VTC à Ballainvilliers ?',
      answer: 'Nos tarifs VTC Ballainvilliers sont fixes et transparents. Comptez à partir de 25€ pour un trajet local et 35€ vers Paris centre. Tous nos prix incluent les taxes et frais de route, sans supplément.'
    },
    {
      question: 'Vos chauffeurs VTC connaissent-ils Ballainvilliers ?',
      answer: 'Nos chauffeurs VTC sont des experts de Ballainvilliers et de la région sud de Paris. Ils connaissent tous les quartiers, entreprises et points d\'intérêt de Ballainvilliers pour des trajets optimisés.'
    },
    {
      question: 'Proposez-vous des VTC pour les transferts aéroport depuis Ballainvilliers ?',
      answer: 'Oui, nous sommes spécialisés dans les transferts aéroport VTC depuis Ballainvilliers vers Orly (20 min), CDG (55 min) et Beauvais. Service de suivi des vols et attente gratuite en cas de retard.'
    },
    {
      question: 'Peut-on réserver un VTC pour plusieurs heures à Ballainvilliers ?',
      answer: 'Absolument ! Nous proposons des forfaits VTC mise à disposition à Ballainvilliers : demi-journée (4h), journée complète (8h) ou sur mesure selon vos besoins. Idéal pour visites, réunions multiples ou événements.'
    }
  ]

  return (
    <div className="vtc-ballainvilliers-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/ballainvilliers-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-primary">VTC BALLAINVILLIERS</h1>
            
            <p className="font-tertiary text-2xl italic text-primary mb-6">
              Service VTC premium à Ballainvilliers avec chauffeurs privés expérimentés
            </p>
            
            <p className="text-xl mb-10">
              Découvrez notre service VTC à Ballainvilliers : transport haut de gamme avec chauffeurs privés 
              professionnels pour tous vos déplacements vers Paris, les aéroports et l'Île-de-France. 
              Réservation 24h/24, tarifs transparents et véhicules premium.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver VTC Ballainvilliers
              </Link>
              <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                <i className="fas fa-phone mr-2"></i>
                Appeler maintenant
              </a>
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
            <h2>VTC BALLAINVILLIERS : VOTRE TRANSPORT PREMIUM</h2>
            <p className="subtitle">Service VTC haut de gamme dans votre ville</p>
            
            <p className="text-gray-600 mb-8">
              <strong>VTC Ballainvilliers</strong> vous propose un service de transport premium avec des chauffeurs privés 
              expérimentés qui connaissent parfaitement votre ville et ses environs. Situés dans le sud de Paris, 
              nous desservons Ballainvilliers et toute la région avec des véhicules haut de gamme.
            </p>
            
            <p className="text-gray-600 mb-8">
              Que vous habitiez près du centre-ville de Ballainvilliers, dans les quartiers résidentiels ou près 
              des zones d'activités, notre service VTC s'adapte à tous vos besoins : transferts aéroport, 
              déplacements professionnels, sorties en soirée ou événements spéciaux.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">100%</h3>
                <p className="text-gray-600">Ballainvilliers couvert</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">24/7</h3>
                <p className="text-gray-600">Service VTC disponible</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-star"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">4.9/5</h3>
                <p className="text-gray-600">Satisfaction clients</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">1500+</h3>
                <p className="text-gray-600">Clients Ballainvilliers</p>
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
            <h2>NOS SERVICES VTC À BALLAINVILLIERS</h2>
            <p className="subtitle">Transport premium pour tous vos besoins</p>
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
                className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className={`fas ${service.icon} text-primary text-xl`}></i>
                  </div>
                  <h3 className="text-xl ml-4">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <i className="fas fa-check text-primary mr-3"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Avantages Section */}
      <section 
        ref={advantagesRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>POURQUOI CHOISIR NOTRE VTC À BALLAINVILLIERS ?</h2>
            <p className="subtitle">Les avantages de notre service VTC local</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={advantagesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {vtcAvantages.map((avantage, index) => (
              <motion.div
                key={index}
                variants={fadeInVariant}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <i className={`fas ${avantage.icon} text-primary text-2xl`}></i>
                </div>
                <h3 className="text-xl mb-4">{avantage.title}</h3>
                <p className="text-gray-600">{avantage.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Tarifs Section */}
      <section 
        ref={tarifRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>TARIFS VTC BALLAINVILLIERS</h2>
            <p className="subtitle">Grille tarifaire transparente pour vos trajets depuis Ballainvilliers</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={tarifControls}
            variants={fadeInVariant}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-primary p-4">
                <h3 className="text-white text-xl font-bold text-center">Principales Destinations depuis Ballainvilliers</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {tarifVTC.map((tarif, index) => (
                  <div key={index} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{tarif.destination}</h4>
                      <p className="text-gray-600 text-sm">Durée estimée : {tarif.duree}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{tarif.prix}</span>
                      <p className="text-gray-500 text-sm">À partir de</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 p-6 text-center">
                <p className="text-gray-600 mb-4">
                  Tous nos tarifs VTC Ballainvilliers sont fixes et incluent les taxes, péages et frais de stationnement.
                </p>
                <Link href="/#booking" className="btn btn-primary">
                  Calculer le prix de mon trajet
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Zone de desserte */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>ZONE DE DESSERTE VTC BALLAINVILLIERS</h2>
            <p className="subtitle">Nos chauffeurs VTC interviennent dans toute la région</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl mb-6">Communes proches de Ballainvilliers desservies :</h3>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Longjumeau</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Antony</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Massy</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Chilly-Mazarin</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Wissous</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Fresnes</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>L'Haÿ-les-Roses</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Chevilly-Larue</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Rungis</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                    <span>Villejuif</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-100 p-8 rounded-lg">
                <h4 className="text-xl font-bold mb-4">Destinations principales :</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>🏢 Paris Centre</span>
                    <span className="font-semibold">25 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✈️ Aéroport d'Orly</span>
                    <span className="font-semibold">20 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>✈️ Aéroport CDG</span>
                    <span className="font-semibold">55 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🏢 La Défense</span>
                    <span className="font-semibold">40 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🎢 Disneyland Paris</span>
                    <span className="font-semibold">60 min</span>
                  </div>
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
            <h2>FAQ VTC BALLAINVILLIERS</h2>
            <p className="subtitle">Questions fréquentes sur notre service VTC à Ballainvilliers</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={faqControls}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {faqVTC.map((faq, index) => (
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
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Réservez votre VTC à Ballainvilliers maintenant</h2>
            <p className="text-gray-300 text-lg mb-10">
              Faites confiance à notre service VTC Ballainvilliers pour tous vos déplacements. 
              Chauffeurs expérimentés, véhicules premium et tarifs transparents. 
              Réservation en ligne 24h/24 ou par téléphone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver VTC Ballainvilliers
              </Link>
              <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                <i className="fas fa-phone mr-2"></i>
                +33 6 43 53 76 53
              </a>
            </div>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-primary text-2xl mb-2">
                  <i className="fas fa-clock"></i>
                </div>
                <h4 className="font-semibold">Service 24h/24</h4>
                <p className="text-gray-300 text-sm">Disponible tous les jours</p>
              </div>
              <div>
                <div className="text-primary text-2xl mb-2">
                  <i className="fas fa-euro-sign"></i>
                </div>
                <h4 className="font-semibold">Tarifs fixes</h4>
                <p className="text-gray-300 text-sm">Sans surprise ni supplément</p>
              </div>
              <div>
                <div className="text-primary text-2xl mb-2">
                  <i className="fas fa-star"></i>
                </div>
                <h4 className="font-semibold">Service premium</h4>
                <p className="text-gray-300 text-sm">Véhicules haut de gamme</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}