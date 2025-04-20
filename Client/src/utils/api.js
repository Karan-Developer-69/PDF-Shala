import axios from 'axios';

// Get API URL from Vite environment variables
// For Render deployment, this will use the SERVER_API defined in render.yaml
// In development, it will fall back to localhost
const API_URL = import.meta.env.SERVER_API || 'https://pdf-shala-api.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
});

// Add request interceptor for handling authentication tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    
    // Log errors in development or for debugging
    console.error('API Error:', error);
    
    return Promise.reject(error);
  }
);

export default api; 
