import api from './api';

// Connexion
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  const { token } = response.data.data;
  localStorage.setItem('token', token);
  return response.data;
};

// Inscription
export const register = async (email, password) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem('token');
};

// Vérifier si connecté
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};