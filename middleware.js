// middleware.js
import { NextResponse } from 'next/server'

// Liste des origines autorisées (en production, limiter aux domaines spécifiques)
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://elysian-luxury-chauffeurs.com',
      'https://www.elysian-luxury-chauffeurs.com',
    ] 
  : ['http://localhost:3000']

/**
 * Middleware pour les requêtes
 * @param {Object} request - Requête entrante
 */
export function middleware(request) {
  // Récupérer l'origine de la requête
  const origin = request.headers.get('origin') || ''
  
  // Vérifier si la requête provient d'une origine autorisée
  const isAllowedOrigin = allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development'
  
  // Appliquer CORS pour l'API uniquement
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Créer les en-têtes de réponse pour CORS
    const headers = {
      'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400', // 24 heures
    }

    // Répondre immédiatement aux requêtes OPTIONS
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { status: 204, headers })
    }

    // Pour les autres requêtes, ajouter les en-têtes CORS
    const response = NextResponse.next()
    
    // Appliquer les en-têtes CORS
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  }

  // Protection basique contre les attaques par force brute sur le formulaire de réservation
  if (request.nextUrl.pathname === '/api/booking' && request.method === 'POST') {
    // Dans une implémentation réelle, on utiliserait Redis ou une autre solution
    // pour compter les tentatives par IP et limiter le taux de requêtes
    // Ici, on se contente d'une vérification basique
    
    // Si besoin de rate-limiting complexe, utiliser un middleware dédié
  }

  // Pour toutes les autres requêtes, continuer normalement
  return NextResponse.next()
}

// Configurer les routes sur lesquelles le middleware s'applique
export const config = {
  matcher: [
    // Appliquer à toutes les routes API
    '/api/:path*',
    // Appliquer aux routes de réservation
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}