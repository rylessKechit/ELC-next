// app/page.js
"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import BookingForm from '@/components/booking/BookingForm'

// Images
import TeslaModel3 from '@/public/assets/images/tesla-model-3.png'
import MercedesClassS from '@/public/assets/images/mercedes-classe-s.png'
import BmwSerie7 from '@/public/assets/images/bmw-7-series.png'
import MercedesVClass from '@/public/assets/images/mercedes-v-class.png'
import ExperienceVip from '@/public/assets/images/experience-vip.jpg'
import logoCannesFestival from '@/public/assets/images/logo-cannes-festival.png'
import logoRitzParis from '@/public/assets/images/logo-ritz-paris.png'
import logoLouisVuitton from '@/public/assets/images/logo-louis-vuitton.png'
import logoChanel from '@/public/assets/images/logo-chanel.png'
import logoAirFrance from '@/public/assets/images/logo-air-france.png'

export default function HomePage() {
  // Animation controls
  const heroControls = useAnimation()
  const servicesControls = useAnimation()
  const fleetControls = useAnimation()
  const experienceControls = useAnimation()
  const testimonialsControls = useAnimation()
  const bookingControls = useAnimation()
  const partnersControls = useAnimation()

  // Intersection observers
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [fleetRef, fleetInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [experienceRef, experienceInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [bookingRef, bookingInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [partnersRef, partnersInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // Current testimonial index for carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  // Animate sections when in view
  useEffect(() => {
    if (heroInView) heroControls.start('visible')
    if (servicesInView) servicesControls.start('visible')
    if (fleetInView) fleetControls.start('visible')
    if (experienceInView) experienceControls.start('visible')
    if (testimonialsInView) testimonialsControls.start('visible')
    if (bookingInView) bookingControls.start('visible')
    if (partnersInView) partnersControls.start('visible')
  }, [
    heroInView, servicesInView, fleetInView, experienceInView, 
    testimonialsInView, bookingInView, partnersInView,
    heroControls, servicesControls, fleetControls, experienceControls,
    testimonialsControls, bookingControls, partnersControls
  ])

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Vehicle fleet carousel items
  const fleetItems = [
    {
      name: 'Tesla Model 3',
      image: TeslaModel3,
      description: 'Élégance et confort inégalés pour vos déplacements d\'affaires et événements prestigieux.',
      features: ['Jusqu\'à 3 passagers', 'Wi-Fi gratuit', 'Boissons fraîches', 'Sièges en cuir premium']
    },
    {
      name: 'Mercedes-Benz Classe S',
      image: MercedesClassS,
      description: 'Élégance et confort inégalés pour vos déplacements d\'affaires et événements prestigieux.',
      features: ['Jusqu\'à 3 passagers', 'Wi-Fi gratuit', 'Boissons fraîches', 'Sièges en cuir premium']
    },
    {
      name: 'BMW Série 7',
      image: BmwSerie7,
      description: 'L\'alliance parfaite entre technologie de pointe et luxe raffiné pour vos trajets professionnels.',
      features: ['Jusqu\'à 3 passagers', 'Écrans tactiles individuels', 'Système audio haut de gamme', 'Ambiance lumineuse personnalisable']
    },
    {
      name: 'Mercedes-Benz Classe V VIP',
      image: MercedesVClass,
      description: 'Espace généreux et aménagements luxueux pour vos déplacements en groupe.',
      features: ['Jusqu\'à 7 passagers', 'Configuration salon privé', 'Bar intégré', 'Isolation acoustique renforcée']
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      name: 'Sophie Marceau',
      role: 'Actrice',
      text: 'Un service d\'exception que j\'utilise régulièrement lors de mes déplacements professionnels. Discrétion, ponctualité et confort absolu.',
      image: '/assets/images/testimonial-1.jpg'
    },
    {
      name: 'Jean Dujardin',
      role: 'Acteur et Producteur',
      text: 'Une prestation VIP impeccable pour tous mes trajets entre Paris et les festivals. Je recommande sans hésitation ce service haut de gamme.',
      image: '/assets/images/testimonial-2.jpg'
    },
    {
      name: 'Marion Cotillard',
      role: 'Actrice',
      text: 'Le summum du luxe et de l\'élégance pour vos déplacements. Un chauffeur toujours disponible et parfaitement professionnel.',
      image: '/assets/images/testimonial-3.jpg'
    }
  ]

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

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/images/hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 ml-[10%] max-w-[650px] text-white p-8">
          <motion.h1 
            initial="hidden"
            animate={heroControls}
            variants={slideInLeftVariant}
            className="mb-6"
          >
            <span className="text-primary">ELYSIAN</span> LUXURY CHAUFFEURS
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate={heroControls}
            variants={fadeInVariant}
            className="font-tertiary text-2xl italic text-primary mb-6"
          >
            L'excellence du transport VIP pour une clientèle d'exception
          </motion.p>
          
          <motion.p 
            initial="hidden"
            animate={heroControls}
            variants={slideInRightVariant}
            className="text-xl mb-8"
          >
            Service de chauffeur privé haut de gamme pour vos déplacements professionnels, 
            événements prestigieux et voyages d'affaires.
          </motion.p>
          
          <motion.div 
            initial="hidden"
            animate={heroControls}
            variants={fadeInVariant}
            className="flex flex-col sm:flex-row gap-6 mt-10"
          >
            <Link href="/flotte-vehicules" className="btn btn-primary">
              Découvrir notre flotte
            </Link>
            <a 
              href="#booking" 
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('booking')
              }}
              className="btn btn-outline"
            >
              Réserver maintenant
            </a>
          </motion.div>
        </div>
        
        <a 
          href="#services" 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white flex justify-center items-center z-20 shadow-md animate-bounce"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('services')
          }}
        >
          <i className="fas fa-chevron-down"></i>
        </a>
      </section>
      
      {/* Services Section */}
      <section 
        id="services" 
        ref={servicesRef} 
        className="py-24 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOS PRESTATIONS D'EXCEPTION</h2>
            <p className="subtitle">Des services personnalisés pour vos exigences les plus élevées</p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={servicesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-crown text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">TRANSFERT VIP</h3>
              <p className="text-gray-600 mb-6 text-center">
                Une expérience d'exception avec chauffeur privé dédié, véhicule de luxe et service personnalisé. 
                Confidentialité, élégance et attention aux moindres détails pour vos déplacements exclusifs.
              </p>
              <Link href="/experience-vip" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-glass-cheers text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">ÉVÉNEMENTS & SOIRÉES</h3>
              <p className="text-gray-600 mb-6 text-center">
                Service de prestige pour vos événements spéciaux, soirées de gala, tapis rouges et premières. Arrivez avec style et distinction.
              </p>
              <Link href="/services-evenements" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-route text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">VOYAGES LONGUE DISTANCE</h3>
              <p className="text-gray-600 mb-6 text-center">
                Confort et luxe pour vos déplacements entre villes, voyages d'affaires et touristiques. Service sur-mesure sans limite de kilométrage.
              </p>
              <Link href="/services-longue-distance" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeInVariant} className="bg-white rounded-lg shadow-md p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-t-4 border-transparent hover:border-primary">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-briefcase text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl mb-4 text-center">TRANSPORT D'AFFAIRES</h3>
              <p className="text-gray-600 mb-6 text-center">
                Solutions dédiées aux entreprises et dirigeants exigeants. Confidentialité, ponctualité et excellence pour vos rendez-vous professionnels.
              </p>
              <Link href="/services-affaires" className="flex items-center justify-center text-primary font-medium hover:text-primary-dark transition-colors">
                Découvrir
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Fleet Section */}
      <section 
        id="fleet" 
        ref={fleetRef} 
        className="py-24 bg-gray-50 relative overflow-hidden"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOTRE FLOTTE PREMIUM</h2>
            <p className="subtitle">Des véhicules d'exception pour une expérience inoubliable</p>
          </div>
          
          <div className="space-y-16">
            {fleetItems.map((item, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                animate={fleetControls}
                variants={fadeInVariant}
                custom={index}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
              >
                <div className="w-full md:w-2/5 relative h-[300px] md:h-auto overflow-hidden">
                  <Image 
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority={index === 0}
                  />
                </div>
                <div className="w-full md:w-3/5 p-8 md:p-10">
                  <h3 className="text-2xl mb-4">{item.name}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <ul className="mb-8 space-y-4">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <i className="fas fa-check text-primary mr-3"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/flotte-vehicules" className="btn btn-primary">
                    Réserver ce véhicule
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link href="/flotte-vehicules" className="inline-flex items-center text-primary text-lg font-medium hover:text-primary-dark transition-colors">
              Découvrir toute notre flotte
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section 
        id="experience" 
        ref={experienceRef} 
        className="py-24 bg-white"
      >
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate={experienceControls}
              variants={slideInLeftVariant}
              className="lg:w-1/2"
            >
              <div className="mb-6">
                <h2 className="text-left">L'EXPÉRIENCE VIP</h2>
                <div className="h-0.5 w-12 bg-primary my-6"></div>
                <p className="text-gray-600">Bien plus qu'un simple transport, une expérience unique</p>
              </div>
              <p className="text-gray-600 mb-8">
                Chaque voyage avec notre service de chauffeur privé est une expérience raffinée, 
                où chaque détail est pensé pour répondre à vos attentes les plus exigeantes.
              </p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-gem text-primary"></i>
                  </div>
                  <span className="ml-4">Chauffeurs d'élite formés au protocole et à l'étiquette</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-glass-martini-alt text-primary"></i>
                  </div>
                  <span className="ml-4">Sélection de boissons et rafraîchissements premium</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-wifi text-primary"></i>
                  </div>
                  <span className="ml-4">Connectivité haut débit et équipements high-tech</span>
                </li>
                <li className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-shield-alt text-primary"></i>
                  </div>
                  <span className="ml-4">Discrétion absolue et confidentialité garantie</span>
                </li>
              </ul>
              <Link href="/experience-vip" className="btn btn-primary">
                Découvrir l'expérience VIP
              </Link>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={experienceControls}
              variants={slideInRightVariant}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl relative">
                <Image 
                  src={ExperienceVip}
                  alt="Expérience VIP"
                  width={600}
                  height={500}
                  className="object-cover w-full h-[500px]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-full border-l-2 border-b-2 border-primary"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        ref={testimonialsRef} 
        className="py-24 bg-gray-50 relative"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>ILS NOUS FONT CONFIANCE</h2>
            <p className="subtitle">Ce que disent nos clients d'exception</p>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: index === currentTestimonial ? 1 : 0, 
                  x: index === currentTestimonial ? 0 : 50,
                  zIndex: index === currentTestimonial ? 10 : 0,
                }}
                transition={{ duration: 0.6 }}
                className={`bg-white p-10 rounded-lg shadow-lg absolute w-full top-0 left-0 ${index === currentTestimonial ? 'relative' : 'hidden'}`}
              >
                <div className="text-3xl text-primary mb-6">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="text-lg italic font-tertiary mb-8 leading-relaxed text-gray-700 relative z-10 pl-5">
                  {testimonial.text}
                </p>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-lg mb-0">{testimonial.name}</h4>
                    <p className="text-primary italic">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${index === currentTestimonial ? 'bg-primary scale-125' : 'bg-primary/30'}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Témoignage ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Booking Section */}
      <section 
        id="booking" 
        ref={bookingRef} 
        className="py-24 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>RÉSERVEZ VOTRE EXPÉRIENCE DE LUXE</h2>
            <p className="subtitle">Un service sur-mesure pour répondre à toutes vos exigences</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={bookingControls}
            variants={fadeInVariant}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 lg:p-12"
          >
            <BookingForm />
          </motion.div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section 
        id="partners" 
        ref={partnersRef} 
        className="py-24 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOS PARTENAIRES DE PRESTIGE</h2>
            <p className="subtitle">Ils nous accordent leur confiance au quotidien</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={partnersControls}
            variants={fadeInVariant}
            className="flex flex-wrap justify-center items-center gap-12 lg:gap-16"
          >
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoCannesFestival} alt="Festival de Cannes" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoRitzParis} alt="Ritz Paris" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoLouisVuitton} alt="Louis Vuitton" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoChanel} alt="Chanel" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
            <div className="partner-logo h-20 flex items-center opacity-60 hover:opacity-100 transition-opacity">
              <Image src={logoAirFrance} alt="Air France" height={80} className="max-h-full w-auto filter grayscale hover:grayscale-0 transition-all" />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 z-0"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Prêt à vivre l'excellence ?</h2>
            <p className="text-gray-300 text-lg mb-10">Contactez-nous dès maintenant pour réserver votre expérience de transport VIP.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="btn btn-primary">
                Nous contacter
              </Link>
              <a href="tel:+33600000000" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                <i className="fas fa-phone mr-2"></i>
                Appeler directement
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}