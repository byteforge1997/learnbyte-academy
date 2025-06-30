// Responsive Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth Scrolling for Nav Links
const links = document.querySelectorAll('.nav-links a');
for (const link of links) {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('active'); // Close nav on mobile
    }
  });
}

// Fade-in Animation on Scroll
const faders = document.querySelectorAll('section, .hero');
const navLinkEls = document.querySelectorAll('.nav-links a');
navLinkEls.forEach(link => link.classList.add('fade-init'));
const appearOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.classList.add('fade-init');
  appearOnScroll.observe(fader);
});
navLinkEls.forEach(link => {
  setTimeout(() => link.classList.add('appear'), 100);
});

// CSS for fade-in (inject if not present)
(function() {
  const style = document.createElement('style');
  style.innerHTML = `
    .fade-init { opacity: 0; transform: translateY(30px); transition: opacity 1.2s, transform 1.2s; }
    .appear { opacity: 1 !important; transform: none !important; }
  `;
  document.head.appendChild(style);
})();

// Language Switcher
const langBtn = document.getElementById('langBtn');
const langMenu = document.querySelector('.lang-menu');
const langLinks = document.querySelectorAll('.lang-menu a');

langBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function() {
  langMenu.style.display = 'none';
});

langLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const lang = this.getAttribute('data-lang');
    document.querySelectorAll('[class*="lang-"]').forEach(section => {
      section.style.display = section.classList.contains('lang-' + lang) ? '' : 'none';
    });
    langMenu.style.display = 'none';
  });
});
