// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (navbar) navbar.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
    });
});

// Back to top button
const toTopBtn = document.getElementById('toTop');
if (toTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }
    });
    
    toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }
});

// Carousel functionality - FIXED VERSION
document.addEventListener('DOMContentLoaded', function () {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    
    // Check if carousel elements exist
    if (!carouselTrack || !slides.length || !dotsContainer || !prevBtn || !nextBtn) {
        console.log('Carousel elements not found');
        return;
    }

    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    // Function to go to specific slide
    function goToSlide(slideIndex) {
        // Update current slide
        currentSlide = slideIndex;

        // Update track position
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update active classes
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Function for next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // Function for previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-advance slides
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch swipe support for mobile
    let startX = 0;
    let endX = 0;

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoSlide();
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', () => {
            const diff = startX - endX;
            const threshold = 50; // Minimum swipe distance

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swiped left - next slide
                    nextSlide();
                } else {
                    // Swiped right - previous slide
                    prevSlide();
                }
            }
            startAutoSlide();
        });
    }

    // Initialize first slide
    goToSlide(0);
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Animate skill bars when skills section is in view
            if (entry.target.id === 'skills') {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.transition = 'width 1s ease-in-out';
                    }, 300);
                });
            }
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});