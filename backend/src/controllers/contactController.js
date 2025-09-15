const Contact = require('../models/Contact');

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user.id });
    
    res.json({
      status: 'success',
      data: contacts,
      message: 'Contacts récupérés'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur serveur'
    });
  }
};

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, phone } = req.body;

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        status: 'error',
        message: 'Prenom, Nom et numero de tel obligatoires'
      });
    }
    
    const contact = new Contact({
      firstName,
      lastName,
      phone,
      userId: req.user.id
    });
    
    await contact.save();
    
    res.status(201).json({
      status: 'success',
      data: contact,
      message: 'Contact créé'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages[0]
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la création'
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updates,
      { new: true } // return le contact modifié
    );
    
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact non trouvé'
      });
    }
    
    res.json({
      status: 'success',
      data: contact,
      message: 'Contact modifié'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages[0]
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la modification'
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });
    
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact non trouvé'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Contact supprimé'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la suppression'
    });
  }
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact
};