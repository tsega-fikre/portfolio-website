import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ProjectCard = ({ project, index = 0 }) => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 3D tilt effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  const handleClick = () => {
    navigate(`/projects/${project.id}`)
  }

  // Prevent click when interacting with GitHub link
  const handleGithubClick = (e) => {
    e.stopPropagation()
    if (project.github) {
      window.open(project.github, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-black/80 border border-cyber-green/30 rounded-lg overflow-hidden hover:border-cyber-green transition-all cursor-pointer"
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,255,136,0.2), transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={hovered ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Project Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/600x400/0a0a0a/00FF88?text=${encodeURIComponent(project.title)}`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Status Badge */}
        {project.status && (
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
              project.status === 'Completed'
                ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                : project.status === 'In Progress'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
            }`}
          >
            {project.status}
          </span>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-cyber-green mb-3 group-hover:text-cyber-green transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-cyber-green/20 border border-cyber-green/50 rounded-full text-cyber-green text-xs"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="px-3 py-1 bg-cyber-green/20 border border-cyber-green/50 rounded-full text-cyber-green text-xs">
              +{project.skills.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons - appear on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="flex gap-3"
        >
          <button
            onClick={handleClick}
            className="flex-1 px-4 py-2 bg-cyber-green text-black font-semibold rounded-lg hover:bg-cyber-green/90 transition-colors"
          >
            Details
          </button>
          {project.github && (
            <button
              onClick={handleGithubClick}
              className="p-2 border border-cyber-green/50 rounded-lg text-cyber-green hover:bg-cyber-green/10 transition-colors"
              aria-label="View on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.306.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </button>
          )}
        </motion.div>
      </div>

      {/* Glowing border overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={hovered ? { boxShadow: '0 0 30px #00FF88, 0 0 60px #00FF88' } : { boxShadow: '0 0 0 #00FF88' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default ProjectCard