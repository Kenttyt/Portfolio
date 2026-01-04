// ============================================
// Portfolio Website JavaScript
// ============================================

// ============================================
// DOM Elements
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const scrollTopBtn = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const projectLinks = document.querySelectorAll('.project-link');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================
// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ============================================
// Hamburger Menu Toggle
// ============================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// Smooth Scrolling Navigation
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    const navHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navHeight - 50;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ============================================
// Scroll to Top Button
// ============================================
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Scroll-based Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.project-card, .skill-item, .interest-item, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animate skill progress bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.style.opacity = '0';
    skillObserver.observe(bar);
});

// ============================================
// Project Filter Functionality
// ============================================
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ============================================
// Project Modal
// ============================================
// Project data (you can expand this with real project details)
const projectData = {
    1: {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, payment integration, and admin dashboard. Built with modern technologies for scalability and performance.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
        features: [
            'User authentication and authorization',
            'Product catalog with search and filters',
            'Shopping cart and checkout process',
            'Payment integration with Stripe',
            'Admin dashboard for product management',
            'Order tracking and history'
        ],
        liveUrl: '#',
        githubUrl: '#'
    },
    2: {
        title: 'Analytics Dashboard',
        description: 'A comprehensive analytics dashboard that provides real-time data visualization and reporting. Features interactive charts, customizable widgets, and export functionality.',
        technologies: ['Vue.js', 'D3.js', 'Python', 'Flask', 'PostgreSQL'],
        features: [
            'Real-time data visualization',
            'Interactive charts and graphs',
            'Customizable dashboard widgets',
            'Data export functionality',
            'User role management',
            'Scheduled reports'
        ],
        liveUrl: '#',
        githubUrl: '#'
    },
    3: {
        title: 'Task Management App',
        description: 'A cross-platform mobile application for task management and team collaboration. Features include task assignment, progress tracking, notifications, and team chat.',
        technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
        features: [
            'Task creation and assignment',
            'Progress tracking and deadlines',
            'Team collaboration features',
            'Push notifications',
            'Offline mode support',
            'Team chat functionality'
        ],
        liveUrl: '#',
        githubUrl: '#'
    },
    4: {
        title: 'Brand Identity Design',
        description: 'Complete brand identity package including logo design, color palette, typography, and brand guidelines. Created for a modern tech startup.',
        technologies: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
        features: [
            'Logo design and variations',
            'Color palette and typography',
            'Brand guidelines document',
            'Social media templates',
            'Business card design',
            'Website mockups'
        ],
        liveUrl: '#',
        githubUrl: '#'
    },
    5: {
        title: 'Blog Platform',
        description: 'A modern blogging platform with markdown support, SEO optimization, and content management. Features include categories, tags, comments, and author profiles.',
        technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Prisma'],
        features: [
            'Markdown editor support',
            'SEO optimization',
            'Category and tag system',
            'Comment system',
            'Author profiles',
            'Search functionality'
        ],
        liveUrl: '#',
        githubUrl: '#'
    },
    6: {
        title: 'Cloud Storage Service',
        description: 'A secure cloud storage and file sharing platform with end-to-end encryption. Features include file synchronization, sharing, and version control.',
        technologies: ['AWS', 'Docker', 'TypeScript', 'Node.js', 'React'],
        features: [
            'File upload and storage',
            'End-to-end encryption',
            'File sharing with permissions',
            'Version control',
            'File synchronization',
            'Mobile app support'
        ],
        liveUrl: '#',
        githubUrl: '#'
    }
};

// Open modal when project link is clicked
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            displayProjectModal(project);
        }
    });
});

// Display project details in modal
function displayProjectModal(project) {
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p class="modal-description">${project.description}</p>
        
        <h3>Technologies Used</h3>
        <div class="project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <h3>Key Features</h3>
        <ul class="modal-features">
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        
        <div class="modal-actions">
            <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i> View Code
            </a>
        </div>
    `;
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
modalClose.addEventListener('click', () => {
    closeModal();
});

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// ============================================
// Contact Form Validation
// ============================================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset previous errors
    clearErrors();
    
    // Validation flags
    let isValid = true;
    
    // Validate name
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (subject === '') {
        showError('subject', 'Subject is required');
        isValid = false;
    } else if (subject.length < 3) {
        showError('subject', 'Subject must be at least 3 characters');
        isValid = false;
    }
    
    // Validate message
    if (message === '') {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    // If form is valid, submit it (you can integrate with a backend here)
    if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual form submission)
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    }
});

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    field.classList.add('error');
    errorElement.textContent = message;
}

// Clear all errors
function clearErrors() {
    const errorFields = document.querySelectorAll('.error-message');
    const inputFields = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorFields.forEach(field => {
        field.textContent = '';
    });
    
    inputFields.forEach(field => {
        field.classList.remove('error');
    });
}

// Real-time validation (optional - validates as user types)
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    // Clear previous error
    field.classList.remove('error');
    errorElement.textContent = '';
    
    // Validate based on field type
    switch (fieldId) {
        case 'name':
            if (value === '') {
                showError('name', 'Name is required');
            } else if (value.length < 2) {
                showError('name', 'Name must be at least 2 characters');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value === '') {
                showError('email', 'Email is required');
            } else if (!emailRegex.test(value)) {
                showError('email', 'Please enter a valid email address');
            }
            break;
        case 'subject':
            if (value === '') {
                showError('subject', 'Subject is required');
            } else if (value.length < 3) {
                showError('subject', 'Subject must be at least 3 characters');
            }
            break;
        case 'message':
            if (value === '') {
                showError('message', 'Message is required');
            } else if (value.length < 10) {
                showError('message', 'Message must be at least 10 characters');
            }
            break;
    }
}

// ============================================
// Navbar Background on Scroll
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ============================================
// Additional Utility Functions
// ============================================

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
