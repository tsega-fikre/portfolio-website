import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjects } from '../data/projects'
import ProjectCard from './ProjectCard'
import EmptyState from './EmptyState'

const ProjectsGallery = ({ showViewAll = true, limit = null }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const navigate = useNavigate()
  
  const allProjects = getProjects()
  const projects = limit ? allProjects.slice(0, limit) : allProjects

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="max-w-6xl w-full"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-cyber-green glow-text">
          Projects
        </h2>

        {projects.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {showViewAll && allProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="text-center"
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
