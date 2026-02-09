document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Navbar Scroll Behavior --- */
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 2. Mobile Menu Toggle --- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ri-menu-3-line', 'ri-close-line');
            } else {
                icon.classList.replace('ri-close-line', 'ri-menu-3-line');
            }
        });
    }

    /* --- 3. Scroll Animations (Intersection Observer) --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize animation for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`; // Stagger effect
        revealObserver.observe(card);
    });

    /* --- 4. Smooth Anchor Scrolling --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });

                // Close mobile menu if open
                if (window.innerWidth <= 900 && navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileToggle?.querySelector('i');
                    if (icon) {
                        icon.classList.replace('ri-close-line', 'ri-menu-3-line');
                    }
                }
            }
        });
    });

    /* --- 5. Language Toggle Logic --- */
    const langToggleBtn = document.getElementById('lang-toggle');
    const body = document.body;

    const updateLangButtonText = () => {
        if (langToggleBtn) {
            langToggleBtn.textContent = body.classList.contains('show-hindi') ? 'English' : 'हिंदी';
        }
    };

    // Initialize from local storage
    if (localStorage.getItem('lang') === 'hindi') {
        body.classList.add('show-hindi');
        updateLangButtonText();
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            body.classList.toggle('show-hindi');
            const isHindi = body.classList.contains('show-hindi');
            localStorage.setItem('lang', isHindi ? 'hindi' : 'english');
            updateLangButtonText();
        });
    }
});

