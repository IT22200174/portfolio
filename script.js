/* --- c:\Users\User\Downloads\portfolio\script.js --- */

// 1. Typing Animation Data
const typingTexts = [
    "Network Engineering",
    "Cyber Infrastructure",
    "Cloud & Automation",
    "Network Security"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function type() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end of text
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500; // Pause before new text
    }
    
    setTimeout(type, typeSpeed);
}

// Start typing animation
document.addEventListener("DOMContentLoaded", () => {
    if(typingElement) setTimeout(type, 1000);
});

// 2. Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        });
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    // Intentionally left transparent to blend with background
});

// 3. Scroll Reveal Animation & Progress Bars
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            const bars = entry.target.querySelectorAll('.progress');
            bars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    });
}, observerOptions);

fadeElements.forEach(el => scrollObserver.observe(el));



// 4. Contact Form Validation and Handle
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        // Simple animation to simulate sending
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        btn.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.5)';
        
        setTimeout(() => {
            btn.innerHTML = 'Transmission Successful <i class="fas fa-check"></i>';
            btn.style.color = '#00ff88';
            btn.style.borderColor = '#00ff88';
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.color = '';
                btn.style.borderColor = '';
                btn.style.boxShadow = '';
            }, 3000);
            
        }, 1500);
    });
}


// 5. Professional Ambient Glow Animation
const canvas = document.getElementById('network-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    let orbs = [];
    const colors = [
        'rgba(52, 211, 153, 0.05)', // Emerald
        'rgba(16, 185, 129, 0.05)', // Darker Emerald
        'rgba(96, 165, 250, 0.05)', // Blue
        'rgba(59, 130, 246, 0.05)'  // Darker Blue
    ];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class AmbientOrb {
        constructor() {
            this.radius = Math.random() * 200 + 150; // Huge soft orbs
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4; // Very slow drift
            this.vy = (Math.random() - 0.5) * 0.4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Soft drift wrapping around screen
            if (this.x - this.radius > canvas.width) this.x = -this.radius;
            if (this.x + this.radius < 0) this.x = canvas.width + this.radius;
            if (this.y - this.radius > canvas.height) this.y = -this.radius;
            if (this.y + this.radius < 0) this.y = canvas.height + this.radius;
        }
        
        draw() {
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
            
            // Center is slightly brighter, edge fades out to completely transparent
            gradient.addColorStop(0, this.color.replace('0.05)', '0.15)'));
            gradient.addColorStop(1, this.color.replace('0.05)', '0)'));
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }
    
    function initOrbs() {
        orbs = [];
        let orbCount = Math.min(Math.floor(window.innerWidth / 200) + 2, 10); // Scale count to screen width
        for (let i = 0; i < orbCount; i++) {
            orbs.push(new AmbientOrb());
        }
    }
    
    function animateOrbs() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < orbs.length; i++) {
            orbs[i].update();
            orbs[i].draw();
        }
        
        requestAnimationFrame(animateOrbs);
    }
    
    initOrbs();
    animateOrbs();
}

// 6. Lenis Smooth Scroll Initialization
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 7. Premium Interactivity: 3D Tilt & Magnetic Buttons
document.addEventListener("mousemove", (e) => {
    // 3D Tilt for Glass Cards (Desktop Only)
    if (window.innerWidth > 1024) {
        document.querySelectorAll('.glass-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                // Set CSS variables for shine effect
                card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
                
                // Tilt logic
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const tiltX = (y - centerY) / 20;
                const tiltY = (centerX - x) / 20;
                
                card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            } else {
                card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            }
        });

        // Magnetic Effect for Buttons & Social Links
        document.querySelectorAll('.btn, .social-links a').forEach(el => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(x*x + y*y);

            if (distance < 100) {
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            } else {
                el.style.transform = `translate(0, 0)`;
            }
        });
    }
});

// 8. Navigation & Utility Functions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            lenis.scrollTo(target, { offset: -80 });
            
            // Close mobile menu
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').className = 'fas fa-bars';
            }
        }
    });
});

