import api from './api';


export const getContacts = async () => {
  const response = await api.get('/contacts');
  return response.data.data;
};

// Créer un contact
export const createContact = async (contactData) => {
  const response = await api.post('/contacts', contactData);
  return response.data.data;
};

// Modifier un contact
export const updateContact = async (id, contactData) => {
  const response = await api.patch(`/contacts/${id}`, contactData);
  return response.data.data;
};

// Supprimer un contact
export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};