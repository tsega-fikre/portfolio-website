import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { certificates } from './Certificates'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CertCard = ({ cert, index }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-black/80 border border-cyber-green/30 rounded-xl overflow-hidden hover:border-cyber-green transition-all"
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-contain p-4 transition-transform duration-300"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          loading="lazy"
        />
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4"
        >
          <a href={cert.viewUrl} target="_blank" rel="noopener noreferrer"
            className="p-4 bg-cyber-green/20 border-2 border-cyber-green rounded-full hover:bg-cyber-green hover:scale-110 transition-all"
            onClick={e => e.stopPropagation()} aria-label="View">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyber-green hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
          <a href={cert.downloadUrl} download
            className="p-4 bg-cyber-green/20 border-2 border-cyber-green rounded-full hover:bg-cyber-green hover:scale-110 transition-all"
            onClick={e => e.stopPropagation()} aria-label="Download">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyber-green hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </motion.div>
      </div>
      <div className="p-4 border-t border-cyber-green/30">
        <h3 className="text-lg font-bold text-cyber-green mb-1">{cert.title}</h3>
        <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
        <p className="text-gray-500 text-xs">{cert.date}</p>
      </div>
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={hovered ? { boxShadow: '0 0 30px #00FF88, 0 0 60px #00FF88' } : { boxShadow: '0 0 0 #00FF88' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

const AllCertificatesPage = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyber-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-black/50 border border-cyber-green/30 text-cyber-green rounded-lg hover:border-cyber-green hover:bg-cyber-green/10 transition-all"
        >
          <span className="text-xl">←</span> Back to Home
        </motion.button>

        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative inline-block text-5xl md:text-7xl font-bold text-cyber-green"
          >
            All Certificates
            <motion.span
              className="absolute inset-0 text-cyber-green/50"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              All Certificates
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 text-lg"
          >
            Showing {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <CertCard key={cert.title} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllCertificatesPage
