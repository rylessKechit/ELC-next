// app/(pages)/a-propos/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import TimelineSection from '@/components/about/TimelineSection';

// Images
import founderImage1 from '@/public/assets/images/founder-1.webp'
import founderImage2 from '@/public/assets/images/founder-2.webp'
import certificateImage from '@/public/assets/images/certificate.webp'

export default function AboutPage() {
  // Animation controls
  const headerControls = useAnimation()
  const storyControls = useAnimation()
  const foundersControls = useAnimation()
  const introTimelineControls = useAnimation() // Nouveau contrôle pour l'intro timeline
  const valuesControls = useAnimation()
  const certificationsControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [storyRef, storyInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [foundersRef, foundersInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introTimelineRef, introTimelineInView] = useInView({ threshold: 0.1, triggerOnce: true }) // Nouveau observer
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [certificationsRef, certificationsInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (storyInView) storyControls.start('visible')
    if (foundersInView) foundersControls.start('visible')
    if (introTimelineInView) introTimelineControls.start('visible') // Nouvelle animation
    if (valuesInView) valuesControls.start('visible')
    if (certificationsInView) certificationsControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, storyInView, foundersInView, introTimelineInView, valuesInView, certificationsInView, ctaInView,
    headerControls, storyControls, foundersControls, introTimelineControls, valuesControls, certificationsControls, ctaControls
  ])

  // Values
  const values = [
    {
      title: 'Excellence',
      icon: 'fa-star',
      description: 'Nous visons la perfection dans chaque aspect de notre service, du véhicule impeccable à l\'attention portée aux moindres détails.'
    },
    {
      title: 'Discrétion',
      icon: 'fa-user-shield',
      description: 'Confidentialité absolue et respect de votre vie privée, quelle que soit la nature de votre déplacement.'
    },
    {
      title: 'Fiabilité',
      icon: 'fa-check-circle',
      description: 'Ponctualité irréprochable et engagement à respecter nos promesses, en toutes circonstances.'
    },
    {
      title: 'Personnalisation',
      icon: 'fa-gem',
      description: 'Chaque client est unique, et nous adaptons notre service à vos exigences et préférences spécifiques.'
    },
    {
      title: 'Innovation',
      icon: 'fa-lightbulb',
      description: 'Constamment à la recherche de nouvelles façons d\'améliorer notre offre et d\'intégrer les technologies les plus récentes.'
    },
    {
      title: 'Écoresponsabilité',
      icon: 'fa-leaf',
      description: 'Engagés dans une démarche écologique avec des véhicules à faibles émissions et des pratiques durables.'
    }
  ]

  // Certifications
  const certifications = [
    {
      title: 'VTC Professionnel',
      description: 'Tous nos chauffeurs sont certifiés VTC et ont suivi une formation professionnelle complète.'
    },
    {
      title: 'Certification Qualité Service',
      description: 'Notre entreprise est certifiée pour la qualité de son service client et la satisfaction garantie.'
    },
    {
      title: 'Formation Premier Secours',
      description: 'Nos chauffeurs sont formés aux premiers secours pour assurer votre sécurité en toute circonstance.'
    },
    {
      title: 'Formation Écologique',
      description: 'Formation spécifique pour une conduite écologique et économique, réduisant notre impact environnemental.'
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/about-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white text-center">
          <motion.h1 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="mb-6 text-primary"
          >
            À PROPOS D'ELYSIAN LUXURY CHAUFFEURS
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="font-tertiary text-2xl italic text-primary mb-6 max-w-3xl mx-auto"
          >
            L'histoire de deux chauffeurs passionnés par l'excellence et le service personnalisé
          </motion.p>
        </div>
      </section>

      {/* Introduction Timeline Section - NOUVELLE SECTION */}
      <section 
        ref={introTimelineRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="container-custom relative z-10">
          <motion.div 
            initial="hidden"
            animate={introTimelineControls}
            variants={fadeInVariant}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-secondary mb-6">NOTRE HISTOIRE</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Depuis notre création en 2019, <strong>Sebastien et Pierre</strong> ont façonné Elysian Luxury Chauffeurs 
              avec une vision claire : révolutionner l'expérience du transport VIP dans l'Essonne et en Île-de-France. 
              Leur histoire commune, leur passion partagée pour l'excellence et leur engagement constant envers 
              leurs clients ont permis de bâtir une entreprise de référence dans le secteur du transport de luxe.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              De l'idée initiale à aujourd'hui, découvrez les étapes clés qui ont marqué l'évolution d'Elysian, 
              chaque moment étant le fruit de décisions mûrement réfléchies par nos deux fondateurs, 
              toujours guidés par leurs valeurs communes et leur ambition de proposer un service d'exception.
            </p>
            
            {/* Indicator vers la timeline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={introTimelineControls}
              variants={fadeInVariant}
              className="flex flex-col items-center"
            >
              <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
                Découvrez notre parcours
              </p>
              <div className="animate-bounce">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection />
      
      {/* Nos Valeurs Section */}
      <section 
        ref={valuesRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOS VALEURS</h2>
            <p className="subtitle">Les principes qui nous guident au quotidien</p>
          </div>
          
          <motion.div 
            initial="hidden"
            animate={valuesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                variants={fadeInVariant}
                className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:shadow-lg border-t-4 border-transparent hover:border-primary"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <i className={`fas ${value.icon} text-primary text-2xl`}></i>
                </div>
                <h3 className="text-xl mb-4 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section 
        ref={certificationsRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>NOS CERTIFICATIONS</h2>
            <p className="subtitle">Un gage de qualité et de professionnalisme</p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate={certificationsControls}
              variants={slideInLeftVariant}
              className="lg:w-1/2"
            >
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src={certificateImage} 
                  alt="Nos certifications" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <p className="text-white p-6 font-medium italic">
                    "La qualité n'est jamais un accident; c'est toujours le résultat d'un effort intelligent."
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={certificationsControls}
              variants={slideInRightVariant}
              className="lg:w-1/2"
            >
              <h3 className="text-2xl mb-6">Une équipe certifiée pour votre sécurité et votre confort</h3>
              <p className="text-gray-600 mb-8">
                Chez Elysian Luxury Chauffeurs, nous nous engageons à maintenir les standards les plus élevés en matière de 
                service client, de sécurité et de professionnalisme. Nos certifications témoignent de cet engagement continu.
              </p>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <i className="fas fa-certificate text-primary"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800">{cert.title}</h4>
                      <p className="text-gray-600">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
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
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">Prêt à vivre l'expérience Elysian ?</h2>
            <p className="text-gray-300 text-lg mb-10">
              Découvrez pourquoi des clients exigeants nous font confiance pour leurs déplacements dans l'Essonne et au-delà.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="btn btn-primary">
                Contactez-nous
              </Link>
              <Link href="/#booking" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                Réserver maintenant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}