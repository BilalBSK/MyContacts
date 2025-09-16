import axios from 'axios';

const API_URL = 'https://mycontacts-z3sx.onrender.com/api';

console.log('🔍 API_URL utilisée:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  console.log('Requête vers:', config.baseURL + config.url);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ Réponse:', response.status);
    return response;
  },
  (error) => {
    console.error('Erreur API complète:', error);
    console.error('URL qui a échoué:', error.config?.baseURL + error.config?.url);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;