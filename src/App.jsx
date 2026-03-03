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
  const [showResumeOptions, setShowResumeOptions] = useState(false)

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

        {/* Fixed Resume Button - Bottom Left */}
        <div className="fixed bottom-6 left-6 z-50">
          <motion.button
            onClick={() => setShowResumeOptions(!showResumeOptions)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyber-green to-green-400 text-black font-bold rounded-lg overflow-hidden group"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          {/* Resume Options Popup */}
          {showResumeOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full mb-2 left-0 flex gap-2 bg-black/90 backdrop-blur-sm border border-cyber-green/50 rounded-lg p-3 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
            >
              {/* View Icon */}
              <a
                href="https://drive.google.com/file/d/1ETCYTrZAVjtQjlYwDm5m1z-jlsj7640r/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowResumeOptions(false)}
                className="p-3 bg-cyber-green/20 border-2 border-cyber-green rounded-full hover:bg-cyber-green hover:scale-110 transition-all"
                title="View Resume"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyber-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </a>

              {/* Download Icon */}
              <a
                href="/certificates/resume.pdf"
                download="resume.pdf"
                onClick={() => setShowResumeOptions(false)}
                className="p-3 bg-cyber-green/20 border-2 border-cyber-green rounded-full hover:bg-cyber-green hover:scale-110 transition-all"
                title="Download Resume"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyber-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
