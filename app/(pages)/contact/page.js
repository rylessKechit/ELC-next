// app/(pages)/contact/page.js
"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { api } from '@/lib/api'

export default function ContactPage() {
  // Animation controls
  const headerControls = useAnimation()
  const formControls = useAnimation()
  const infoControls = useAnimation()

  // Intersection observers
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [infoRef, infoInView] = useInView({ threshold: 0.1, triggerOnce: true })

  // Form status
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Hook form
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  })

  // Animate sections when in view
  useEffect(() => {
    if (headerInView) headerControls.start('visible')
    if (formInView) formControls.start('visible')
    if (infoInView) infoControls.start('visible')
  }, [
    headerInView, formInView, infoInView,
    headerControls, formControls, infoControls
  ])

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

  // Form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const response = await api.post('/api/contact', data)
      
      if (response.data && response.data.success) {
        setSubmitSuccess(true)
        reset()
      } else {
        setSubmitError(response.data?.error || "Une erreur s'est produite. Veuillez réessayer.")
      }
    } catch (err) {
      console.error('Erreur lors de l\'envoi du formulaire:', err)
      
      if (err.response) {
        setSubmitError(`Erreur ${err.response.status}: ${err.response.data.error || 'Erreur serveur'}`)
      } else if (err.request) {
        setSubmitError('Pas de réponse du serveur. Veuillez réessayer plus tard.')
      } else {
        setSubmitError(`Erreur: ${err.message}`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section 
        ref={headerRef} 
        className="relative min-h-[40vh] flex items-center overflow-hidden bg-cover bg-center pt-32 pb-16"
        style={{ backgroundImage: 'url(/assets/images/contact-hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        
        <div className="container-custom relative z-20 text-white text-center">
          <motion.h1 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="mb-6"
          >
            CONTACTEZ <span className="text-primary">ELYSIAN</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate={headerControls}
            variants={fadeInVariant}
            className="font-tertiary text-2xl italic text-primary mb-6 max-w-3xl mx-auto"
          >
            À votre écoute pour toute demande d'information ou réservation
          </motion.p>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formControls}
              variants={slideInLeftVariant}
              className="bg-white rounded-lg shadow-xl p-8 md:p-10"
            >
              <div className="mb-8">
                <h2 className="text-left after:left-0 after:translate-x-0">NOUS CONTACTER</h2>
                <p className="text-gray-600 mt-4">
                  Vous avez des questions ou souhaitez réserver un service ? Remplissez le formulaire ci-dessous 
                  et notre équipe vous répondra dans les meilleurs délais.
                </p>
              </div>
              
              {submitSuccess ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <i className="fas fa-check-circle text-green-500 text-2xl"></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-green-800">Message envoyé avec succès !</h4>
                      <p className="text-green-700 mt-1">
                        Merci pour votre message. Notre équipe vous contactera très rapidement.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <i className="fas fa-exclamation-triangle text-red-500"></i>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{submitError}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="Votre nom"
                        {...register('name', { required: 'Ce champ est requis' })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="Votre email"
                        {...register('email', { 
                          required: 'Ce champ est requis',
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Adresse email invalide'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="Votre numéro de téléphone"
                        {...register('phone')}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Sujet <span className="text-primary">*</span>
                      </label>
                      <select
                        id="subject"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        {...register('subject', { required: 'Ce champ est requis' })}
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="Réservation">Réservation</option>
                        <option value="Information">Demande d'information</option>
                        <option value="Devis">Demande de devis</option>
                        <option value="Partenariat">Partenariat</option>
                        <option value="Autre">Autre</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      rows="5"
                      placeholder="Votre message"
                      {...register('message', { required: 'Ce champ est requis' })}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-3 px-6 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors duration-300 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </>
                    ) : 'Envoyer le message'}
                  </button>
                </form>
              )}
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              ref={infoRef}
              initial="hidden"
              animate={infoControls}
              variants={slideInRightVariant}
              className="space-y-10"
            >
              <div>
                <h2 className="text-left after:left-0 after:translate-x-0">INFORMATIONS DE CONTACT</h2>
                <p className="text-gray-600 mt-4">
                  N'hésitez pas à nous contacter directement par téléphone ou email,
                  ou rendez-nous visite à notre siège social dans l'Essonne.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-map-marker-alt text-primary text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium mb-1">Adresse</h3>
                    <p className="text-gray-600">123 Avenue des Champs, 91000 Évry-Courcouronnes</p>
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-primary inline-flex items-center mt-2 hover:text-primary-dark">
                      <span>Voir sur la carte</span>
                      <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-phone-alt text-primary text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium mb-1">Téléphone</h3>
                    <p className="text-gray-600">+33 (0)1 23 45 67 89</p>
                    <p className="text-gray-500 text-sm">Disponible 7j/7, de 7h à 22h</p>
                    <a href="tel:+33123456789" className="text-primary inline-flex items-center mt-2 hover:text-primary-dark">
                      <span>Appeler maintenant</span>
                      <i className="fas fa-phone ml-2 text-xs"></i>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-envelope text-primary text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium mb-1">Email</h3>
                    <p className="text-gray-600">contact@elysian-chauffeurs.fr</p>
                    <p className="text-gray-500 text-sm">Réponse sous 24h</p>
                    <a href="mailto:contact@elysian-chauffeurs.fr" className="text-primary inline-flex items-center mt-2 hover:text-primary-dark">
                      <span>Envoyer un email</span>
                      <i className="fas fa-envelope ml-2 text-xs"></i>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <i className="fab fa-whatsapp text-primary text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium mb-1">WhatsApp</h3>
                    <p className="text-gray-600">+33 6 12 34 56 78</p>
                    <p className="text-gray-500 text-sm">Pour des réponses rapides et des réservations urgentes</p>
                    <a href="https://wa.me/33612345678" target="_blank" rel="noopener noreferrer" className="text-primary inline-flex items-center mt-2 hover:text-primary-dark">
                      <span>Nous contacter sur WhatsApp</span>
                      <i className="fab fa-whatsapp ml-2"></i>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h3 className="text-xl font-medium mb-4">Horaires d'ouverture</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium">7h - 22h</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Samedi</span>
                    <span className="font-medium">8h - 22h</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-medium">9h - 20h</span>
                  </li>
                </ul>
                <p className="text-gray-500 mt-4 text-sm italic">
                  Service de réservation disponible 24h/24 via notre site web.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-10">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-[400px] w-full relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42027.68350488147!2d2.403505!3d48.63010955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5de32a310ea2d%3A0x40b82c3688b3c20!2s91000%20%C3%89vry-Courcouronnes!5e0!3m2!1sfr!2sfr!4v1619429460595!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                aria-hidden="false"
                tabIndex="0"
                title="Notre emplacement"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2>QUESTIONS FRÉQUENTES</h2>
            <p className="subtitle">Réponses aux interrogations les plus courantes</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-medium mb-2">Comment puis-je réserver un chauffeur ?</h3>
                <p className="text-gray-600">
                  Vous pouvez réserver un chauffeur directement sur notre site web en utilisant notre formulaire de réservation, 
                  par téléphone au +33 (0)1 23 45 67 89, ou en nous envoyant un email à contact@elysian-chauffeurs.fr.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-medium mb-2">Quelle est votre zone de service ?</h3>
                <p className="text-gray-600">
                  Nous intervenons principalement dans tout le département de l'Essonne (91), mais nous proposons également 
                  des services pour Paris et sa région, ainsi que des trajets longue distance partout en France.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-medium mb-2">Comment s'effectue le paiement ?</h3>
                <p className="text-gray-600">
                  Nous acceptons les paiements par carte bancaire, virement, espèces ou via notre application. Pour les entreprises, 
                  nous proposons également des facturations mensuelles après établissement d'un contrat.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-medium mb-2">Puis-je annuler ma réservation ?</h3>
                <p className="text-gray-600">
                  Oui, vous pouvez annuler votre réservation jusqu'à 24 heures avant l'heure prévue sans frais. 
                  Pour les annulations plus tardives, des frais peuvent s'appliquer selon nos conditions générales.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-medium mb-2">Proposez-vous des services pour les entreprises ?</h3>
                <p className="text-gray-600">
                  Absolument, nous offrons des services dédiés aux entreprises avec des tarifs spéciaux pour les contrats réguliers. 
                  Contactez-nous pour discuter de vos besoins spécifiques et obtenir un devis personnalisé.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
              <a href="#contact-form" className="btn btn-primary">
                Posez-nous votre question
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}