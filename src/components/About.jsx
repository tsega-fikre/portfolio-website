import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Counter component for stats
const Counter = ({ from = 0, to, duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let startTime
    let animationFrame
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * (to - from) + from))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }
    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(step)
    }, delay * 1000)
    return () => {
      clearTimeout(timeout)
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [isInView, from, to, duration, delay])

  return <span ref={ref}>{count}</span>
}

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Personal stats (adjust as needed)
  const stats = [
    { label: 'CTF Flags Captured', value: 45, suffix: '+' },
    { label: 'TryHackMe Rooms', value: 62, suffix: '+' },
    { label: 'HackTheBox Machines', value: 28, suffix: '' },
    { label: 'Certifications', value: 3, suffix: '+' },
  ]

  // Skills with proficiency (0-100)
  const skills = [
    { name: 'Network Security', level: 85 },
    { name: 'Penetration Testing', level: 75 },
    { name: 'Linux & Scripting', level: 90 },
    { name: 'Web Security', level: 70 },
    { name: 'Cryptography', level: 65 },
    { name: 'Incident Response', level: 60 },
  ]

  // Tags remain the same
  const tags = [
    'Ethical Hacker',
    'CTF Player',
    'Network Security',
    'Linux Enthusiast',
    'Problem Solver',
    'Lifelong Learner',
  ]

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Subtle dark overlay - lighter than home */}
      <div className="absolute inset-0 bg-black/25" />
      
      {/* Animated glowing orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cyber-green/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-green/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl w-full"
      >
        {/* Section title with glitch effect */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold inline-block text-cyber-green relative"
            animate={isInView ? { textShadow: ['0 0 10px #00FF88', '0 0 30px #00FF88', '0 0 10px #00FF88'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            About Me
            <motion.span
              className="absolute inset-0 text-cyber-green/50"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              About Me
            </motion.span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left column: image + stats cards */}
          <div className="space-y-8">
            {/* Image with 3D tilt effect */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden border-2 border-cyber-green/50 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
                whileHover={{ rotateX: 5, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="/portfolio.jpg"
                  alt="Tsegazeab Fikre"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600/0a0a0a/00FF88?text=TF'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent opacity-60" />
              </motion.div>
              {/* Decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-2 border-l-2 border-cyber-green" />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-2 border-r-2 border-cyber-green" />
            </motion.div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-cyber-dark/80 backdrop-blur-sm border border-cyber-green/30 rounded-xl p-4 text-center hover:border-cyber-green hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all"
                >
                  <div className="text-3xl font-bold text-cyber-green">
                    <Counter from={0} to={stat.value} duration={2} delay={0.2 + index * 0.1} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column: bio and skills */}
          <div className="space-y-6">
            {/* Introduction paragraphs with staggered animation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="prose prose-invert"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm <span className="text-cyber-green font-semibold">Tsegazeab Fikre</span>, a passionate
                cybersecurity student dedicated to protecting digital systems and uncovering vulnerabilities
                before malicious actors can exploit them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="prose prose-invert"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                My journey in cybersecurity is driven by curiosity and a commitment to continuous learning.
                I actively participate in <span className="text-cyber-green font-semibold">CTF competitions</span>,
                practice on platforms like <span className="text-cyber-green font-semibold">TryHackMe</span> and
                <span className="text-cyber-green font-semibold"> Hack The Box</span>, and constantly expand
                my knowledge in ethical hacking, penetration testing, and network security.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="prose prose-invert"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I believe in the power of <span className="text-cyber-green font-semibold">ethical hacking</span> to
                make the digital world safer. My goal is to contribute to cybersecurity by identifying weaknesses,
                securing systems, and sharing knowledge with the community. Every challenge I solve and every
                vulnerability I discover brings me closer to becoming a skilled security professional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="prose prose-invert"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not hunting for bugs or solving CTF challenges, I'm exploring new security tools,
                reading about the latest threats, and building projects that enhance my technical skills.
                I'm always eager to collaborate, learn, and grow in this ever-evolving field.
              </p>
            </motion.div>

            {/* Skills section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <h3 className="text-xl font-semibold text-cyber-green mb-4">Technical Proficiencies</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-cyber-green">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-cyber-dark/50 border border-cyber-green/30 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.9 + index * 0.1, duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyber-green to-cyber-green/80 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-3 pt-6"
            >
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,255,136,0.2)' }}
                  className="px-4 py-2 bg-cyber-green/10 border border-cyber-green/50 rounded-full text-cyber-green text-sm cursor-default transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Call-to-action button - Glowing Download Resume */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
              className="pt-6"
            >
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyber-green to-green-400 text-black font-bold rounded-lg overflow-hidden group relative"
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(0, 255, 136, 0.5), 0 0 30px rgba(0, 255, 136, 0.3)',
                    '0 0 25px rgba(0, 255, 136, 0.7), 0 0 50px rgba(0, 255, 136, 0.5)',
                    '0 0 15px rgba(0, 255, 136, 0.5), 0 0 30px rgba(0, 255, 136, 0.3)',
                  ],
                }}
                transition={{
                  boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Custom scanline effect */}
      <style jsx>{`
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}

export default About