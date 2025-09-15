const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const contactController = require('../controllers/contactController');

router.use(authenticate); //routes protégées

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 */
router.get('/', contactController.getContacts);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Ajouter un nouveau contact
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 example: 0612345678
 *     responses:
 *       201:
 *         description: Contact créé
 */
router.post('/', contactController.createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   patch:
 *     summary: Mettre à jour un contact existant
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *       404:
 *         description: Contact non trouvé
 */
router.patch('/:id', contactController.updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé
 *       404:
 *         description: Contact non trouvé
 */
router.delete('/:id', contactController.deleteContact);

module.exports = router;
