import React, { useState, useEffect } from 'react';
import { logout } from '../services/authServices';
import { getContacts, createContact, deleteContact, updateContact } from '../services/contactServices';

function Contacts({ setIsAuth }) {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
      setLoading(false);
    } catch (error) {
      setError('Erreur lors du chargement');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editingId) {
        // Mode édition
        await updateContact(editingId, formData);
      } else {
        // Mode création
        await createContact(formData);
      }
      
      resetForm();
      loadContacts();
    } catch (error) {
      setError(error.response?.data?.message || 
        (editingId ? 'Erreur lors de la modification' : 'Erreur lors de la création'));
    }
  };

  const handleEdit = (contact) => {
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone
    });
    setEditingId(contact._id);
    setError('');
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', phone: '' });
    setEditingId(null);
    setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce contact ?')) {
      try {
        await deleteContact(id);
        loadContacts();
        // Si on était en train d'éditer ce contact, annuler l'édition
        if (editingId === id) {
          resetForm();
        }
      } catch (error) {
        setError('Erreur lors de la suppression');
      }
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="contacts-container">
      <header className="header">
        <h1>Mes Contacts</h1>
        <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
      </header>

      <div className="contact-form-card">
        <h2>{editingId ? 'Modifier le contact' : 'Ajouter un contact'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              placeholder="Nom"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Téléphone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', gridColumn: 'span 2' }}>
            <button type="submit" style={{ flex: 1 }}>
              {editingId ? 'Modifier' : 'Ajouter'}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={handleCancelEdit}
                style={{ 
                  flex: 1, 
                  background: 'linear-gradient(135deg, #718096, #a0aec0)' 
                }}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="contacts-list">
        <h2>Mes contacts ({contacts.length})</h2>
        {contacts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#718096', fontSize: '18px', marginTop: '40px' }}>
            Aucun contact pour le moment
          </p>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} className="contact-item">
              <div>
                <strong>{contact.firstName} {contact.lastName}</strong>
                <p>{contact.phone}</p>
              </div>
              <div className="contact-actions">
                <button
                  onClick={() => handleEdit(contact)}
                  className="edit-btn"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="delete-btn"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Contacts;