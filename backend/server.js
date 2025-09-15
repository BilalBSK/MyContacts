require('dotenv').config();
const app = require('./src/app');
const bdd = require('./src/config/database'); 

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await bdd();
    console.log('Connexion MongoDB OK');

    const server = app.listen(PORT, () => {
      console.log(`Serveur sur le port ${PORT}`);
    });

    return server;
  } catch (error) {
    console.error('Erreur de connexion à la bdd', error);
    process.exit(1);
  }
};

startServer();