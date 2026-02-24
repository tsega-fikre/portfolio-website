# Deployment Guide

Deploy your portfolio to the web for free!

## Option 1: Vercel (Recommended) ⚡

Vercel offers the best experience for React/Vite projects.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Done!** Your site is live at `your-project.vercel.app`

### Custom Domain (Optional)
- Go to Project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

## Option 2: Netlify 🌐

Great alternative with drag-and-drop deployment.

### Method A: Drag & Drop

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist/` folder to the deploy area
   - Done!

### Method B: Git Integration

1. Push to GitHub (see Vercel steps)
2. Connect repository on Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

---

## Option 3: GitHub Pages 📄

Free hosting directly from your GitHub repository.

### Steps:

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   Add base URL:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/portfolio/', // Replace with your repo name
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

6. **Access your site**
   `https://YOUR_USERNAME.github.io/portfolio/`

---

## Option 4: Cloudflare Pages ☁️

Fast global CDN with unlimited bandwidth.

### Steps:

1. Push to GitHub
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect your repository
4. Build settings:
   - Build command: `npm run build`
   - Build output: `dist`
5. Deploy

---

## Option 5: Render 🎨

Free tier with automatic deployments.

### Steps:

1. Push to GitHub
2. Go to [render.com](https://render.com)
3. New → Static Site
4. Connect repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Create Static Site

---

## Pre-Deployment Checklist ✅

Before deploying, make sure:

- [ ] Added `resume.pdf` to `public/` folder
- [ ] Added `profile.jpg` to `public/` folder
- [ ] Configured EmailJS (or removed form)
- [ ] Updated all personal information
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] Tested production build with `npm run preview`
- [ ] Updated social media links
- [ ] Checked mobile responsiveness

---

## Build Optimization Tips 🚀

### Reduce Bundle Size

1. **Analyze bundle**
   ```bash
   npm run build -- --mode production
   ```

2. **Lazy load components**
   ```javascript
   const Projects = lazy(() => import('./components/Projects'))
   ```

3. **Optimize images**
   - Compress profile.jpg (use tinypng.com)
   - Use WebP format if possible

### Performance

- Enable gzip compression (automatic on most platforms)
- Use CDN for static assets
- Minimize 3D complexity for mobile

---

## Environment Variables

If you need environment variables (e.g., for EmailJS):

### Vercel/Netlify
Add in dashboard under Environment Variables:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Access in code
```javascript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
```

---

## Troubleshooting

### Build fails?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### 404 on routes?
- For SPA routing, add `_redirects` file to `public/`:
  ```
  /*    /index.html   200
  ```

### Assets not loading?
- Check `base` in `vite.config.js`
- Ensure paths start with `/` (e.g., `/resume.pdf`)

### Slow initial load?
- Reduce 3D complexity
- Lazy load heavy components
- Optimize images

---

## Custom Domain Setup

### Vercel
1. Add domain in project settings
2. Update DNS:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

### Netlify
1. Add domain in site settings
2. Update DNS:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Cloudflare
- Automatic if domain is on Cloudflare

---

## Monitoring & Analytics

### Add Google Analytics

1. Get tracking ID from analytics.google.com
2. Add to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

---

## Continuous Deployment

Once connected to Git:
- Push to main branch → Auto-deploy
- Pull requests → Preview deployments
- Rollback to previous versions anytime

---

## Cost Comparison

| Platform | Free Tier | Bandwidth | Custom Domain |
|----------|-----------|-----------|---------------|
| Vercel | ✅ | 100GB/mo | ✅ |
| Netlify | ✅ | 100GB/mo | ✅ |
| GitHub Pages | ✅ | 100GB/mo | ✅ |
| Cloudflare | ✅ | Unlimited | ✅ |
| Render | ✅ | 100GB/mo | ✅ |

All options are free for personal portfolios!

---

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Netlify Docs: [docs.netlify.com](https://docs.netlify.com)
- GitHub Pages: [pages.github.com](https://pages.github.com)

---

Happy deploying! 🚀
