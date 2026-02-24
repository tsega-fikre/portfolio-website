# Portfolio Security Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your EmailJS credentials
# Get these from https://www.emailjs.com/
```

### 3. EmailJS Setup
1. Create account at https://www.emailjs.com/
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update `.env` file with these values

### 4. Run Development Server
```bash
npm run dev
```

## New Features Overview

### 🔒 Security Improvements
- **Input Sanitization**: All user inputs are sanitized to prevent XSS
- **Rate Limiting**: Prevents spam and abuse
- **Secure Configuration**: Environment variables for sensitive data
- **Safe Link Handling**: Validates external links before navigation

### 📍 Location Consent
- Privacy-friendly location access
- Clear consent popup with explanation
- Graceful degradation if denied
- Persistent consent storage

### 📄 Document Ordering System
- Request portfolio documents (Resume, Certificates, etc.)
- Priority levels with estimated delivery times
- Client-side validation and storage
- Order status tracking

### ⏰ Reminder System
- Set reminders for important dates
- Browser notifications (with permission)
- Persistent reminder storage
- Multiple reminder types

## Testing the Features

### Security Features
1. **XSS Prevention**: Try entering `<script>alert('test')</script>` in any form
2. **Rate Limiting**: Submit contact form multiple times quickly
3. **Input Validation**: Test with invalid emails, long names, etc.

### New Features
1. **Location Consent**: Check browser console for location status
2. **Document Orders**: Click "📄 Request Documents" button (bottom left)
3. **Reminders**: Click "⏰ Set Reminder" button (bottom right)

## Production Deployment

### Environment Variables
Set these in your hosting platform:
```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### Security Headers
Add these headers in your hosting configuration:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.emailjs.com
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
```

### Build for Production
```bash
npm run build
```

## File Structure
```
src/
├── components/
│   ├── LocationConsent.jsx     # Privacy-friendly location access
│   ├── DocumentOrder.jsx       # Document request system
│   ├── ReminderSystem.jsx      # Reminder notifications
│   └── Contact.jsx             # Enhanced secure contact form
├── utils/
│   ├── security.js             # Security utilities
│   └── config.js               # Environment-safe configuration
└── App.jsx                     # Main app with security initialization
```

## Security Features Demonstrated

This portfolio showcases cybersecurity best practices:
- Input validation and sanitization
- XSS prevention techniques
- Rate limiting implementation
- Secure configuration management
- Privacy-conscious data handling
- Safe external resource loading

Perfect for demonstrating security awareness to potential employers in the cybersecurity field!