const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const contactController = require('../controllers/contactController');

router.use(authenticate); 

router.get('/', contactController.getContacts);
router.post('/', contactController.createContact);
router.patch('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
