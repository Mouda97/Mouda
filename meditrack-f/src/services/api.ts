import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Assurez-vous que c'est l'URL correcte de votre backend Laravel
  withCredentials: true, // Essentiel pour Laravel Sanctum
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Récupérer le cookie CSRF avant toute requête protégée
api.interceptors.request.use(
  async (config) => {
    // Si le cookie XSRF-TOKEN n'est pas présent, le récupérer
    if (!document.cookie.includes('XSRF-TOKEN')) {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
    }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Gérer la déconnexion ou la redirection vers la page de connexion
      // Ceci devrait être géré par votre AuthContext ou un router.
      console.error("Non autorisé, déconnexion ou redirection nécessaire.");
    }
    return Promise.reject(error);
  }
);

export default api;