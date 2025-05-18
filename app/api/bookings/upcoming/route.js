// app/api/bookings/upcoming/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb-client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// API pour récupérer les prochaines réservations
export async function GET(request) {
  try {
    // Vérifier si l'utilisateur est authentifié
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }
    
    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Vérifier que la collection bookings existe
    const collections = await db.listCollections({ name: 'bookings' }).toArray();
    if (collections.length === 0) {
      return NextResponse.json({
        success: true,
        data: []
      });
    }
    
    // Récupérer les paramètres de requête
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    
    // Calculer la date actuelle
    const now = new Date();
    
    // Construire la query de base
    let baseQuery = {
      pickupDateTime: { $gte: now },
      status: { $in: ['pending', 'confirmed', 'in_progress'] }
    };
    
    // Filtrer par chauffeur si l'utilisateur est un chauffeur
    if (session.user.role === 'driver') {
      // Convertir l'ID utilisateur en ObjectId si nécessaire
      try {
        const { ObjectId } = await import('mongodb');
        baseQuery.assignedDriver = new ObjectId(session.user.id);
      } catch (error) {
        console.error('Erreur conversion ObjectId:', error);
        // Si la conversion échoue, utiliser l'ID tel quel
        baseQuery.assignedDriver = session.user.id;
      }
    }
    
    // Récupérer les prochaines réservations, triées par date de pickup
    const upcomingBookings = await db.collection('bookings')
      .find(baseQuery)
      .sort({ pickupDateTime: 1 })
      .limit(limit)
      .toArray();
    
    return NextResponse.json({
      success: true,
      data: upcomingBookings || []
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des prochaines réservations:', error);
    
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de la récupération des prochaines réservations.',
        details: error.message
      },
      { status: 500 }
    );
  }
}