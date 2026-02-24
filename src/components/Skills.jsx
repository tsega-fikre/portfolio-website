import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// Skill item component with progress bar and hover details
const SkillItem = ({ skill, index, isInView }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-white font-medium">{skill.name}</span>
        </div>
        <motion.span
          animate={{ scale: hovered ? 1.1 : 1 }}
          className="text-cyber-green font-bold"
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-900/80 rounded-full h-2.5 overflow-hidden border border-cyber-green/30">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-cyber-green to-green-400 rounded-full shadow-[0_0_10px_#00FF88]"
        />
      </div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-cyber-dark border border-cyber-green rounded-lg text-sm text-cyber-green whitespace-nowrap z-10"
      >
        {skill.description || `${skill.name} proficiency`}
      </motion.div>
    </motion.div>
  )
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Categorized skills data
  const skillCategories = [
    {
      title: '🔐 Network Security',
      icon: '🌐',
      skills: [
        { name: 'Networking Fundamentals', level: 85, icon: '📡', description: 'TCP/IP, OSI, routing, switching' },
        { name: 'Wireshark', level: 80, icon: '🦈', description: 'Packet analysis, filtering, troubleshooting' },
        { name: 'Nmap', level: 85, icon: '🔍', description: 'Network discovery, vulnerability scanning' },
        { name: 'Firewalls & IDS', level: 70, icon: '🛡️', description: 'iptables, Snort, Suricata' },
      ],
    },
    {
      title: '⚔️ Offensive Security',
      icon: '🎯',
      skills: [
        { name: 'Penetration Testing', level: 75, icon: '🔨', description: 'Metasploit, manual exploitation' },
        { name: 'Web Exploitation', level: 70, icon: '🕸️', description: 'SQLi, XSS, CSRF, Burp Suite' },
        { name: 'Password Cracking', level: 65, icon: '🔑', description: 'John, Hashcat, wordlists' },
        { name: 'Social Engineering', level: 60, icon: '🎭', description: 'Phishing, pretexting' },
      ],
    },
    {
      title: '🛡️ Defensive Security',
      icon: '🛡️',
      skills: [
        { name: 'Incident Response', level: 60, icon: '🚨', description: 'Triage, containment, recovery' },
        { name: 'Log Analysis', level: 75, icon: '📋', description: 'SIEM, ELK stack, grep' },
        { name: 'Vulnerability Management', level: 70, icon: '📊', description: 'Nessus, OpenVAS, prioritization' },
        { name: 'Security Hardening', level: 80, icon: '🔒', description: 'System config, CIS benchmarks' },
      ],
    },
    {
      title: '💻 Development & Scripting',
      icon: '⚙️',
      skills: [
        { name: 'Bash Scripting', level: 90, icon: '🐧', description: 'Automation, system administration' },
        { name: 'Python', level: 75, icon: '🐍', description: 'Exploit dev, scripting, automation' },
        { name: 'Linux', level: 90, icon: '🐧', description: 'Administration, command-line, permissions' },
        { name: 'Git', level: 70, icon: '📦', description: 'Version control, collaboration' },
      ],
    },
  ]

  // Tools & Technologies (for cloud)
  const tools = [
    'Kali Linux', 'Metasploit', 'Burp Suite', 'Wireshark', 'Nmap', 'John the Ripper',
    'Hydra', 'SQLmap', 'Nikto', 'Gobuster', 'Netcat', 'tcpdump', 'Socat', 'Docker',
    'VirtualBox', 'VMware', 'Python', 'Bash', 'PowerShell', 'Git', 'ELK Stack',
  ]

  return (
    <section
      id="skills"
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
            Skills & Expertise
            <motion.span
              className="absolute inset-0 text-cyber-green/50"
              animate={{ x: [-2, 2, -2], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            >
              Skills & Expertise
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-4 max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical abilities and areas of focus in cybersecurity.
          </motion.p>
        </div>

        {/* Skills categories grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + catIndex * 0.1 }}
              className="bg-cyber-dark/60 backdrop-blur-sm border border-cyber-green/30 rounded-xl p-6 hover:border-cyber-green transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-cyber-green">{category.title}</h3>
              </div>
              <div className="space-y-6">
                {category.skills.map((skill, idx) => (
                  <SkillItem key={skill.name} skill={skill} index={idx} isInView={isInView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools cloud */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6 text-cyber-green">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.02 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: '#00FF88',
                  color: '#0a0a0a',
                  boxShadow: '0 0 20px #00FF88',
                }}
                className="px-4 py-2 bg-cyber-green/10 border border-cyber-green/50 rounded-full text-cyber-green text-sm cursor-default transition-all"
              >
                {tool}
              </motion.span>
            ))}
          </div>
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

export default Skills