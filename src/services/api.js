import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  // Use the deployed backend URL directly for now
  baseURL: 'https://unigooo.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies (JWT token)
});

// Log the API URL being used (for debugging)
console.log('API URL:', 'https://unigooo.onrender.com/api');

// Add a request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    // You can add token from localStorage here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here (e.g., 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      // Redirect to login or clear auth state
      console.error('Unauthorized access');
      // You might want to redirect to login page or dispatch a logout action
    }
    return Promise.reject(error);
  }
);

export default api;
