import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import { sanitizeHTML, validateEmail, validateName, validateMessage, checkRateLimit } from '../utils/security'
import { CONFIG } from '../utils/config'

// 3D Animated Background Component
const BackgroundSphere = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <Sphere args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          color="#00FF88"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.2}
        />
      </Sphere>
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  )
}

const Contact = () => {
  const ref = useRef(null)
  const formRef = useRef()
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Mouse position for parallax effect on background
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

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Please enter a valid name (letters, spaces, hyphens only)'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (!validateMessage(formData.message)) {
      newErrors.message = 'Message must be between 10-1000 characters and contain no suspicious content'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    const sanitizedValue = sanitizeHTML(value)
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setStatus('validation-error')
      return
    }

    if (!checkRateLimit('contact', CONFIG.RATE_LIMITS.CONTACT_FORM.maxAttempts, CONFIG.RATE_LIMITS.CONTACT_FORM.timeWindow)) {
      setStatus('rate-limited')
      setErrors({ submit: 'Too many messages sent. Please try again later.' })
      return
    }

    setStatus('sending')
    setErrors({})

    try {
      await emailjs.sendForm(
        CONFIG.EMAIL.SERVICE_ID,
        CONFIG.EMAIL.TEMPLATE_ID,
        formRef.current,
        CONFIG.EMAIL.PUBLIC_KEY
      )
      
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      formRef.current.reset()
      setTimeout(() => setStatus(''), 5000)
    } catch (error) {
      console.error('Email send error:', error)
      setStatus('error')
      setErrors({ submit: 'Failed to send message. Please try again or contact directly via email.' })
      setTimeout(() => setStatus(''), 5000)
    }
  }

  // Floating label animations
  const labelVariants = {
    default: { y: 0, scale: 1, color: '#9CA3AF' },
    focused: { y: -28, scale: 0.85, color: '#00FF88' },
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
    >
      {/* Subtle dark overlay - lighter */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 opacity-30">
        <BackgroundSphere />
      </div>

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
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Section title with glitch */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ y: -20 }}
            animate={isInView ? { y: 0 } : {}}
            className="relative inline-block text-4xl md:text-5xl font-bold text-cyber-green"
          >
            Contact
            <motion.span
              className="absolute inset-0 text-cyber-green/50"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              Contact
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4"
          >
            Send me a message
          </motion.p>
        </div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="space-y-8 backdrop-blur-lg bg-black/70 p-8 rounded-2xl border border-cyber-green/30 shadow-[0_0_50px_rgba(0,255,136,0.1)]"
        >
          {/* Name Field */}
          <div className="relative">
            <motion.label
              htmlFor="name"
              className="absolute left-4 pointer-events-none text-gray-400"
              initial="default"
              animate={formData.name ? 'focused' : 'default'}
              variants={labelVariants}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Your Name *
            </motion.label>
            <input
              type="text"
              id="name"
              name="user_name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-transparent border-2 rounded-lg focus:outline-none text-white transition-all ${
                errors.name ? 'border-red-500' : 'border-cyber-green/30 focus:border-cyber-green'
              }`}
              maxLength={CONFIG.VALIDATION.NAME_MAX_LENGTH}
              required
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <motion.label
              htmlFor="email"
              className="absolute left-4 pointer-events-none text-gray-400"
              initial="default"
              animate={formData.email ? 'focused' : 'default'}
              variants={labelVariants}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Your Email *
            </motion.label>
            <input
              type="email"
              id="email"
              name="user_email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-transparent border-2 rounded-lg focus:outline-none text-white transition-all ${
                errors.email ? 'border-red-500' : 'border-cyber-green/30 focus:border-cyber-green'
              }`}
              maxLength={CONFIG.VALIDATION.EMAIL_MAX_LENGTH}
              required
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Message Field */}
          <div className="relative">
            <motion.label
              htmlFor="message"
              className="absolute left-4 pointer-events-none text-gray-400"
              initial="default"
              animate={formData.message ? 'focused' : 'default'}
              variants={labelVariants}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Your Message *
            </motion.label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={`w-full px-4 py-3 bg-transparent border-2 rounded-lg focus:outline-none text-white transition-all resize-none ${
                errors.message ? 'border-red-500' : 'border-cyber-green/30 focus:border-cyber-green'
              }`}
              rows="5"
              minLength={CONFIG.VALIDATION.MESSAGE_MIN_LENGTH}
              maxLength={CONFIG.VALIDATION.MESSAGE_MAX_LENGTH}
              required
            />
            <div className="flex justify-between items-center mt-1">
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm"
                >
                  {errors.message}
                </motion.p>
              )}
              <p className="text-gray-500 text-sm ml-auto">
                {formData.message.length}/{CONFIG.VALIDATION.MESSAGE_MAX_LENGTH}
              </p>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500 rounded-lg p-3"
            >
              <p className="text-red-400 text-center">{errors.submit}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === 'sending' || status === 'rate-limited'}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full px-8 py-4 bg-gradient-to-r from-cyber-green to-green-400 text-black font-bold rounded-lg overflow-hidden group"
          >
            <span className="relative z-10">
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ opacity: 0.2 }}
            />
          </motion.button>

          {/* Status Messages */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-cyber-green"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Message sent successfully!</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-red-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Failed to send. Try again later.</span>
            </motion.div>
          )}

          {status === 'rate-limited' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-yellow-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Too many attempts. Please wait.</span>
            </motion.div>
          )}
        </motion.form>

        {/* Direct Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-2">Prefer email?</p>
          <a
            href="mailto:tsegazaebfikre12@gmail.com"
            className="text-cyber-green hover:text-cyber-green/80 font-semibold text-lg inline-flex items-center gap-2 group"
          >
            <span>tsegazaebfikre12@gmail.com</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact