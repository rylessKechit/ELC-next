// lib/seed.js
// Ce script initialise la base de données avec un utilisateur admin si aucun n'existe

import clientPromise from './mongodb-client';
import User from '@/models/User';
import { hash } from 'bcrypt';

export async function seedDatabase() {
  try {
    // Attendre la connexion à MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Vérifier si la collection User existe, sinon la créer
    const collections = await db.listCollections({ name: 'users' }).toArray();
    if (collections.length === 0) {
      await db.createCollection('users');
    }
    
    // Utiliser directement la collection pour plus de performance
    const usersCollection = db.collection('users');
    
    // Vérifier s'il existe déjà un administrateur
    const adminExists = await usersCollection.findOne({ role: 'admin' });
    
    if (!adminExists) {
      console.log('Aucun administrateur trouvé, création d\'un compte par défaut...');
      
      // Générer un mot de passe hashé
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'ElysianAdmin123!';
      const salt = 10;
      const hashedPassword = await hash(defaultPassword, salt);
      
      // Créer un administrateur par défaut
      const defaultAdmin = {
        name: 'Administrateur',
        email: 'admin@elysian-luxury-chauffeurs.com',
        password: hashedPassword,
        role: 'admin',
        phone: '+33600000000',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Insérer l'administrateur
      await usersCollection.insertOne(defaultAdmin);
      
      console.log('Compte administrateur créé avec succès!');
      console.log(`Email: ${defaultAdmin.email}`);
      console.log(`Mot de passe: ${process.env.DEFAULT_ADMIN_PASSWORD || 'ElysianAdmin123!'}`);
      console.log('IMPORTANT: Veuillez modifier ce mot de passe après votre première connexion!');
    } else {
      console.log('Un administrateur existe déjà dans la base de données.');
    }
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    return { success: false, error };
  }
}