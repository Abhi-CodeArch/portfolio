// Data for projects
const projectsData = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured online store with product catalog, shopping cart, and payment processing.',
    image: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'web',
    tags: ['React', 'Node.js', 'MongoDB'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 2,
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with real-time data visualization.',
    image: 'https://images.pexels.com/photos/5417837/pexels-photo-5417837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'app',
    tags: ['Vue.js', 'Firebase', 'Chart.js'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Responsive portfolio website with smooth animations and dark mode support.',
    image: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'web',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 4,
    title: 'Mobile App UI Design',
    description: 'UI/UX design for a fitness tracking mobile application with clean interfaces.',
    image: 'https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'design',
    tags: ['Figma', 'UI/UX', 'Prototyping'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 5,
    title: 'Task Management App',
    description: 'Productivity application for organizing tasks, projects, and deadlines.',
    image: 'https://images.pexels.com/photos/4065891/pexels-photo-4065891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'app',
    tags: ['React', 'Redux', 'Firebase'],
    demoLink: '#',
    codeLink: '#'
  },
  {
    id: 6,
    title: 'Landing Page Design',
    description: 'High-converting landing page design for a SaaS product with custom illustrations.',
    image: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'design',
    tags: ['Adobe XD', 'Illustration', 'UI Design'],
    demoLink: '#',
    codeLink: '#'
  }
];

// Data for skills
const skillsData = [
  { name: 'HTML5 & CSS3', percentage: 95 },
  { name: 'JavaScript', percentage: 90 },
  { name: 'React.js', percentage: 85 },
  { name: 'Node.js', percentage: 80 },
  { name: 'UI/UX Design', percentage: 75 },
  { name: 'TypeScript', percentage: 80 },
  { name: 'Vue.js', percentage: 70 },
  { name: 'MongoDB', percentage: 65 }
];

// Data for experience
const experienceData = [
  {
    title: 'Senior Front-end Developer',
    company: 'TechCorp Inc.',
    period: '2022 - Present',
    description: 'Lead the front-end development team in building enterprise web applications. Implemented code standards and modern development practices.'
  },
  {
    title: 'Full Stack Developer',
    company: 'WebSolutions LLC',
    period: '2019 - 2022',
    description: 'Developed full-stack web applications using React, Node.js, and MongoDB. Collaborated with designers to implement responsive UI designs.'
  },
  {
    title: 'Web Developer',
    company: 'Creative Agency',
    period: '2017 - 2019',
    description: 'Created responsive websites for various clients using HTML, CSS, and JavaScript. Optimized website performance and improved SEO.'
  },
  {
    title: 'Junior Developer',
    company: 'StartUp Studios',
    period: '2015 - 2017',
    description: 'Assisted in building web applications and maintaining existing websites. Collaborated with senior developers to implement new features.'
  }
];

// Render projects grid
function renderProjects(filter = 'all') {
  const projectsGrid = document.querySelector('.projects-grid');
  if (!projectsGrid) return;
  
  // Clear existing projects
  projectsGrid.innerHTML = '';
  
  // Filter projects if needed
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  // Render each project
  filteredProjects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card fade-in';
    
    projectCard.innerHTML = `
      <div class="image-wrapper">
        <img src="${project.image}" alt="${project.title}" class="project-img">
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.demoLink}" class="project-link" target="_blank">
            Live Demo
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
          <a href="${project.codeLink}" class="project-link" target="_blank">
            View Code
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
      </div>
    `;
    
    projectsGrid.appendChild(projectCard);
  });
}

// Render skills grid
function renderSkills() {
  const skillsGrid = document.querySelector('.skills-grid');
  if (!skillsGrid) return;
  
  // Clear existing skills
  skillsGrid.innerHTML = '';
  
  // Render each skill
  skillsData.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card fade-in';
    
    skillCard.innerHTML = `
      <div class="skill-header">
        <h3>${skill.name}</h3>
        <span class="skill-percentage">${skill.percentage}%</span>
      </div>
      <div class="skill-bar">
        <div class="skill-progress" style="width: 0%"></div>
      </div>
    `;
    
    skillsGrid.appendChild(skillCard);
  });
  
  // Animate skill bars when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.skill-progress');
        const percentage = parseInt(entry.target.querySelector('.skill-percentage').textContent);
        
        setTimeout(() => {
          progressBar.style.width = `${percentage}%`;
        }, 200);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
  });
}

// Render experience timeline
function renderExperience() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
  
  // Clear existing experience items
  timeline.innerHTML = '';
  
  // Render each experience
  experienceData.forEach(exp => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item fade-in';
    
    timelineItem.innerHTML = `
      <div class="timeline-content">
        <span class="timeline-period">${exp.period}</span>
        <h3 class="timeline-title">${exp.title}</h3>
        <div class="timeline-company">${exp.company}</div>
        <p>${exp.description}</p>
      </div>
    `;
    
    timeline.appendChild(timelineItem);
  });
}

// Setup project filter buttons
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter projects
      const filter = button.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

// Form validation and submission
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Here you would normally send the form data to your server
    // For this demo, we'll just show a success message
    alert('Message sent successfully!');
    contactForm.reset();
  });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  // Render data
  renderProjects();
  renderSkills();
  renderExperience();
  
  // Setup interactions
  setupProjectFilters();
  setupContactForm();
});