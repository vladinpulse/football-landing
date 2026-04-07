// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Animated counters
const counters = document.querySelectorAll('.stat-number');
let counted = false;

function animateCounters() {
  if (counted) return;
  const statsSection = document.getElementById('stats');
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    counted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    });
  }
}

window.addEventListener('scroll', animateCounters);
animateCounters();

// Scroll-based header opacity
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.background = 'rgba(13,13,13,0.97)';
  } else {
    header.style.background = 'rgba(13,13,13,0.8)';
  }
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.program-card, .coach-card, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Add visible class styles via JS
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Staggered animation for grid items
const cards = document.querySelectorAll('.program-card, .coach-card');
cards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// Form submission
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Отправляем...';
  btn.disabled = true;
  setTimeout(() => {
    success.style.display = 'block';
    form.reset();
    btn.textContent = 'Отправить заявку';
    btn.disabled = false;
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1200);
});

// Smooth active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = '#fff';
    }
  });
});
