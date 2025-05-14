import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    index: true // Index pour les recherches rapides
  },
  status: {
    type: String,
    enum: ['confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'confirmed', // Statut par défaut "confirmed" - plus de pending
    index: true
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  dropoffAddress: {
    type: String,
    required: true,
  },
  pickupDateTime: {
    type: Date,
    required: true,
    index: true
  },
  passengers: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  luggage: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['green', 'premium', 'sedan', 'van']
  },
  roundTrip: {
    type: Boolean,
    default: false,
  },
  returnDateTime: {
    type: Date,
    validate: {
      validator: function(v) {
        // Si roundTrip est true, returnDateTime doit être défini
        return !this.roundTrip || v != null;
      },
      message: 'Return date/time is required for round trips'
    }
  },
  flightNumber: {
    type: String,
  },
  trainNumber: {
    type: String,
  },
  specialRequests: {
    type: String,
  },
  price: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'EUR',
    },
  },
  customerInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Invalid email format'
      }
    },
    phone: {
      type: String,
      required: true,
    },
  },
  pickupAddressPlaceId: String,
  dropoffAddressPlaceId: String,
  notes: String,
  adminNotes: String,
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
});

// Index composé pour optimiser les requêtes
BookingSchema.index({ 'customerInfo.email': 1, pickupDateTime: -1 });
BookingSchema.index({ status: 1, pickupDateTime: -1 });
BookingSchema.index({ assignedDriver: 1, pickupDateTime: -1 });

// Middleware pre-save pour mettre à jour le champ updatedAt
BookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Si le statut change vers "in_progress", mettre à jour startedAt
  if (this.isModified('status') && this.status === 'in_progress' && !this.startedAt) {
    this.startedAt = Date.now();
  }
  
  // Si le statut change vers "completed", mettre à jour completedAt
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = Date.now();
  }
  
  next();
});

// Méthode pour formatter la réservation pour l'affichage
BookingSchema.methods.toDisplayFormat = function() {
  return {
    id: this.bookingId,
    _id: this._id,
    status: this.status,
    pickupAddress: this.pickupAddress,
    dropoffAddress: this.dropoffAddress,
    pickupDateTime: this.pickupDateTime,
    returnDateTime: this.returnDateTime,
    passengers: this.passengers,
    luggage: this.luggage,
    vehicleType: this.vehicleType,
    roundTrip: this.roundTrip,
    price: this.price,
    customerInfo: this.customerInfo,
    createdAt: this.createdAt,
    flightNumber: this.flightNumber,
    trainNumber: this.trainNumber,
    specialRequests: this.specialRequests,
    notes: this.notes,
    adminNotes: this.adminNotes,
    assignedDriver: this.assignedDriver
  };
};

// Méthode statique pour obtenir les statistiques
BookingSchema.statics.getStats = async function(filters = {}) {
  const pipeline = [
    { $match: filters },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalRevenue: { $sum: '$price.amount' }
      }
    }
  ];
  
  return this.aggregate(pipeline);
};

// Méthode statique pour rechercher des réservations
BookingSchema.statics.search = function(searchTerm, filters = {}) {
  const searchRegex = new RegExp(searchTerm, 'i');
  
  const searchQuery = {
    ...filters,
    $or: [
      { bookingId: searchRegex },
      { 'customerInfo.name': searchRegex },
      { 'customerInfo.email': searchRegex },
      { 'customerInfo.phone': searchRegex },
      { pickupAddress: searchRegex },
      { dropoffAddress: searchRegex },
      { flightNumber: searchRegex },
      { trainNumber: searchRegex }
    ]
  };
  
  return this.find(searchQuery);
};

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);