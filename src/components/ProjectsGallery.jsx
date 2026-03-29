import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjects } from '../data/projects'
import ProjectCard from './ProjectCard'
import EmptyState from './EmptyState'

const ProjectsGallery = ({ showViewAll = true, limit = null }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const navigate = useNavigate()

  const allProjects = getProjects()
  // Only show featured projects (not coming soon) on home page
  const featuredProjects = allProjects.filter(p => p.featured !== false)
  const projects = limit ? featuredProjects.slice(0, limit) : featuredProjects
  const isOdd = projects.length % 2 !== 0
  const hiddenCount = allProjects.length - featuredProjects.length

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyber-green glow-text"
        >
          Projects
        </motion.h2>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {(isOdd ? projects.slice(0, -1) : projects).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </div>

            {isOdd && (
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (projects.length - 1) * 0.15 }}
                  className="w-full md:w-1/2"
                >
                  <ProjectCard project={projects[projects.length - 1]} index={projects.length - 1} />
                </motion.div>
              </div>
            )}

            {/* Teaser for more projects */}
            {showViewAll && hiddenCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="mt-6 mb-8 border border-cyber-green/20 rounded-lg p-6 text-center bg-black/40 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl mb-2"
                >
                  🚧
                </motion.div>
                <p className="text-cyber-green font-semibold text-lg mb-1">
                  +{hiddenCount} more project{hiddenCount > 1 ? 's' : ''} in the works
                </p>
                <p className="text-gray-400 text-sm">Want to see what's coming? Explore all projects.</p>
              </motion.div>
            )}

            {showViewAll && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="text-center mt-4"
              >
                <button
                  onClick={() => navigate('/all-projects')}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-cyber-green text-black font-bold rounded-lg hover:bg-cyber-green/80 transition-all text-lg group"
                >
                  View All Projects
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </section>
  )
}

export default ProjectsGallery
