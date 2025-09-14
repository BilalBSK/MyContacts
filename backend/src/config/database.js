const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      appName: 'MyContacts-API'
    };
    
    // Connexion a Mongo DB
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    // Log BDD OK
    console.log(`Connexion Bdd OK`);
    console.log(`Bdd ${conn.connection.name}`);
    
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true); // Voir toutes les requêtes MongoDB
      console.log('debug MongoDB');
    }
    
  } catch (error) {
    console.error('Erreur connexion MongoDB:', error.message);
    throw error;
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Connexion MongoDB fermée');
  } catch (error) {
    console.error('Erreur a la fermeture MongoDB', error.message);
  }
};

// Connexion Moongoose
mongoose.connection.on('connected', () => {
  console.log('Mongoose connecté à MongoDB');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose déconnecté de MongoDB');
});

process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

module.exports = connectDB;