import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Veuillez définir la variable d\'environnement MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Variable globale pour maintenir la connexion à travers les rechargements HMR
let client;
let clientPromise;

// En mode développement, utiliser une variable globale pour éviter 
// les connexions multiples lors des rechargements HMR
if (process.env.NODE_ENV === 'development') {
  // Dans la fenêtre globale, vérifier si l'objet mongoClientPromise existe déjà
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En production, créer une nouvelle instance du client MongoClient
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Exporter la promesse du client pour une utilisation dans l'application
export default clientPromise;