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

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
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