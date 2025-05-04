// app/(pages)/services-affaires/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import businessHero from '@/public/assets/images/business-hero.webp'
import businessMeeting from '@/public/assets/images/business-meeting.webp'
import businessRoadshow from '@/public/assets/images/business-roadshow.webp'
import businessAirport from '@/public/assets/images/business-airport.webp'

export default function ServicesAffairesPage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const servicesControls = useAnimation()
  const advantagesControls = useAnimation()
  const clientsControls = useAnimation()
  const testimonialsControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [advantagesRef, advantagesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [clientsRef, clientsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (clientsInView) clientsControls.start('visible')
    if (testimonialsInView) testimonialsControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, servicesInView, advantagesInView, clientsInView, testimonialsInView, ctaInView,
    headerControls, introControls, servicesControls, advantagesControls, clientsControls, testimonialsControls, ctaControls
  ])

  // Services d'affaires
  const businessServices = [
    {
      title: 'Déplacements Professionnels',
      description: 'Service ponctuel ou régulier pour vos rendez-vous d\'affaires. Un chauffeur attentif pour optimiser votre temps de travail.',
      icon: 'fa-briefcase',
      features: [
        'Ponctualité garantie',
        'Véhicule équipé en espace de travail',
        'WiFi haut débit et chargeurs',
        'Confidentialité absolue'
      ],
      image: businessMeeting
    },
    {
      title: 'Roadshows & Visites Clients',
      description: 'Accompagnement sur plusieurs rendez-vous consécutifs. Un service continu pour une journée productive et sans stress.',
      icon: 'fa-route',
      features: [
        'Chauffeur à disposition toute la journée',
        'Planification d\'itinéraire optimisée',
        'Adaptation en temps réel au planning',
        'Suivi de vos rendez-vous'
      ],
      image: businessRoadshow
    },
    {
      title: 'Transferts Aéroport & Gare',
      description: 'Service premium pour accueillir vos collaborateurs et partenaires. Une première impression à la hauteur de votre entreprise.',
      icon: 'fa-plane-arrival',
      features: [
        'Suivi des vols en temps réel',
        'Accueil personnalisé avec panneau nominatif',
        'Assistance bagages',
        'Attente gratuite en cas de retard'
      ],
      image: businessAirport
    }
  ]

  // Avantages de notre service
  const businessAdvantages = [
    {
      icon: 'fa-clock',
      title: 'Optimisation du temps',
      description: 'Transformez vos temps de trajet en moments productifs grâce à notre espace de travail mobile.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Confidentialité garantie',
      description: 'Nos chauffeurs sont formés à la discrétion et signent des accords de confidentialité.'
    },
    {
      icon: 'fa-file-invoice',
      title: 'Facturation simplifiée',
      description: 'Facturation mensuelle détaillée et options de compte entreprise pour faciliter votre comptabilité.'
    },
    {
      icon: 'fa-user-tie',
      title: 'Image professionnelle',
      description: 'Renforcez votre image de marque avec un service de transport haut de gamme pour vos clients et collaborateurs.'
    },
    {
      icon: 'fa-handshake',
      title: 'Service personnalisé',
      description: 'Un conseiller dédié pour répondre à toutes vos demandes spécifiques et établir une relation de confiance.'
    },
    {
      icon: 'fa-leaf',
      title: 'Engagement écologique',
      description: 'Option de véhicules électriques et hybrides pour répondre à vos objectifs RSE.'
    }
  ]

  // Nos clients corporate
  const corporateClients = [
    { name: 'Groupe Finance Plus', logo: '/assets/images/logo-finance.webp' },
    { name: 'Tech Innovations', logo: '/assets/images/logo-tech.webp' },
    { name: 'Global Consulting', logo: '/assets/images/logo-consulting.webp' },
    { name: 'Luxury Brands International', logo: '/assets/images/logo-luxury.webp' },
    { name: 'EssoneTech', logo: '/assets/images/logo-essonnetech.webp' },
    { name: 'Paris Investment Group', logo: '/assets/images/logo-investment.webp' }
  ]

  return (
    <div className="services-affaires-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/business-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6">SERVICES <span className="text-primary">D'AFFAIRES</span></h1>
            
            <p className="font-tertiary text-2xl italic text-primary mb-6">
              Des solutions de transport premium pour professionnels exigeants
            </p>
            
            <p className="text-xl mb-10">
              Optimisez votre temps, préservez votre concentration et valorisez votre image avec notre service 
              de chauffeur privé dédié aux professionnels. Une prestation haut de gamme pensée pour répondre 
              aux exigences du monde des affaires.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver maintenant
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Demander un devis entreprise
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
            <h2>L'EXCELLENCE AU SERVICE DES PROFESSIONNELS</h2>
            <p className="subtitle">Une approche sur mesure pour les entreprises</p>
            
            <p className="text-gray-600 mb-8">
              Chez Elysian Luxury Chauffeurs, nous comprenons les enjeux spécifiques des déplacements professionnels. 
              Notre service offre bien plus qu'un simple transport : un environnement de travail mobile, 
              une confidentialité absolue et une image valorisante pour votre entreprise.
            </p>
            
            <p className="text-gray-600 mb-8">
              Que vous soyez dirigeant, cadre supérieur ou responsable d'événements corporate, nous vous 
              proposons des solutions adaptées à vos besoins spécifiques avec la flexibilité et la fiabilité 
              indispensables dans le monde des affaires.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-building"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">150+</h3>
                <p className="text-gray-600">Entreprises clientes</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">98%</h3>
                <p className="text-gray-600">Taux de fidélisation</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-user-tie"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">15+</h3>
                <p className="text-gray-600">Chauffeurs d'affaires</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">10K+</h3>
                <p className="text-gray-600">Trajets business/an</p>
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
            <h2>NOS SERVICES POUR PROFESSIONNELS</h2>
            <p className="subtitle">Des solutions adaptées à tous vos déplacements d'affaires</p>
          </div>
          
          <div className="space-y-16">
            {businessServices.map((service, index) => (
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
                  
                  <Link href="/contact" className="btn btn-primary">
                    Demander un devis
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Advantages Section */}
      <section 
        ref={advantagesRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>LES AVANTAGES DE NOTRE SERVICE</h2>
            <p className="subtitle">Pourquoi les professionnels nous choisissent</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={advantagesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {businessAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                variants={fadeInVariant}
                className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <i className={`fas ${advantage.icon} text-primary text-2xl`}></i>
                </div>
                <h3 className="text-xl mb-4">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <Link href="/contact" className="btn btn-primary">
              Discuter de vos besoins
            </Link>
          </div>
        </div>
      </section>
      
      {/* Corporate Clients Section */}
      <section 
        ref={clientsRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>ILS NOUS FONT CONFIANCE</h2>
            <p className="subtitle">Des entreprises exigeantes qui nous recommandent</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={clientsControls}
            variants={fadeInVariant}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          >
            {corporateClients.map((client, index) => (
              <div key={index} className="flex items-center justify-center p-4">
                <div className="w-32 h-32 relative filter grayscale hover:grayscale-0 transition-all duration-300">
                  <Image 
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </motion.div>
          
          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3">
                <h3 className="text-2xl mb-4">Programme Corporate Elysian</h3>
                <p className="text-gray-600 mb-4">
                  Découvrez notre programme dédié aux entreprises avec avantages exclusifs : 
                  tarifs préférentiels, facturation mensuelle, plateforme de réservation dédiée et 
                  service client prioritaire.
                </p>
                <Link href="/contact" className="btn btn-primary">
                  Demander plus d'informations
                </Link>
              </div>
              <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-4">Avantages du programme</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Tarifs dégressifs selon volume</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Chauffeurs attitrés</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Rapport d'activité mensuel</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check text-primary mr-3"></i>
                    <span>Conseiller dédié 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-20 bg-secondary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-0"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate={testimonialsControls}
            variants={fadeInVariant}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-white after:bg-primary">TÉMOIGNAGES CLIENTS</h2>
            <p className="subtitle text-primary">Ce que disent nos clients professionnels</p>
            
            <div className="text-primary text-5xl mb-6">
              <i className="fas fa-quote-left"></i>
            </div>
            
            <p className="text-2xl font-tertiary italic text-white mb-8">
              "Depuis que nous travaillons avec Elysian pour nos déplacements d'affaires, 
              nous avons gagné en efficacité et en image. Le service est impeccable, les chauffeurs 
              sont d'un professionnalisme exemplaire, et la flexibilité offerte nous permet de nous 
              adapter à tout imprévu dans notre planning."
            </p>
            
            <div className="mb-12">
              <p className="font-semibold text-lg">Jean-Philippe Moreau</p>
              <p className="text-white/70">Directeur Commercial, Tech Innovations</p>
            </div>
            
            <div className="flex justify-center gap-3">
              <button className="w-3 h-3 rounded-full bg-primary"></button>
              <button className="w-3 h-3 rounded-full bg-white/30"></button>
              <button className="w-3 h-3 rounded-full bg-white/30"></button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            animate={ctaControls}
            variants={fadeInVariant}
            className="bg-gray-50 rounded-lg p-10 shadow-lg"
          >
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="mb-6">PRÊT À OPTIMISER VOS DÉPLACEMENTS PROFESSIONNELS ?</h2>
              <p className="text-gray-600 text-lg mb-10">
                Contactez-nous dès aujourd'hui pour discuter de vos besoins spécifiques 
                et découvrir comment notre service de chauffeur d'affaires peut valoriser 
                votre entreprise et améliorer la productivité de vos équipes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/#booking" className="btn btn-primary">
                  Réserver maintenant
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Demander un rendez-vous
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}