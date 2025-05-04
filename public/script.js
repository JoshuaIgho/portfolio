  // Mobile menu toggle
  document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

document.querySelector('.viewAllProject').addEventListener('click', ()=>{
    window.location.href = '/viewAllProject'
});

const button = document.querySelectorAll('.viewDetails');

button.forEach(button =>{
    button.addEventListener('click', ()=>{
    window.location.href = '/details'
    })
});

document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('/api/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message || 'Email sent successfully!');
        } else {
            alert(data.error || data.errors.join(', '));
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message.');
    }
});




// Filter projects
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-purple-800', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            this.classList.remove('bg-white', 'text-gray-700');
            this.classList.add('bg-purple-800', 'text-white');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.getElementById('mobile-menu').classList.add('hidden');
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0)';
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate progress bars on page load
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        // Reset width to 0 for animation
        const originalWidth = bar.style.width;
        bar.style.width = '0';
        
        // Set timeout to trigger animation
        setTimeout(() => {
            bar.style.width = originalWidth;
        }, 100);
    });
});
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
    // Desktop slider functionality
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot-indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Initialize slider
    function updateSlider() {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.remove('prev', 'next');
                slide.classList.add('active');
            } else if (index < currentIndex) {
                slide.classList.remove('active', 'next');
                slide.classList.add('prev');
            } else {
                slide.classList.remove('active', 'prev');
                slide.classList.add('next');
            }
        });
        
        // Update dot indicators
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
        resetAutoSlide();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoSlide();
    }
    
    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners for desktop navigation
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.dataset.index));
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Touch events for swipe on mobile
    const sliderContainer = document.querySelector('.testimonial-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(autoSlideInterval);
        }, {passive: true});
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, {passive: true});
    }
    
    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) {
            // Swipe left
            nextSlide();
        } else if (difference < -50) {
            // Swipe right
            prevSlide();
        }
    }
    
    // Initialize desktop slider
    if (slides.length > 0) {
        updateSlider();
        startAutoSlide();
        
        // Pause on hover
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    // Mobile testimonials functionality
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (content.classList.contains('expanded')) {
                content.classList.remove('expanded');
                this.innerHTML = 'Read more <i class="fas fa-chevron-down ml-1"></i>';
            } else {
                content.classList.add('expanded');
                this.innerHTML = 'Read less <i class="fas fa-chevron-up ml-1"></i>';
            }
        });
    });
});