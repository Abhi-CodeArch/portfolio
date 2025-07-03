// Add RGB values to CSS variables for transparency support
function addRgbValues() {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  
  const convert = (colorStr) => {
    // Create a temporary element to compute the RGB values
    const tempEl = document.createElement('div');
    tempEl.style.color = colorStr;
    tempEl.style.display = 'none';
    document.body.appendChild(tempEl);
    
    // Get computed color and extract RGB values
    const computedColor = getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    
    // Extract RGB values using regex
    const rgbMatch = computedColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return rgbMatch ? [rgbMatch[1], rgbMatch[2], rgbMatch[3]].join(', ') : null;
  };
  
  // Add RGB variables for colors that might need transparency
  const colorsToConvert = [
    'color-surface', 
    'color-primary', 
    'color-secondary',
    'color-accent'
  ];
  
  colorsToConvert.forEach(color => {
    const rgbValue = convert(computedStyle.getPropertyValue(`--${color}`));
    if (rgbValue) {
      root.style.setProperty(`--${color}-rgb`, rgbValue);
    }
  });
}

// Smooth scrolling for anchor links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Close mobile menu if open
      if (document.querySelector('.nav-links.active')) {
        document.querySelector('.menu-toggle').classList.remove('active');
        document.querySelector('.nav-links').classList.remove('active');
      }
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });
}

// Scroll to top button functionality
function setupScrollToTop() {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Theme toggle functionality
function setupThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark-mode' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
  }
  
  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
    });
  }
}

// Mobile menu toggle functionality
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }
}

// Custom cursor functionality
function setupCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  // Only enable custom cursor for desktop (larger than 1024px)
  if (cursorDot && cursorOutline && window.innerWidth > 1024) {
    // Show cursors after page load
    setTimeout(() => {
      cursorDot.style.opacity = 1;
      cursorOutline.style.opacity = 1;
    }, 1000);
    
    // Move cursors with mouse
    window.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    });
    
    // Cursor hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .timeline-content');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(var(--color-primary-rgb), 0.1)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
      });
    });
    
    // Cursor click effect
    document.addEventListener('mousedown', () => {
      cursorOutline.style.transform += ' scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursorOutline.style.transform = cursorOutline.style.transform.replace(' scale(0.8)', '');
    });
  }
}

// Reveal on scroll animations
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom, .fade-in');
  
  const revealOnScroll = () => {
    const viewportHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < viewportHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  // Initial check on load
  revealOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
}

// Typed text animation
function setupTypedText() {
  const typedElements = document.querySelectorAll('.typed-text');
  
  typedElements.forEach(element => {
    if (!element.dataset.words) return;
    
    const words = JSON.parse(element.dataset.words);
    const wait = parseInt(element.dataset.wait) || 3000;
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        // Remove a character
        element.textContent = currentWord.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typeSpeed = 50;
      } else {
        // Add a character
        element.textContent = currentWord.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typeSpeed = 100;
      }
      
      // Handle word completion
      if (!isDeleting && currentCharIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = wait;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
      }
      
      setTimeout(type, typeSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);
  });
}

// Update current year in footer
function updateYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Header scroll effect
function setupHeaderScroll() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Initialize all utility functions
document.addEventListener('DOMContentLoaded', () => {
  addRgbValues();
  setupSmoothScroll();
  setupScrollToTop();
  setupThemeToggle();
  setupMobileMenu();
  setupCustomCursor();
  setupScrollReveal();
  setupTypedText();
  updateYear();
  setupHeaderScroll();
});