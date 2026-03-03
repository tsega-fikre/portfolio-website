import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'About', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Skills', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { name: 'Projects', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { name: 'Certificates', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  ]

  // Toggle button animation variants
  const buttonVariants = {
    open: { rotate: 90, scale: 1.1 },
    closed: { rotate: 0, scale: 1 },
  }

  // Mobile menu container variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  }

  // Mobile menu item variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300 } },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-black/95 backdrop-blur-md border-b border-cyber-green/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img 
              src="/webLogo.jpg" 
              alt="Logo" 
              className="w-10 h-10 rounded-full border-2 border-cyber-green shadow-[0_0_10px_rgba(0,255,136,0.5)]"
            />
            <span className="text-2xl font-bold text-cyber-green glow-text">TF</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                className="relative flex items-center gap-2 text-white hover:text-cyber-green transition-colors group px-3 py-2"
                whileHover={{
                  scale: 1.1,
                  textShadow: '0 0 8px #00FF88',
                  transition: { type: 'spring', stiffness: 400 },
                }}
                whileTap={{
                  scale: 0.95,
                  backgroundColor: 'rgba(0, 255, 136, 0.2)',
                  borderRadius: '0.5rem',
                  transition: { duration: 0.1 },
                }}
              >
                {/* Background glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(0,255,136,0.2) 0%, transparent 70%)',
                    filter: 'blur(4px)',
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {/* Icon with rotation on hover */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.3 } }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </motion.svg>
                <span className="relative z-10">{item.name}</span>
                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-cyber-green"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button with animation */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cyber-green"
            variants={buttonVariants}
            animate={isOpen ? 'open' : 'closed'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-black/95 border-t border-cyber-green/30 overflow-hidden"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                variants={itemVariants}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-cyber-green/10 hover:text-cyber-green transition-colors"
                whileHover={{
                  scale: 1.02,
                  x: 5,
                  backgroundColor: 'rgba(0,255,136,0.1)',
                  transition: { type: 'spring', stiffness: 300 },
                }}
                whileTap={{
                  scale: 0.98,
                  backgroundColor: 'rgba(0,255,136,0.3)',
                  transition: { duration: 0.1 },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span>{item.name}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar