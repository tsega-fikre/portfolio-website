/**
 * Security utilities for input sanitization and validation
 * Prevents XSS attacks and ensures safe data handling
 */

// HTML entities to prevent XSS
const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} str - Input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeHTML = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'/]/g, (match) => HTML_ENTITIES[match]);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validate name input (letters, spaces, hyphens, apostrophes only)
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid name format
 */
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s\-']{1,50}$/;
  return nameRegex.test(name.trim());
};

/**
 * Validate message content (prevent excessive length and suspicious patterns)
 * @param {string} message - Message to validate
 * @returns {boolean} - True if valid message
 */
export const validateMessage = (message) => {
  const trimmed = message.trim();
  if (trimmed.length < 10 || trimmed.length > 1000) return false;
  
  // Check for suspicious patterns (basic script injection attempts)
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(trimmed));
};

/**
 * Rate limiting helper for form submissions
 * @param {string} key - Unique key for rate limiting
 * @param {number} maxAttempts - Maximum attempts allowed
 * @param {number} timeWindow - Time window in milliseconds
 * @returns {boolean} - True if within rate limit
 */
export const checkRateLimit = (key, maxAttempts = 3, timeWindow = 60000) => {
  const now = Date.now();
  const attempts = JSON.parse(localStorage.getItem(`rateLimit_${key}`) || '[]');
  
  // Remove old attempts outside time window
  const recentAttempts = attempts.filter(timestamp => now - timestamp < timeWindow);
  
  if (recentAttempts.length >= maxAttempts) {
    return false;
  }
  
  // Add current attempt
  recentAttempts.push(now);
  localStorage.setItem(`rateLimit_${key}`, JSON.stringify(recentAttempts));
  
  return true;
};

/**
 * Secure localStorage wrapper with encryption-like obfuscation
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export const secureStorage = {
  set: (key, value) => {
    try {
      const encoded = btoa(JSON.stringify(value));
      localStorage.setItem(`secure_${key}`, encoded);
    } catch (error) {
      console.error('Failed to store data securely:', error);
    }
  },
  
  get: (key) => {
    try {
      const encoded = localStorage.getItem(`secure_${key}`);
      if (!encoded) return null;
      return JSON.parse(atob(encoded));
    } catch (error) {
      console.error('Failed to retrieve data securely:', error);
      return null;
    }
  },
  
  remove: (key) => {
    localStorage.removeItem(`secure_${key}`);
  }
};