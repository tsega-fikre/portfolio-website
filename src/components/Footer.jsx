import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Show back-to-top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Social links with safe icons (using simpleicons for consistency)
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/tsega-fikre', 
      icon: 'github',
      color: '#fff'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/tsegazeab-fikre-g-yesus-640452395/', 
      icon: 'linkedin',
      color: '#0077B5',
      customLogo: 'https://imgs.search.brave.com/kjn-0L9Pm54Ho6nZMYDkLbhzEd9cbOKjPvmooGJX0fk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/Mzg2LzYwMC9zbWFs/bC9saW5rZWRpbi1s/b2dvLW91dGxpbmUt/aWNvbi1hcHAtdHJh/bnNwYXJlbnQtYmFj/a2dyb3VuZC1wcmVt/aXVtLXNvY2lhbC1t/ZWRpYS1kZXNpZ24t/Zm9yLWRpZ2l0YWwt/ZG93bmxvYWQtZnJl/ZS1wbmcucG5n'
    },
    { 
      name: 'TryHackMe', 
      url: 'https://tryhackme.com/p/Tsega001', 
      icon: 'tryhackme',
      color: '#00FF88'
    },
    { 
      name: 'HackTheBox', 
      url: 'https://app.hackthebox.com/profile/Tsega01', 
      icon: 'hackthebox',
      color: '#9FEF00'
    },
    { 
      name: 'Telegram', 
      url: 'https://t.me/tsega0001', 
      icon: 'telegram',
      color: '#26A5E4'
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/tsega6437', 
      icon: 'instagram',
      color: '#E4405F'
    },
    { 
      name: 'Gmail', 
      url: 'mailto:tsegazaebfikre12@gmail.com', 
      icon: 'gmail',
      color: '#EA4335'
    },
  ]

  // Helper to get icon URL from simpleicons
  const getIconUrl = (iconName, color) => 
    `https://cdn.simpleicons.org/${iconName}/${color.replace('#', '')}`

  return (
    <footer className="relative bg-cyber-dark border-t border-cyber-green/30 py-12 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF8810_1px,transparent_1px),linear-gradient(to_bottom,#00FF8810_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent" />

      {/* Floating orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-cyber-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyber-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links with enhanced hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-6 flex-wrap justify-center"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
                title={link.name}
              >
                {/* Glow background */}
                <div className="absolute inset-0 bg-cyber-green/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon */}
                <img 
                  src={link.customLogo || getIconUrl(link.icon, link.color)}
                  alt={link.name}
                  className="relative w-8 h-8 transition-all group-hover:drop-shadow-[0_0_10px_#00FF88]"
                  onError={(e) => {
                    // Fallback to simpleicons without color if fails
                    e.target.src = `https://cdn.simpleicons.org/${link.icon}`
                  }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Divider with glow */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyber-green to-transparent" />

          {/* Copyright with glitch effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <p className="text-gray-400 text-center">
              © {new Date().getFullYear()}{' '}
              <span className="relative inline-block">
                <span className="text-cyber-green font-semibold">Tsegazeab Fikre</span>
                <motion.span
                  className="absolute inset-0 text-cyber-green/50"
                  animate={{ x: [-1, 1, -1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  Tsegazeab Fikre
                </motion.span>
              </span>
              . All rights reserved.
            </p>
          </motion.div>

          {/* Tagline with animated glow */}
          <motion.p
            animate={{ 
              textShadow: [
                '0 0 5px #00FF88', 
                '0 0 15px #00FF88', 
                '0 0 5px #00FF88'
              ] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-cyber-green text-sm font-semibold tracking-wider"
          >
            Securing the Digital World, One Hack at a Time
          </motion.p>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: showBackToTop ? 1 : 0,
              scale: showBackToTop ? 1 : 0.5,
              y: showBackToTop ? 0 : 20
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 p-3 bg-cyber-green text-black rounded-full shadow-[0_0_20px_#00FF88] hover:shadow-[0_0_30px_#00FF88] transition-shadow z-50"
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-scanline" />

      <style jsx>{`
        .bg-scanline {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 255, 136, 0.02) 0px,
            rgba(0, 255, 136, 0.02) 2px,
            transparent 2px,
            transparent 4px
          );
        }
      `}</style>
    </footer>
  )
}

export default Footer