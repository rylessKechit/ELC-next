import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'confirmed', // Par défaut "confirmed"
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
    enum: ['green', 'premium', 'sedan', 'van'] // Assurer la cohérence avec vos types
  },
  roundTrip: {
    type: Boolean,
    default: false,
  },
  returnDateTime: {
    type: Date,
    validate: {
      validator: function(v) {
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
  
  if (this.isModified('status') && this.status === 'in_progress' && !this.startedAt) {
    this.startedAt = Date.now();
  }
  
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = Date.now();
  }
  
  next();
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);