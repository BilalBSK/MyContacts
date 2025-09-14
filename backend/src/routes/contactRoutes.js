const express = require('express');
const router = express.Router();

// Récupérer les contacts
router.get('/', (req, res) => {
});

// Ajouter un contact
router.post('/', (req, res) => {
  console.log('Body:', req.body);
});

//Modifier un contact
router.patch('/:id', (req, res) => {
  console.log('Body:', req.body);
});

//Supprimer un contact
router.delete('/:id', (req, res) => {
});

module.exports = router;