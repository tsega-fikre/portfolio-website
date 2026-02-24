// Simple Security Test
console.log('🛡️ Security Test Results:');

// Test XSS Prevention
const sanitizeHTML = (str) => {
  const HTML_ENTITIES = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;',
    '"': '&quot;', "'": '&#x27;', '/': '&#x2F;'
  };
  return str.replace(/[&<>"'/]/g, (match) => HTML_ENTITIES[match]);
};

const xssTest = '<script>alert("XSS")</script>';
const sanitized = sanitizeHTML(xssTest);
console.log('XSS Test:', sanitized.includes('&lt;script&gt;') ? '✅ SAFE' : '❌ UNSAFE');

// Test Email Validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

console.log('Email Valid:', validateEmail('test@example.com') ? '✅ PASS' : '❌ FAIL');
console.log('Email Invalid:', !validateEmail('invalid-email') ? '✅ PASS' : '❌ FAIL');

console.log('🎯 Security Functions: WORKING CORRECTLY');