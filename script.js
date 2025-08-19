// === MAGICAL PORTFOLIO JAVASCRIPT === //

document.addEventListener('DOMContentLoaded', function() {
    
    // === MAGICAL CURSOR === //
    const magicCursor = document.querySelector('.magic-cursor');
    const cursorCore = document.querySelector('.cursor-core');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    let mouseX = 0, mouseY = 0;
    let coreX = 0, coreY = 0;
    let trailX = 0, trailY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Core follows mouse directly
        coreX = mouseX;
        coreY = mouseY;
        
        // Trail follows with delay
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        cursorCore.style.transform = `translate(${coreX}px, ${coreY}px)`;
        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .theme-toggle');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            magicCursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            magicCursor.classList.remove('hover');
        });
    });
    
    // === THEME TOGGLE === //
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Save theme preference
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        
        // Add magical transition effect
        createThemeTransition();
    });
    
    function createThemeTransition() {
        const transition = document.createElement('div');
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle, transparent 0%, var(--bg-primary) 70%);
            pointer-events: none;
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(transition);
        
        requestAnimationFrame(() => {
            transition.style.opacity = '1';
            setTimeout(() => {
                transition.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(transition);
                }, 500);
            }, 200);
        });
    }
    
    // === SCROLL ANIMATIONS === //
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for project cards
                if (entry.target.classList.contains('project-card')) {
                    const cards = document.querySelectorAll('.project-card');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // === MAGICAL PARTICLES === //
    function createMagicalParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${x}px;
            top: ${y}px;
            opacity: 1;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1000 + 1000;
        
        particle.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance - 50}%, ${Math.sin(angle) * distance - 50}%) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(particle);
        };
    }
    
    // Create particles on card hover
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createMagicalParticle(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height
                    );
                }, i * 100);
            }
        });
    });
    
    // === MAGICAL BUTTON EFFECTS === //
    const magicalBtns = document.querySelectorAll('.magical-btn');
    
    magicalBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size/2}px;
                top: ${e.clientY - rect.top - size/2}px;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            btn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS animation for ripple
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // === PARALLAX EFFECTS === //
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for magical background
        const magicalBg = document.querySelector('.magical-bg');
        if (magicalBg) {
            magicalBg.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax for floating orbs
        const orbs = document.querySelectorAll('.floating-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.2;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // === NAVIGATION SCROLL EFFECT === //
    let lastScrollTop = 0;
    const nav = document.querySelector('.magical-nav');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        // Add background opacity based on scroll
        nav.style.background = `rgba(10, 10, 15, ${Math.min(scrollTop / 100, 0.9)})`;
        
        lastScrollTop = scrollTop;
    });
    
    // === DYNAMIC BACKGROUND PARTICLES === //
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: var(--accent-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 10}px;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        
        document.querySelector('.floating-particles').appendChild(particle);
        
        // Animate particle floating up
        const duration = Math.random() * 10000 + 15000;
        const drift = (Math.random() - 0.5) * 200;
        
        particle.animate([
            {
                transform: `translateY(0) translateX(0) rotate(0deg)`,
                opacity: particle.style.opacity
            },
            {
                transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }
    
    // Create floating particles periodically
    setInterval(createFloatingParticle, 3000);
    
    // === MAGIC CIRCLE INTERACTION === //
    const magicCircle = document.querySelector('.magic-circle');
    const centerSymbol = document.querySelector('.center-symbol');
    
    if (magicCircle && centerSymbol) {
        magicCircle.addEventListener('mouseenter', () => {
            centerSymbol.style.animation = 'none';
            centerSymbol.style.transform = 'scale(1.2) rotate(180deg)';
            centerSymbol.style.color = 'var(--accent-secondary)';
            
            // Speed up rings
            const rings = document.querySelectorAll('.circle-ring');
            rings.forEach(ring => {
                ring.style.animationDuration = '2s';
            });
        });
        
        magicCircle.addEventListener('mouseleave', () => {
            centerSymbol.style.animation = 'pulse 2s ease-in-out infinite';
            centerSymbol.style.transform = 'scale(1)';
            centerSymbol.style.color = 'var(--accent-primary)';
            
            // Reset ring speeds
            const rings = document.querySelectorAll('.circle-ring');
            rings.forEach((ring, index) => {
                const speeds = ['10s', '15s', '20s'];
                ring.style.animationDuration = speeds[index];
            });
        });
    }
    
    // === PERFORMANCE OPTIMIZATION === //
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        // Update any performance-critical animations here
        ticking = false;
    }
    
    // === ACCESSIBILITY === //
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable complex animations
        document.body.classList.add('reduced-motion');
        
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.001ms !important;
                transition-duration: 0.001ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // === ERROR HANDLING === //
    window.addEventListener('error', (e) => {
        console.warn('Magical portfolio error:', e.error);
        // Gracefully handle errors without breaking the magic
    });
    
    console.log('✨ Magical portfolio initialized successfully!');
});

// === UTILITY FUNCTIONS === //
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// === MAGIC SPELLS (Additional Effects) === //
function castSparkleSpell(element) {
    const sparkles = [];
    const sparkleCount = 12;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 12px;
            pointer-events: none;
            z-index: 1000;
            color: var(--accent-primary);
        `;
        
        element.appendChild(sparkle);
        sparkles.push(sparkle);
        
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 50;
        
        sparkle.animate([
            {
                transform: 'translate(0, 0) scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1) rotate(180deg)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            sparkle.remove();
        };
    }
}

// Export for potential external use
window.MagicalPortfolio = {
    castSparkleSpell,
    createMagicalParticle: (x, y) => createMagicalParticle(x, y)
};
// Initialize Lucide icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
} else {
    // Fallback if Lucide doesn't load
    console.log('Lucide not loaded, using fallback icons');
}