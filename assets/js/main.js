// ── Mobile menu ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── Reveal on scroll ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Journey thread fill on scroll ──
const fill = document.getElementById('journeyFill');
const thread = document.getElementById('journeyThread');
function updateThread() {
  if (!fill || !thread) return;
  const rect = thread.getBoundingClientRect();
  const visible = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
  fill.style.height = (visible * 100) + '%';
}
window.addEventListener('scroll', updateThread, { passive: true });
updateThread();

// ── Project accordion ──
function toggleProject(id) {
  const el = document.getElementById(id);
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.project-item').forEach(p => p.classList.remove('open'));
  if (!wasOpen) el.classList.add('open');
}

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--text)' : '';
  });
}, { passive: true });

// ── Lightbox ──
let lbImages = [];
let lbIndex = 0;

function openLightbox(images, index) {
  lbImages = images;
  lbIndex = index;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lbNext() {
  lbIndex = (lbIndex + 1) % lbImages.length;
  renderLightbox();
}

function lbPrev() {
  lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
  renderLightbox();
}

function renderLightbox() {
  const img = lbImages[lbIndex];
  document.getElementById('lbImg').src = img.src;
  document.getElementById('lbCaption').textContent = img.caption || '';
  document.getElementById('lbCounter').textContent = (lbIndex + 1) + ' / ' + lbImages.length;

  // Hide nav buttons if only 1 image
  const showNav = lbImages.length > 1;
  document.querySelector('.lightbox-prev').style.display = showNav ? 'flex' : 'none';
  document.querySelector('.lightbox-next').style.display = showNav ? 'flex' : 'none';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lbNext();
  if (e.key === 'ArrowLeft') lbPrev();
});

// Click backdrop to close
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
