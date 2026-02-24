# Tsegazeab Fikre - Cybersecurity Portfolio

A futuristic, cyber-themed portfolio website showcasing cybersecurity skills, achievements, and projects.

## Features

- 🎨 Cyberpunk aesthetic with neon green (#00FF88) theme
- 🎭 3D animations using Three.js and React Three Fiber
- ✨ Smooth transitions with Framer Motion
- 📱 Fully responsive design (mobile, tablet, desktop)
- 📧 Contact form with EmailJS integration
- 📄 Resume download functionality
- 🔗 Social media integration

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- Three.js / React Three Fiber
- EmailJS

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Your Files

Place these files in the `public/` folder:
- `resume.pdf` - Your resume
- `profile.jpg` - Your profile photo

### 3. Configure EmailJS

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update `src/components/Contact.jsx` with your credentials:

```javascript
emailjs.sendForm(
  'YOUR_SERVICE_ID',    // Replace
  'YOUR_TEMPLATE_ID',   // Replace
  formRef.current,
  'YOUR_PUBLIC_KEY'     // Replace
)
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## Customization

### Update Personal Information

Edit the following files:
- `src/components/Home.jsx` - Social links and intro
- `src/components/About.jsx` - Biography and tags
- `src/components/Skills.jsx` - Skills and tools
- `src/components/Projects.jsx` - Projects and achievements
- `src/components/Footer.jsx` - Footer links

### Change Colors

Edit `tailwind.config.js` to customize the cyber-green theme:

```javascript
colors: {
  'cyber-green': '#00FF88', // Change this
}
```

## Deployment

Deploy to:
- Vercel: `vercel deploy`
- Netlify: Drag & drop `dist` folder
- GitHub Pages: Use `gh-pages` package

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Notes

- 3D animations are optimized for performance
- Mobile devices use scaled-down animations
- Lazy loading for images

## License

MIT License - Feel free to use this template for your own portfolio!

## Contact

Tsegazeab Fikre - tsegazaebfikre12@gmail.com

---

Built with ❤️ and ☕ by Tsegazeab Fikre
