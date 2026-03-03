import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const EmptyState = () => {
  const navigate = useNavigate()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Subtle parallax effect on the orb
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative flex flex-col items-center justify-center min-h-[500px] py-20 px-4 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF8810_1px,transparent_1px),linear-gradient(to_bottom,#00FF8810_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-green/10 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyber-green/5 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-md">
        {/* Animated image with glow */}
        <motion.div
          className="mb-8 relative"
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              'drop-shadow(0 0 10px #00FF88)',
              'drop-shadow(0 0 30px #00FF88)',
              'drop-shadow(0 0 10px #00FF88)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-0 bg-cyber-green/20 blur-3xl rounded-full" />
          <img
            src="/projects/coming-soon.png"
            alt="Projects Coming Soon"
            className="relative w-64 h-64 mx-auto object-contain"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400/0a0a0a/00FF88?text=Coming+Soon'
            }}
          />
        </motion.div>

        {/* Glitch title */}
        <div className="relative mb-4">
          <h3 className="relative inline-block text-3xl md:text-4xl font-bold text-cyber-green">
            Projects Coming Soon
            <motion.span
              className="absolute inset-0 text-cyber-green/50"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              Projects Coming Soon
            </motion.span>
          </h3>
        </div>

        <p className="text-gray-400 text-lg mb-8">
          Exciting projects are in the works! Check back later to see what I've been building.
        </p>

        {/* Optional button to return home */}
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-transparent border-2 border-cyber-green text-cyber-green rounded-lg hover:bg-cyber-green hover:text-black transition-all font-semibold group"
        >
          Return Home
        </motion.button>
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
    </motion.div>
  )
}

export default EmptyState