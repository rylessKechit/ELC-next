// app/(pages)/trajets-sur-mesure/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import customHero from '@/public/assets/images/custom-hero.jpg'
import personalService from '@/public/assets/images/personal-service.jpg'
import corporateTravel from '@/public/assets/images/corporate-travel.jpg'
import specialOccasion from '@/public/assets/images/special-occasion.jpg'

export default function TrajetsSurMesurePage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const servicesControls = useAnimation()
  const howItWorksControls = useAnimation()
  const testimonialsControls = useAnimation()
  const faqControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [howItWorksRef, howItWorksInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (howItWorksInView) howItWorksControls.start('visible')
    if (testimonialsInView) testimonialsControls.start('visible')
    if (faqInView) faqControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, servicesInView, howItWorksInView, testimonialsInView, faqInView, ctaInView,
    headerControls, introControls, servicesControls, howItWorksControls, testimonialsControls, faqControls, ctaControls
  ])

  // Services sur mesure
  const customServices = [
    {
      title: 'Service Personnel',
      description: 'Un service entièrement personnalisé pour vos besoins individuels et familiaux, que ce soit pour des occasions spéciales ou des déplacements quotidiens.',
      icon: 'fa-user',
      features: [
        'Planification flexible',
        'Chauffeur attitré possible',
        'Options sur mesure',
        'Discrétion absolue'
      ],
      image: personalService
    },
    {
      title: 'Service Corporate',
      description: 'Solutions de transport élégantes et efficaces pour vos déplacements professionnels, adaptées aux exigences spécifiques de votre entreprise.',
      icon: 'fa-briefcase',
      features: [
        'Facturation entreprise',
        'Réservations multiples',
        'Rapports détaillés',
        'Service prioritaire'
      ],
      image: corporateTravel
    },
    {
      title: 'Occasions Spéciales',
      description: 'Un service d\'exception pour vos événements les plus importants, avec une attention particulière aux détails qui font toute la différence.',
      icon: 'fa-glass-cheers',
      features: [
        'Personnalisation complète',
        'Coordination événementielle',
        'Décoration du véhicule',
        'Service photos optionnel'
      ],
      image: specialOccasion
    }
  ]

  // Étapes du processus
  const processSteps = [
    {
      icon: 'fa-comment-alt',
      title: 'Consultation',
      description: 'Discutez de vos besoins spécifiques avec notre équipe dédiée.'
    },
    {
      icon: 'fa-clipboard-list',
      title: 'Proposition',
      description: 'Recevez une proposition détaillée adaptée à vos exigences particulières.'
    },
    {
      icon: 'fa-sliders-h',
      title: 'Personnalisation',
      description: 'Affinez tous les détails jusqu\'à ce que le service corresponde parfaitement à vos attentes.'
    },
    {
      icon: 'fa-calendar-check',
      title: 'Confirmation',
      description: 'Validez votre réservation et recevez tous les détails par email.'
    },
    {
      icon: 'fa-car',
      title: 'Expérience',
      description: 'Profitez d\'un service exceptionnel, parfaitement adapté à vos besoins.'
    }
  ]

  // FAQ
  const faqs = [
    {
      question: 'Quels types de trajets sur mesure proposez-vous ?',
      answer: 'Nous proposons une multitude de trajets personnalisés : services réguliers pour vos déplacements quotidiens, itinéraires touristiques, transport pour événements spéciaux (anniversaires, mariages, soirées), services de conciergerie, journées shopping, transferts spécifiques... Quel que soit votre besoin, nous pouvons créer un service adapté.'
    },
    {
      question: 'Comment sont calculés les prix pour les services sur mesure ?',
      answer: 'Les tarifs dépendent de plusieurs facteurs : type de véhicule, durée du service, distance parcourue, services additionnels demandés, et complexité de la planification. Après notre consultation initiale, nous vous proposons un devis transparent et détaillé, sans frais cachés.'
    },
    {
      question: 'Puis-je demander un chauffeur spécifique ?',
      answer: 'Absolument. Pour les services réguliers ou sur demande spécifique, vous pouvez demander un chauffeur attitré. Nous favorisons cette relation de confiance qui permet une personnalisation encore plus fine du service au fil du temps.'
    },
    {
      question: 'Est-il possible de modifier mon itinéraire le jour même ?',
      answer: 'Oui, nous comprenons que les plans peuvent changer. Nos chauffeurs font preuve de flexibilité et peuvent adapter l\'itinéraire selon vos besoins du moment. Des frais supplémentaires peuvent s\'appliquer en fonction des modifications demandées.'
    },
    {
      question: 'Proposez-vous des forfaits ou abonnements pour services réguliers ?',
      answer: 'Oui, nous offrons des forfaits attractifs pour les clients réguliers, avec des tarifs préférentiels et des avantages exclusifs. Nous proposons également des formules d\'abonnement pour les entreprises et les particuliers ayant des besoins récurrents.'
    }
  ]

  return (
    <div className="trajets-sur-mesure-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/custom-hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6">TRAJETS <span className="text-primary">SUR MESURE</span></h1>
            
            <p className="font-tertiary text-2xl italic text-primary mb-6">
              Des solutions de transport entièrement personnalisées
            </p>
            
            <p className="text-xl mb-10">
              Découvrez notre service exclusif de trajets sur mesure, où chaque aspect de votre 
              expérience est méticuleusement adapté à vos exigences spécifiques. Une solution 
              de transport aussi unique que vous.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/contact" className="btn btn-primary">
                Demander un devis personnalisé
              </Link>
              <Link href="/#booking" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Réserver maintenant
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
            <h2>L'EXCELLENCE PERSONNALISÉE</h2>
            <p className="subtitle">Une approche sur mesure pour répondre à tous vos besoins</p>
            
            <p className="text-gray-600 mb-8">
              Chez Elysian Luxury Chauffeurs, nous comprenons que chaque client a des besoins uniques 
              qui ne rentrent pas toujours dans des formules standardisées. C'est pourquoi nous avons 
              développé notre service de trajets sur mesure, conçu pour s'adapter parfaitement à vos 
              exigences spécifiques.
            </p>
            
            <p className="text-gray-600 mb-8">
              Que vous soyez un particulier avec des besoins précis, une entreprise cherchant des 
              solutions de transport adaptées, ou un organisateur d'événements nécessitant une 
              logistique complexe, notre équipe dédiée travaille avec vous pour créer une expérience 
              de transport qui dépasse vos attentes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gray-50 p-6 rounded-lg border-t-2 border-primary">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-fingerprint text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Personnalisation</h3>
                <p className="text-gray-600 text-center">
                  Chaque aspect de votre service est adapté à vos préférences spécifiques.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-t-2 border-primary">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-expand-alt text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Flexibilité</h3>
                <p className="text-gray-600 text-center">
                  Adaptabilité totale aux changements et aux exigences de dernière minute.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border-t-2 border-primary">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-handshake text-primary text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Relation privilégiée</h3>
                <p className="text-gray-600 text-center">
                  Un conseiller dédié pour comprendre et anticiper vos besoins.
                </p>
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
            <h2>NOS SERVICES SUR MESURE</h2>
            <p className="subtitle">Des solutions adaptées à tous vos besoins spécifiques</p>
          </div>
          
          <div className="space-y-16">
            {customServices.map((service, index) => (
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
      
      {/* How It Works Section */}
      <section 
        ref={howItWorksRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>COMMENT ÇA FONCTIONNE</h2>
            <p className="subtitle">Un processus simple pour un service d'exception</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={howItWorksControls}
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
          
          <div className="mt-16 text-center">
            <Link href="/contact" className="btn btn-primary">
              Démarrer votre consultation
            </Link>
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
            <p className="subtitle text-primary">Ce que disent nos clients de nos services sur mesure</p>
            
            <div className="text-primary text-5xl mb-6">
              <i className="fas fa-quote-left"></i>
            </div>
            
            <p className="text-2xl font-tertiary italic text-white mb-8">
              "Elysian a créé pour moi un service de transport hebdomadaire absolument parfait. 
              Mon chauffeur connaît mes préférences, mes habitudes et anticipe même mes besoins. 
              Cette relation de confiance et ce niveau de personnalisation font toute la différence 
              par rapport aux services de transport traditionnels."
            </p>
            
            <div className="mb-12">
              <p className="font-semibold text-lg">Marie-Hélène Dubois</p>
              <p className="text-white/70">Cliente depuis 3 ans</p>
            </div>
            
            <div className="flex justify-center gap-3">
              <button className="w-3 h-3 rounded-full bg-primary"></button>
              <button className="w-3 h-3 rounded-full bg-white/30"></button>
              <button className="w-3 h-3 rounded-full bg-white/30"></button>
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
            <p className="subtitle">Tout ce que vous devez savoir sur nos trajets sur mesure</p>
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
              Vous avez une question spécifique sur nos services sur mesure ?
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
      
      {/* Inspiration Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>INSPIRATION</h2>
            <p className="subtitle">Quelques idées de services sur mesure</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
                  <i className="fas fa-glass-cheers text-white text-5xl"></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Anniversaire Surprise</h3>
                <p className="text-gray-600 mb-4">
                  Un chauffeur privé qui emmène votre invité d'honneur vers une destination surprise, 
                  avec ambiance personnalisée et petites attentions à bord.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Décoration du véhicule</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Musique préférée</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Champagne ou cadeau à bord</span>
                  </li>
                </ul>
                <Link href="/contact" className="text-primary font-medium inline-flex items-center hover:text-primary-dark">
                  En savoir plus
                  <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
                  <i className="fas fa-briefcase text-white text-5xl"></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Forfait Entrepreneur</h3>
                <p className="text-gray-600 mb-4">
                  Service de transport personnalisé pour entrepreneurs et dirigeants avec multiples 
                  rendez-vous dans une journée et besoin d'un espace de travail mobile.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Chauffeur à disposition toute la journée</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Bureau mobile équipé</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>WiFi haut débit et chargeurs</span>
                  </li>
                </ul>
                <Link href="/contact" className="text-primary font-medium inline-flex items-center hover:text-primary-dark">
                  En savoir plus
                  <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
                  <i className="fas fa-map-marked-alt text-white text-5xl"></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Circuit Œnologique</h3>
                <p className="text-gray-600 mb-4">
                  Découverte des vignobles français avec un chauffeur connaisseur qui vous accompagne 
                  tout au long de la journée, vous permettant de déguster en toute sérénité.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Itinéraire personnalisé</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Chauffeur guide expert en vins</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <i className="fas fa-check text-primary mr-2"></i>
                    <span>Transport sécurisé des achats</span>
                  </li>
                </ul>
                <Link href="/contact" className="text-primary font-medium inline-flex items-center hover:text-primary-dark">
                  En savoir plus
                  <i className="fas fa-arrow-right ml-2 text-xs"></i>
                </Link>
              </div>
            </div>
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
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Créons ensemble votre expérience idéale</h2>
            <p className="text-gray-300 text-lg mb-10">
              Partagez-nous vos besoins spécifiques et laissez-nous vous proposer un service 
              sur mesure qui dépasse vos attentes. Chez Elysian Luxury Chauffeurs, nous sommes 
              passionnés par la création d'expériences de transport uniques et mémorables.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="btn btn-primary">
                Demander un devis personnalisé
              </Link>
              <Link href="tel:+33123456789" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                <i className="fas fa-phone mr-2"></i>
                Nous appeler directement
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}