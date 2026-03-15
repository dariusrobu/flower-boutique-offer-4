// Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const mobileDrawer = document.querySelector('.mobile-drawer');

if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMenu && mobileDrawer) {
    closeMenu.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Custom Cursor Logic
const follower = document.querySelector('.cursor-follower');
const ring = document.querySelector('.cursor-ring');

window.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    
    // Smooth transition for the ring
    ring.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
    follower.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
});

// Cursor hover effects
document.querySelectorAll('a, button, .option-item, .step').forEach(el => {
    el.addEventListener('mouseenter', () => {
        ring.style.transform = `translate(${el.getBoundingClientRect().left + el.offsetWidth/2 - 30}px, ${el.getBoundingClientRect().top + el.offsetHeight/2 - 30}px) scale(1.5)`;
        ring.style.borderColor = 'white';
        follower.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
        ring.style.transform = `scale(1)`;
        ring.style.borderColor = 'var(--gold)';
        follower.style.opacity = '1';
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxHero = document.querySelector('.parallax-bg');
    if (parallaxHero) {
        parallaxHero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }

    const parallaxStudio = document.querySelector('.studio-image-parallax');
    if (parallaxStudio) {
        const rect = parallaxStudio.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            parallaxStudio.style.backgroundPositionY = `${(rect.top * 0.1)}px`;
        }
    }
});

// Arrangement Builder Logic
function goToStep(stepNumber) {
    // Scroll to builder top for focus
    document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        // Update active step indicator
        document.querySelectorAll('.step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === stepNumber) {
                step.classList.add('active');
            }
        });

        // Update visible panel with a bespoke fade
        document.querySelectorAll('.step-panel').forEach(panel => {
            panel.style.opacity = '0';
            setTimeout(() => {
                panel.classList.remove('active');
                if (panel.id === `step-${stepNumber}`) {
                    panel.classList.add('active');
                    setTimeout(() => panel.style.opacity = '1', 50);
                }
            }, 400);
        });
    }, 300);
}

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
