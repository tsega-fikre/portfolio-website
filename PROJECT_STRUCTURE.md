# Project Structure

```
portfolio/
├── public/                      # Static assets
│   ├── vite.svg                # Vite logo
│   ├── resume.pdf              # Your resume (ADD THIS)
│   ├── profile.jpg             # Your photo (ADD THIS)
│   └── README.txt              # Instructions
│
├── src/                        # Source code
│   ├── components/             # React components
│   │   ├── Navbar.jsx         # Navigation bar with mobile menu
│   │   ├── Home.jsx           # Hero section with 3D sphere
│   │   ├── About.jsx          # About me section
│   │   ├── Skills.jsx         # Skills with progress bars
│   │   ├── Projects.jsx       # Projects with flip cards
│   │   ├── Contact.jsx        # Contact form with EmailJS
│   │   └── Footer.jsx         # Footer with social links
│   │
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles + Tailwind
│
├── node_modules/              # Dependencies (auto-generated)
├── dist/                      # Production build (auto-generated)
│
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── .gitignore                # Git ignore rules
│
├── README.md                 # Main documentation
├── QUICKSTART.md            # Quick start guide
├── EMAILJS_SETUP.md         # EmailJS configuration guide
└── PROJECT_STRUCTURE.md     # This file
```

## Component Breakdown

### Navbar.jsx
- Fixed navigation bar
- Smooth scroll to sections
- Mobile-responsive hamburger menu
- Animated logo and links

### Home.jsx
- Full-screen hero section
- 3D animated sphere background (Three.js)
- Animated text with glowing effect
- Resume download button
- Social media links
- Scroll indicator

### About.jsx
- Profile photo with cyber border
- Biography text
- Animated fade-in on scroll
- Skill tags

### Skills.jsx
- Animated skill progress bars
- Skill icons and percentages
- Tools & technologies cloud
- Grid layout (responsive)

### Projects.jsx
- Flip card animations
- Project descriptions
- Skills used per project
- External links (TryHackMe, etc.)

### Contact.jsx
- Contact form with validation
- EmailJS integration
- Glowing input borders on focus
- Success/error messages
- Direct email link

### Footer.jsx
- Social media icons
- Copyright notice
- Animated tagline
- Hover effects

## Key Features

### Animations
- Framer Motion for smooth transitions
- Three.js for 3D sphere
- Scroll-triggered animations
- Hover effects on all interactive elements

### Styling
- TailwindCSS utility classes
- Custom cyber-green theme (#00FF88)
- Dark gradient background
- Neon glow effects
- Responsive breakpoints

### Performance
- Vite for fast builds
- Lazy loading
- Optimized 3D rendering
- Mobile-friendly animations

## Configuration Files

### package.json
- Project dependencies
- Build scripts
- Version information

### vite.config.js
- React plugin configuration
- Build settings

### tailwind.config.js
- Custom colors (cyber-green)
- Custom shadows (neon effects)
- Content paths

### postcss.config.js
- Tailwind and Autoprefixer setup

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Customization Points

1. **Colors**: `tailwind.config.js` → theme.extend.colors
2. **Fonts**: `index.html` → Google Fonts links
3. **Content**: Individual component files
4. **Social Links**: `Home.jsx` and `Footer.jsx`
5. **Skills**: `Skills.jsx` → skills array
6. **Projects**: `Projects.jsx` → projects array

## Dependencies

### Production
- react, react-dom: UI framework
- framer-motion: Animations
- @react-three/fiber, @react-three/drei: 3D graphics
- three: 3D library
- @emailjs/browser: Email functionality

### Development
- vite: Build tool
- @vitejs/plugin-react: React support
- tailwindcss: CSS framework
- postcss, autoprefixer: CSS processing

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## File Sizes (Approximate)

- Development: ~50MB (with node_modules)
- Production build: ~500KB (gzipped)
- Initial load: ~200KB

## Next Steps

1. Add your resume.pdf and profile.jpg to public/
2. Configure EmailJS (see EMAILJS_SETUP.md)
3. Customize content in component files
4. Test on mobile devices
5. Build and deploy

---

Need help? Check README.md or QUICKSTART.md
