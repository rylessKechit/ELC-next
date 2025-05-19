// app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Récupération des données du formulaire
    const data = await request.json();
    const { name, email, phone, subject, message } = data;
    
    // Validation des champs obligatoires
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }
    
    // Pour le mode développement, simuler un succès si les variables d'env sont absentes
    if (process.env.NODE_ENV === 'development' && 
        (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD)) {
      
      return NextResponse.json({
        success: true,
        message: 'Message simulé avec succès (mode développement)'
      });
    }
    
    // Configuration du transporteur d'email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Récupérer un sujet lisible
    const subjectMap = {
      'reservation': 'Demande de réservation',
      'information': 'Demande d\'information',
      'modification': 'Modification de réservation',
      'annulation': 'Annulation de réservation',
      'reclamation': 'Réclamation',
      'autre': 'Autre demande'
    };
    
    const readableSubject = subjectMap[subject] || subject;
    
    // Options d'email pour l'administrateur
    const adminMailOptions = {
      from: `"Formulaire de contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Nouveau message de contact - ${readableSubject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
          <p><strong>Sujet:</strong> ${readableSubject}</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #d4af37;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="font-size: 12px; color: #666;">
            Ce message a été envoyé depuis le formulaire de contact de Elysian Luxury Chauffeurs.
          </p>
        </div>
      `,
      text: `
Nouveau message de contact

Nom: ${name}
Email: ${email}
${phone ? `Téléphone: ${phone}\n` : ''}
Sujet: ${readableSubject}

Message:
${message}

Ce message a été envoyé depuis le formulaire de contact de Elysian Luxury Chauffeurs.
      `
    };
    
    // Options d'email pour le client (confirmation)
    const clientMailOptions = {
      from: `"Elysian Luxury Chauffeurs" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmation de votre message - Elysian Luxury Chauffeurs`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1c2938; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; color: #d4af37; font-size: 24px;">Elysian Luxury Chauffeurs</h1>
            <p style="margin-top: 10px;">Confirmation de réception</p>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
            <p>Bonjour <strong>${name}</strong>,</p>
            
            <p>Nous vous confirmons la bonne réception de votre message concernant "<strong>${readableSubject}</strong>".</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #d4af37;">
              <p style="font-style: italic; color: #555;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p>Notre équipe va traiter votre demande dans les meilleurs délais. Nous nous efforçons de répondre à toutes les demandes sous 24 heures ouvrées.</p>
            
            <p>Si votre demande nécessite une intervention urgente, n'hésitez pas à nous contacter directement par téléphone au <a href="tel:+33643537653" style="color: #d4af37; text-decoration: none; font-weight: bold;">+33 6 43 53 76 53</a>.</p>
            
            <p>Cordialement,<br>L'équipe Elysian Luxury Chauffeurs</p>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
            <p>Elysian Luxury Chauffeurs<br>123 Avenue des Champs, 91000 Évry-Courcouronnes<br>Tel: +33 6 43 53 76 53</p>
            <p>© ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés</p>
          </div>
        </div>
      `,
      text: `
Bonjour ${name},

Nous vous confirmons la bonne réception de votre message concernant "${readableSubject}".

Votre message :
${message}

Notre équipe va traiter votre demande dans les meilleurs délais. Nous nous efforçons de répondre à toutes les demandes sous 24 heures ouvrées.

Si votre demande nécessite une intervention urgente, n'hésitez pas à nous contacter directement par téléphone au +33 6 43 53 76 53.

Cordialement,
L'équipe Elysian Luxury Chauffeurs

© ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés
      `
    };
    
    // Envoyer les emails
    try {
      // Envoi à l'administrateur
      await transporter.sendMail(adminMailOptions);
      
      // Envoi de confirmation au client
      await transporter.sendMail(clientMailOptions);
      
      return NextResponse.json({
        success: true,
        message: 'Votre message a bien été envoyé. Un email de confirmation vous a été envoyé.'
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi des emails:', emailError);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer ultérieurement.' 
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Une erreur est survenue lors du traitement de votre demande.' 
      },
      { status: 500 }
    );
  }
}