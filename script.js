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
    /* --- 6. Product Details Modal --- */

    // Product Data (Safe Descriptions: No Claims, Focus on Quality/Nature)
    const productDetails = {
        'Whole Grains': {
            en: "Experience the wholesome taste of our premium whole grains. Our selection includes high-quality Sharbati Wheat, Jowar, Bajra, and Ragi. Carefully selected to ensure you get the best texture and authentic flavor for your daily meals.",
            hi: "हमारे प्रीमियम खड़े अनाजों के पौष्टिक स्वाद का अनुभव करें। हमारे चयन में उच्च गुणवत्ता वाले शरबती गेहूं, ज्वार, बाजरा और रागी शामिल हैं। आपके दैनिक भोजन के लिए सर्वोत्तम बनावट और असली स्वाद सुनिश्चित करने के लिए सावधानीपूर्वक चुना गया।"
        },
        'Pulses': {
            en: "Our pulses are known for their rich taste and texture. Whether it's Moong, Tur, or Chana Dal, we offer varieties that cook well and bring traditional flavor to your kitchen. A perfect staple for a balanced diet.",
            hi: "हमारी दालें अपने समृद्ध स्वाद और बनावट के लिए जानी जाती हैं। चाहे वह मूंग, तुअर, या चना दाल हो, हम ऐसी किस्में प्रदान करते हैं जो अच्छी तरह से पकती हैं और आपकी रसोई में पारंपरिक स्वाद लाती हैं। संतुलित आहार के लिए एक आदर्श मुख्य भोजन।"
        },
        'Spices': {
            en: "Enhance your cooking with our aromatic spices. Our Turmeric, Chilli, Coriander, and Cumin are selected for their vibrant color and strong fragrance, adding the perfect touch to your favorite dishes.",
            hi: "हमारे सुगंधित मसालों के साथ अपने खाना पकाने को बढ़ाएं। हमारी हल्दी, मिर्च, धनिया और जीरा उनके जीवंत रंग और तेज सुगंध के लिए चुने गए हैं, जो आपके पसंदीदा व्यंजनों में सही स्पर्श जोड़ते हैं।"
        },
        'Food Oil': {
            en: "Traditional Cold-pressed (Kacchi Ghani) oils for your daily needs. Available in Groundnut, Mustard, Sesame, and Coconut varieties. These oils allow you to enjoy the authentic taste of your food.",
            hi: "आपकी दैनिक जरूरतों के लिए पारंपरिक कच्ची घानी तेल। मूंगफली, सरसों, तिल और नारियल की किस्मों में उपलब्ध है। ये तेल आपको अपने भोजन के असली स्वाद का आनंद लेने की अनुमति देते हैं।"
        },
        'Vegetable Seeds': {
            en: "Grow your own fresh vegetables with our quality seeds. We offer a variety of seasonal options like Okra, Beans, Radish, and Greens, perfect for your home garden patch or pots.",
            hi: "हमारे गुणवत्ता वाले बीजों के साथ अपनी खुद की ताजी सब्जियां उगाएं। हम भिंडी, बींस, मूली और साग जैसे विभिन्न मौसमी विकल्पों की पेशकश करते हैं, जो आपके घर के बगीचे या गमलों के लिए एकदम सही हैं।"
        },
        'Flower Seeds': {
            en: "Add color to your home with our beautiful flower seeds. From Marigolds to Zinnias, we have a selection that helps you create a vibrant and welcoming garden space.",
            hi: "हमारे खूबसूरत फूलों के बीजों के साथ अपने घर में रंग जोड़ें। गेंदा से लेकर ज़िनिया तक, हमारे पास एक ऐसा चयन है जो आपको एक जीवंत और स्वागत करने वाली उद्यान जगह बनाने में मदद करता है।"
        },
        'Fertilizers & Manure': {
            en: "Support your plant growth with our range of natural inputs. We offer Vermi Compost, Neem Oil, and other manures to help maintain soil quality and keep your garden thriving.",
            hi: "प्राकृतिक इनपुट की हमारी रेंज के साथ अपने पौधों के विकास का समर्थन करें। हम मिट्टी की गुणवत्ता बनाए रखने और आपके बगीचे को खुशहाल रखने में मदद करने के लिए वर्मी कम्पोस्ट, नीम तेल और अन्य खाद प्रदान करते हैं।"
        },
        'Pots & Containers': {
            en: "Durable and stylish pots for all your plants. Available in various sizes including hanging planters and large containers, designed to look great in your balcony or garden.",
            hi: "आपके सभी पौधों के लिए टिकाऊ और स्टाइलिश गमले। हैंगिंग प्लांटर्स और बड़े कंटेनरों सहित विभिन्न आकारों में उपलब्ध, आपकी बालकनी या बगीचे में बहुत अच्छा दिखने के लिए डिज़ाइन किया गया।"
        },
        'Gardening Tools': {
            en: "High-quality tools to make gardening easier. From pruning shears to trowels, our tools are designed for comfort and durability, suitable for both beginners and experienced gardeners.",
            hi: "बागवानी को आसान बनाने के लिए उच्च गुणवत्ता वाले उपकरण। प्रूनिंग कैंची से लेकर ट्रॉवेल तक, हमारे उपकरण आराम और स्थायित्व के लिए डिज़ाइन किए गए हैं, जो शुरुआती और अनुभवी माली दोनों के लिए उपयुक्त हैं।"
        },
        'Bird Feed & Nests': {
            en: "Invite nature into your garden with our bird feed and nesting boxes. A simple way to care for local birds like sparrows and enjoy their presence in your outdoor space.",
            hi: "हमारे पक्षी आहार और घोंसले के बक्से के साथ प्रकृति को अपने बगीचे में आमंत्रित करें। गौरैया जैसे स्थानीय पक्षियों की देखभाल करने और अपने बाहरी स्थान में उनकी उपस्थिति का आनंद लेने का एक सरल तरीका।"
        }
    };

    /* Modal DOM Elements */
    // Create Modal HTML dynamically if not exists (or user can add to HTML)
    // For this implementation, we will inject it.
    if (!document.getElementById('product-modal')) {
        const modalHTML = `
            <div id="product-modal" class="modal-overlay">
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <h3 id="modal-title">Product Name</h3>
                    <div class="modal-body">
                        <p id="modal-desc-en" class="lang-en"></p>
                        <p id="modal-desc-hi" class="lang-hi"></p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescEn = document.getElementById('modal-desc-en');
    const modalDescHi = document.getElementById('modal-desc-hi');
    const closeModalBtn = document.querySelector('.close-modal');

    // Add click listeners to cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer'; // Indicate clickable
        card.addEventListener('click', () => {
            // Get title from card
            const titleEl = card.querySelector('h3 .lang-en');
            const title = titleEl ? titleEl.textContent.trim() : 'Product';

            if (productDetails[title]) {
                modalTitle.textContent = title;
                // Set description based on data
                modalDescEn.textContent = productDetails[title].en;
                modalDescHi.textContent = productDetails[title].hi;

                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close logic
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

});

