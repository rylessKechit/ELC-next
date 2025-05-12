// app/(pages)/services-evenements/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import eventHero from '@/public/assets/images/event-hero.webp'
import eventWedding from '@/public/assets/images/event-wedding.webp'
import eventGala from '@/public/assets/images/event-gala.webp'
import eventCorporate from '@/public/assets/images/event-corporate.webp'

export default function ServicesEvenementsPage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const servicesControls = useAnimation()
  const packagesControls = useAnimation()
  const testimonialsControls = useAnimation()
  const faqControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [packagesRef, packagesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (packagesInView) packagesControls.start('visible')
    if (testimonialsInView) testimonialsControls.start('visible')
    if (faqInView) faqControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, servicesInView, packagesInView, testimonialsInView, faqInView, ctaInView,
    headerControls, introControls, servicesControls, packagesControls, testimonialsControls, faqControls, ctaControls
  ])

  // Services événementiels
  const eventServices = [
    {
      title: 'Mariages & Cérémonies',
      description: 'Transport d\'exception pour les mariés et leurs invités. Services sur mesure pour rendre ce jour encore plus spécial.',
      icon: 'fa-heart',
      features: [
        'Véhicules décorés selon vos souhaits',
        'Coordination avec les autres prestataires',
        'Chauffeurs en tenue formelle',
        'Champagne et rafraîchissements'
      ],
      image: eventWedding
    },
    {
      title: 'Soirées & Galas',
      description: 'Arrivez avec style à vos événements mondains. Un service discret et élégant pour une entrée remarquée.',
      icon: 'fa-glass-cheers',
      features: [
        'Ponctualité garantie',
        'Service de voiturier optionnel',
        'Chauffeurs multilingues',
        'Service disponible toute la nuit'
      ],
      image: eventGala
    },
    {
      title: 'Événements d\'entreprise',
      description: 'Solutions de transport pour vos collaborateurs et clients lors de vos événements professionnels.',
      icon: 'fa-briefcase',
      features: [
        'Coordination logistique complète',
        'Facturation entreprise',
        'Suivi en temps réel',
        'Service de conciergerie'
      ],
      image: eventCorporate
    }
  ]

  // FAQ
  const faqs = [
    {
      question: 'Combien de temps à l\'avance dois-je réserver pour un événement ?',
      answer: 'Pour les événements importants comme les mariages, nous recommandons de réserver au moins 3 mois à l\'avance. Pour les autres événements, un préavis de 2 semaines est généralement suffisant, mais plus tôt vous réservez, plus nous pouvons garantir la disponibilité de nos véhicules et personnaliser notre service.'
    },
    {
      question: 'Proposez-vous des décorations pour les véhicules lors des mariages ?',
      answer: 'Oui, nous proposons différentes options de décoration pour nos véhicules. Nous pouvons adapter les décorations selon votre thème de mariage ou vos préférences. Ce service est inclus dans nos forfaits mariage.'
    },
    {
      question: 'Puis-je réserver plusieurs véhicules pour un même événement ?',
      answer: 'Absolument ! Nous pouvons coordonner une flotte entière pour votre événement, que ce soit pour transporter les invités d\'un mariage ou les participants d\'une conférence d\'entreprise. Nos conseillers vous aideront à déterminer le nombre optimal de véhicules selon vos besoins.'
    },
    {
      question: 'Que se passe-t-il en cas de retard lors d\'un événement ?',
      answer: 'Notre planification inclut toujours une marge de sécurité pour éviter tout retard. Cependant, si l\'événement se prolonge, nos chauffeurs restent à disposition. Des frais supplémentaires peuvent s\'appliquer au-delà de la durée prévue, mais nous vous en informerons à l\'avance.'
    },
    {
      question: 'Proposez-vous des services pour des événements à l\'extérieur de l\'Essonne ?',
      answer: 'Oui, bien que notre base soit dans l\'Essonne, nous intervenons dans toute l\'Île-de-France et pouvons également organiser des transferts pour des événements dans d\'autres régions de France. Des frais de déplacement peuvent s\'appliquer selon la distance.'
    }
  ]

  return (
    <div className="services-evenements-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/event-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-primary">SERVICES ÉVÉNEMENTIELS</h1>
            
            <p className="font-tertiary text-2xl italic text-primary mb-6">
              Des solutions de transport d'exception pour tous vos événements spéciaux
            </p>
            
            <p className="text-xl mb-10">
              Faites de chaque moment un souvenir inoubliable avec notre service de chauffeur privé 
              dédié aux événements festifs, professionnels et cérémonies. Élégance, ponctualité et 
              service personnalisé pour tous vos moments importants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver pour votre événement
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Demander un devis personnalisé
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
            <h2>EXCELLENCE ET ÉLÉGANCE</h2>
            <p className="subtitle">Pour que chaque événement soit mémorable</p>
            
            <p className="text-gray-600 mb-8">
              Chez Elysian Luxury Chauffeurs, nous comprenons l'importance de vos événements spéciaux. 
              Qu'il s'agisse d'un mariage, d'une soirée de gala, d'une cérémonie privée ou d'un événement 
              d'entreprise, nous vous offrons un service de transport sur mesure qui reflète l'importance 
              de ces moments uniques.
            </p>
            
            <p className="text-gray-600 mb-8">
              Notre flotte de véhicules prestigieux, nos chauffeurs expérimentés et notre attention aux moindres 
              détails vous garantissent une expérience sans faille. Nous coordonnons tous les aspects logistiques 
              pour que vous puissiez vous concentrer pleinement sur votre événement.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">200+</h3>
                <p className="text-gray-600">Mariages par an</p>
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
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">50+</h3>
                <p className="text-gray-600">Partenaires événementiels</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">24/7</h3>
                <p className="text-gray-600">Service disponible</p>
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
            <h2>NOS SERVICES ÉVÉNEMENTIELS</h2>
            <p className="subtitle">Des solutions adaptées à chaque célébration</p>
          </div>
          
          <div className="space-y-16">
            {eventServices.map((service, index) => (
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
      
      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-20 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-0"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/assets/images/event-testimonial-bg.webp)' }}></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            animate={testimonialsControls}
            variants={fadeInVariant}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-white after:bg-primary">TÉMOIGNAGES</h2>
            <p className="subtitle text-primary">Ce que disent nos clients</p>
            
            <div className="text-primary text-5xl mb-6">
              <i className="fas fa-quote-left"></i>
            </div>
            
            <p className="text-2xl font-tertiary italic text-white mb-8">
              "Nous avons fait appel à Elysian pour notre mariage et ce fut une expérience parfaite.
              La voiture magnifiquement décorée, le chauffeur d'une gentillesse remarquable,
              et une organisation sans faille ont contribué à rendre notre journée encore plus spéciale."
            </p>
            
            <div className="mb-12">
              <p className="font-semibold text-lg">Émilie & Thomas</p>
              <p className="text-white/70">Mariés en juin 2024</p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-yellow-400 mb-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="italic">
                  "Service impeccable pour le gala de notre entreprise. Une organisation parfaite."
                </p>
                <p className="text-sm mt-4">— Laurent D., Directeur Marketing</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-yellow-400 mb-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="italic">
                  "La flotte de véhicules pour notre mariage était magnifique. Merci pour ce moment!"
                </p>
                <p className="text-sm mt-4">— Sophie & Nicolas, Mariés</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-yellow-400 mb-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="italic">
                  "La logistique de notre conférence a été gérée à la perfection. À recommander!"
                </p>
                <p className="text-sm mt-4">— Claude M., Événementiel</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section 
        ref={faqRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>QUESTIONS FRÉQUENTES</h2>
            <p className="subtitle">Tout ce que vous devez savoir sur nos services événementiels</p>
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
              Vous avez d'autres questions sur nos services événementiels ?
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
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Rendez votre événement inoubliable</h2>
            <p className="text-gray-300 text-lg mb-10">
              Faites confiance à Elysian Luxury Chauffeurs pour transformer votre événement spécial 
              en une expérience exceptionnelle. Nos services de transport événementiel sur mesure 
              s'adaptent à toutes vos exigences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver maintenant
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Demander un devis personnalisé
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}