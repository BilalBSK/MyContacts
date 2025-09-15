//setup contact pour tester swagger
const getContacts = async (req, res) => {
  res.json({ status: 'success', data: [], message: 'getContacts OK' });
};

const createContact = async (req, res) => {
  res.json({ status: 'success', message: 'createContact OK' });
};

const updateContact = async (req, res) => {
  res.json({ status: 'success', message: 'updateContact OK' });
};

const deleteContact = async (req, res) => {
  res.json({ status: 'success', message: 'deleteContact OK' });
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact
};