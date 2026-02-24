/**
 * Environment-safe configuration patterns
 * Prevents exposure of sensitive data and provides safe defaults
 */

// Safe configuration with validation
export const CONFIG = {
  // EmailJS configuration - should be set via environment variables in production
  EMAIL: {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
  },
  
  // Rate limiting settings
  RATE_LIMITS: {
    CONTACT_FORM: { maxAttempts: 3, timeWindow: 300000 }, // 5 minutes
    DOCUMENT_ORDER: { maxAttempts: 5, timeWindow: 600000 }, // 10 minutes
    LOCATION_REQUEST: { maxAttempts: 2, timeWindow: 3600000 }, // 1 hour
  },
  
  // Validation limits
  VALIDATION: {
    NAME_MAX_LENGTH: 50,
    EMAIL_MAX_LENGTH: 254,
    MESSAGE_MAX_LENGTH: 1000,
    MESSAGE_MIN_LENGTH: 10,
  },
  
  // Feature flags
  FEATURES: {
    LOCATION_CONSENT: true,
    DOCUMENT_ORDERING: true,
    REMINDERS: true,
    NOTIFICATIONS: 'Notification' in window,
  },
  
  // Security settings
  SECURITY: {
    ENABLE_CSP: true,
    SANITIZE_INPUTS: true,
    RATE_LIMITING: true,
  }
};

/**
 * Validate configuration on app startup
 * @returns {boolean} - True if configuration is valid
 */
export const validateConfig = () => {
  const requiredEnvVars = ['VITE_EMAILJS_SERVICE_ID', 'VITE_EMAILJS_TEMPLATE_ID', 'VITE_EMAILJS_PUBLIC_KEY'];
  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0 && import.meta.env.DEV) {
    console.log('📧 EmailJS Setup Required:');
    console.log('   1. Copy .env.example to .env');
    console.log('   2. Get credentials from https://www.emailjs.com/');
    console.log('   3. Update .env with your EmailJS values');
    console.log('   📝 Contact form will use placeholder values until configured');
  }
  
  return true;
};

/**
 * Get safe configuration value
 * @param {string} path - Dot notation path to config value
 * @returns {any} - Configuration value or safe default
 */
export const getConfig = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], CONFIG);
};