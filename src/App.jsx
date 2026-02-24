import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import ProjectsGallery from './components/ProjectsGallery'
import AllProjectsPage from './components/AllProjectsPage'
import ProjectDetail from './components/ProjectDetail'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MatrixRain from './components/MatrixRain'
import DocumentOrder from './components/DocumentOrder'
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
                <Contact />
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
        
        {/* Security and Feature Components */}
        <DocumentOrder />
      </div>
    </BrowserRouter>
  )
}

export default App
