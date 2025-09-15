const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true],
    unique: true,
    lowercase: true, 
    trim: true, 
    match: [/\S+@\S+\.\S+/, 'Email invalide'] 
  },
  
  // Mdp hashé
  password: {
    type: String,
    required: [true],
    minlength: [6],
    // on recupere pas le mdp par défaut dans les requêtes
    select: false
  }
}, {

  timestamps: true, 
  versionKey: false 
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password; // Supprime le password de la réponse 
  return user;
};


module.exports = mongoose.model('User', userSchema);