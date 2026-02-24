# Quick Start Guide

Get your portfolio running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

```bash
# Install dependencies (already done if you see node_modules folder)
npm install
```

## Add Your Files

1. **Add your resume:**
   - Place `resume.pdf` in the `public/` folder

2. **Add your profile photo:**
   - Place `profile.jpg` in the `public/` folder
   - Recommended size: 400x400px or larger

## Run Development Server

```bash
npm run dev
```

Your site will be available at `http://localhost:5173`

## Configure Contact Form (Optional)

The contact form uses EmailJS. To enable it:

1. Read `EMAILJS_SETUP.md` for detailed instructions
2. Update credentials in `src/components/Contact.jsx`

Or skip this and users can email you directly at: tsegazaebfikre12@gmail.com

## Customize Content

### Update Social Links
Edit `src/components/Home.jsx` and `src/components/Footer.jsx`

### Update About Section
Edit `src/components/About.jsx`

### Update Skills
Edit `src/components/Skills.jsx`

### Update Projects
Edit `src/components/Projects.jsx`

## Build for Production

```bash
npm run build
```

The production files will be in the `dist/` folder.

## Deploy

### Vercel (Recommended)
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy automatically

### Netlify
1. Run `npm run build`
2. Drag `dist/` folder to [netlify.com](https://netlify.com)

### GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

## Troubleshooting

### Port already in use?
```bash
npm run dev -- --port 3000
```

### Build errors?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 3D animations not working?
- Check browser console for errors
- Ensure you're using a modern browser (Chrome/Firefox/Edge)
- Try disabling browser extensions

## Need Help?

- Check the main `README.md` for detailed documentation
- Review component files for inline comments
- Contact: tsegazaebfikre12@gmail.com

---

Happy coding! 🚀
