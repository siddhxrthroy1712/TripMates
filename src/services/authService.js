import api from './api';

// Authentication service functions
const authService = {
  // Send OTP to email or phone
  sendOTP: async (contactData) => {
    try {
      // Use the new endpoint name to avoid ad blockers
      const response = await api.post('/auth/send-verification', contactData);
      console.log('Send verification response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Send verification error:', error);
      throw error.response ? error.response.data : error;
    }
  },

  // Verify OTP
  verifyOTP: async (otpData) => {
    try {
      console.log('Verify code request payload:', otpData);
      // Use the new endpoint name to avoid ad blockers
      const response = await api.post('/auth/confirm-verification', otpData);
      console.log('Verify code response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Verify code error:', error.response ? error.response.data : error);
      throw error.response ? error.response.data : error;
    }
  },

  // Register a new user (signup)
  signup: async (userData, isFormData = false) => {
    try {
      // For FormData (driver signup with files), we can't log the entire payload
      if (!isFormData) {
        console.log('Signup request payload:', userData);
      } else {
        console.log('Signup request with FormData (files included)');
      }

      // Set the correct headers for FormData
      const config = isFormData ? {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } : {};

      const response = await api.post('/auth/signup', userData, config);
      console.log('Signup response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error);
      throw error.response ? error.response.data : error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      console.log('Login request payload:', credentials);
      const response = await api.post('/auth/login', credentials);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error);
      throw error.response ? error.response.data : error;
    }
  },

  // Social login (Google, Facebook)
  socialLogin: async (socialData) => {
    try {
      const response = await api.post('/auth/social-login', socialData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  // Forgot password
  forgotPassword: async (contactData) => {
    try {
      console.log('Forgot password request payload:', contactData);
      const response = await api.post('/auth/forgot-password', contactData);
      console.log('Forgot password response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error.response ? error.response.data : error);
      throw error.response ? error.response.data : error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      // Log the request (hiding sensitive data)
      console.log('Change password request payload:', {
        ...passwordData,
        currentPassword: passwordData.currentPassword ? '[HIDDEN]' : null,
        newPassword: '[HIDDEN]'
      });

      // Make the API call
      const response = await api.post('/auth/change-password', passwordData);

      // Log the response
      console.log('Change password response:', response.data);

      return response.data;
    } catch (error) {
      // Log the error
      console.error('Change password error:', error);
      console.error('Error details:', error.response ? error.response.data : 'No response data');

      throw error.response ? error.response.data : error;
    }
  },

  // Logout user
  logout: async () => {
    // Clear local storage, cookies, etc.
    localStorage.removeItem('user');
    // You might want to call a logout endpoint if needed
  },

  // Get current authenticated user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Save user to local storage
  setCurrentUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

export default authService;
