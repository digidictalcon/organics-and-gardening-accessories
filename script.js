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
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    /* --- Product Details Section Logic --- */
    const detailsSection = document.getElementById('product-details-view');
    const closeDetailsBtn = document.getElementById('close-details');
    const productCardsElements = document.querySelectorAll('.product-card');

    // Content Elements
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    const detailImg = document.getElementById('detail-img');

    // Show Details Function
    const showDetails = (card) => {
        // Get data
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const imageSrc = card.getAttribute('data-image');

        // Populate
        detailTitle.textContent = title;
        detailDesc.textContent = desc;
        detailImg.src = imageSrc;

        // --- Move Section to Active Grid ---
        const activeContainer = card.closest('.container');
        if (activeContainer) {
            const grid = activeContainer.querySelector('.product-grid');
            if (grid) {
                // Logic to insert AFTER the current row
                const cards = Array.from(grid.querySelectorAll('.product-card'));
                const cardIndex = cards.indexOf(card);

                // Find the last card in the *current* row
                // We assume cards are in DOM order. We check offsets to see where the row breaks.
                let insertAfterCard = card;

                // Get the top offset of the clicked card's row
                const rowTop = card.offsetTop;

                for (let i = cardIndex; i < cards.length; i++) {
                    const current = cards[i];
                    // If we find a card that is on a NEW row (lower down), we stop.
                    // The previous card was the last one in our row.
                    if (current.offsetTop > rowTop) {
                        break;
                    }
                    insertAfterCard = current;
                }

                // Insert the details section after the last card of this row
                if (insertAfterCard.nextSibling) {
                    grid.insertBefore(detailsSection, insertAfterCard.nextSibling);
                } else {
                    grid.appendChild(detailsSection);
                }
            }
        }

        // Show Section
        detailsSection.style.display = 'block';

        // Smooth Scroll to Section
        setTimeout(() => {
            detailsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    // Close Details Function
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            detailsSection.style.display = 'none';
        });
    }

    // Event Listeners for Cards
    productCardsElements.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            showDetails(card);
        });
    });
});
