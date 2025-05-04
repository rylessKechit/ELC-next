// app/(pages)/experience-vip/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import vipInterieur from '@/public/assets/images/vip-interieur.webp'
import vipChauffeur from '@/public/assets/images/vip-chauffeur.webp'

export default function ExperienceVipPage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const servicesControls = useAnimation()
  const featuresControls = useAnimation()
  const pricingControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [pricingRef, pricingInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (featuresInView) featuresControls.start('visible')
    if (pricingInView) pricingControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, servicesInView, featuresInView, pricingInView, ctaInView,
    headerControls, introControls, servicesControls, featuresControls, pricingControls, ctaControls
  ])

  // Service features
  const serviceFeatures = [
    {
      title: 'Véhicules de prestige',
      icon: 'fa-car',
      description: 'Sélection des meilleures berlines et SUV de luxe, impeccablement entretenus pour votre confort.'
    },
    {
      title: 'Chauffeurs d\'élite',
      icon: 'fa-user-tie',
      description: 'Chauffeurs expérimentés, formés à l\'étiquette, multilingues et parfaitement présentables.'
    },
    {
      title: 'Service personnalisé',
      icon: 'fa-concierge-bell',
      description: 'Adaptation à toutes vos exigences particulières pour une expérience sur mesure.'
    },
    {
      title: 'Confort supérieur',
      icon: 'fa-couch',
      description: 'Intérieurs raffinés, climatisation, connexion WiFi et équipements audiovisuels.'
    },
    {
      title: 'Confidentialité garantie',
      icon: 'fa-user-shield',
      description: 'Discrétion absolue et respect de votre vie privée pendant tous vos déplacements.'
    },
    {
      title: 'Ponctualité impeccable',
      icon: 'fa-clock',
      description: 'Respect scrupuleux des horaires et suivi en temps réel de vos vols ou trains.'
    }
  ]

  // VIP service packages
  const vipPackages = [
    {
      title: 'Essential VIP',
      price: 'À partir de 120€',
      description: 'L\'expérience VIP essentielle pour vos déplacements ponctuels.',
      features: [
        'Berline de luxe (Classe E ou équivalent)',
        'Chauffeur professionnel',
        'Eau minérale offerte',
        'WiFi à bord',
        'Accueil personnalisé'
      ],
      highlighted: false
    },
    {
      title: 'Premium Excellence',
      price: 'À partir de 220€',
      description: 'Service haut de gamme pour une expérience de transport exceptionnelle.',
      features: [
        'Berline premium (Classe S ou équivalent)',
        'Chauffeur d\'élite expérimenté',
        'Sélection de boissons et rafraîchissements',
        'WiFi haut débit & chargeurs',
        'Possibilité de stops multiples',
        'Service conciergerie'
      ],
      highlighted: true
    },
    {
      title: 'Elysian Prestige',
      price: 'À partir de 450€',
      description: 'Le summum du luxe pour vos événements les plus importants.',
      features: [
        'SUV ou limousine de luxe',
        'Chauffeur d\'élite dédié',
        'Champagne et sélection de collations',
        'Configuration intérieure personnalisée',
        'Conciergerie 24/7',
        'Service d\'accompagnement',
        'Transport de bagages exclusif'
      ],
      highlighted: false
    }
  ]

  return (
    <div className="experience-vip-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[75vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/vip-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6">EXPÉRIENCE <span className="text-primary">VIP</span></h1>
            
            <p className="font-tertiary text-2xl italic text-primary mb-6">
              Un service d'exception pour une clientèle exigeante
            </p>
            
            <p className="text-xl mb-10">
              Découvrez notre service de chauffeur privé VIP, offrant une expérience de transport exceptionnelle 
              où chaque détail est soigneusement pensé pour votre confort et votre satisfaction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver votre expérience
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
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate={introControls}
              variants={slideInLeftVariant}
              className="lg:w-1/2"
            >
              <div className="mb-6">
                <h2 className="text-left after:left-0 after:translate-x-0">L'EXCELLENCE DU TRANSPORT VIP</h2>
                <div className="h-0.5 w-24 bg-primary my-6"></div>
              </div>
              
              <p className="text-lg text-gray-600 mb-6">
                Chez Elysian Luxury Chauffeurs, nous redéfinissons les standards du transport privé haut de gamme 
                pour vous offrir bien plus qu'un simple déplacement : une véritable expérience VIP.
              </p>
              
              <p className="text-gray-600 mb-6">
                Notre service de chauffeur VIP s'adresse aux clients les plus exigeants, à la recherche d'un niveau 
                de confort, de discrétion et d'attention irréprochable pendant leurs déplacements.
              </p>
              
              <p className="text-gray-600 mb-8">
                Que ce soit pour un transfert aéroport, un événement spécial, une journée d'affaires 
                ou des déplacements personnels, nous garantissons une prestation sur mesure qui répondra 
                parfaitement à vos attentes les plus élevées.
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <i className="fas fa-award text-white text-xl"></i>
                </div>
                <p className="font-medium text-lg">L'excellence à chaque trajet, sans compromis.</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={introControls}
              variants={slideInRightVariant}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src={vipInterieur} 
                  alt="Intérieur de véhicule VIP"
                  width={600}
                  height={400}
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-primary"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOS SERVICES VIP</h2>
            <p className="subtitle">Des prestations d'exception pour toutes vos exigences</p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-plane-arrival text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">TRANSFERTS AÉROPORT</h3>
              <p className="text-gray-600 text-center">
                Accueil personnalisé, assistance bagages et suivi en temps réel des vols. Voyagez sereinement 
                avec un chauffeur qui vous attend même en cas de retard.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-calendar-star text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">ÉVÉNEMENTS SPÉCIAUX</h3>
              <p className="text-gray-600 text-center">
                Service haut de gamme pour vos galas, mariages, premières ou soirées spéciales. Arrivez avec élégance 
                et sans stress à tous vos événements prestigieux.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-briefcase text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">JOURNÉES D'AFFAIRES</h3>
              <p className="text-gray-600 text-center">
                Optimisez votre temps avec un chauffeur dédié pour vos rendez-vous professionnels. 
                Un espace de travail mobile, connecté et confidentiel pour rester productif.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-shopping-bag text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">SHOPPING & LOISIRS</h3>
              <p className="text-gray-600 text-center">
                Accompagnement personnalisé pour vos séances shopping ou sorties culturelles. Votre chauffeur s'occupe
                de tout pendant que vous profitez pleinement de votre journée.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-map text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">VISITES TOURISTIQUES</h3>
              <p className="text-gray-600 text-center">
                Découvrez la région avec un chauffeur connaissant parfaitement le territoire. Une expérience
                touristique privilégiée avec confort et flexibilité.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-glass-cheers text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">SOIRÉES & DÎNERS</h3>
              <p className="text-gray-600 text-center">
                Transport élégant et sécurisé pour vos soirées et dîners. Profitez pleinement de votre
                soirée sans vous soucier du retour.
              </p>
            </motion.div>
          </motion.div>
          
          <div className="text-center mt-12">
            <Link href="/trajets-sur-mesure" className="btn btn-primary">
              Découvrir nos trajets sur mesure
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate={featuresControls}
              variants={slideInLeftVariant}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl relative">
                <Image 
                  src={vipChauffeur} 
                  alt="Chauffeur VIP"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-8">
                    <span className="text-white font-tertiary italic text-xl">
                      "L'élégance du service, jusque dans les moindres détails"
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-primary"></div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={featuresControls}
              variants={slideInRightVariant}
              className="lg:w-1/2"
            >
              <div className="mb-8">
                <h2 className="text-left after:left-0 after:translate-x-0">LES CARACTÉRISTIQUES DE NOTRE SERVICE VIP</h2>
                <div className="h-0.5 w-24 bg-primary my-6"></div>
                <p className="text-gray-600">Une attention méticuleuse pour une expérience sans faille</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <i className={`fas ${feature.icon} text-primary`}></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 bg-gray-50 p-6 rounded-lg border-l-4 border-primary">
                <h4 className="font-bold text-xl mb-2">Notre engagement VIP</h4>
                <p className="text-gray-600">
                  Nous nous engageons à offrir un service impeccable, en anticipant vos besoins et en dépassant vos attentes.
                  Votre satisfaction est notre priorité absolue et nous mettons tout en œuvre pour que chaque trajet soit une expérience mémorable.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* VIP Packages Section */}
      <section 
        ref={pricingRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOS OFFRES VIP</h2>
            <p className="subtitle">Des formules adaptées à vos exigences</p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={pricingControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {vipPackages.map((pkg, index) => (
              <motion.div 
                key={index} 
                variants={fadeInVariant}
                className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                           ${pkg.highlighted ? 'border-2 border-primary' : 'border border-gray-200'}`}
              >
                <div className={`p-6 text-center ${pkg.highlighted ? 'bg-primary text-white' : 'bg-white'}`}>
                  <h3 className={`text-2xl font-bold mb-2 ${pkg.highlighted ? 'text-white' : 'text-gray-800'}`}>
                    {pkg.title}
                  </h3>
                  <div className="text-3xl font-bold mt-4 mb-2">
                    {pkg.price}
                  </div>
                  <p className={`mb-4 ${pkg.highlighted ? 'text-white/80' : 'text-gray-600'}`}>
                    {pkg.description}
                  </p>
                </div>
                
                <div className="bg-white p-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <i className="fas fa-check text-primary mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <Link 
                      href="/#booking" 
                      className={`w-full block text-center py-3 px-6 rounded-full font-semibold transition-all duration-300
                                ${pkg.highlighted 
                                  ? 'bg-primary text-white hover:bg-primary-dark' 
                                  : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}
                    >
                      Réserver maintenant
                    </Link>
                  </div>
                </div>
                
                {pkg.highlighted && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-white text-primary text-xs font-bold py-1 px-4 rounded-bl-lg">
                      RECOMMANDÉ
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Vous avez besoin d'une offre personnalisée pour un événement spécial ou un service régulier ?
            </p>
            <Link href="/contact" className="btn btn-primary">
              Demander un devis sur mesure
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials and CTA Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-secondary text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-0"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/assets/images/vip-service.webp)' }}></div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden"
            animate={ctaControls}
            variants={fadeInVariant}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="text-primary text-5xl mb-6">
              <i className="fas fa-quote-left"></i>
            </div>
            
            <p className="text-2xl font-tertiary italic text-white mb-8">
              "Un service d'exception, une attention aux détails remarquable et une discrétion absolue. 
              Elysian a redéfini mon expérience du transport de luxe."
            </p>
            
            <div className="mb-12">
              <p className="font-semibold text-lg">Sophie Laurent</p>
              <p className="text-white/70">Directrice Générale, Groupe Luxéo</p>
            </div>
            
            <h2 className="text-white text-3xl md:text-4xl mb-6">Prêt à vivre l'expérience VIP Elysian ?</h2>
            <p className="text-gray-300 text-lg mb-10">
              Réservez dès maintenant votre service de chauffeur privé d'exception et découvrez
              ce qui fait d'Elysian la référence du transport VIP dans l'Essonne et au-delà.
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