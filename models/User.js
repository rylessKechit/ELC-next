import mongoose from 'mongoose';
import { hash, compare } from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Attention: ne touche pas au mot de passe!
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'driver'],
    default: 'driver',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  driverInfo: {
    licenseNumber: String,
    vehicleInfo: {
      make: String,
      model: String,
      year: Number,
      licensePlate: String,
      color: String,
    },
    availability: {
      type: [{ 
        date: Date, 
        slots: [{ 
          start: String, 
          end: String 
        }] 
      }],
      default: [],
    },
  },
  lastLogin: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware pré-sauvegarde pour hacher le mot de passe
UserSchema.pre('save', async function(next) {
  // Mettre à jour la date de modification
  this.updatedAt = Date.now();
  
  // Hacher le mot de passe uniquement s'il a été modifié ou est nouveau
  if (!this.isModified('password')) return next();
  
  try {
    // Utiliser un salt de 10 (recommandé)
    const salt = 10;
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await compare(candidatePassword, this.password);
  } catch (error) {
    console.error("Erreur lors de la comparaison des mots de passe:", error);
    throw error;
  }
};

// Définir le modèle uniquement s'il n'existe pas déjà
export default mongoose.models.User || mongoose.model('User', UserSchema);