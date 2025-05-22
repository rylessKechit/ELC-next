// app/(pages)/chauffeurs-prive-essonne/page.js
"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Images
import essonneHero from '@/public/assets/images/essonne-hero.webp'
import chauffeurEssonne from '@/public/assets/images/chauffeur-essonne.webp'
import fleetEssonne from '@/public/assets/images/fleet-essonne.webp'

export const metadata = {
  title: 'Chauffeurs Privé Essonne (91) - Service VTC Haut de Gamme dans le Département',
  description: 'Chauffeurs privés professionnels dans l\'Essonne (91). Service VTC premium dans tout le département : Évry, Corbeil, Massy, Palaiseau. Réservation 24h/24 avec chauffeurs expérimentés.',
  keywords: 'chauffeurs privé essonne, chauffeur privé 91, vtc essonne, transport essonne, chauffeur evry, chauffeur corbeil',
}

export default function ChauffeursPriveEssonnePage() {
  // Animation controls
  const headerControls = useAnimation()
  const introControls = useAnimation()
  const servicesControls = useAnimation()
  const villesControls = useAnimation()
  const chauffeurControls = useAnimation()
  const faqControls = useAnimation()
  const ctaControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [introRef, introInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [villesRef, villesInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [chauffeurRef, chauffeurInView] = useInView({ threshold: 0.1, triggerOnce: true })
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
    if (villesInView) villesControls.start('visible')
    if (chauffeurInView) chauffeurControls.start('visible')
    if (faqInView) faqControls.start('visible')
    if (ctaInView) ctaControls.start('visible')
  }, [
    headerInView, introInView, servicesInView, villesInView, chauffeurInView, faqInView, ctaInView,
    headerControls, introControls, servicesControls, villesControls, chauffeurControls, faqControls, ctaControls
  ])

  // Services chauffeurs privés Essonne
  const servicesEssonne = [
    {
      title: 'Chauffeurs Privés Évry-Courcouronnes',
      description: 'Service de chauffeurs privés dans la préfecture de l\'Essonne avec véhicules premium.',
      icon: 'fa-building',
      zones: ['Centre-ville Évry', 'Université', 'Cathédrale', 'Quartier des Pyramides'],
      services: ['Transport d\'affaires', 'Événements officiels', 'Transferts aéroport', 'Mise à disposition']
    },
    {
      title: 'Chauffeurs Privés Corbeil-Essonnes',
      description: 'Chauffeurs professionnels dans la sous-préfecture avec expertise locale.',
      icon: 'fa-landmark',
      zones: ['Centre historique', 'Zone industrielle', 'Gares SNCF', 'Quartiers résidentiels'],
      services: ['VTC longue distance', 'Transport médical', 'Événements privés', 'Courses quotidiennes']
    },
    {
      title: 'Chauffeurs Privés Massy',
      description: 'Service VTC premium à Massy avec chauffeurs spécialisés quartier d\'affaires.',
      icon: 'fa-briefcase',
      zones: ['Massy-Opéra', 'Zone d\'affaires', 'Gare TGV', 'Campus universitaires'],
      services: ['Transport exécutif', 'Congrès et séminaires', 'Transferts express', 'Service corporate']
    },
    {
      title: 'Chauffeurs Privés Palaiseau',
      description: 'Chauffeurs privés spécialisés secteur technologique et universités.',
      icon: 'fa-graduation-cap',
      zones: ['École Polytechnique', 'Plateau de Saclay', 'Centre-ville', 'Zones tech'],
      services: ['Transport universitaire', 'Délégations officielles', 'Événements tech', 'Recherche et développement']
    }
  ]

  // Principales villes Essonne
  const villesEssonne = [
    { nom: 'Évry-Courcouronnes', population: '70 000 hab.', specialite: 'Préfecture - Administration' },
    { nom: 'Corbeil-Essonnes', population: '50 000 hab.', specialite: 'Industrie - Patrimoine' },
    { nom: 'Massy', population: '48 000 hab.', specialite: 'Affaires - TGV' },
    { nom: 'Savigny-sur-Orge', population: '37 000 hab.', specialite: 'Résidentiel - Commerce' },
    { nom: 'Palaiseau', population: '32 000 hab.', specialite: 'Technologie - Universités' },
    { nom: 'Athis-Mons', population: '32 000 hab.', specialite: 'Aéronautique - Orly' },
    { nom: 'Viry-Châtillon', population: '31 000 hab.', specialite: 'Résidentiel - Seine' },
    { nom: 'Sainte-Geneviève-des-Bois', population: '35 000 hab.', specialite: 'Résidentiel - Culture' },
    { nom: 'Brétigny-sur-Orge', population: '26 000 hab.', specialite: 'Aviation - Logistique' },
    { nom: 'Yerres', population: '30 000 hab.', specialite: 'Nature - Patrimoine' },
    { nom: 'Montgeron', population: '24 000 hab.', specialite: 'Sport - Nature' },
    { nom: 'Ballainvilliers', population: '4 500 hab.', specialite: 'Résidentiel - Proximité Orly' }
  ]

  // Profil chauffeurs
  const profilChauffeurs = [
    {
      icon: 'fa-id-card',
      title: 'Licence Professionnelle',
      description: 'Tous nos chauffeurs privés Essonne possèdent leur carte VTC et permis transport de personnes.'
    },
    {
      icon: 'fa-map',
      title: 'Expert Local Essonne',
      description: 'Connaissance parfaite du département 91, de ses communes, entreprises et lieux d\'intérêt.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Formation Sécurité',
      description: 'Formation conduite défensive, premiers secours et protocoles de sécurité clients.'
    },
    {
      icon: 'fa-user-tie', 
      title: 'Présentation Impeccable',
      description: 'Tenue professionnelle, courtoisie et discrétion pour représenter votre image.'
    },
    {
      icon: 'fa-language',
      title: 'Multilingue',
      description: 'Chauffeurs parlant français, anglais et autres langues pour clientèle internationale.'
    },
    {
      icon: 'fa-clock',
      title: 'Ponctualité Garantie',
      description: 'Engagement de ponctualité avec suivi GPS et planification optimisée des trajets.'
    }
  ]

  // FAQ Chauffeurs privés Essonne
  const faqChauffeurs = [
    {
      question: 'Comment trouver un chauffeur privé dans l\'Essonne ?',
      answer: 'Trouvez facilement un chauffeur privé dans l\'Essonne en réservant sur notre site, par téléphone au +33 6 43 53 76 53, ou via notre app. Nos chauffeurs interviennent dans toutes les communes du département 91, 24h/24 et 7j/7.'
    },
    {
      question: 'Vos chauffeurs privés connaissent-ils bien l\'Essonne ?',
      answer: 'Nos chauffeurs privés sont des experts du département de l\'Essonne. Ils connaissent parfaitement toutes les communes, du sud (Étampes) au nord (Athis-Mons), en passant par Évry, Corbeil, Massy et Palaiseau. Formation continue sur les nouveaux aménagements du 91.'
    },
    {
      question: 'Quels services proposent vos chauffeurs privés en Essonne ?',
      answer: 'Nos chauffeurs privés Essonne proposent : transferts aéroport CDG/Orly, transport d\'affaires, événements privés, mise à disposition, courses médicales, transport scolaire/universitaire, et déplacements longue distance depuis toutes les villes du 91.'
    },
    {
      question: 'Comment sont sélectionnés vos chauffeurs privés dans l\'Essonne ?',
      answer: 'Nos chauffeurs privés Essonne sont rigoureusement sélectionnés : vérification casier judiciaire, expérience minimum 3 ans, connaissance parfaite du département 91, formation service client, et évaluation continue. Seuls les meilleurs intègrent notre équipe.'
    },
    {
      question: 'Vos chauffeurs privés interviennent-ils dans tout l\'Essonne ?',
      answer: 'Oui, nos chauffeurs privés couvrent l\'intégralité du département de l\'Essonne (91) : de la vallée de Chevreuse à la Beauce, en passant par la vallée de Seine. Intervention dans les 194 communes du département, zones urbaines et rurales.'
    }
  ]

  return (
    <div className="chauffeurs-prive-essonne-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[60vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/essonne-hero.webp)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white">
          <motion.div 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-primary">CHAUFFEURS PRIVÉ ESSONNE</h1>
            
            <p className="font-tertiary text-2xl italic text-primary mb-6">
              Service de chauffeurs privés professionnels dans tout le département de l'Essonne (91)
            </p>
            
            <p className="text-xl mb-10">
              Découvrez notre réseau de chauffeurs privés dans l'Essonne : des professionnels expérimentés 
              qui connaissent parfaitement le département 91, ses communes et ses spécificités. 
              Transport VTC haut de gamme d'Évry à Étampes, de Massy à Corbeil-Essonnes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/#booking" className="btn btn-primary">
                Réserver Chauffeur Essonne
              </Link>
              <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                <i className="fas fa-phone mr-2"></i>
                Contact direct
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
            <h2>CHAUFFEURS PRIVÉ PROFESSIONNELS EN ESSONNE</h2>
            <p className="subtitle">Votre service VTC dans tout le département 91</p>
            
            <p className="text-gray-600 mb-8">
              L'<strong>Essonne (91)</strong> est un département dynamique au sud de la région parisienne, 
              alliant zones urbaines, technopoles et espaces naturels. Nos <strong>chauffeurs privés</strong> 
              connaissent parfaitement ce territoire diversifié, de la préfecture Évry-Courcouronnes 
              aux communes rurales, en passant par les pôles économiques de Massy-Palaiseau.
            </p>
            
            <p className="text-gray-600 mb-8">
              Que vous ayez besoin d'un chauffeur privé pour des déplacements professionnels vers 
              le plateau de Saclay, des transferts aéroport depuis la vallée de l'Orge, ou des services 
              événementiels dans les châteaux de l'Essonne, notre équipe s'adapte à tous vos besoins 
              avec professionalisme et discrétion.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-map"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">194</h3>
                <p className="text-gray-600">Communes desservies</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">25+</h3>
                <p className="text-gray-600">Chauffeurs privés</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">24/7</h3>
                <p className="text-gray-600">Service disponible</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-primary mb-2">
                  <i className="fas fa-star"></i>
                </div>
                <h3 className="text-2xl font-bold mb-1">4.8/5</h3>
                <p className="text-gray-600">Satisfaction Essonne</p>
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
            <h2>CHAUFFEURS PRIVÉ PAR VILLE EN ESSONNE</h2>
            <p className="subtitle">Services spécialisés selon les communes du département 91</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesEssonne.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={servicesControls}
                variants={index % 2 === 0 ? slideInLeftVariant : slideInRightVariant}
                className="bg-white rounded-lg shadow-md p-8"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className={`fas ${service.icon} text-primary text-xl`}></i>
                  </div>
                  <h3 className="text-xl ml-4">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">Zones couvertes :</h4>
                    <ul className="space-y-2">
                      {service.zones.map((zone, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <i className="fas fa-map-marker-alt text-primary mr-2 text-xs"></i>
                          {zone}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">Services proposés :</h4>
                    <ul className="space-y-2">
                      {service.services.map((serv, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <i className="fas fa-check text-primary mr-2 text-xs"></i>
                          {serv}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Villes Essonne Section */}
      <section 
        ref={villesRef}
        className="py-20 bg-white"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>PRINCIPALES VILLES ESSONNE DESSERVIES</h2>
            <p className="subtitle">Nos chauffeurs privés dans les communes majeures du département 91</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={villesControls}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {villesEssonne.map((ville, index) => (
              <motion.div
                key={index}
                variants={fadeInVariant}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <i className="fas fa-city text-primary text-xl mr-3"></i>
                  <h3 className="text-lg font-semibold">{ville.nom}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    <i className="fas fa-users text-primary mr-2"></i>
                    {ville.population}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <i className="fas fa-star text-primary mr-2"></i>
                    {ville.specialite}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Et dans toutes les autres communes de l'Essonne : d'Arpajon à Yerres, 
              de Dourdan à Vigneux-sur-Seine, nos chauffeurs privés interviennent partout dans le 91.
            </p>
            <Link href="/#booking" className="btn btn-primary">
              Trouver un chauffeur dans ma ville
            </Link>
          </div>
        </div>
      </section>
      
      {/* Profil Chauffeurs Section */}
      <section 
        ref={chauffeurRef}
        className="py-20 bg-gray-50"
      >
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              animate={chauffeurControls}
              variants={slideInLeftVariant}
              className="lg:w-1/2"
            >
              <h2 className="text-left after:left-0 after:translate-x-0">PROFIL DE NOS CHAUFFEURS ESSONNE</h2>
              <div className="h-0.5 w-24 bg-primary my-6"></div>
              <p className="text-gray-600 mb-8">
                Nos chauffeurs privés Essonne sont sélectionnés selon des critères stricts de 
                professionnalisme, d'expertise locale et de service client. Chaque chauffeur 
                suit une formation continue pour maintenir le plus haut niveau de qualité.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profilChauffeurs.map((profil, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <i className={`fas ${profil.icon} text-primary text-sm`}></i>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-800 mb-1">{profil.title}</h4>
                      <p className="text-gray-600 text-sm">{profil.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate={chauffeurControls}
              variants={slideInRightVariant}
              className="lg:w-1/2 relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src={chauffeurEssonne}
                  alt="Chauffeur privé professionnel Essonne"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-l-2 border-t-2 border-primary"></div>
              
              <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-bold text-xl mb-3">💼 Recrutement en cours</h4>
                <p className="text-gray-600 mb-4">
                  Vous êtes chauffeur VTC expérimenté et connaissez l'Essonne ? 
                  Rejoignez notre équipe de professionnels !
                </p>
                <Link href="/contact" className="inline-block px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
                  Candidater
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Expertise géographique */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>EXPERTISE GÉOGRAPHIQUE ESSONNE</h2>
            <p className="subtitle">Nos chauffeurs privés maîtrisent parfaitement le territoire du 91</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl text-primary mb-4">🏢</div>
              <h3 className="font-semibold mb-2">Pôles Économiques</h3>
              <p className="text-gray-600 text-sm">Massy-Palaiseau, Évry, Plateau de Saclay, zones d'activités</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl text-primary mb-4">🎓</div>
              <h3 className="font-semibold mb-2">Campus Universitaires</h3>
              <p className="text-gray-600 text-sm">Polytechnique, Université d'Évry, Supélec, ENSTA</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl text-primary mb-4">✈️</div>
              <h3 className="font-semibold mb-2">Proximité Aéroports</h3>
              <p className="text-gray-600 text-sm">Orly (15 min), CDG (45 min), accès privilégiés</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl text-primary mb-4">🌳</div>
              <h3 className="font-semibold mb-2">Espaces Naturels</h3>
              <p className="text-gray-600 text-sm">Forêts, châteaux, vallées, sites touristiques</p>
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
            <h2>FAQ CHAUFFEURS PRIVÉ ESSONNE</h2>
            <p className="subtitle">Questions fréquentes sur nos chauffeurs privés dans le département 91</p>
          </div>
          
          <motion.div
            initial="hidden"
            animate={faqControls}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            {faqChauffeurs.map((faq, index) => (
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
            <h2 className="text-white text-3xl md:text-4xl mb-6 after:bg-primary">
              Votre chauffeur privé dans l'Essonne vous attend
            </h2>
            <p className="text-gray-300 text-lg mb-10">
              Réservez dès maintenant votre chauffeur privé dans l'Essonne. 
              Service professionnel, ponctuel et discret dans tout le département 91. 
              De Évry à Étampes, de Massy à Corbeil-Essonnes.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Link href="/#booking" className="btn btn-primary">
                Réserver Chauffeur Essonne
              </Link>
              <a href="tel:+33643537653" className="btn btn-outline text-white border-white hover:bg-white hover:text-secondary">
                <i className="fas fa-phone mr-2"></i>
                +33 6 43 53 76 53
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-primary text-3xl mb-3">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <h4 className="font-semibold text-lg mb-2">Tout l'Essonne</h4>
                <p className="text-gray-300">194 communes desservies dans le département 91</p>
              </div>
              
              <div>
                <div className="text-primary text-3xl mb-3">
                  <i className="fas fa-user-graduate"></i>
                </div>
                <h4 className="font-semibold text-lg mb-2">Chauffeurs Experts</h4>
                <p className="text-gray-300">Formation continue et connaissance parfaite du territoire</p>
              </div>
              
              <div>
                <div className="text-primary text-3xl mb-3">
                  <i className="fas fa-headset"></i>
                </div>
                <h4 className="font-semibold text-lg mb-2">Support 24/7</h4>
                <p className="text-gray-300">Assistance client et chauffeurs disponibles jour et nuit</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}