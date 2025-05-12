import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

// Cette API ne doit être accessible qu'en mode développement ou via une clé secrète en production
export async function GET(request) {
  try {
    // En production, vérifier la clé secrète
    if (process.env.NODE_ENV === 'production') {
      const { searchParams } = new URL(request.url);
      const apiKey = searchParams.get('apiKey');
      
      if (!apiKey || apiKey !== process.env.SEED_API_KEY) {
        return NextResponse.json({ 
          success: false, 
          error: 'Non autorisé - Clé API requise en production' 
        }, { status: 401 });
      }
    }
    
    // Initialiser la base de données
    console.log('Démarrage de l\'initialisation de la base de données...');
    const result = await seedDatabase();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Base de données initialisée avec succès'
      });
    } else {
      console.error('Échec de l\'initialisation:', result.error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erreur lors de l\'initialisation de la base de données',
          details: result.error?.message || 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Une erreur est survenue lors de l\'initialisation de la base de données.',
        details: error.message
      },
      { status: 500 }
    );
  }
}