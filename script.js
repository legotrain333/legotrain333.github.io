// Dark Mode functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

themeToggle.addEventListener('click', () => {

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    let theme = savedTheme || getSystemTheme();
    document.body.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    }
});

initializeTheme();

// Navigation hamburger for mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
}));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    }
});

// Hero title typing effect
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    function typeWriter(element, text, speed = 50) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    window.addEventListener('load', () => setTimeout(() => typeWriter(heroTitle, originalText), 500));
}

// Floating icons parallax
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.floating-icons');
    if (parallax) {
        const speed = window.pageYOffset * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Fade-in animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add keyframes for fadeIn
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-fill');
const skillsSection = document.querySelector('.skills');

const animateSkillBars = () => {
    if (!skillsSection || skillBars.length === 0) return;
    const sectionTop = skillsSection.offsetTop;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollTop + windowHeight > sectionTop + 100) {
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = targetWidth; }, 200 + index * 100);
            }
        });
        window.removeEventListener('scroll', animateSkillBars);
    }
};

document.addEventListener('DOMContentLoaded', () => setTimeout(animateSkillBars, 500));
window.addEventListener('scroll', animateSkillBars);

// Page fade-in on load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => document.body.style.opacity = '1', 100);
});

// Contact Form - normal POST (works with FormSubmit)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // normal submit, no JS interference
        // form will POST to FormSubmit automatically
    });
}
