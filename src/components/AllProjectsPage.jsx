import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProjects } from '../data/projects'
import ProjectCard from './ProjectCard'
import EmptyState from './EmptyState'

const AllProjectsPage = () => {
  const navigate = useNavigate()
  const projects = getProjects()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax effect for background orbs
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 overflow-hidden">
      {/* Floating orbs with parallax */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-cyber-green/5 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -1.5,
          y: mousePosition.y * -1.5,
        }}
        transition={{ type: 'spring', stiffness: 50 }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button with enhanced hover */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/#projects')}
          className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-black/50 border border-cyber-green/30 text-cyber-green rounded-lg hover:border-cyber-green hover:bg-cyber-green/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
        >
          <span className="text-xl">←</span> Back to Home
        </motion.button>

        {/* Page Title with glitch effect */}
        <div className="text-center mb-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block text-5xl md:text-7xl font-bold text-cyber-green"
          >
            All Projects
            <motion.span
              className="absolute inset-0 text-cyber-green/50"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              All Projects
            </motion.span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 mb-16 text-lg max-w-2xl mx-auto"
        >
          Explore my complete portfolio of projects — each one a step in my journey through cybersecurity and development.
        </motion.p>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* Optional: Project count */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 text-gray-500"
          >
            Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AllProjectsPage