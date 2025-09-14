const express = require('express');
const router = express.Router();

// Inscription
router.post('/register', (req, res) => {
  console.log('Body:', req.body); 
});

// Connexion
router.post('/login', (req, res) => {
  console.log('Body:', req.body);
  
});

module.exports = router;
