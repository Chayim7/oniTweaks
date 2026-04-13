/* ====================================
   OniTweaks - Advanced Interactive Features
   ==================================== */

// ====================================
// Parallax Scroll Effect
// ====================================

function setupParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrollTop = window.scrollY;
            const elementOffset = el.offsetTop;
            const distance = scrollTop - elementOffset;
            const yPos = distance * 0.5; // parallax intensity
            
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ====================================
// Dynamic Background Particles
// ====================================

function createBackgroundParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: transparent;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5;
            this.opacity = Math.random() * 0.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 217, 255, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle screen resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ====================================
// Scroll-Triggered Animations
// ====================================

function setupScrollTriggerGlow() {
    const elements = document.querySelectorAll('.section-title, .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'glow-pulse 3s ease-in-out infinite';
            }
        });
    }, { threshold: 0.5 });
    
    elements.forEach(el => observer.observe(el));
}

// ====================================
// Advanced Counter Animation
// ====================================

function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    let hasAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-counter'));
                    const duration = 2000;
                    const frames = 60;
                    const increment = target / frames;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, duration / frames);
                });
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ====================================
// Interactive Card Effects
// ====================================

function setupCardInteractivity() {
    const cards = document.querySelectorAll('.category-card, .pack-card, .why-card, .article-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS variable for potential gradient follow
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
            
            // Could be used for advanced effects
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });
}

// ====================================
// Staggered Animation on Scroll
// ====================================

function setupStaggeredAnimations() {
    const gridSections = document.querySelectorAll('.categories-grid, .why-grid, .packs-grid, .articles-grid');
    
    gridSections.forEach(grid => {
        const items = grid.querySelectorAll('[data-aos]');
        let delay = 0;
        
        items.forEach((item, index) => {
            item.style.setProperty('--stagger-delay', delay + 'ms');
            delay += 100;
        });
    });
}

// ====================================
// Smooth Scroll Enhancer
// ====================================

function setupSmoothScrollEnhancer() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const headerOffset = 80; // navbar height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================
// Button Ripple Effect Enhanced
// ====================================

function setupEnhancedRippleEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(255,255,255,0.8), rgba(255,255,255,0));
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple-expand 0.6s ease-out;
            `;
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple-expand {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            
            if (!document.querySelector('style[data-ripple]')) {
                style.setAttribute('data-ripple', 'true');
                document.head.appendChild(style);
            }
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ====================================
// Intersection Observer for Lazy Loading Effects
// ====================================

function setupIntersectionEffects() {
    const observerOptions = {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ratio = entry.intersectionRatio;
                
                // Add subtle opacity/scale effects based on scroll position
                if (entry.target.classList.contains('category-card')) {
                    entry.target.style.opacity = 0.5 + (ratio * 0.5);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ====================================
// Real-time Scroll Progress Indicator
// ====================================

function setupScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00d9ff, #8000ff);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ====================================
// Initialize All Advanced Features
// ====================================

document.addEventListener('DOMContentLoaded', () => {
    setupParallaxScrolling();
    createBackgroundParticles();
    setupScrollTriggerGlow();
    animateCounters();
    setupCardInteractivity();
    setupStaggeredAnimations();
    setupSmoothScrollEnhancer();
    setupEnhancedRippleEffects();
    setupIntersectionEffects();
    setupScrollProgressBar();
    
    console.log('🚀 OniTweaks Advanced Interactions Loaded');
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce for resize events
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    }
}
