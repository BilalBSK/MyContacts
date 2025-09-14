require('dotenv').config();
const app = require('./src/app');
const bdd = require('sr/src/config/database');

const PORT = process.env.PORT || 5000;
    
const startServer = async () => {
    try {
        await bdd();
        console.log('Connexion MongoDB OK')

    const server = app.listen(PORT, () => {
      
      if (process.env.NODE_ENV === 'development') {
      }
    });

    return server;

    } catch (error) {
        console.error('Erreur de connexion à la bdd', error);
        process.exit(1);
    
    }
};
startServer();

