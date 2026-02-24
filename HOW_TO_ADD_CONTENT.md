# How to Add Your Content

Complete guide to customizing your portfolio with your own projects and certificates.

---

## 📁 Folder Structure

```
public/
├── resume.pdf              # Your resume
├── profile.jpg             # Your profile photo
├── projects/               # Project screenshots
│   ├── project1.jpg
│   ├── project2.jpg
│   └── ...
└── certificates/           # Certificate images
    ├── cert1.jpg
    ├── cert2.jpg
    └── ...
```

---

## 🎨 Adding Projects

### Step 1: Add Project Images

1. Take screenshots of your projects
2. Save them as `project1.jpg`, `project2.jpg`, etc.
3. Place them in the `public/projects/` folder

**Image Tips:**
- Size: 1200x800px recommended
- Format: JPG or PNG
- Keep file size under 500KB
- Show the main interface or most impressive feature

### Step 2: Edit Projects Component

Open `src/components/Projects.jsx` and update the `projects` array:

```javascript
const projects = [
  {
    title: 'Network Security Scanner',
    description: 'Built a Python-based network scanner that identifies vulnerabilities and generates detailed reports',
    image: '/projects/project1.jpg',
    link: 'https://github.com/tsega-fikre/network-scanner',
    skills: ['Python', 'Nmap', 'Network Security'],
  },
  {
    title: 'Web Application Pentesting',
    description: 'Performed comprehensive security assessment of a web application, identifying OWASP Top 10 vulnerabilities',
    image: '/projects/project2.jpg',
    link: 'https://github.com/tsega-fikre/web-pentest-report',
    skills: ['Burp Suite', 'SQL Injection', 'XSS'],
  },
  {
    title: 'CTF Writeups Collection',
    description: 'Detailed writeups of 50+ CTF challenges from TryHackMe and Hack The Box',
    image: '/projects/project3.jpg',
    link: 'https://github.com/tsega-fikre/ctf-writeups',
    skills: ['CTF', 'Privilege Escalation', 'Cryptography'],
  },
  // Add more projects...
]
```

### Step 3: Customize Each Project

For each project, provide:
- **title**: Short, descriptive name
- **description**: What the project does (1-2 sentences)
- **image**: Path to your image in `/projects/`
- **link**: GitHub repo, live demo, or documentation
- **skills**: Array of technologies/skills used (3-5 items)

---

## 🏆 Adding Certificates

### Step 1: Add Certificate Images

1. Scan or screenshot your certificates
2. Save them as `cert1.jpg`, `cert2.jpg`, etc.
3. Place them in the `public/certificates/` folder

**Image Tips:**
- Use high resolution (300 DPI if scanning)
- Make sure text is readable
- Include the full certificate
- Format: JPG or PNG

### Step 2: Edit Certificates Component

Open `src/components/Certificates.jsx` and update the `certificates` array:

```javascript
const certificates = [
  {
    title: 'TryHackMe Complete Beginner Path',
    issuer: 'TryHackMe',
    date: 'January 2024',
    image: '/certificates/cert1.jpg',
    link: 'https://tryhackme.com/certificate/YOUR_CERT_ID',
  },
  {
    title: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: 'December 2023',
    image: '/certificates/cert2.jpg',
    link: 'https://verify.eccouncil.org/YOUR_VERIFICATION',
  },
  {
    title: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'November 2023',
    image: '/certificates/cert3.jpg',
    link: 'https://www.credly.com/badges/YOUR_BADGE_ID',
  },
  // Add more certificates...
]
```

### Step 3: Customize Each Certificate

For each certificate, provide:
- **title**: Certificate name
- **issuer**: Organization that issued it
- **date**: When you received it (Month Year)
- **image**: Path to your certificate image in `/certificates/`
- **link**: Verification URL (if available)

---

## 🔗 Social Media Links

### Update Your Links

The portfolio includes these platforms with real logos:

**Edit `src/components/Home.jsx` and `src/components/Footer.jsx`:**

```javascript
const socialLinks = [
  { 
    name: 'GitHub', 
    url: 'https://github.com/YOUR_USERNAME',  // Update this
    logo: 'https://cdn.simpleicons.org/github/white'
  },
  { 
    name: 'LinkedIn', 
    url: 'https://www.linkedin.com/in/YOUR_PROFILE/',  // Update this
    logo: 'https://cdn.simpleicons.org/linkedin/0A66C2'
  },
  { 
    name: 'TryHackMe', 
    url: 'https://tryhackme.com/p/YOUR_USERNAME',  // Update this
    logo: 'https://cdn.simpleicons.org/tryhackme/00FF88'
  },
  { 
    name: 'HackTheBox', 
    url: 'https://app.hackthebox.com/profile/YOUR_USERNAME',  // Update this
    logo: 'https://cdn.simpleicons.org/hackthebox/9FEF00'
  },
  { 
    name: 'Telegram', 
    url: 'https://t.me/YOUR_USERNAME',  // Update this
    logo: 'https://cdn.simpleicons.org/telegram/26A5E4'
  },
  { 
    name: 'Instagram', 
    url: 'https://instagram.com/YOUR_USERNAME',  // Update this
    logo: 'https://cdn.simpleicons.org/instagram/E4405F'
  },
  { 
    name: 'Gmail', 
    url: 'mailto:your.email@gmail.com',  // Update this
    logo: 'https://cdn.simpleicons.org/gmail/EA4335'
  },
]
```

---

## 📝 Quick Checklist

Before deploying, make sure you've:

### Required Files
- [ ] Added `resume.pdf` to `public/`
- [ ] Added `profile.jpg` to `public/`
- [ ] Added project images to `public/projects/`
- [ ] Added certificate images to `public/certificates/`

### Content Updates
- [ ] Updated projects in `src/components/Projects.jsx`
- [ ] Updated certificates in `src/components/Certificates.jsx`
- [ ] Updated social links in `src/components/Home.jsx`
- [ ] Updated social links in `src/components/Footer.jsx`
- [ ] Updated HackTheBox URL (replace YOUR_HTB_USERNAME)

### Optional Updates
- [ ] Updated biography in `src/components/About.jsx`
- [ ] Updated skills in `src/components/Skills.jsx`
- [ ] Configured EmailJS in `src/components/Contact.jsx`

---

## 🎯 Example Content

### Example Project Entry

```javascript
{
  title: 'Automated Vulnerability Scanner',
  description: 'Developed a Python tool that automates vulnerability scanning using Nmap and generates PDF reports with remediation recommendations',
  image: '/projects/vuln-scanner.jpg',
  link: 'https://github.com/tsega-fikre/vuln-scanner',
  skills: ['Python', 'Nmap', 'Report Generation', 'Automation'],
}
```

### Example Certificate Entry

```javascript
{
  title: 'Offensive Security Certified Professional (OSCP)',
  issuer: 'Offensive Security',
  date: 'March 2024',
  image: '/certificates/oscp.jpg',
  link: 'https://www.credential.net/YOUR_CREDENTIAL',
}
```

---

## 🖼️ Image Optimization

### Compress Images

Before adding images, compress them:

**Online Tools:**
- [TinyPNG](https://tinypng.com) - Best for PNG
- [Squoosh](https://squoosh.app) - Best for JPG
- [Compressor.io](https://compressor.io) - All formats

**Target Sizes:**
- Profile photo: < 200KB
- Project images: < 500KB each
- Certificates: < 1MB each

### Resize Images

**Recommended Dimensions:**
- Profile photo: 400x400px (square)
- Project screenshots: 1200x800px (3:2 ratio)
- Certificates: Original size or 1200x900px

---

## 🔄 Testing Your Changes

After adding content:

```bash
# Start development server
npm run dev

# Open http://localhost:5173
# Check that:
# - All images load correctly
# - Links work properly
# - Text is readable
# - Mobile view looks good
```

---

## 🚀 Adding More Items

### To Add More Projects

Just add more objects to the `projects` array:

```javascript
const projects = [
  { /* project 1 */ },
  { /* project 2 */ },
  { /* project 3 */ },
  { /* project 4 */ },
  { /* project 5 */ },  // Add as many as you want!
]
```

### To Add More Certificates

Same for certificates:

```javascript
const certificates = [
  { /* cert 1 */ },
  { /* cert 2 */ },
  { /* cert 3 */ },
  { /* cert 4 */ },
  { /* cert 5 */ },  // Add as many as you want!
]
```

The layout automatically adjusts!

---

## 💡 Pro Tips

1. **Use descriptive titles** - Make it clear what each project/certificate is
2. **Keep descriptions concise** - 1-2 sentences max
3. **Add verification links** - Increases credibility
4. **Update regularly** - Add new projects and certificates as you earn them
5. **Test on mobile** - Make sure images look good on small screens
6. **Use consistent naming** - project1.jpg, project2.jpg, etc.
7. **Backup your images** - Keep originals in a safe place

---

## 🆘 Troubleshooting

### Images not showing?

1. Check file path is correct: `/projects/project1.jpg`
2. Make sure file is in `public/projects/` folder
3. Check file extension matches (jpg vs jpeg)
4. Try refreshing the browser (Ctrl+F5)

### Links not working?

1. Make sure URLs start with `https://`
2. Test links in a new tab first
3. Check for typos in URLs

### Layout looks broken?

1. Make sure all required fields are filled
2. Check for missing commas in arrays
3. Look for syntax errors in console (F12)

---

## 📞 Need Help?

If you get stuck:
1. Check browser console for errors (F12)
2. Review the example entries above
3. Make sure file paths are correct
4. Test with placeholder images first

---

Happy customizing! 🎉
