import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import ProjectsGallery from './components/ProjectsGallery'
import AllProjectsPage from './components/AllProjectsPage'
import ProjectDetail from './components/ProjectDetail'
import Certificates from './components/Certificates'
import Footer from './components/Footer'
import MatrixRain from './components/MatrixRain'
import { validateConfig } from './utils/config'

function App() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize security and configuration
    const initializeApp = async () => {
      try {
        // Validate configuration
        validateConfig()
        
        // Set basic security headers via meta tags (limited browser support)
        const cspMeta = document.createElement('meta')
        cspMeta.httpEquiv = 'Content-Security-Policy'
        cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.emailjs.com;"
        document.head.appendChild(cspMeta)
        
        // Note: X-Frame-Options and X-Content-Type-Options should be set by web server in production
        // These meta tags are for development reference only
        if (import.meta.env.DEV) {
          console.log('🛡️ Security: CSP headers applied for development')
          console.log('📝 Note: Set X-Frame-Options and X-Content-Type-Options via web server in production')
        }
        
        setIsInitialized(true)
      } catch (error) {
        console.error('App initialization error:', error)
        setIsInitialized(true) // Continue anyway
      }
    }

    initializeApp()
  }, [])

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cyber-dark">
        <div className="text-cyber-green text-xl font-semibold animate-pulse">
          Initializing secure connection...
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen relative">
        <MatrixRain />
        <div className="relative z-10">
          <Navbar />
          
          <Routes>
            {/* Home page with all sections */}
            <Route path="/" element={
              <>
                <Home />
                <About />
                <Skills />
                <ProjectsGallery showViewAll={true} limit={4} />
                <Certificates />
                <Footer />
              </>
            } />
            
            {/* All Projects page */}
            <Route path="/all-projects" element={
              <>
                <AllProjectsPage />
                <Footer />
              </>
            } />
            
            {/* Individual Project Detail page */}
            <Route path="/projects/:projectId" element={
              <>
                <ProjectDetail />
                <Footer />
              </>
            } />
            
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Fixed Download Resume Button - Bottom Left */}
        <motion.a
          href="/certificates/resume.pdf"
          download="resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyber-green to-green-400 text-black font-bold rounded-lg overflow-hidden group"
          animate={{
            boxShadow: [
              '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
              '0 0 15px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.4)',
              '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Resume
          </span>
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.a>
      </div>
    </BrowserRouter>
  )
}

export default App
