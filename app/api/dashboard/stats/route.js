// app/api/dashboard/stats/route.js
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
    
    // Vérifier que les collections existent
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    console.log('Collections disponibles:', collectionNames);
    
    // Initialiser les statistiques
    let stats = {
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      inProgressBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      todayBookings: 0,
      totalUsers: 0,
      totalDrivers: 0,
      totalRevenue: 0
    };
    
    // Statistiques des réservations si la collection existe
    if (collectionNames.includes('bookings')) {
      console.log('Récupération des stats de réservations...');
      
      // Statistiques générales
      stats.totalBookings = await db.collection('bookings').countDocuments();
      stats.pendingBookings = await db.collection('bookings').countDocuments({ status: 'pending' });
      stats.confirmedBookings = await db.collection('bookings').countDocuments({ status: 'confirmed' });
      stats.inProgressBookings = await db.collection('bookings').countDocuments({ status: 'in_progress' });
      stats.completedBookings = await db.collection('bookings').countDocuments({ status: 'completed' });
      stats.cancelledBookings = await db.collection('bookings').countDocuments({ status: 'cancelled' });
      
      // Réservations du jour
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      stats.todayBookings = await db.collection('bookings').countDocuments({
        pickupDateTime: { $gte: startOfDay, $lte: endOfDay }
      });
      
      console.log('Stats de réservations récupérées:', {
        total: stats.totalBookings,
        pending: stats.pendingBookings,
        today: stats.todayBookings
      });
    }
    
    // Statistiques supplémentaires pour les administrateurs
    if (session.user.role === 'admin') {
      // Statistiques des utilisateurs si la collection existe
      if (collectionNames.includes('users')) {
        console.log('Récupération des stats utilisateurs...');
        stats.totalUsers = await db.collection('users').countDocuments();
        stats.totalDrivers = await db.collection('users').countDocuments({ role: 'driver' });
        
        console.log('Stats utilisateurs récupérées:', {
          total: stats.totalUsers,
          drivers: stats.totalDrivers
        });
      }
      
      // Calculer le revenu total si la collection bookings existe
      if (collectionNames.includes('bookings')) {
        console.log('Calcul du revenu total...');
        try {
          const revenueAggregation = await db.collection('bookings').aggregate([
            { 
              $match: { 
                status: { $in: ['confirmed', 'in_progress', 'completed'] } 
              } 
            },
            { 
              $group: { 
                _id: null, 
                total: { 
                  $sum: { 
                    $cond: {
                      if: { $isNumber: "$price.amount" },
                      then: "$price.amount",
                      else: { $toDouble: "$price.amount" }
                    }
                  }
                } 
              } 
            }
          ]).toArray();
          
          stats.totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;
          console.log('Revenu total calculé:', stats.totalRevenue);
        } catch (revenueError) {
          console.error('Erreur lors du calcul du revenu:', revenueError);
          stats.totalRevenue = 0;
        }
      }
    }
    
    console.log('Stats finales:', stats);
    
    return NextResponse.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de la récupération des statistiques.', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}