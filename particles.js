// Particle system for hero section background
class ParticleSystem {
  constructor(elementId, options = {}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.element = document.getElementById(elementId);
    
    if (!this.element) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }
    
    // Append canvas to element
    this.element.appendChild(this.canvas);
    
    // Default options
    this.options = {
      particleCount: 80,
      particleColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6',
      lineColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6',
      particleRadius: 2,
      lineWidth: 1,
      lineDistance: 150,
      speed: 1,
      directionChangeFrequency: 0.01,
      ...options
    };
    
    // Responsive canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Initialize particles
    this.particles = [];
    this.initParticles();
    
    // Start animation
    this.animate();
    
    // Theme change listener
    document.body.addEventListener('DOMSubtreeModified', this.handleThemeChange.bind(this));
  }
  
  resizeCanvas() {
    this.canvas.width = this.element.offsetWidth;
    this.canvas.height = this.element.offsetHeight;
  }
  
  handleThemeChange() {
    // Update particle and line colors when theme changes
    const newColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6';
    this.options.particleColor = newColor;
    this.options.lineColor = newColor;
  }
  
  initParticles() {
    const { particleCount } = this.options;
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * this.options.particleRadius + 1,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        directionChangeTimer: 0
      });
    }
  }
  
  drawParticles() {
    const { ctx, particles, options, canvas } = this;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach((particle, i) => {
      // Update particle position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx = -particle.vx;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy = -particle.vy;
      }
      
      // Randomly change direction
      particle.directionChangeTimer += 1;
      if (Math.random() < options.directionChangeFrequency) {
        particle.vx = (Math.random() - 0.5) * options.speed;
        particle.vy = (Math.random() - 0.5) * options.speed;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = options.particleColor;
      ctx.fill();
      
      // Draw connections
      particles.forEach((otherParticle, j) => {
        if (i === j) return; // Skip self
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < options.lineDistance) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / options.lineDistance);
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `${options.lineColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = options.lineWidth;
          ctx.stroke();
        }
      });
    });
  }
  
  animate() {
    this.drawParticles();
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Mouse interaction effect
class MouseParticleEffect {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '10000';
    
    document.body.appendChild(this.canvas);
    
    this.particles = [];
    this.mousePosition = { x: 0, y: 0 };
    this.lastMousePosition = { x: 0, y: 0 };
    this.isMouseMoving = false;
    this.mouseTimeout = null;
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    this.setupMouseListeners();
    this.animate();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  setupMouseListeners() {
    window.addEventListener('mousemove', (e) => {
      this.mousePosition = { x: e.clientX, y: e.clientY };
      
      // Check if mouse is actually moving significantly
      const dx = this.mousePosition.x - this.lastMousePosition.x;
      const dy = this.mousePosition.y - this.lastMousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) {
        this.isMouseMoving = true;
        this.createParticles();
        this.lastMousePosition = { ...this.mousePosition };
        
        // Reset timeout
        clearTimeout(this.mouseTimeout);
        this.mouseTimeout = setTimeout(() => {
          this.isMouseMoving = false;
        }, 100);
      }
    });
  }
  
  createParticles() {
    // Only create particles if mouse is moving and not on mobile
    if (!this.isMouseMoving || window.innerWidth <= 1024) return;
    
    const { x, y } = this.mousePosition;
    
    for (let i = 0; i < 2; i++) {
      const size = Math.random() * 4 + 1;
      const speedX = (Math.random() - 0.5) * 2;
      const speedY = (Math.random() - 0.5) * 2;
      
      this.particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        color: getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6',
        alpha: 1,
        rotation: Math.random() * 360
      });
    }
  }
  
  updateParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.alpha -= 0.01;
      particle.rotation += 1;
      
      if (particle.alpha <= 0) {
        this.particles.splice(i, 1);
        i--;
      }
    }
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.alpha;
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.rotation * Math.PI / 180);
      
      // Draw a simple square
      this.ctx.fillStyle = particle.color;
      this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      
      this.ctx.restore();
    });
  }
  
  animate() {
    this.updateParticles();
    this.drawParticles();
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Initialize particles after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize particle background
  new ParticleSystem('particles');
  
  // Initialize mouse particle effect for desktop only
  if (window.innerWidth > 1024) {
    new MouseParticleEffect();
  }
});