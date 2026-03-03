import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const CertificateCard = ({ cert, index, isInView }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-black/80 border border-cyber-green/30 rounded-xl overflow-hidden hover:border-cyber-green transition-all cursor-default"
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,255,136,0.15), transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={hovered ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Certificate Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-contain p-4 transition-transform duration-300"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          loading="lazy"
        />
        
        {/* Overlay with view and download icons on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4"
        >
          {/* View/Eye Icon */}
          <a
            href={cert.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-cyber-green/20 backdrop-blur-sm border-2 border-cyber-green rounded-full hover:bg-cyber-green hover:scale-110 transition-all shadow-[0_0_20px_#00FF88]"
            onClick={(e) => e.stopPropagation()}
            aria-label="View certificate"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-cyber-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </a>

          {/* Download Icon */}
          <a
            href={cert.downloadUrl}
            download
            className="p-4 bg-cyber-green/20 backdrop-blur-sm border-2 border-cyber-green rounded-full hover:bg-cyber-green hover:scale-110 transition-all shadow-[0_0_20px_#00FF88]"
            onClick={(e) => e.stopPropagation()}
            aria-label="Download certificate"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-cyber-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Certificate Info */}
      <div className="p-4 border-t border-cyber-green/30">
        <h3 className="text-lg font-bold text-cyber-green mb-1 group-hover:text-cyber-green transition-colors">
          {cert.title}
        </h3>
        <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
        <p className="text-gray-500 text-xs">{cert.date}</p>
      </div>

      {/* Glowing border overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={hovered ? { boxShadow: '0 0 30px #00FF88, 0 0 60px #00FF88' } : { boxShadow: '0 0 0 #00FF88' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

const Certificates = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const certificates = [
    {
      title: 'Introduction to Cyber Security',
      issuer: 'TryHackMe',
      date: '2024',
      image: '/certificates/THM-BOLYF9EST6.png',
      viewUrl: 'https://tryhackme.com/certificate/THM-BOLYF9EST6',
      downloadUrl: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-BOLYF9EST6.pdf',
    },
    {
      title: 'Cyber Security 101',
      issuer: 'TryHackMe',
      date: '2024',
      image: '/certificates/THM-TQTZOS8A5S.png',
      viewUrl: 'https://tryhackme.com/certificate/THM-TQTZOS8A5S',
      downloadUrl: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-TQTZOS8A5S.pdf',
    },
    {
      title: 'Pre Security',
      issuer: 'TryHackMe',
      date: '2024',
      image: '/certificates/THM-WQ1IFMEP4C.png',
      viewUrl: 'https://tryhackme.com/certificate/THM-WQ1IFMEP4C',
      downloadUrl: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-WQ1IFMEP4C.pdf',
    },
    {
      title: 'Advent of Cyber',
      issuer: 'TryHackMe',
      date: '2024',
      image: '/certificates/THM-OOALWO7PPW.png',
      viewUrl: 'https://tryhackme.com/certificate/THM-OOALWO7PPW',
      downloadUrl: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-OOALWO7PPW.pdf',
    },
  ]

  return (
    <section
      id="certificates"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="absolute top-40 left-20 w-72 h-72 bg-cyber-green/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl animate-pulse delay-1000" />

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
            Certificates & Achievements
            <motion.span
              className="absolute inset-0 text-cyber-green/50"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              Certificates & Achievements
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
          >
            Professional certifications and achievements that validate my cybersecurity knowledge and skills.
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.title} cert={cert} index={index} isInView={isInView} />
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}

export default Certificates