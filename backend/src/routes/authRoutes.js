const express = require('express');
const router = express.Router();
const { register, login, getInfos } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

//Inscription
router.post('/register', register);

//Connexion
router.post('/login', login);

// Infos user
router.get('/infos', authenticate, getInfos);

module.exports = router;