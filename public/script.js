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