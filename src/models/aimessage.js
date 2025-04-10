const mongoose = require('mongoose');

const aiMessageSchema = new mongoose.Schema({
  callId: {
    type: String,
    required: true,
    index: true
  },
  role: {
    type: String,
    enum: ['assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['suggestion', 'alert', 'info', 'action'],
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    required: true
  },
  isProcessed: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: Map,
    of: String,
    default: {}
  }
}, {
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  versionKey: false // Désactive le champ __v de MongoDB
});

// Indexes pour optimiser les performances des requêtes
aiMessageSchema.index({ timestamp: -1 });
aiMessageSchema.index({ category: 1 });
aiMessageSchema.index({ priority: 1 });
aiMessageSchema.index({ callId: 1, timestamp: -1 });
aiMessageSchema.index({ callId: 1, category: 1 });

// Méthode virtuelle pour obtenir l'âge du message
aiMessageSchema.virtual('age').get(function() {
  return Date.now() - this.timestamp.getTime();
});

// Méthode pour formater le message pour l'API
aiMessageSchema.methods.toAPI = function() {
  return {
    id: this._id,
    callId: this.callId,
    role: this.role,
    content: this.content,
    timestamp: this.timestamp,
    category: this.category,
    priority: this.priority,
    isProcessed: this.isProcessed,
    metadata: Object.fromEntries(this.metadata),
    age: this.age
  };
};

// Middleware pre-save pour validation supplémentaire
aiMessageSchema.pre('save', function(next) {
  // Vérification de la longueur du contenu
  if (this.content.length < 1) {
    next(new Error('Message content cannot be empty'));
  }
  
  // Vérification de la validité de la date
  if (this.timestamp > new Date()) {
    next(new Error('Message timestamp cannot be in the future'));
  }

  next();
});

const AIMessage = mongoose.model('AIMessage', aiMessageSchema);

module.exports = AIMessage;