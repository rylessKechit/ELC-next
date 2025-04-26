// app/api/contact/route.js
import { NextResponse } from 'next/server'
import { validateContactRequest } from '@/lib/validator'
import { emailService } from '@/services/emailService'

/**
 * Route API pour traiter les messages du formulaire de contact
 * @param {Object} request - Requête HTTP
 * @returns {Promise<Object>} - Réponse HTTP
 */
export async function POST(request) {
  try {
    // Extraire les données de la requête
    const requestData = await request.json()
    
    // Valider les données entrantes
    const { valid, errors } = validateContactRequest(requestData)
    
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Données invalides', details: errors },
        { status: 400 }
      )
    }
    
    // Extraire les informations du contact
    const { name, email, phone, subject, message } = requestData
    
    // Préparer le message à envoyer
    const contactMessage = {
      name,
      email,
      phone: phone || 'Non fourni',
      subject,
      message,
      submittedAt: new Date().toISOString()
    }
    
    // Envoyer un email à l'administrateur
    await emailService.sendContactNotification(contactMessage)
    
    // Envoyer un email de confirmation à l'utilisateur
    await emailService.sendContactConfirmation(contactMessage)
    
    // Répondre avec succès
    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès'
    })
  } catch (error) {
    console.error('Erreur lors du traitement du formulaire de contact:', error)
    
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'envoi du message', message: error.message },
      { status: 500 }
    )
  }
}

/**
 * Gestionnaire pour les requêtes OPTIONS (CORS)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}