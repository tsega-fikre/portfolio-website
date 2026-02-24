import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from './ProjectCard'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Mouse position for parallax effect on background orbs
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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

  // Sample projects (replace with your actual data)
  const projects = [
    {
      id: 1,
      title: 'Network Vulnerability Scanner',
      description: 'Automated scanner that identifies open ports, services, and common vulnerabilities using Nmap and custom scripts.',
      image: '/projects/project1.jpg',
      link: 'https://github.com/yourusername/scanner',
      skills: ['Python', 'Nmap', 'Bash', 'Networking'],
      status: 'Completed',
      github: 'https://github.com/yourusername/scanner',
    },
    {
      id: 2,
      title: 'CTF Write-ups Platform',
      description: 'A platform to share and organize CTF write-ups with search, tags, and syntax highlighting.',
      image: '/projects/project2.jpg',
      link: 'https://ctf.yourdomain.com',
      skills: ['React', 'Node.js', 'MongoDB', 'Markdown'],
      status: 'In Progress',
      github: 'https://github.com/yourusername/ctf-platform',
    },
    {
      id: 3,
      title: 'Phishing Simulation Toolkit',
      description: 'Educational tool to demonstrate phishing attacks and train users in identifying suspicious emails.',
      image: '/projects/project3.jpg',
      link: 'https://github.com/yourusername/phish-sim',
      skills: ['Python', 'SMTP', 'HTML/CSS', 'Social Engineering'],
      status: 'Completed',
      github: 'https://github.com/yourusername/phish-sim',
    },
    {
      id: 4,
      title: 'SIEM Log Analyzer',
      description: 'Real-time log analysis dashboard using ELK stack to visualize security events and alerts.',
      image: '/projects/project4.jpg',
      link: 'https://github.com/yourusername/siem-analyzer',
      skills: ['ELK', 'Python', 'Docker', 'Security'],
      status: 'Completed',
      github: 'https://github.com/yourusername/siem-analyzer',
    },
  ]

  return (
    <section
      id="projects"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Subtle dark overlay - lighter */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Floating orbs with parallax */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-cyber-green/10 rounded-full blur-3xl"
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

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="relative z-10 max-w-6xl w-full"
      >
        {/* Section title with glitch */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ y: -20 }}
            animate={isInView ? { y: 0 } : {}}
            className="relative inline-block text-4xl md:text-5xl font-bold text-cyber-green"
          >
            Featured Projects
            <motion.span
              className="absolute inset-0 text-cyber-green/50"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              Featured Projects
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
          >
            A selection of my work in cybersecurity, development, and beyond. Hover over each card to explore.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All button with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-cyber-green text-cyber-green font-semibold rounded-lg overflow-hidden group"
          >
            {/* Background glow on hover */}
            <motion.div
              className="absolute inset-0 bg-cyber-green"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: 'inherit' }}
            />
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              animate={{ boxShadow: ['0 0 0px #00FF88', '0 0 20px #00FF88', '0 0 0px #00FF88'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">View All Projects</span>
            <motion.svg
              className="w-5 h-5 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}

export default Projects