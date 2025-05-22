import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import nodemailer from 'nodemailer';

// Route POST pour créer une nouvelle réservation
export async function POST(request) {
  try {
    // Connecter à la base de données
    await dbConnect();
    
    // Récupérer les données de la requête
    const data = await request.json();
    
    // Extraire les données avec validation
    const {
      pickupAddress,
      dropoffAddress,
      pickupDate,
      pickupTime,
      passengers,
      luggage,
      vehicleType,
      roundTrip,
      returnDate,
      returnTime,
      flightNumber,
      trainNumber,
      specialRequests,
      customerInfo,
      priceEstimate
    } = data;

    // Validation des données critiques
    if (!pickupAddress || !dropoffAddress || !pickupDate || !pickupTime) {
      return NextResponse.json({ 
        success: false, 
        error: 'Données manquantes: adresses et date/heure requis' 
      }, { status: 400 });
    }
    
    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return NextResponse.json({ 
        success: false, 
        error: 'Informations client incomplètes' 
      }, { status: 400 });
    }

    if (!vehicleType) {
      return NextResponse.json({ 
        success: false, 
        error: 'Type de véhicule requis' 
      }, { status: 400 });
    }

    // Générer un ID de réservation
    const bookingId = 'ELC' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
    let returnDateTime = null;
    
    if (roundTrip && returnDate && returnTime) {
      returnDateTime = new Date(`${returnDate}T${returnTime}`);
    }

    // Préparer les données pour MongoDB avec la structure correcte
    const bookingData = {
      bookingId,
      status: 'confirmed', // Directement confirmé
      pickupAddress,
      dropoffAddress,
      pickupDateTime,
      passengers: parseInt(passengers),
      luggage: parseInt(luggage),
      vehicleType, // Doit être l'un de: 'green', 'premium', 'sedan', 'van'
      roundTrip: Boolean(roundTrip),
      returnDateTime,
      flightNumber: flightNumber || undefined,
      trainNumber: trainNumber || undefined,
      specialRequests: specialRequests || undefined,
      price: {
        amount: priceEstimate?.exactPrice || 0, // Structure correcte pour le prix
        currency: 'EUR'
      },
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone
      }
    };

    // Créer et sauvegarder la réservation
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();

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
          subject: `Réservation confirmée #${bookingId} - Elysian Luxury Chauffeurs`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background-color: #1c2938; padding: 20px; text-align: center; color: white;">
                <h1 style="margin: 0; color: #d4af37;">Elysian Luxury Chauffeurs</h1>
                <p style="margin-top: 10px;">Réservation confirmée</p>
              </div>
              
              <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
                <p>Bonjour <strong>${customerInfo.name}</strong>,</p>
                
                <p>Votre réservation a été confirmée avec succès !</p>
                
                <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #d4af37;">
                  <p style="margin: 5px 0;"><strong>Numéro de réservation :</strong> ${bookingId}</p>
                  <p style="margin: 5px 0;"><strong>Statut :</strong> Confirmée</p>
                  <p style="margin: 5px 0;"><strong>Date et heure :</strong> ${pickupDateTime.toLocaleString('fr-FR')}</p>
                  <p style="margin: 5px 0;"><strong>Départ :</strong> ${pickupAddress}</p>
                  <p style="margin: 5px 0;"><strong>Arrivée :</strong> ${dropoffAddress}</p>
                  <p style="margin: 5px 0;"><strong>Véhicule :</strong> ${vehicleType}</p>
                  <p style="margin: 5px 0;"><strong>Passagers :</strong> ${passengers}</p>
                  <p style="margin: 5px 0;"><strong>Bagages :</strong> ${luggage}</p>
                  ${flightNumber ? `<p style="margin: 5px 0;"><strong>Vol :</strong> ${flightNumber}</p>` : ''}
                  ${trainNumber ? `<p style="margin: 5px 0;"><strong>Train :</strong> ${trainNumber}</p>` : ''}
                  ${roundTrip && returnDateTime ? `<p style="margin: 5px 0;"><strong>Retour :</strong> ${returnDateTime.toLocaleString('fr-FR')}</p>` : ''}
                  <p style="margin: 5px 0;"><strong>Prix :</strong> ${priceEstimate?.exactPrice || 0}€</p>
                </div>
                
                <p>Notre chauffeur vous contactera avant votre prise en charge.</p>
                
                <p>Cordialement,<br>L'équipe Elysian Luxury Chauffeurs</p>
              </div>
            </div>
          `,
        });
        
        // Email à l'administrateur
        await transporter.sendMail({
          from: `"Système de réservation" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `Nouvelle réservation confirmée #${bookingId}`,
          html: `
            <h2>Nouvelle réservation confirmée</h2>
            <p><strong>Référence :</strong> ${bookingId}</p>
            <p><strong>Client :</strong> ${customerInfo.name}</p>
            <p><strong>Email :</strong> ${customerInfo.email}</p>
            <p><strong>Téléphone :</strong> ${customerInfo.phone}</p>
            <p><strong>Date :</strong> ${pickupDateTime.toLocaleString('fr-FR')}</p>
            <p><strong>Départ :</strong> ${pickupAddress}</p>
            <p><strong>Arrivée :</strong> ${dropoffAddress}</p>
            <p><strong>Véhicule :</strong> ${vehicleType}</p>
            <p><strong>Prix :</strong> ${priceEstimate?.exactPrice || 0}€</p>
          `,
        });
      } catch (emailError) {
        console.error('Erreur lors de l\'envoi des emails:', emailError);
        // Continuer malgré l'erreur d'email
      }
    }

    // Préparer la réponse pour le frontend
    const bookingResult = {
      id: savedBooking.bookingId,
      _id: savedBooking._id,
      status: savedBooking.status,
      createdAt: savedBooking.createdAt,
      pickupAddress: savedBooking.pickupAddress,
      dropoffAddress: savedBooking.dropoffAddress,
      pickupDateTime: savedBooking.pickupDateTime,
      returnDateTime: savedBooking.returnDateTime,
      passengers: savedBooking.passengers,
      luggage: savedBooking.luggage,
      vehicleType: savedBooking.vehicleType,
      roundTrip: savedBooking.roundTrip,
      flightNumber: savedBooking.flightNumber,
      trainNumber: savedBooking.trainNumber,
      specialRequests: savedBooking.specialRequests,
      price: savedBooking.price,
      customerInfo: savedBooking.customerInfo
    };

    return NextResponse.json({
      success: true,
      booking: bookingResult,
      message: 'Réservation confirmée avec succès !'
    });

  } catch (error) {
    console.error('❌ Erreur lors de la création de la réservation:', error);
    
    // Gestion spécifique des erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { 
          success: false,
          error: 'Erreur de validation', 
          details: validationErrors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la création de la réservation', 
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Récupérer toutes les réservations (pour l'admin)
export async function GET(request) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');
    
    const query = {};
    
    if (session.user.role === 'driver') {
      query.assignedDriver = session.user.id;
    }
    
    if (status) {
      query.status = status;
    }
    
    if (startDate || endDate) {
      query.pickupDateTime = {};
      
      if (startDate) {
        query.pickupDateTime.$gte = new Date(startDate);
      }
      
      if (endDate) {
        query.pickupDateTime.$lte = new Date(endDate);
      }
    }
    
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
    
    const bookings = await Booking.find(query)
      .sort({ pickupDateTime: 1 })
      .skip(skip)
      .limit(limit);
    
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