// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you shortly to discuss your photography needs.');
    this.reset();
});

// Pricing button interactions
document.querySelectorAll('.pricing-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const packageName = this.closest('.pricing-card').querySelector('h3').textContent;
        alert(`You selected the ${packageName} package! Please fill out the contact form to proceed with your booking.`);
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
});

// Portfolio Modal Gallery System
const portfolioData = {
    traditional: {
        title: "Traditional Ceremony",
        subtitle: "South Indian Weddings",
        images: [
            'images/traditional/1.jpg',
            'images/traditional/2.jpg',
            'images/traditional/3.jpg',
            'images/traditional/4.jpg',
            'images/traditional/5.jpg',
            'images/traditional/6.jpg',
            'images/traditional/7.jpg',
            'images/traditional/8.jpg',
        ]
    },
    bridal: {
        title: "Bridal Elegance",
        subtitle: "Portrait Sessions",
        images: [
            'images/bridal/1.jpg',
            'images/bridal/2.jpg',
            'images/bridal/3.jpg',
            'images/bridal/4.jpg',
            'images/bridal/5.jpg',
            'images/bridal/6.jpg',
        ]
    },
    prewedding: {
        title: "Love Story",
        subtitle: "Pre-Wedding Shoots",
        images: [
            'images/prewedding/1.jpg',
            'images/prewedding/2.jpg',
            'images/prewedding/3.jpg',
            'images/prewedding/4.jpg',
            'images/prewedding/5.jpg',
            'images/prewedding/6.jpg',
        ]
    },
    reception: {
        title: "Candid Joy",
        subtitle: "Reception Celebrations",
        images: [
            'images/reception/1.jpg',
            'images/reception/2.jpg',
            'images/reception/3.jpg',
            'images/reception/4.jpg',
            'images/reception/5.jpg',
        ]
    },
    couple: {
        title: "Together Forever",
        subtitle: "Engagement Sessions",
        images: [
            'images/couple/1.jpg',
            'images/couple/2.jpg',
            'images/couple/3.jpg',
            'images/couple/4.jpg',
            'images/couple/5.jpg',
        ]
    }
};

const modal = document.getElementById('portfolioModal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalGallery = document.getElementById('modalGallery');

// Open modal when portfolio item is clicked
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        if (category && portfolioData[category]) {
            openPortfolioGallery(category);
        }
    });
});

function openPortfolioGallery(category) {
    const data = portfolioData[category];
    
    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalGallery.innerHTML = '';
    
    data.images.forEach((imageSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'modal-gallery-item';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `${data.title} ${index + 1}`;
        
        img.onerror = function() {
            galleryItem.innerHTML = '<div class="modal-placeholder">📷</div>';
        };
        
        galleryItem.appendChild(img);
        modalGallery.appendChild(galleryItem);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});
