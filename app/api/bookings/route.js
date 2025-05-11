import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import nodemailer from 'nodemailer';

// Récupérer toutes les réservations - utilisé par le tableau de bord admin
export async function GET(request) {
  try {
    await dbConnect();
    
    // Vérifiez si l'utilisateur est authentifié (pour l'admin dashboard)
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    // Récupérer les paramètres de requête
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');
    
    // Construire le filtre de recherche
    const query = {};
    
    // Si l'utilisateur est un chauffeur, filtrer par chauffeur assigné
    if (session.user.role === 'driver') {
      query.assignedDriver = session.user.id;
    }
    
    // Filtrer par statut
    if (status) {
      query.status = status;
    }
    
    // Filtrer par date
    if (startDate || endDate) {
      query.pickupDateTime = {};
      
      if (startDate) {
        query.pickupDateTime.$gte = new Date(startDate);
      }
      
      if (endDate) {
        query.pickupDateTime.$lte = new Date(endDate);
      }
    }
    
    // Recherche par texte
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { 'customerInfo.name': searchRegex },
        { 'customerInfo.email': searchRegex },
        { 'customerInfo.phone': searchRegex },
        { pickupAddress: searchRegex },
        { dropoffAddress: searchRegex },
        { bookingId: searchRegex },
        { flightNumber: searchRegex },
        { trainNumber: searchRegex }
      ];
    }
    
    // Récupérer les réservations
    const bookings = await Booking.find(query)
      .sort({ pickupDateTime: 1 })
      .skip(skip)
      .limit(limit);
    
    // Compter le nombre total de réservations correspondant au filtre
    const total = await Booking.countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: bookings,
      meta: {
        total,
        limit,
        skip
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des réservations.' },
      { status: 500 }
    );
  }
}

// Route POST pour créer une nouvelle réservation
export async function POST(request) {
  try {
    // Connecter à la base de données
    await dbConnect();
    
    // Récupérer les données de la requête
    const data = await request.json();
    
    // Extraire les données
    const {
      pickupAddress,
      dropoffAddress,
      pickupDate,
      pickupTime,
      passengers,
      luggage,
      roundTrip,
      returnDate,
      returnTime,
      flightNumber,
      trainNumber,
      specialRequests,
      customerInfo,
      price,
      pickupAddressPlaceId,
      dropoffAddressPlaceId
    } = data;

    // Validation des données
    if (!pickupAddress) {
      return NextResponse.json({ error: 'Adresse de départ manquante' }, { status: 400 });
    }
    
    if (!dropoffAddress) {
      return NextResponse.json({ error: 'Adresse d\'arrivée manquante' }, { status: 400 });
    }
    
    if (!pickupDate || !pickupTime) {
      return NextResponse.json({ error: 'Date ou heure de départ manquante' }, { status: 400 });
    }
    
    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return NextResponse.json({ error: 'Informations client incomplètes' }, { status: 400 });
    }

    // Générer un ID de réservation
    const bookingId = 'ELC' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
    let returnDateTime = null;
    
    if (roundTrip && returnDate && returnTime) {
      returnDateTime = new Date(`${returnDate}T${returnTime}`);
    }

    // Créer un nouvel objet de réservation pour MongoDB
    const newBooking = new Booking({
      bookingId,
      status: 'pending',
      pickupAddress,
      dropoffAddress,
      pickupDateTime,
      passengers,
      luggage,
      roundTrip,
      returnDateTime,
      flightNumber,
      trainNumber,
      specialRequests,
      price,
      customerInfo,
      pickupAddressPlaceId,
      dropoffAddressPlaceId
    });

    // Sauvegarder dans la base de données
    await newBooking.save();

    // Configuration de Nodemailer et envoi des emails
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: process.env.EMAIL_SECURE === 'true',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        
        // Email au client
        await transporter.sendMail({
            from: `"Elysian Luxury Chauffeurs" <${process.env.EMAIL_USER}>`,
          to: customerInfo.email,
          subject: `Confirmation de réservation #${bookingId} - Elysian Luxury Chauffeurs`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #1c2938; padding: 20px; text-align: center; color: white;">
                <h1 style="margin: 0; color: #d4af37;">Elysian Luxury Chauffeurs</h1>
                <p style="margin-top: 10px;">Confirmation de votre réservation</p>
              </div>
              
              <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
                <p>Bonjour <strong>${customerInfo.name}</strong>,</p>
                
                <p>Nous avons le plaisir de vous informer que votre demande de réservation a été enregistrée. Voici les détails :</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #d4af37;">
                  <p style="margin: 5px 0;"><strong>Numéro de réservation :</strong> ${bookingId}</p>
                  <p style="margin: 5px 0;"><strong>Statut :</strong> En attente de confirmation</p>
                  <p style="margin: 5px 0;"><strong>Date et heure :</strong> ${pickupDateTime.toLocaleString('fr-FR')}</p>
                  <p style="margin: 5px 0;"><strong>Adresse de départ :</strong> ${pickupAddress}</p>
                  <p style="margin: 5px 0;"><strong>Adresse d'arrivée :</strong> ${dropoffAddress}</p>
                  <p style="margin: 5px 0;"><strong>Nombre de passagers :</strong> ${passengers}</p>
                  <p style="margin: 5px 0;"><strong>Nombre de bagages :</strong> ${luggage}</p>
                  ${flightNumber ? `<p style="margin: 5px 0;"><strong>Numéro de vol :</strong> ${flightNumber}</p>` : ''}
                  ${trainNumber ? `<p style="margin: 5px 0;"><strong>Numéro de train :</strong> ${trainNumber}</p>` : ''}
                  ${roundTrip ? `<p style="margin: 5px 0;"><strong>Retour prévu le :</strong> ${returnDateTime.toLocaleString('fr-FR')}</p>` : ''}
                </div>
                
                <p>Votre réservation est actuellement en attente de confirmation. Un de nos conseillers la vérifiera dans les plus brefs délais et vous contactera pour la confirmer.</p>
                
                <p>Pour toute question ou modification concernant votre réservation, n'hésitez pas à nous contacter par email ou par téléphone.</p>
                
                <p>Cordialement,<br>L'équipe Elysian Luxury Chauffeurs</p>
              </div>
              
              <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                <p>Elysian Luxury Chauffeurs<br>123 Avenue des Champs, 91000 Évry-Courcouronnes<br>Tel: +33 6 00 00 00 00</p>
                <p>© ${new Date().getFullYear()} Elysian Luxury Chauffeurs - Tous droits réservés</p>
              </div>
            </div>
          `,
        });
        
        // Email à l'administrateur
        await transporter.sendMail({
          from: `"Système de réservation" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `Nouvelle réservation #${bookingId} - Elysian Luxury Chauffeurs`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #1c2938; padding: 15px; text-align: center; color: white;">
                <h1 style="margin: 0; color: #d4af37; font-size: 20px;">Nouvelle Réservation</h1>
              </div>
              
              <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
                <p>Une nouvelle réservation a été effectuée :</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0;">
                  <p style="margin: 3px 0;"><strong>Référence :</strong> ${bookingId}</p>
                  <p style="margin: 3px 0;"><strong>Client :</strong> ${customerInfo.name}</p>
                  <p style="margin: 3px 0;"><strong>Tél :</strong> ${customerInfo.phone}</p>
                  <p style="margin: 3px 0;"><strong>Email :</strong> ${customerInfo.email}</p>
                  <p style="margin: 3px 0;"><strong>Date :</strong> ${pickupDateTime.toLocaleString('fr-FR')}</p>
                  <p style="margin: 3px 0;"><strong>Départ :</strong> ${pickupAddress}</p>
                  <p style="margin: 3px 0;"><strong>Arrivée :</strong> ${dropoffAddress}</p>
                  <p style="margin: 3px 0;"><strong>Véhicule :</strong> ${data.vehicleType || 'Non spécifié'}</p>
                  <p style="margin: 3px 0;"><strong>Passagers :</strong> ${passengers}</p>
                  <p style="margin: 3px 0;"><strong>Bagages :</strong> ${luggage}</p>
                  ${flightNumber ? `<p style="margin: 3px 0;"><strong>Vol :</strong> ${flightNumber}</p>` : ''}
                  ${trainNumber ? `<p style="margin: 3px 0;"><strong>Train :</strong> ${trainNumber}</p>` : ''}
                  ${roundTrip ? `<p style="margin: 3px 0;"><strong>Retour :</strong> ${returnDateTime.toLocaleString('fr-FR')}</p>` : ''}
                </div>
                
                <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://elysian-luxury-chauffeurs.com'}/admin/bookings/${bookingId}" style="background-color: #d4af37; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block;">Accéder au tableau de bord</a></p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi des emails:', emailError);
        // Continuer malgré l'erreur d'email
      }
    }

    // Données de réservation à retourner au client
    const bookingResult = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: 'pending',
      pickupAddress,
      dropoffAddress,
      pickupDateTime: pickupDateTime.toISOString(),
      passengers,
      luggage,
      roundTrip,
      returnDateTime: returnDateTime ? returnDateTime.toISOString() : null,
      flightNumber,
      trainNumber,
      specialRequests,
      price,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone
      }
    };

    return NextResponse.json({
      success: true,
      booking: bookingResult,
      message: 'Votre demande de réservation a été enregistrée. Vous recevrez un email de confirmation une fois validée.'
    });

  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la création de la réservation.' },
      { status: 500 }
    );
  }
}