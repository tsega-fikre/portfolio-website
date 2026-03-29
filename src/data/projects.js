// Project data for the portfolio
export const projects = [
  {
    id: 'vulnphantom',
    title: 'VulnPhantom – Web Vulnerability Scanner',
    description: 'A lightweight, educational security tool that detects XSS, SQL Injection, Path Traversal, and Command Injection vulnerabilities in web applications.',
    longDescription: 'Security testing is crucial for web developers, but commercial scanners are expensive and complex. This tool provides a free, lightweight solution for developers and security enthusiasts to quickly identify common vulnerabilities in their own web applications during development and testing.',
    image: '/projects/VulnPhantom.png',
    link: 'https://github.com/tsega-fikre/Vuln-Phantom',
    github: 'https://github.com/tsega-fikre/Vuln-Phantom',
    skills: ['Python', 'Cybersecurity', 'Web Security', 'XSS Detection', 'SQL Injection', 'API Development'],
    features: [
      'XSS Detection – Reflected cross-site scripting vulnerability testing',
      'SQL Injection – Error-based and time-based injection detection',
      'Path Traversal – Directory traversal attack simulation',
      'Command Injection – OS command injection vulnerability testing',
      'Smart Detection – Confidence scoring system to minimize false positives',
      'Report Generation – JSON/Text output for documentation and compliance',
    ],
    challenges: 'Reducing false positives through confidence scoring algorithms. Implementing time-based blind SQL injection detection without disrupting target servers. Creating efficient parameter extraction from complex URLs and forms. Balancing thoroughness with scan speed.',
    technologies: [
      'Python 3.8+ - Core programming language',
      'Requests - HTTP request handling',
      'BeautifulSoup4 - HTML parsing and form extraction',
      'Regex - Pattern matching for vulnerability signatures',
      'JSON - Report generation format',
    ],
  },
  {
    id: 'abay-shield',
    title: 'Abay Shield – Guardian of Digital Access',
    description: 'A Python-based tool that evaluates and enhances password security with realistic attack estimates, entropy calculations, and interactive color-coded terminal feedback.',
    longDescription: 'A Python-based tool that evaluates and enhances password security. It analyzes passwords for length, character diversity, and common patterns, providing realistic attack estimates and entropy calculations. Designed to educate users on password strength while offering interactive, color-coded, and engaging terminal feedback.',
    image: '/projects/Abay_shield.png',
    link: 'https://github.com/tsega-fikre/Abay-Shield',
    github: 'https://github.com/tsega-fikre/Abay-Shield',
    skills: ['Python', 'Cybersecurity', 'Pyfiglet', 'Colorama', 'Security Analysis'],
    features: [
      'Length analysis with graduated scoring',
      'Uppercase, lowercase, numeric, and special character detection',
      'Common password dictionary check (50 most breached passwords)',
      'Pattern detection (repeats, sequences, keyboard patterns)',
      'True entropy calculation with pattern penalties',
      'Three realistic attack modes (online, offline fast hash, offline slow hash)',
      'Human-readable crack time estimates',
      'JSON report export functionality',
      'Color-coded terminal output and animated analysis feedback',
      'Professional ASCII banner',
      'Interactive attack mode selection',
    ],
    technologies: [
      'Python 3.7+ - Core programming language',
      'Pyfiglet - ASCII banner generation',
      'Colorama - Terminal color output',
    ],
  },
  {
    id: 'ethersentinel',
    title: 'EtherSentinel – Network Discovery & Scanner',
    description: 'A powerful, multi-threaded network scanner for efficient host discovery and port scanning. Fast, stealthy, and professional network recon tool.',
    longDescription: "A powerful, multi-threaded network scanner designed for efficient host discovery and port scanning. EtherSentinel enables cybersecurity professionals, network administrators, and security enthusiasts to perform fast, reliable, and structured network reconnaissance. Built with performance and simplicity in mind, it provides real-time insights, banner grabbing, and professional reporting—all using Python's standard library.",
    image: '/projects/EtherSentinel.png',
    link: 'https://github.com/tsega-fikre/EtherSentinel',
    github: 'https://github.com/tsega-fikre/EtherSentinel',
    skills: ['Python', 'Networking', 'Multithreading', 'Socket Programming', 'JSON Data Handling'],
    features: [
      'Host discovery using fast ping sweep',
      'Multi-threaded TCP port scanning',
      'Banner grabbing for service detection (SSH, HTTP, FTP, etc.)',
      'High-performance scanning with adjustable threads',
      'Cross-platform support (Linux, Windows, macOS)',
      'JSON export for structured reporting',
      'Automatic local network detection',
      'Custom port range and list scanning',
      'Configurable timeouts for different network conditions',
      'Thread-safe architecture for stable execution',
      'Real-time scan progress and live results',
    ],
    challenges: "Built entirely using Python's standard library with no external dependencies. Implementing thread-safe architecture for stable concurrent execution while maintaining real-time progress output.",
    technologies: [
      'Python 3.7+ - Core programming language',
      'Standard Library only - No external dependencies',
    ],
  },
  {
    id: 'ethiocypher',
    title: 'Ethiocypher – Password Cracking & Security Analysis Tool',
    description: 'A forthcoming advanced cybersecurity tool focused on password cracking techniques and security analysis, simulating real-world attack scenarios for educational purposes.',
    longDescription: 'A forthcoming advanced cybersecurity tool focused on password cracking techniques and security analysis. This project will simulate real-world attack scenarios to demonstrate how weak passwords can be compromised. It is being designed as an educational and ethical hacking resource to help users understand password vulnerabilities and improve defensive strategies.',
    image: null,
    link: '#',
    github: null,
    status: 'Coming Soon',
    featured: false,
    skills: ['Python', 'Hashing Algorithms', 'Multithreading', 'Brute-force Attacks', 'Wordlist Handling'],
    features: [
      'Dictionary-based password cracking',
      'Brute-force attack simulation',
      'Hash cracking (MD5, SHA-1, SHA-256, etc.)',
      'Custom wordlist support',
      'Speed optimization using multithreading',
      'Password strength vs crack-time comparison',
      'Real-time progress display',
      'JSON report export',
    ],
    technologies: [
      'Python 3.7+ - Core programming language',
      'Hashing Algorithms - MD5, SHA variants, bcrypt',
      'Multithreading - Performance optimization',
      'File handling & wordlist management',
    ],
  },
]

// Get all projects
export function getProjects() {
  return projects
}

// Get a single project by ID
export function getProjectById(id) {
  return projects.find(project => project.id === id)
}

// Generate URL-safe project ID from title
export function generateProjectId(title) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
