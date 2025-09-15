const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: [true, 'Le téléphone est obligatoire'],
    minlength: [10, 'Le téléphone doit faire au moins 10 caractères'],
    maxlength: [20, 'Le téléphone ne peut pas dépasser 20 caractères']
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);//Regex pour valider l'email
      },
      message: 'Email non valide'
    }
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Contact', contactSchema);