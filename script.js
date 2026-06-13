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
        title: 'Chat Platform',
        description: '',
        technologies: [],
        features: [],
        liveUrl: 'https://chathive-web.vercel.app/',
        githubUrl: '#'
    },
    2: {
        title: 'Tournament Manager',
        description: '',
        technologies: [],
        features: [],
        liveUrl: 'https://tournamentmanager.free.nf/',
        githubUrl: '#'
    },
    3: {
        title: 'Certificates',
        description: 'Cisco Networking Academy certificates and course completions.',
        technologies: [],
        features: [],
        certificates: [
            {
                src: 'images/network-basics.png',
                alt: 'Cisco Networking Basics certificate'
            },
            {
                src: 'images/network-defense.png',
                alt: 'Cisco Network Defense certificate'
            },
            {
                src: 'images/packet-tracer2.png',
                alt: 'Getting Started with Cisco Packet Tracer certificate'
            },
            {
                src: 'images/packtet-tracer.png',
                alt: 'Introduction to Packet Tracer certificate'
            },
            {
                src: 'images/troubleshooting.png',
                alt: 'Network Addressing and Basic Troubleshooting certificate'
            },
            {
                src: 'images/tree-planting.png',
                alt: 'Tree planting certificate'
            }
        ],
        liveUrl: '',
        githubUrl: ''
    },
    4: {
        title: 'Brand Identity Design',
        description: '',
        technologies: [],
        features: [],
        liveUrl: 'https://brand-design-test.vercel.app/',
        githubUrl: '#'
    },
    5: {
        title: '',
        description: '',
        technologies: [],
        features: [],
        liveUrl: '',
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

    const sections = [];
    sections.push(`<h2>${project.title}</h2>`);

    if (project.description) {
        sections.push(`<p class="modal-description">${project.description}</p>`);
    }

    if (project.technologies && project.technologies.length) {
        sections.push(`
            <h3>Technologies Used</h3>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `);
    }

    if (project.certificates && project.certificates.length) {
        sections.push(`
            <div class="modal-certificates" aria-label="Certificates">
                ${project.certificates.map(cert => `
                    <figure class="modal-certificate">
                        <img src="${cert.src}" alt="${cert.alt}" loading="lazy">
                        <figcaption>${cert.alt}</figcaption>
                    </figure>
                `).join('')}
            </div>
        `);
    }

    if (project.features && project.features.length) {
        sections.push(`
            <h3>Key Features</h3>
            <ul class="modal-features">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `);
    }

    const actions = [];

    if (project.liveUrl && project.liveUrl !== '#') {
        actions.push(`
            <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        `);
    }

    if (project.githubUrl && project.githubUrl !== '#') {
        actions.push(`
            <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i> View Code
            </a>
        `);
    }

    if (actions.length) {
        sections.push(`
            <div class="modal-actions">
                ${actions.join('')}
            </div>
        `);
    }

    modalBody.innerHTML = sections.join('');
    
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
    
    // If form is valid, submit to n8n webhook
    if (isValid) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        fetch('https://kenttyt.app.n8n.cloud/webhook-test/contact-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .catch(() => {
                alert('Something went wrong. Please try again later.');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
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
// Typing Animation with Multiple Text Variations (Loops every 10 seconds)
// ============================================
function startTypingLoop(element, texts, cursorElement, typeSpeed = 150, deleteSpeed = 50, loopInterval = 10000) {
    let currentIndex = 0;
    let isPaused = false;
    let timeoutId = null;
    
    // Pause on hover
    const heroTitle = element.closest('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', () => {
            isPaused = true;
            if (cursorElement) cursorElement.style.opacity = '1';
        });
        heroTitle.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    }
    
    function showCursor() {
        if (cursorElement) {
            cursorElement.style.display = 'inline';
            cursorElement.style.opacity = '1';
        }
    }
    
    function hideCursor() {
        if (cursorElement) {
            cursorElement.style.opacity = '0';
        }
    }
    
    function typeText() {
        if (isPaused) {
            timeoutId = setTimeout(typeText, 100);
            return;
        }
        
        const text = texts[currentIndex];
        let i = 0;
        element.textContent = '';
        showCursor();
        
        function type() {
            if (isPaused) {
                timeoutId = setTimeout(type, 100);
                return;
            }
            
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                timeoutId = setTimeout(type, typeSpeed);
            } else {
                // After typing completes, hide cursor and wait 2 seconds, then delete
                hideCursor();
                timeoutId = setTimeout(() => {
                    deleteText();
                }, 2000);
            }
        }
        
        type();
    }
    
    function deleteText() {
        if (isPaused) {
            timeoutId = setTimeout(deleteText, 100);
            return;
        }
        
        let currentText = element.textContent;
        showCursor();
        
        function deleteChar() {
            if (isPaused) {
                timeoutId = setTimeout(deleteChar, 100);
                return;
            }
            
            if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                element.textContent = currentText;
                timeoutId = setTimeout(deleteChar, deleteSpeed);
            } else {
                // Move to next text in array
                currentIndex = (currentIndex + 1) % texts.length;
                hideCursor();
                
                // After deleting, calculate remaining time to reach 10 seconds total
                const text = texts[currentIndex];
                const typingTime = text.length * typeSpeed;
                const deletingTime = element.textContent.length * deleteSpeed;
                const waitTime = 2000;
                const totalCycleTime = typingTime + waitTime + deletingTime;
                const remainingTime = Math.max(500, loopInterval - totalCycleTime);
                
                // Wait remaining time, then start next cycle
                timeoutId = setTimeout(() => {
                    typeText();
                }, remainingTime);
            }
        }
        
        deleteChar();
    }
    
    // Start the first typing cycle
    typeText();
}

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
    
    // Start typing animation for name (loops every 10 seconds)
    const typingText = document.getElementById('typing-text');
    const typingCursor = document.querySelector('.typing-cursor');
    if (typingText) {
        // Wait a bit before starting the typing animation
        setTimeout(() => {
            startTypingLoop(typingText, ['Kent Baldo'], typingCursor, 150, 50, 10000);
        }, 500);
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

// ============================================
// Resume PDF Download Functionality
// ============================================
function downloadResume() {
    const resumeContent = document.getElementById('resume-content');
    const element = resumeContent.cloneNode(true);
    
    // Remove any interactive elements that shouldn't be in the PDF
    const buttons = element.querySelectorAll('button');
    buttons.forEach(btn => btn.remove());
    
    const opt = {
        margin: 10,
        filename: 'Kent_Baldo_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    html2pdf().set(opt).from(element).save().catch(err => {
        console.error('Error generating PDF:', err);
        alert('Error generating PDF. Please try again.');
    });
}

// Attach download event listeners to both resume buttons
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn1 = document.getElementById('download-resume-btn');
    const downloadBtn2 = document.getElementById('download-resume-btn-2');
    
    if (downloadBtn1) {
        downloadBtn1.addEventListener('click', downloadResume);
    }
    
    if (downloadBtn2) {
        downloadBtn2.addEventListener('click', downloadResume);
    }
});

// ============================================
// Shooting Stars & Starfield Canvas Animation
// ============================================
(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let stars = [];
    let shootingStars = [];
    let animationId;

    // Resize canvas to match hero section
    function resize() {
        const hero = canvas.parentElement;
        width = canvas.width = hero.offsetWidth;
        height = canvas.height = hero.offsetHeight;
    }

    // ---- Static twinkling stars ----
    function createStars(count) {
        stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.3,
                baseAlpha: Math.random() * 0.6 + 0.2,
                alpha: 0,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2
            });
        }
    }

    function drawStars(time) {
        stars.forEach(s => {
            s.alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed + s.twinkleOffset) * 0.3;
            s.alpha = Math.max(0, Math.min(1, s.alpha));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + s.alpha + ')';
            ctx.fill();
        });
    }

    // ---- Shooting stars ----
    class ShootingStar {
        constructor() {
            this.reset();
        }

        reset() {
            // Spawn from top or right edge, travel diagonally
            const side = Math.random();
            if (side < 0.7) {
                // From top
                this.x = Math.random() * width * 1.2;
                this.y = -10;
            } else {
                // From right
                this.x = width + 10;
                this.y = Math.random() * height * 0.4;
            }

            const angle = (Math.random() * 30 + 200) * (Math.PI / 180);
            const speed = Math.random() * 6 + 8;
            this.vx = Math.cos(angle) * speed;
            this.vy = -Math.sin(angle) * speed;

            this.tailLength = Math.random() * 60 + 50;
            this.life = 1.0;
            this.decay = Math.random() * 0.008 + 0.006;
            this.thickness = Math.random() * 1.5 + 0.8;
            this.active = true;

            // Slight color variation: white, pale blue, or pale gold
            const colors = [
                [255, 255, 255],
                [200, 220, 255],
                [255, 245, 200],
                [180, 210, 255]
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            if (this.life <= 0 || this.x < -100 || this.x > width + 100 || this.y > height + 100) {
                this.active = false;
            }
        }

        draw() {
            if (!this.active) return;
            const mag = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const tailX = this.x - this.vx * (this.tailLength / mag);
            const tailY = this.y - this.vy * (this.tailLength / mag);

            const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
            const r = this.color[0], g = this.color[1], b = this.color[2];
            gradient.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',' + (this.life * 0.9) + ')');
            gradient.addColorStop(0.3, 'rgba(' + r + ',' + g + ',' + b + ',' + (this.life * 0.4) + ')');
            gradient.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b + ',0)');

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.thickness;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Glow at the head
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.thickness + 1, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (this.life * 0.7) + ')';
            ctx.fill();
        }
    }

    // Spawn shooting stars at random intervals
    let lastSpawn = 0;
    let nextSpawnDelay = Math.random() * 1500 + 400;

    function maybeSpawnShootingStar(time) {
        if (time - lastSpawn > nextSpawnDelay) {
            shootingStars.push(new ShootingStar());
            lastSpawn = time;
            nextSpawnDelay = Math.random() * 2000 + 600;

            // Occasionally spawn a burst of 2-3
            if (Math.random() < 0.2) {
                setTimeout(function () { shootingStars.push(new ShootingStar()); }, 100 + Math.random() * 200);
                if (Math.random() < 0.4) {
                    setTimeout(function () { shootingStars.push(new ShootingStar()); }, 250 + Math.random() * 300);
                }
            }
        }
    }

    // ---- Animation loop ----
    let isVisible = true;

    function animate(time) {
        if (!isVisible) {
            animationId = requestAnimationFrame(animate);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        // Draw twinkling stars
        drawStars(time);

        // Spawn and update shooting stars
        maybeSpawnShootingStar(time);

        shootingStars.forEach(function (s) {
            s.update();
            s.draw();
        });

        // Clean up dead shooting stars
        shootingStars = shootingStars.filter(function (s) { return s.active; });

        animationId = requestAnimationFrame(animate);
    }

    // Pause when hero is off-screen
    const heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            isVisible = entry.isIntersecting;
        });
    }, { threshold: 0 });

    heroObserver.observe(canvas.parentElement);

    // Handle resize
    window.addEventListener('resize', function () {
        resize();
        createStars(Math.floor(width * height / 4000));
    });

    // Init
    resize();
    createStars(Math.floor(width * height / 4000));
    animationId = requestAnimationFrame(animate);
})();

