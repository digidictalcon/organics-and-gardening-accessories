document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animation for hamburger icon could be added here if needed
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ri-menu-3-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-3-line');
            }
        });
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate Product Cards on Scroll
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        card.style.transitionDelay = `${index * 100}ms`; // Stagger effect

        observer.observe(card);

        card.addEventListener('transitionend', () => {
            if (card.classList.contains('visible')) {
                card.style.transform = 'none'; // Allow hover effects to work properly after animation
                card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // Reset for hover
                card.style.transitionDelay = '0s';
            }
        });
    });

    // Custom visibility logic for observed elements
    // This part bridges the gap between the CSS transition setup and the observer class add
    const addVisibleClass = () => {
        const visibleCards = document.querySelectorAll('.product-card.visible');
        visibleCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    };

    // Enhance the observer callback to trigger the style change
    const improvedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Apply inline styles for the "enter" animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                improvedObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    productCards.forEach(card => {
        improvedObserver.observe(card);
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 900) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('ri-close-line');
                        icon.classList.add('ri-menu-3-line');
                    }
                }
            }
        });
    });

    /* --- Language Toggle Logic --- */
    const langToggleBtn = document.getElementById('lang-toggle');
    const body = document.body;

    // Check local storage for preference
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'hindi') {
        body.classList.add('show-hindi');
        if (langToggleBtn) langToggleBtn.textContent = 'English';
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            body.classList.toggle('show-hindi');

            if (body.classList.contains('show-hindi')) {
                langToggleBtn.textContent = 'English';
                localStorage.setItem('lang', 'hindi');
            } else {
                langToggleBtn.textContent = 'हिंदी';
                localStorage.setItem('lang', 'english');
            }
        });
    }
});

