import { motion, useCycle, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'

const AnimatedSphere = () => {
  return (
    <>
      <Sphere visible args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#00FF88"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

const Home = () => {
  // Typing animation roles
  const roles = [
    'Cybersecurity Student',
    'Ethical Hacker',
    'Penetration Tester',
    'Security Researcher',
  ]
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex]
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length - 1))
        setTypingSpeed(75)
      } else {
        setDisplayText(currentRole.substring(0, displayText.length + 1))
        setTypingSpeed(150)
      }

      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000)
        setTypingSpeed(75)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setTypingSpeed(150)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, typingSpeed, roles])

  // Social links with original logos
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/tsega-fikre', 
      logo: 'https://cdn.simpleicons.org/github/white',
      verified: true
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/tsegazeab-fikre-g-yesus-640452395/', 
      logo: 'https://imgs.search.brave.com/kjn-0L9Pm54Ho6nZMYDkLbhzEd9cbOKjPvmooGJX0fk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNjUv/Mzg2LzYwMC9zbWFs/bC9saW5rZWRpbi1s/b2dvLW91dGxpbmUt/aWNvbi1hcHAtdHJh/bnNwYXJlbnQtYmFj/a2dyb3VuZC1wcmVt/aXVtLXNvY2lhbC1t/ZWRpYS1kZXNpZ24t/Zm9yLWRpZ2l0YWwt/ZG93bmxvYWQtZnJl/ZS1wbmcucG5n',
      verified: true
    },
    { 
      name: 'TryHackMe', 
      url: 'https://tryhackme.com/p/Tsega001', 
      logo: 'https://cdn.simpleicons.org/tryhackme/00FF88',
      verified: true
    },
    { 
      name: 'HackTheBox', 
      url: 'https://app.hackthebox.com/profile/Tsega01', 
      logo: 'https://cdn.simpleicons.org/hackthebox/9FEF00',
      verified: true
    },
    { 
      name: 'Telegram', 
      url: 'https://t.me/tsega0001', 
      logo: 'https://cdn.simpleicons.org/telegram/26A5E4',
      verified: true
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/tsega6437', 
      logo: 'https://cdn.simpleicons.org/instagram/E4405F',
      verified: true
    },
    { 
      name: 'Gmail', 
      url: 'mailto:tsegazaebfikre12@gmail.com', 
      logo: 'https://cdn.simpleicons.org/gmail/EA4335',
      verified: true
    },
  ]

  // Safe link handler
  const handleLinkClick = (url, name) => {
    if (url.startsWith('http') && !url.includes('javascript:') && !url.includes('data:')) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else if (url.startsWith('mailto:')) {
      window.location.href = url
    } else {
      console.warn(`Blocked potentially unsafe link: ${name}`)
    }
  }

  // Scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Animated particles / orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyber-green/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, -100, null],
              x: [null, Math.random() * 100 - 50, null],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 3D Sphere with scanline effect */}
      <div className="absolute inset-0 opacity-40">
        <Canvas>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <AnimatedSphere />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-cyber-dark pointer-events-none" />
        <div className="absolute inset-0 bg-scanline pointer-events-none" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image with enhanced glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-cyber-green/20 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.img 
              src="/portfolio.jpg" 
              alt="Tsegazeab Fikre"
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-cyber-green object-cover"
              animate={{
                boxShadow: [
                  '0 0 20px #00FF88, 0 0 40px #00FF88, 0 0 60px #00FF88',
                  '0 0 40px #00FF88, 0 0 80px #00FF88, 0 0 120px #00FF88',
                  '0 0 20px #00FF88, 0 0 40px #00FF88, 0 0 60px #00FF88',
                ],
                rotate: [0, 360],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
            />
          </motion.div>

          {/* Name with glitch effect */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 relative inline-block"
            animate={{ textShadow: ['0 0 10px #00FF88', '0 0 30px #00FF88', '0 0 10px #00FF88'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="relative">
              Hi, I'm{' '}
              <span className="text-cyber-green relative">
                Tsegazeab Fikre
                <motion.span
                  className="absolute inset-0 text-cyber-green/50"
                  animate={{ x: [-2, 2, -2], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  Tsegazeab Fikre
                </motion.span>
              </span>
            </span>
          </motion.h1>
          
          {/* Typing animation for roles */}
          <div className="h-12 mb-4">
            <motion.p
              key={displayText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl md:text-2xl text-gray-300"
            >
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-cyber-green ml-1"
              />
            </motion.p>
          </div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/30 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
            </span>
            <span className="text-sm text-cyber-green">Available for opportunities</span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-3 bg-transparent border-2 border-cyber-green rounded-lg overflow-hidden"
            >
              <span className="relative z-10 text-cyber-green font-semibold group-hover:text-cyber-dark transition-colors duration-300">
                View My Work
              </span>
              <motion.div
                className="absolute inset-0 bg-cyber-green"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Social links with enhanced hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-6 flex-wrap"
          >
            {socialLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => handleLinkClick(link.url, link.name)}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="transition-all cursor-pointer relative group"
                title={link.name}
                aria-label={`Visit ${link.name} profile`}
              >
                <div className="absolute inset-0 bg-cyber-green/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src={link.logo} 
                  alt={link.name}
                  className="relative w-10 h-10 hover:drop-shadow-[0_0_10px_#00FF88] cursor-pointer"
                />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator with enhanced animation */}
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-cyber-green rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-cyber-green rounded-full mt-2"
          />
        </div>
      </motion.div>

      {/* Add custom CSS for scanline effect */}
      <style jsx>{`
        .bg-scanline {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 255, 136, 0.03) 0px,
            rgba(0, 255, 136, 0.03) 2px,
            transparent 2px,
            transparent 4px
          );
          pointer-events: none;
          animation: scan 10s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}

export default Home