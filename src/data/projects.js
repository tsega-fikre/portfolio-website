// Project data for the portfolio
export const projects = [
  {
    id: 'project-1',
    title: 'Project 1',
    description: 'Add your project description here',
    longDescription: 'Add a more detailed description of your project here. Explain the problem it solves, the technologies used, and any challenges you overcame.',
    image: '/projects/project1.jpg',
    link: 'https://your-project-link.com',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    features: [
      'Feature 1 description',
      'Feature 2 description',
      'Feature 3 description',
    ],
    technologies: ['Tech 1', 'Tech 2', 'Tech 3'],
  },
  {
    id: 'project-2',
    title: 'Project 2',
    description: 'Add your project description here',
    longDescription: 'Add a more detailed description of your project here. Explain the problem it solves, the technologies used, and any challenges you overcame.',
    image: '/projects/project2.jpg',
    link: 'https://your-project-link.com',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    features: [
      'Feature 1 description',
      'Feature 2 description',
      'Feature 3 description',
    ],
    technologies: ['Tech 1', 'Tech 2', 'Tech 3'],
  },
  {
    id: 'project-3',
    title: 'Project 3',
    description: 'Add your project description here',
    longDescription: 'Add a more detailed description of your project here. Explain the problem it solves, the technologies used, and any challenges you overcame.',
    image: '/projects/project3.jpg',
    link: 'https://your-project-link.com',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    features: [
      'Feature 1 description',
      'Feature 2 description',
      'Feature 3 description',
    ],
    technologies: ['Tech 1', 'Tech 2', 'Tech 3'],
  },
  {
    id: 'project-4',
    title: 'Project 4',
    description: 'Add your project description here',
    longDescription: 'Add a more detailed description of your project here. Explain the problem it solves, the technologies used, and any challenges you overcame.',
    image: '/projects/project4.jpg',
    link: 'https://your-project-link.com',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    features: [
      'Feature 1 description',
      'Feature 2 description',
      'Feature 3 description',
    ],
    technologies: ['Tech 1', 'Tech 2', 'Tech 3'],
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
