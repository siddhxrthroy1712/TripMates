// Configuration for different environments
const config = {
  // API URL - use environment variable or fallback to localhost for development
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api',
  
  // Other configuration variables can be added here
  APP_NAME: 'UniGooo',
};

export default config;
