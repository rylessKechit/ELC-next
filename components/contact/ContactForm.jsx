// components/ContactForm.jsx - Version corrigée
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await api.post('/contact', data);
      
      if (response.data && response.data.success) {
        setSubmitStatus({ type: 'success', message: 'Message envoyé avec succès !' });
        reset();
      } else {
        setSubmitStatus({ type: 'error', message: 'Erreur lors de l\'envoi du message.' });
      }
    } catch (error) {
      console.error('Erreur:', error);
      setSubmitStatus({ type: 'error', message: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl"> {/* Conteneur avec largeur définie */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nom et Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Ce champ est requis' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Votre nom complet"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email invalide'
                }
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Votre email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
        </div>
        
        {/* Téléphone et Sujet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Votre numéro de téléphone"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Sujet <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              {...register('subject', { required: 'Ce champ est requis' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="reservation">Demande de réservation</option>
              <option value="information">Demande d'information</option>
              <option value="modification">Modification de réservation</option>
              <option value="annulation">Annulation de réservation</option>
              <option value="reclamation">Réclamation</option>
              <option value="autre">Autre</option>
            </select>
            {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
          </div>
        </div>
        
        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message', { 
              required: 'Ce champ est requis',
              minLength: {
                value: 10,
                message: 'Le message doit contenir au moins 10 caractères'
              }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
            placeholder="Votre message"
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>
        
        {/* Message de statut */}
        {submitStatus && (
          <div className={`p-4 rounded-md ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        {/* Bouton d'envoi */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              'Envoyer le message'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;