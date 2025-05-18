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
    
    // Récupérer le paramètre timeFilter de la requête
    const { searchParams } = new URL(request.url);
    const timeFilter = searchParams.get('timeFilter') || 'all';
    
    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Vérifier que les collections existent
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
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
      totalRevenue: 0,
      completedRevenue: 0,
      timeFilter: timeFilter // Ajouter le filtre de temps à la réponse
    };
    
    // Statistiques des réservations si la collection existe
    if (collectionNames.includes('bookings')) {
      
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
    }
    
    // Statistiques supplémentaires pour les administrateurs
    if (session.user.role === 'admin') {
      // Statistiques des utilisateurs si la collection existe
      if (collectionNames.includes('users')) {
        stats.totalUsers = await db.collection('users').countDocuments();
        stats.totalDrivers = await db.collection('users').countDocuments({ role: 'driver' });
      }
      
      // Calculer le revenu total et des courses terminées si la collection bookings existe
      if (collectionNames.includes('bookings')) {
        try {
          // Définir les dates de filtre en fonction du timeFilter
          let dateFilter = {};
          const now = new Date();
          
          switch (timeFilter) {
            case 'today':
              // Aujourd'hui
              const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
              dateFilter = { 
                completedAt: { 
                  $gte: startOfToday, 
                  $lte: endOfToday 
                } 
              };
              break;
              
            case 'week':
              // Cette semaine (lundi au dimanche)
              const dayOfWeek = now.getDay(); // 0 (dimanche) à 6 (samedi)
              const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Calcul pour avoir lundi comme début de semaine
              const startOfWeek = new Date(now);
              startOfWeek.setDate(now.getDate() - daysFromMonday);
              startOfWeek.setHours(0, 0, 0, 0);
              
              const endOfWeek = new Date(startOfWeek);
              endOfWeek.setDate(startOfWeek.getDate() + 6);
              endOfWeek.setHours(23, 59, 59, 999);
              
              dateFilter = { 
                completedAt: { 
                  $gte: startOfWeek, 
                  $lte: endOfWeek 
                } 
              };
              break;
              
            case 'month':
              // Ce mois-ci
              const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
              const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
              dateFilter = { 
                completedAt: { 
                  $gte: startOfMonth, 
                  $lte: endOfMonth 
                } 
              };
              break;
              
            case 'last_month':
              // Mois précédent
              const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
              const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
              dateFilter = { 
                completedAt: { 
                  $gte: startOfLastMonth, 
                  $lte: endOfLastMonth 
                } 
              };
              break;
              
            case 'all':
            default:
              // Pas de filtre de date
              dateFilter = {};
              break;
          }
          
          // Calcul du revenu total (tous statuts confondus)
          const revenueAggregation = await db.collection('bookings').aggregate([
            { 
              $match: { 
                status: { $in: ['confirmed', 'in_progress', 'completed'] },
                ...dateFilter // Appliquer le filtre de date
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
          
          // Revenu des courses terminées uniquement
          const completedRevenueAggregation = await db.collection('bookings').aggregate([
            { 
              $match: { 
                status: 'completed',
                ...dateFilter // Appliquer le filtre de date 
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
          
          stats.completedRevenue = completedRevenueAggregation.length > 0 ? completedRevenueAggregation[0].total : 0;
          
          // Ajouter des métadonnées temporelles pour l'UI
          stats.timeFilterDetails = {
            filter: timeFilter,
            label: getTimeFilterLabel(timeFilter),
            dateRange: getDateRangeForFilter(timeFilter)
          };
          
        } catch (revenueError) {
          console.error('Erreur lors du calcul des revenus:', revenueError);
          stats.totalRevenue = 0;
          stats.completedRevenue = 0;
        }
      }
    }
    
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

// Fonction utilitaire pour obtenir le libellé du filtre temporal
function getTimeFilterLabel(filter) {
  switch (filter) {
    case 'today':
      return "Aujourd'hui";
    case 'week':
      return 'Cette semaine';
    case 'month':
      return 'Ce mois-ci';
    case 'last_month':
      return 'Mois précédent';
    case 'all':
    default:
      return 'Toutes périodes';
  }
}

// Fonction utilitaire pour obtenir la plage de dates formatée pour l'UI
function getDateRangeForFilter(filter) {
  const now = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  
  switch (filter) {
    case 'today':
      return now.toLocaleDateString('fr-FR', options);
      
    case 'week':
      const dayOfWeek = now.getDay();
      const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - daysFromMonday);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('fr-FR', options)} - ${endOfWeek.toLocaleDateString('fr-FR', options)}`;
      
    case 'month':
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      return `${startOfMonth.toLocaleDateString('fr-FR', options)} - ${endOfMonth.toLocaleDateString('fr-FR', options)}`;
      
    case 'last_month':
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      
      return `${startOfLastMonth.toLocaleDateString('fr-FR', options)} - ${endOfLastMonth.toLocaleDateString('fr-FR', options)}`;
      
    case 'all':
    default:
      return 'Toutes les dates';
  }
}