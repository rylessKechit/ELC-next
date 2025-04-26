// app/(pages)/service-green/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import greenHero from '@/public/assets/images/green-hero.jpg'
import teslaModel3 from '@/public/assets/images/tesla-model-3.png'
import ecoService from '@/public/assets/images/eco-service.jpg'
import carbonOffsetting from '@/public/assets/images/carbon-offsetting.jpg'

export default function ServiceGreenPage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const vehicleControls = useAnimation()
  const benefitsControls = useAnimation()
  const impactControls = useAnimation()
  const testimonialsControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [vehicleRef, vehicleInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [benefitsRef, benefitsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [impactRef, impactInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (vehicleInView) vehicleControls.start('visible')
    if (benefitsInView) benefitsControls.start('visible')
    if (impactInView) impactControls.start('visible')
    if (testimonialsInView) testimonialsControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, vehicleInView, benefitsInView, impactInView, testimonialsInView, ctaInView,
    headerControls, introControls, vehicleControls, benefitsControls, impactControls, testimonialsControls, ctaControls
  ])

  // Caractéristiques du véhicule Tesla
  const teslaFeatures = [
    { icon: 'fa-bolt', title: '100% Électrique', description: 'Zéro émission directe pour un impact environnemental minimal.' },
    { icon: 'fa-tachometer-alt', title: 'Autonomie 500 km', description: 'Parfaite pour les longues distances sans compromis.' },
    { icon: 'fa-wifi', title: 'Connectivité Premium', description: 'WiFi haut débit, écran tactile et recharge sans fil.' },
    { icon: 'fa-couch', title: 'Intérieur Végan', description: 'Matériaux synthétiques de qualité, sans cuir animal.' },
    { icon: 'fa-shield-alt', title: 'Sécurité Optimale', description: 'Systèmes d\'assistance avancés et conduite semi-autonome.' },
    { icon: 'fa-moon', title: 'Toit Panoramique', description: 'Luminosité naturelle et vue imprenable pendant vos trajets.' }
  ]

  // Avantages écologiques
  const ecoBenefits = [
    {
      title: 'Réduction des émissions de CO2',
      description: 'Nos véhicules électriques permettent d\'économiser en moyenne 120g de CO2 par kilomètre par rapport à un véhicule thermique équivalent.',
      icon: 'fa-leaf'
    },
    {
      title: 'Réduction de la pollution sonore',
      description: 'Les véhicules électriques sont significativement plus silencieux, contribuant à réduire la pollution sonore dans les zones urbaines.',
      icon: 'fa-volume-mute'
    },
    {
      title: 'Engagement carbone neutre',
      description: 'Nous compensons les émissions indirectes liées à la production d\'électricité par des investissements dans des projets environnementaux certifiés.',
      icon: 'fa-sync'
    }
  ]

  // Impact environnemental
  const impactData = {
    co2Saved: '12.5',
    treesEquivalent: '625',
    journeys: '2,500+',
    clientsSatisfied: '98%'
  }

  return (
    <div className="service-green-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/green-hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6">SERVICE <span className="text-green-500">GREEN</span></h1>
            
            <p className="font-tertiary text-2xl italic text-green-400 mb-6">
              Voyagez avec élégance tout en préservant notre planète
            </p>
            
            <p className="text-xl mb-10">
              Découvrez notre flotte de véhicules 100% électriques premium pour une expérience de transport 
              luxueuse et écologiquement responsable. Le confort et l'élégance que vous méritez, 
              avec un impact environnemental réduit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/#booking" className="btn bg-green-600 hover:bg-green-700 text-white">
                Réserver un véhicule Green
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-green-600">
                Demander plus d'informations
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
            <h2>LUXE ET DÉVELOPPEMENT DURABLE</h2>
            <p className="subtitle text-green-600">Une alliance parfaite pour des déplacements responsables</p>
            
            <p className="text-gray-600 mb-8">
              Chez Elysian Luxury Chauffeurs, nous sommes convaincus que luxe et écologie peuvent 
              coexister harmonieusement. Notre service Green répond aux attentes des clients les 
              plus exigeants tout en s'inscrivant dans une démarche environnementale résolument engagée.
            </p>
            
            <p className="text-gray-600 mb-8">
              Avec notre flotte de véhicules 100% électriques, vous bénéficiez d'une expérience de 
              transport aussi prestigieuse que respectueuse de l'environnement. Nos Tesla Model 3 
              Performance, au design élégant et aux performances exceptionnelles, vous garantissent 
              un voyage silencieux, confortable et zéro émission.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl text-green-500 mb-2">
                  <i className="fas fa-car-battery"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">100%</h3>
                <p className="text-gray-600">Électrique</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-green-500 mb-2">
                  <i className="fas fa-charging-station"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">500km</h3>
                <p className="text-gray-600">Autonomie</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-green-500 mb-2">
                  <i className="fas fa-leaf"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">0g</h3>
                <p className="text-gray-600">Émission CO2</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-green-500 mb-2">
                  <i className="fas fa-smile"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">100%</h3>
                <p className="text-gray-600">Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Vehicle Section */}
      <section 
        ref={vehicleRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOTRE FLOTTE VERTE</h2>
            <p className="subtitle text-green-600">Performance électrique et confort exceptionnel</p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={vehicleControls}
            variants={fadeInVariant}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto">
                <Image 
                  src={teslaModel3}
                  alt="Tesla Model 3 Performance"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ZÉRO ÉMISSION
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Tesla Model 3 Performance</h3>
                <p className="text-gray-600 mb-6">
                  Alliant puissance, autonomie et élégance, notre Tesla Model 3 Performance 
                  offre une expérience de transport luxueuse avec un impact environnemental minimal.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teslaFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                        <i className={`fas ${feature.icon} text-green-600`}></i>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Link href="/#booking" className="btn bg-green-600 hover:bg-green-700 text-white">
                    Réserver ce véhicule
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Notre flotte green s'agrandit régulièrement - Contactez-nous pour connaître nos dernières acquisitions
            </p>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section 
        ref={benefitsRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate={benefitsControls}
              variants={slideInLeftVariant}
              className="lg:w-1/2"
            >
              <div className="mb-6">
                <h2 className="text-left after:left-0 after:translate-x-0">AVANTAGES ÉCOLOGIQUES</h2>
                <div className="h-0.5 w-24 bg-green-500 my-6"></div>
                <p className="text-gray-600">Un choix responsable pour l'environnement</p>
              </div>
              
              <div className="space-y-8">
                {ecoBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-1">
                      <i className={`fas ${benefit.icon} text-green-600 text-xl`}></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-800 mb-1">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-green-500">
                <p className="text-gray-700">
                  <span className="font-bold">Le saviez-vous ?</span> Choisir un véhicule électrique 
                  pour un trajet de 100 km permet d'économiser jusqu'à 12 kg de CO2 par rapport à un 
                  véhicule à essence équivalent.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={benefitsControls}
              variants={slideInRightVariant}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src={ecoService}
                  alt="Service écologique"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-green-500"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section 
        ref={impactRef}
        className="py-20 bg-gray-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/assets/images/leaves-pattern.jpg)' }}></div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden"
            animate={impactControls}
            variants={fadeInVariant}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2>NOTRE IMPACT ENVIRONNEMENTAL</h2>
            <p className="subtitle text-green-600">Des chiffres qui parlent d'eux-mêmes</p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={impactControls}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div
              variants={fadeInVariant}
              className="bg-white rounded-lg p-6 shadow-md text-center"
            >
              <div className="text-5xl text-green-600 font-bold mb-2">{impactData.co2Saved}</div>
              <p className="text-lg font-medium">Tonnes de CO2</p>
              <p className="text-gray-600 text-sm">économisées chaque année</p>
            </motion.div>
            
            <motion.div
              variants={fadeInVariant}
              className="bg-white rounded-lg p-6 shadow-md text-center"
            >
              <div className="text-5xl text-green-600 font-bold mb-2">{impactData.treesEquivalent}</div>
              <p className="text-lg font-medium">Arbres</p>
              <p className="text-gray-600 text-sm">équivalent en absorption CO2</p>
            </motion.div>
            
            <motion.div
              variants={fadeInVariant}
              className="bg-white rounded-lg p-6 shadow-md text-center"
            >
              <div className="text-5xl text-green-600 font-bold mb-2">{impactData.journeys}</div>
              <p className="text-lg font-medium">Trajets verts</p>
              <p className="text-gray-600 text-sm">effectués depuis notre création</p>
            </motion.div>
            
            <motion.div
              variants={fadeInVariant}
              className="bg-white rounded-lg p-6 shadow-md text-center"
            >
              <div className="text-5xl text-green-600 font-bold mb-2">{impactData.clientsSatisfied}</div>
              <p className="text-lg font-medium">Clients satisfaits</p>
              <p className="text-gray-600 text-sm">de notre service Green</p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={impactControls}
            variants={fadeInVariant}
            className="mt-16 bg-white p-8 rounded-lg shadow-md"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
                              <div className="md:w-1/3">
                  <Image 
                    src={carbonOffsetting}
                    alt="Compensation carbone"
                    width={300}
                    height={200}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-2">Notre programme de compensation carbone</h3>
                  <p className="text-gray-600 mb-4">
                    Si nos véhicules électriques n'émettent pas directement de CO2, nous compensons l'empreinte carbone 
                    liée à la production d'électricité et à la fabrication des véhicules en investissant dans des 
                    projets environnementaux certifiés.
                  </p>
                  <p className="text-gray-600">
                    Pour chaque kilomètre parcouru avec notre service Green, nous contribuons à des projets de reforestation, 
                    d'énergie renouvelable et de préservation de la biodiversité en France et à l'international.
                  </p>
                  <Link href="/contact" className="mt-4 inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                    En savoir plus sur nos engagements
                    <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>CE QUE DISENT NOS CLIENTS</h2>
            <p className="subtitle text-green-600">Des utilisateurs convaincus par notre approche écologique</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={testimonialsControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500"
            >
              <div className="text-green-500 text-xl mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="italic text-gray-600 mb-4">
                "J'utilise régulièrement le service Green pour mes déplacements professionnels. Le confort est identique 
                aux berlines classiques, mais avec la satisfaction de minimiser mon impact environnemental. Un excellent compromis."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Éric M.</p>
                  <p className="text-sm text-gray-500">Directeur Marketing</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500"
            >
              <div className="text-green-500 text-xl mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="italic text-gray-600 mb-4">
                "La Tesla est impressionnante ! Silencieuse, confortable et élégante. Mon entreprise est engagée 
                dans une démarche RSE, et pouvoir choisir un service de transport écologique est un vrai plus pour nous."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Sophie L.</p>
                  <p className="text-sm text-gray-500">Responsable RSE</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariant}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500"
            >
              <div className="text-green-500 text-xl mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="italic text-gray-600 mb-4">
                "J'organise des événements éco-responsables et le service Green d'Elysian s'intègre parfaitement dans 
                notre démarche. Pouvoir proposer un transport zéro émission à nos invités VIP est un atout considérable."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Julien D.</p>
                  <p className="text-sm text-gray-500">Organisateur d'événements</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="text-center mt-12">
            <Link href="/#booking" className="btn bg-green-600 hover:bg-green-700 text-white">
              Essayer notre service Green
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section 
        ref={ctaRef}
        className="py-20 bg-green-800 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-800 z-0"></div>
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L80,170.7C160,149,320,107,480,112C640,117,800,171,960,186.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden"
            animate={ctaControls}
            variants={fadeInVariant}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-white">Voyagez responsable, voyagez en style</h2>
            <p className="text-green-100 text-lg mb-10">
              Rejoignez notre communauté de clients éco-responsables et découvrez comment 
              le luxe peut s'allier parfaitement au respect de l'environnement. Faites le choix 
              d'un transport premium qui ne compromet pas l'avenir de notre planète.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/#booking" className="btn bg-white text-green-800 hover:bg-green-100">
                Réserver un véhicule Green
              </Link>
              <Link href="/contact" className="btn btn-outline text-white border-white hover:bg-white hover:text-green-800">
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}