// app/api/dashboard/chart-data/route.js
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
    
    // Récupérer les paramètres de requête
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week';
    
    // Connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Vérifier que la collection bookings existe
    const collections = await db.listCollections({ name: 'bookings' }).toArray();
    if (collections.length === 0) {
      // Si pas de collection, retourner des données vides
      return NextResponse.json({
        success: true,
        data: getEmptyData(period)
      });
    }
    
    let data;
    
    // Filtrer par chauffeur si l'utilisateur est un chauffeur
    const driverFilter = session.user.role === 'driver' 
      ? { assignedDriver: session.user.id } 
      : {};
    
    switch (period) {
      case 'day':
        data = await getDailyData(db, driverFilter);
        break;
      case 'month':
        data = await getMonthlyData(db, driverFilter);
        break;
      case 'year':
        data = await getYearlyData(db, driverFilter);
        break;
      case 'week':
      default:
        data = await getWeeklyData(db, driverFilter);
        break;
    }
    
    return NextResponse.json({
      success: true,
      data
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données du graphique:', error);
    
    return NextResponse.json(
      { 
        error: 'Une erreur est survenue lors de la récupération des données du graphique.',
        details: error.message
      },
      { status: 500 }
    );
  }
}

// Fonction pour retourner des données vides selon la période
function getEmptyData(period) {
  switch (period) {
    case 'day':
      return Array(24).fill().map((_, i) => ({
        hour: `${i}h`,
        confirmées: 0,
        enAttente: 0,
        annulées: 0
      }));
    case 'month':
      const date = new Date();
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      return Array(daysInMonth).fill().map((_, i) => ({
        date: `${(i + 1).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
        confirmées: 0,
        enAttente: 0,
        annulées: 0
      }));
    case 'year':
      const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
      return monthNames.map(month => ({
        month,
        confirmées: 0,
        enAttente: 0,
        annulées: 0
      }));
    case 'week':
    default:
      const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
      const today = new Date();
      return Array(7).fill().map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - today.getDay() + i + 1);
        return {
          date: `${dayNames[i]} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
          confirmées: 0,
          enAttente: 0,
          annulées: 0
        };
      });
  }
}

// Données quotidiennes (heures de la journée)
async function getDailyData(db, additionalFilter = {}) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  
  // Préparer la requête avec ObjectId si nécessaire
  const query = {
    pickupDateTime: { 
      $gte: startOfDay, 
      $lte: endOfDay 
    },
    ...additionalFilter
  };
  
  // Si additionalFilter contient assignedDriver, le convertir en ObjectId
  if (query.assignedDriver && typeof query.assignedDriver === 'string') {
    const { ObjectId } = await import('mongodb');
    query.assignedDriver = new ObjectId(query.assignedDriver);
  }
  
  // Récupérer toutes les réservations de la journée
  const bookings = await db.collection('bookings').find(query).toArray();
  
  // Grouper par heure
  const hourlyData = Array(24).fill().map((_, i) => ({
    hour: `${i}h`,
    confirmées: 0,
    enAttente: 0,
    annulées: 0
  }));
  
  bookings.forEach(booking => {
    const bookingDate = new Date(booking.pickupDateTime);
    const hour = bookingDate.getHours();
    
    switch (booking.status) {
      case 'confirmed':
      case 'completed':
      case 'in_progress':
        hourlyData[hour].confirmées += 1;
        break;
      case 'pending':
        hourlyData[hour].enAttente += 1;
        break;
      case 'cancelled':
        hourlyData[hour].annulées += 1;
        break;
    }
  });
  
  return hourlyData;
}

// Données hebdomadaires (jours de la semaine)
async function getWeeklyData(db, additionalFilter = {}) {
  // Trouver le premier jour de la semaine (lundi)
  const today = new Date();
  const currentDay = today.getDay(); // 0 pour dimanche, 1 pour lundi, etc.
  const diff = currentDay === 0 ? 6 : currentDay - 1; // Ajuster pour commencer par lundi
  
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  // Préparer la requête avec ObjectId si nécessaire
  const query = {
    pickupDateTime: { 
      $gte: startOfWeek, 
      $lte: endOfWeek 
    },
    ...additionalFilter
  };
  
  // Si additionalFilter contient assignedDriver, le convertir en ObjectId
  if (query.assignedDriver && typeof query.assignedDriver === 'string') {
    const { ObjectId } = await import('mongodb');
    query.assignedDriver = new ObjectId(query.assignedDriver);
  }
  
  // Récupérer toutes les réservations de la semaine
  const bookings = await db.collection('bookings').find(query).toArray();
  
  // Noms des jours de la semaine en français
  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  // Initialiser les données pour chaque jour
  const dailyData = Array(7).fill().map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    
    return {
      date: `${dayNames[i]} ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
      confirmées: 0,
      enAttente: 0,
      annulées: 0
    };
  });
  
  // Remplir les données
  bookings.forEach(booking => {
    const bookingDate = new Date(booking.pickupDateTime);
    const dayIndex = Math.floor((bookingDate - startOfWeek) / (24 * 60 * 60 * 1000));
    
    // Vérifier que l'index est valide
    if (dayIndex >= 0 && dayIndex < 7) {
      switch (booking.status) {
        case 'confirmed':
        case 'completed':
        case 'in_progress':
          dailyData[dayIndex].confirmées += 1;
          break;
        case 'pending':
          dailyData[dayIndex].enAttente += 1;
          break;
        case 'cancelled':
          dailyData[dayIndex].annulées += 1;
          break;
      }
    }
  });
  
  return dailyData;
}

// Données mensuelles (jours du mois)
async function getMonthlyData(db, additionalFilter = {}) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Premier jour du mois
  const startOfMonth = new Date(year, month, 1);
  
  // Dernier jour du mois
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);
  
  // Préparer la requête avec ObjectId si nécessaire
  const query = {
    pickupDateTime: { 
      $gte: startOfMonth, 
      $lte: endOfMonth 
    },
    ...additionalFilter
  };
  
  // Si additionalFilter contient assignedDriver, le convertir en ObjectId
  if (query.assignedDriver && typeof query.assignedDriver === 'string') {
    const { ObjectId } = await import('mongodb');
    query.assignedDriver = new ObjectId(query.assignedDriver);
  }
  
  // Récupérer toutes les réservations du mois
  const bookings = await db.collection('bookings').find(query).toArray();
  
  // Nombre de jours dans le mois
  const daysInMonth = endOfMonth.getDate();
  
  // Initialiser les données pour chaque jour
  const monthlyData = Array(daysInMonth).fill().map((_, i) => ({
    date: `${(i + 1).toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`,
    confirmées: 0,
    enAttente: 0,
    annulées: 0
  }));
  
  // Remplir les données
  bookings.forEach(booking => {
    const bookingDay = new Date(booking.pickupDateTime).getDate();
    const dayIndex = bookingDay - 1; // -1 car les tableaux commencent à 0
    
    if (dayIndex >= 0 && dayIndex < daysInMonth) {
      switch (booking.status) {
        case 'confirmed':
        case 'completed':
        case 'in_progress':
          monthlyData[dayIndex].confirmées += 1;
          break;
        case 'pending':
          monthlyData[dayIndex].enAttente += 1;
          break;
        case 'cancelled':
          monthlyData[dayIndex].annulées += 1;
          break;
      }
    }
  });
  
  return monthlyData;
}

// Données annuelles (mois de l'année)
async function getYearlyData(db, additionalFilter = {}) {
  const date = new Date();
  const year = date.getFullYear();
  
  // Premier jour de l'année
  const startOfYear = new Date(year, 0, 1);
  
  // Dernier jour de l'année
  const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
  
  // Préparer la requête avec ObjectId si nécessaire
  const query = {
    pickupDateTime: { 
      $gte: startOfYear, 
      $lte: endOfYear 
    },
    ...additionalFilter
  };
  
  // Si additionalFilter contient assignedDriver, le convertir en ObjectId
  if (query.assignedDriver && typeof query.assignedDriver === 'string') {
    const { ObjectId } = await import('mongodb');
    query.assignedDriver = new ObjectId(query.assignedDriver);
  }
  
  // Récupérer toutes les réservations de l'année
  const bookings = await db.collection('bookings').find(query).toArray();
  
  // Noms des mois en français
  const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  // Initialiser les données pour chaque mois
  const yearlyData = Array(12).fill().map((_, i) => ({
    month: monthNames[i],
    confirmées: 0,
    enAttente: 0,
    annulées: 0
  }));
  
  // Remplir les données
  bookings.forEach(booking => {
    const month = new Date(booking.pickupDateTime).getMonth();
    
    switch (booking.status) {
      case 'confirmed':
      case 'completed':
      case 'in_progress':
        yearlyData[month].confirmées += 1;
        break;
      case 'pending':
        yearlyData[month].enAttente += 1;
        break;
      case 'cancelled':
        yearlyData[month].annulées += 1;
        break;
    }
  });
  
  return yearlyData;
}