// LYIS Website - Vanilla JavaScript

document.addEventListener('DOMContentLoaded', function() {

  // ===== Testimonials Carousel =====
  const track = document.getElementById('testimonialsTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 0;
  let itemsPerView = 1;

  function updateItemsPerView() {
    if (window.innerWidth >= 768) {
      itemsPerView = 2;
    } else {
      itemsPerView = 1;
    }
  }

  function getMaxIndex() {
    const items = track.querySelectorAll('.testimonial-item');
    return Math.max(0, items.length - itemsPerView);
  }

  function updateCarousel() {
    if (!track) return;
    const itemWidth = 100 / itemsPerView;
    track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    
    // Update button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= getMaxIndex();
  }

  function nextSlide() {
    if (currentIndex < getMaxIndex()) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  // Initialize carousel
  updateItemsPerView();
  updateCarousel();

  // Update on resize
  window.addEventListener('resize', function() {
    updateItemsPerView();
    currentIndex = Math.min(currentIndex, getMaxIndex());
    updateCarousel();
  });

  // ===== Newsletter Form =====
  const subscribeForm = document.getElementById('subscribeForm');
  
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector('.subscribe-input');
      const email = emailInput.value;
      
      // Simple validation
      if (email && email.includes('@')) {
        alert('Thank you for subscribing! We\'ll keep you updated.');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // ===== Hero Form =====
  const heroForm = document.querySelector('.hero-form');
  
  if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = heroForm.querySelectorAll('.form-input');
      const name = inputs[0].value;
      const email = inputs[1].value;
      
      if (name && email && email.includes('@')) {
        alert(`Thank you ${name}! We'll be in touch at ${email} with conference details.`);
        inputs[0].value = '';
        inputs[1].value = '';
      } else {
        alert('Please fill in all fields with valid information.');
      }
    });
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ===== Scroll Animations =====
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.feature-card, .bento-card, .event-card, .course-card, .testimonial-item').forEach(el => {
    observer.observe(el);
  });

  // ===== Navbar Scroll Effect =====
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }
    
    lastScrollY = currentScrollY;
  });

  // ===== Button Hover Effects =====
  document.querySelectorAll('.btn, .btn-text, .btn-outline-light, .btn-outline-small').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});


// ===== Mobile Navigation Menu =====
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  navOverlay.classList.add('is-open');
  document.body.classList.add('menu-open');
});

menuClose.addEventListener('click', closeMenu);

navOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-backdrop')) {
    closeMenu();
  }
});

function closeMenu() {
  navOverlay.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const submenu = link.nextElementSibling;
    if (submenu && submenu.classList.contains('submenu')) {
      submenu.classList.toggle('is-open');
      link.setAttribute(
        'aria-expanded',
        submenu.classList.contains('is-open')
      );
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});
