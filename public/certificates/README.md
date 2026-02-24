# Certificates Images

Add your certificate images here!

## How to Add Certificates

1. **Add your certificate images** to this folder:
   - `cert1.jpg`
   - `cert2.jpg`
   - `cert3.jpg`
   - `cert4.jpg`
   - etc.

2. **Edit the certificates array** in `src/components/Certificates.jsx`:

```javascript
const certificates = [
  {
    title: 'Certified Ethical Hacker',
    issuer: 'EC-Council',
    date: '2024',
    image: '/certificates/cert1.jpg',  // Your certificate image
    link: 'https://verify.eccouncil.org/your-verification-link',
  },
  // Add more certificates...
]
```

## Image Guidelines

- **Format**: JPG, PNG, or PDF (converted to image)
- **Size**: Recommended 1200x900px or original certificate size
- **File size**: Keep under 1MB
- **Naming**: Use simple names like `cert1.jpg`, `cert2.jpg`

## Tips

- Scan or screenshot your certificates at high quality
- Make sure text is readable
- Include the full certificate (don't crop important parts)
- If you have a PDF, convert it to JPG/PNG
- Add verification links when available

## Example Certificates

- TryHackMe completion certificates
- Hack The Box certifications
- Coursera/Udemy courses
- CompTIA Security+
- CEH (Certified Ethical Hacker)
- OSCP (Offensive Security Certified Professional)
- Network+ certifications
- Any cybersecurity training certificates

## Verification Links

Always include verification links when available:
- TryHackMe: `https://tryhackme.com/certificate/YOUR_CERT_ID`
- Coursera: `https://coursera.org/verify/YOUR_CERT_ID`
- Credly: `https://credly.com/badges/YOUR_BADGE_ID`
- Custom verification URLs from issuing organizations
