/* ====================================
   OniTweaks - Vanilla JavaScript Interactions
   ==================================== */

// ====================================
// Mobile Navigation Toggle
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
            });
        });
    }
});

// ====================================
// Reveal on Scroll Animation
// ====================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const elementsToReveal = document.querySelectorAll('[data-aos]');
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ====================================
// Add Animation Classes on Scroll
// ====================================

function setupScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach( entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        animationObserver.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// ====================================
// Active Navigation Based on Scroll
// ====================================

window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (window.location.pathname === link.getAttribute('href')) {
            link.style.color = 'var(--primary)';
        }
    });
});

// ====================================
// Smooth Scroll for Anchor Links
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Results Filter Functionality
// ====================================

function setupResultsFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resultCards = document.querySelectorAll('.result-showcase-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter results with animation
                resultCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filter === 'all' || cardCategory === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('active');
                        }, 10);
                    } else {
                        card.classList.remove('active');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Show all by default
        resultCards.forEach(card => card.classList.add('active'));
    }
}

document.addEventListener('DOMContentLoaded', setupResultsFilters);

// ====================================
// Hover Effects on Cards
// ====================================

function setupCardHoverEffects() {
    const cards = document.querySelectorAll(
        '.category-card, .pack-card, .result-card, .article-card, .tool-card, .why-card, .testimonial-card'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', setupCardHoverEffects);

// ====================================
// Newsletter Form Handling
// ====================================

function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '✓ Subscribed!';
            button.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                this.reset();
            }, 3000);
        });
    }
}

document.addEventListener('DOMContentLoaded', setupNewsletterForm);

// ====================================
// Button Click Effects
// ====================================

function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Optional: add ripple styling
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

document.addEventListener('DOMContentLoaded', setupButtonEffects);

// ====================================
// Lazy Loading Images (placeholder)
// ====================================

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

document.addEventListener('DOMContentLoaded', setupLazyLoading);

// ====================================
// Navbar Background on Scroll
// ====================================

function setupNavbarBackground() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.98)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', setupNavbarBackground);

// ====================================
// Tab Navigation for Guides
// ====================================

function setupTabNavigation() {
    const tabs = document.querySelectorAll('[data-tab]');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabGroup = this.getAttribute('data-tab');
                const tabContent = this.getAttribute('data-content');

                // Deactivate all tabs in group
                document.querySelectorAll(`[data-tab="${tabGroup}"]`).forEach(t => {
                    t.classList.remove('active');
                });

                // Hide all content in group
                document.querySelectorAll(`[data-tab-content="${tabGroup}"]`).forEach(c => {
                    c.style.display = 'none';
                });

                // Activate clicked tab
                this.classList.add('active');

                // Show content
                const content = document.querySelector(`[data-tab-content="${tabGroup}"][data-content="${tabContent}"]`);
                if (content) {
                    content.style.display = 'block';
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', setupTabNavigation);

// ====================================
// Copy to Clipboard Feature
// ====================================

function setupCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.getAttribute('data-copy');
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';

                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', setupCopyToClipboard);

// ====================================
// Performance Monitoring
// ====================================

function logPagePerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

            console.log(`OniTweaks - Page Load Time: ${pageLoadTime}ms`);
        });
    }
}

logPagePerformance();

// ====================================
// Modal/Dialog Support
// ====================================

function setupModals() {
    const modals = document.querySelectorAll('[data-modal]');
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal-trigger');
            const modal = document.querySelector(`[data-modal="${modalId}"]`);

            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modals.forEach(modal => {
        const closeButton = modal.querySelector('[data-modal-close]');
        
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', setupModals);

// ====================================
// Form Validation
// ====================================

function setupFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff006e';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (!isValid) {
                e.preventDefault();
                console.warn('Please fill in all required fields');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', setupFormValidation);

// ====================================
// Counter Animation
// ====================================

function setupCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-counter'));
                const duration = 2000;
                const steps = 60;
                const stepDuration = duration / steps;
                const increment = finalValue / steps;

                let current = 0;
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        target.textContent = finalValue;
                        clearInterval(counter);
                        target.classList.add('counted');
                    } else {
                        target.textContent = Math.floor(current);
                    }
                }, stepDuration);

                counterObserver.unobserve(target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

document.addEventListener('DOMContentLoaded', setupCounterAnimation);

// ====================================
// Page Transition Effects
// ====================================

function setupPageTransitions() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');

        if (link && link.href && !link.href.includes('#') && link.target !== '_blank') {
            const isInternalLink = link.href.includes(window.location.origin);

            if (isInternalLink) {
                // Optional: add fade effect to page transitions
                // document.documentElement.style.opacity = '0.5';
                // transition handled by browser
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', setupPageTransitions);

// ====================================
// Keyboard Navigation
// ====================================

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Press '/' to focus search (if search exists)
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            const searchInput = document.querySelector('[data-search]');
            if (searchInput) {
                e.preventDefault();
                searchInput.focus();
            }
        }

        // Press 'Escape' to close modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('[data-modal]');
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', setupKeyboardNavigation);

// ====================================
// Utility: Get Query Parameter
// ====================================

function getQueryParam(param) {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}

// ====================================
// Utility: Set Active Navigation Link
// ====================================

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = 'var(--primary)';
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ====================================
// Initialize Everything
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('OniTweaks Website Loaded Successfully');
});
