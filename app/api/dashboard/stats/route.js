import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb-client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

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
    
    // Récupérer les statistiques des réservations depuis la collection 'bookings'
    const totalBookings = await db.collection('bookings').countDocuments();
    const pendingBookings = await db.collection('bookings').countDocuments({ status: 'pending' });
    const confirmedBookings = await db.collection('bookings').countDocuments({ status: 'confirmed' });
    const inProgressBookings = await db.collection('bookings').countDocuments({ status: 'in_progress' });
    const completedBookings = await db.collection('bookings').countDocuments({ status: 'completed' });
    const cancelledBookings = await db.collection('bookings').countDocuments({ status: 'cancelled' });
    
    // Réservations du jour
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const todayBookings = await db.collection('bookings').countDocuments({
      pickupDateTime: { $gte: startOfDay, $lte: endOfDay }
    });
    
    let totalUsers = 0;
    let totalDrivers = 0;
    let totalRevenue = 0;
    
    // Statistiques supplémentaires pour les administrateurs
    if (session.user.role === 'admin') {
      // Compter le nombre d'utilisateurs
      totalUsers = await db.collection('users').countDocuments();
      totalDrivers = await db.collection('users').countDocuments({ role: 'driver' });
      
      // Calculer le revenu total (somme des prix de toutes les réservations confirmées, en cours et terminées)
      const revenueAggregation = await db.collection('bookings').aggregate([
        { 
          $match: { 
            status: { $in: ['confirmed', 'in_progress', 'completed'] } 
          } 
        },
        { 
          $group: { 
            _id: null, 
            total: { $sum: { $toDouble: "$price.amount" } } 
          } 
        }
      ]).toArray();
      
      totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;
    }
    
    return NextResponse.json({
      success: true,
      data: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        inProgressBookings,
        completedBookings,
        cancelledBookings,
        todayBookings,
        totalUsers,
        totalDrivers,
        totalRevenue
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la récupération des statistiques.', details: error.message },
      { status: 500 }
    );
  }
}