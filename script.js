document.addEventListener('DOMContentLoaded', () => {
    // ========== Modal Functionality ==========
    document.querySelectorAll('.event-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            // Get the parent event card
            const eventCard = link.closest('.event-card');
            
            // Get modal elements
            const modal = document.getElementById('eventModal');
            const modalImage = document.getElementById('modal-image');
            const modalDate = document.getElementById('modal-date');
            const modalTitle = document.getElementById('modal-title');
            const modalDesc = document.getElementById('modal-description');
            
            // Set modal content
            if (eventCard) {
                const bgImage = eventCard.style.backgroundImage;
                modalImage.src = bgImage ? bgImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1') : '';
                modalDate.textContent = eventCard.querySelector('.event-date')?.textContent || '';
                modalTitle.textContent = eventCard.querySelector('h4')?.textContent || '';
                modalDesc.textContent = eventCard.querySelector('p')?.textContent || '';
            }
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal functionality
    document.querySelector('.modal-close')?.addEventListener('click', () => {
        document.getElementById('eventModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', e => {
        const modal = document.getElementById('eventModal');
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ========== Intersection Observer ==========
    const sections = document.querySelectorAll('.fade-in-section');
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    sections.forEach(s => io.observe(s));

    // ========== Swiper Sliders ==========
    // Hero Slider
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    // Events Slider with enhanced visibility handling
    const eventsSwiper = new Swiper('.events-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            576: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 3 }
        },
        on: {
            init: function() {
                updateVisibleSlides();
            },
            slideChange: function() {
                updateVisibleSlides();
            }
        }
    });

    function updateVisibleSlides() {
        document.querySelectorAll('.swiper-slide').forEach(slide => {
            const content = slide.querySelector('.fade-down');
            if (slide.classList.contains('swiper-slide-visible') || 
                slide.classList.contains('swiper-slide-active')) {
                content?.classList.add('visible');
            } else {
                content?.classList.remove('visible');
            }
        });
    }

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse?.classList.contains('show')) {
                    document.querySelector('.navbar-toggler')?.click();
                }
            }
        });
    });

    // ========== Scroll Animations ==========
    function animateOnScroll() {
        // For elements with animate- classes
        document.querySelectorAll('[class*="animate-"]').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < window.innerHeight - 100) {
                element.style.opacity = '1';
            }
        });

        // For Animate.css elements
        document.querySelectorAll('.animate__animated').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < window.innerHeight / 1.2) {
                const animation = element.getAttribute('data-animation') || 'fadeIn';
                element.style.animationDelay = element.getAttribute('data-delay') || '0s';
                element.classList.add(`animate__${animation}`);
                element.style.opacity = '1';
            }
        });
    }

    // Initial animation trigger
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // ========== Navbar Effects ==========
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        }
    });

    // ========== Contact Form ==========
    document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Form submission handling
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // ========== Mobile Menu ==========
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            if (navbarCollapse) {
                document.querySelector('.navbar-toggler')?.click();
            }
        });
    });
});