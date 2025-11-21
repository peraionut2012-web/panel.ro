// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: false,
    mirror: false
});

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Add delay to each nav item for staggered animation
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    // Close mobile nav when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.querySelector('i').classList.add('fa-bars');
            navToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add floating animation to feature icons
    document.querySelectorAll('.feature-icon').forEach(icon => {
        icon.classList.add('floating');
    });

    // Add pulse animation to join links
    document.querySelectorAll('.join-link').forEach(link => {
        link.classList.add('pulsing');
    });

    // Initialize Vanilla Tilt for 3D effect on gallery items
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.hover3d'), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            perspective: 1000,
            scale: 1.05
        });
    }

    // Initialize Swiper for Gallery
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 30,
            slideShadows: false,
        }
    });

    // Hover3D effect for cards
    const hover3dItems = document.querySelectorAll('.hover3d');
    
    hover3dItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const inner = this.querySelector('.stat-box-inner') || 
                          this.querySelector('.feature-card-inner') || 
                          this.querySelector('.product-card-inner') || 
                          this;
            const { left, top, width, height } = this.getBoundingClientRect();
            
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            inner.style.transform = `translateZ(20px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
        });
        
        item.addEventListener('mouseleave', function() {
            const inner = this.querySelector('.stat-box-inner') || 
                          this.querySelector('.feature-card-inner') || 
                          this.querySelector('.product-card-inner') || 
                          this;
            inner.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
        });
    });

    // Background particles animation
    createBackgroundParticles();

    // Add hero particles
    createHeroParticles();

    // Modal functionality for checkout
    const modal = document.getElementById('checkout-modal');
    const checkoutButtons = document.querySelectorAll('.paypal-checkout');
    const closeModal = document.querySelector('.close-modal');
    const checkoutProduct = document.getElementById('checkout-product');
    const checkoutPrice = document.getElementById('checkout-price');

    // Open modal when checkout button is clicked
    checkoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            
            checkoutProduct.textContent = formatProductName(product);
            checkoutPrice.textContent = price;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Initialize PayPal buttons
            initPayPalButton(product, price);
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Format product name (remove dashes and capitalize)
    function formatProductName(product) {
        return product.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    // Initialize PayPal button
    function initPayPalButton(product, price) {
        // Clear previous buttons
        document.getElementById('paypal-button-container').innerHTML = '';
        
        // Add new PayPal buttons
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal'
            },
            createOrder: function(data, actions) {
                const name = document.getElementById('checkout-name').value;
                const email = document.getElementById('checkout-email').value;
                
                if (!name || !email) {
                    alert('Te rugÄƒm sÄƒ completezi toate cÃ¢mpurile');
                    return;
                }
                
                return actions.order.create({
                    purchase_units: [{
                        description: product,
                        amount: {
                            currency_code: 'EUR',
                            value: price
                        },
                        custom_id: name + '|' + email
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Show success message
                    alert('PlatÄƒ realizatÄƒ cu succes! Beneficiile VIP vor fi activate Ã®n curÃ¢nd.');
                    
                    // Close modal
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    
                    // You would typically make an API call to your server here
                    // to activate the VIP benefits for the player
                    console.log('Transaction completed by ' + details.payer.name.given_name);
                    console.log('Order ID: ' + data.orderID);
                });
            },
            onError: function(err) {
                console.error('Error', err);
                alert('A apÄƒrut o eroare la procesarea plÄƒÈ›ii. Te rugÄƒm sÄƒ Ã®ncerci din nou.');
            }
        }).render('#paypal-button-container');
    }

    // Add counter animation for stat boxes
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000; // Duration in milliseconds
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target + '+';
                clearInterval(timer);
            } else {
                el.textContent = current + '+';
            }
        }, 16);
    }

    // Use Intersection Observer to trigger counter animation
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter').forEach(counter => {
            counterObserver.observe(counter);
        });
    } else {
        // Fallback for browsers without Intersection Observer
        document.querySelectorAll('.counter').forEach(counter => {
            animateCounter(counter);
        });
    }

    // Server status update (would usually come from an API)
    function updateServerStatus() {
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        const playerCount = document.querySelector('.player-count');
        
        // This is a mock function - in a real scenario, you would fetch this data from an API
        const isOnline = true;
        const currentPlayers = 20;
        const maxPlayers = 128;
        
        if (isOnline) {
            statusIndicator.classList.add('online');
            statusIndicator.classList.remove('offline');
            statusText.textContent = 'Server Online';
        } else {
            statusIndicator.classList.add('offline');
            statusIndicator.classList.remove('online');
            statusText.textContent = 'Server Offline';
        }
        
        playerCount.textContent = `${currentPlayers}/${maxPlayers} JucÄƒtori`;
    }
    
    // Update server status on page load
    updateServerStatus();
    
    // Update server status every minute (in a real scenario)
    // setInterval(updateServerStatus, 60000);
});

function createBackgroundParticles() {
    const bgParticles = document.querySelector('.bg-particles');
    if (!bgParticles) return;
    
    for (let i = 0; i < 50; i++) {
        const size = Math.random() * 2;
        const particle = document.createElement('div');
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = i % 2 === 0 ? 'var(--primary-color)' : 'var(--secondary-color)';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Add animation
        particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite alternate`;
        particle.style.animationDelay = -Math.random() * 5 + 's';
        
        bgParticles.appendChild(particle);
    }
}

function createHeroParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    for (let i = 0; i < 30; i++) {
        const size = Math.random() * 3 + 1;
        const particle = document.createElement('div');
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = i % 3 === 0 ? 'var(--primary-color)' : 
                                  i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)';
        particle.style.opacity = Math.random() * 0.7;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = i % 3 === 0 ? 'var(--primary-glow)' : 
                                 i % 3 === 1 ? 'var(--secondary-glow)' : 'var(--accent-glow)';
        
        // Random position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Add animation
        particle.style.animation = `float ${8 + Math.random() * 15}s linear infinite alternate`;
        particle.style.animationDelay = -Math.random() * 8 + 's';
        
        heroParticles.appendChild(particle);
    }
}

// Add CSS keyframes for particle animation
if (!document.querySelector('#particle-animations')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'particle-animations';
    styleSheet.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(0) translateX(0) scale(1);
            }
            33% {
                transform: translateY(-20px) translateX(10px) scale(1.2);
            }
            66% {
                transform: translateY(10px) translateX(-15px) scale(0.8);
            }
            100% {
                transform: translateY(-15px) translateX(5px) scale(1);
            }
        }
    `;
    document.head.appendChild(styleSheet);
} 