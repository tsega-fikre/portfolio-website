import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProjectById } from '../data/projects'

const ProjectDetail = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const project = getProjectById(projectId)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (!project) {
      navigate('/#projects', { replace: true })
    }
  }, [project, navigate])

  if (!project) {
    return null
  }

  // Prepare gallery images – if no gallery, use main image
  const galleryImages = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image]

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 overflow-hidden">
      <div className="absolute top-40 left-20 w-72 h-72 bg-cyber-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/all-projects')}
          className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-black/50 border border-cyber-green/30 text-cyber-green rounded-lg hover:border-cyber-green hover:bg-cyber-green/10 hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
        >
          <span className="text-xl">←</span> Back to Projects
        </motion.button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Project Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Title with glitch effect */}
            <div>
              <h1 className="relative inline-block text-4xl md:text-5xl lg:text-6xl font-bold text-cyber-green mb-4">
                {project.title}
                <motion.span
                  className="absolute inset-0 text-cyber-green/50"
                  animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                >
                  {project.title}
                </motion.span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-cyber-green/20 border border-cyber-green/50 rounded-full text-cyber-green font-semibold text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Project Metadata */}
            <div className="grid grid-cols-2 gap-4">
              {project.role && (
                <div className="bg-cyber-dark/60 border border-cyber-green/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Role</div>
                  <div className="text-lg text-white font-semibold">{project.role}</div>
                </div>
              )}
              {project.duration && (
                <div className="bg-cyber-dark/60 border border-cyber-green/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Duration</div>
                  <div className="text-lg text-white font-semibold">{project.duration}</div>
                </div>
              )}
              {project.teamSize && (
                <div className="bg-cyber-dark/60 border border-cyber-green/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Team Size</div>
                  <div className="text-lg text-white font-semibold">{project.teamSize}</div>
                </div>
              )}
              {project.year && (
                <div className="bg-cyber-dark/60 border border-cyber-green/30 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Year</div>
                  <div className="text-lg text-white font-semibold">{project.year}</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyber-green text-black font-bold rounded-lg hover:bg-cyber-green/80 transition-all hover:shadow-[0_0_30px_#00FF88] group"
              >
                Visit Project
                <span className="group-hover:translate-x-1 transition-transform">↗</span>
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-cyber-green text-cyber-green font-bold rounded-lg hover:bg-cyber-green hover:text-black transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.335-1.76-1.335-1.76-1.09-.746.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.306.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Source Code
                </a>
              )}
            </div>

            {/* Features Section */}
            {project.features && project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-4"
              >
                <h2 className="text-2xl font-bold text-cyber-green mb-4">✨ Key Features</h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-cyber-green text-xl mt-1">▹</span>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Challenges & Outcome */}
            {project.challenges && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-cyber-green mb-2">⚡ Challenges</h2>
                <p className="text-gray-300 text-lg">{project.challenges}</p>
              </motion.div>
            )}
            {project.outcome && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-cyber-green mb-2">🎯 Outcome</h2>
                <p className="text-gray-300 text-lg">{project.outcome}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative rounded-xl overflow-hidden border-2 border-cyber-green/30 group">
              <motion.img
                key={selectedImage}
                src={galleryImages[selectedImage]}
                alt={`${project.title} screenshot ${selectedImage + 1}`}
                className="w-full h-auto object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x600/0a0a0a/00FF88?text=${encodeURIComponent(project.title)}`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Thumbnails (if multiple images) */}
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-cyber-green shadow-[0_0_15px_#00FF88]'
                        : 'border-cyber-green/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100/0a0a0a/00FF88?text='
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Technologies Section */}
        {project.technologies && project.technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold text-cyber-green mb-4 text-center">🛠️ Technologies Used</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-black/50 border border-cyber-green/30 rounded-lg text-gray-300 hover:border-cyber-green hover:text-cyber-green transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}

export default ProjectDetail