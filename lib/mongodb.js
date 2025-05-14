import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Veuillez définir la variable d\'environnement MONGODB_URI');
}

// Variable globale pour maintenir la connexion
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Si on a déjà une connexion active, la retourner
  if (cached.conn) {
    console.log('✅ Utilisation de la connexion MongoDB existante');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Configuration supplémentaire pour une meilleure stabilité
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4 // Utiliser IPv4
    };

    console.log('🔌 Tentative de connexion à MongoDB...');
    console.log('URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Log sécurisé de l'URI

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connecté avec succès");
        console.log("📊 Base de données:", mongoose.connection.db.databaseName);
        
        // Écouter les événements de connexion
        mongoose.connection.on('error', (error) => {
          console.error('❌ Erreur MongoDB:', error);
        });
        
        mongoose.connection.on('disconnected', () => {
          console.warn('⚠️ MongoDB déconnecté');
        });
        
        return mongoose;
      })
      .catch(err => {
        console.error("❌ Erreur de connexion MongoDB:", err);
        // Réinitialiser la promesse en cas d'erreur
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("❌ Échec de connexion à MongoDB:", error);
    // Réinitialiser en cas d'erreur
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

export default dbConnect;