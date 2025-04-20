import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.SERVER_API,
  headers: {
    'Content-Type': 'application/json',
  },
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
    // Handle specific error codes here if needed
    return Promise.reject(error);
  }
);

export default api; 
