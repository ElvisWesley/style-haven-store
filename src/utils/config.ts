export const config = {
  serverUrl: import.meta.env.VITE_SERVER_URL || 'http://localhost:5000',
  isDevelopment: import.meta.env.NODE_ENV === 'development',
};

export const validateEnvironmentVariables = () => {
  const required = ['VITE_SERVER_URL'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};