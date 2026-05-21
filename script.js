/* ===================================================
   STORY BEE STUDIO — script.js
   =================================================== */

// ── NAV SCROLL STATE ──────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });


// ── HAMBURGER MENU ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});


// ── SCROLL REVEAL ─────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ── CONTACT FORM ──────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  // Basic validation
  if (!name || !email) {
    shakeField(!name ? 'name' : 'email');
    return;
  }
  if (!isValidEmail(email)) {
    shakeField('email');
    return;
  }

  // Simulate send
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.textContent = 'Send Message 🐝';
    btn.disabled = false;

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1200);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeField(id) {
  const el = document.getElementById(id);
  el.style.borderColor = '#c0392b';
  el.style.animation = 'shake 0.4s ease';
  el.focus();
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.animation = '';
  }, 1000);
}

// Inject shake keyframes
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}`;
document.head.appendChild(shakeStyle);


// ── TRUST STRIP DUPLICATE (ensure seamless loop) ──
// The CSS animation handles marquee; JS ensures strip is wide enough
const strip = document.querySelector('.trust-strip');
if (strip) {
  const originalHTML = strip.innerHTML;
  strip.innerHTML = originalHTML + originalHTML;
}


// ── SMOOTH ANCHOR SCROLL ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ── PLAN CARD HOVER TILT ──────────────────────────
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});


// ── ACTIVE NAV LINK HIGHLIGHT ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--honey-dark)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
