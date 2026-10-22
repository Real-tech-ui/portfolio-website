document.documentElement.classList.add('js');

// Load the motion styles
const motionCss = document.createElement('link');
motionCss.rel = 'stylesheet';
motionCss.href = 'motion.css';
document.head.appendChild(motionCss);

// 1. Typewriter intro
const typedText = "Hi, welcome to my profile. I'm Ali Huzaifa — BS IT Student, aspiring cybersecurity professional.";
const typedEl = document.getElementById('typed-text');
let charIndex = 0;
function typeWriter() {
  if (typedEl && charIndex < typedText.length) {
    typedEl.textContent += typedText.charAt(charIndex++);
    setTimeout(typeWriter, 35);
  }
}
window.addEventListener('DOMContentLoaded', typeWriter);

// 2. Welcome video (put intro.mp4 next to index.html; if it is missing, this block hides itself)
const hero = document.getElementById('hero');
if (hero) {
  const media = document.createElement('div');
  media.className = 'hero__media';
  media.innerHTML =
    '<video class="hero__video" autoplay muted loop playsinline><source src="intro.mp4" type="video/mp4"></video>' +
    '<button class="sound-toggle" type="button">🔇 Tap for sound</button>';
  hero.appendChild(media);
  hero.classList.add('hero--split');
  const video = media.querySelector('video');
  const btn = media.querySelector('button');
  video.querySelector('source').addEventListener('error', () => {
    media.remove();
    hero.classList.remove('hero--split');
  });
  btn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted) { video.currentTime = 0; video.play(); }
    btn.textContent = video.muted ? '🔇 Tap for sound' : '🔊 Sound on';
  });
}

// 3. Certificates (shown inside the Cyber Journey section; add a new one by adding one line here)
const certificates = [
  { img: 'certificates/ignite-cybersecurity-hackathon.jpg', title: '5th Digital Pakistan Cybersecurity Hackathon', by: 'Ignite · Ministry of IT &amp; Telecom', meta: 'Sukkur · 27–29 Aug 2026 · Participation' },
  { img: 'certificates/openhack26.jpg', title: "OpenHack'26, 24-hour hybrid hackathon", by: "Dept. of Software Engineering, MUET SZAB Campus Khairpur Mir's", meta: '13 Oct 2026 · Team Zerox · Participation' },
  { img: 'certificates/cgs-certificate.jpg', title: 'Cyber Guardians Society (CGS)', by: 'Cybersecurity community contribution', meta: 'Participation' }
];
const journey = document.getElementById('cyber-journey');
if (journey) {
  const wrap = document.createElement('div');
  wrap.className = 'certs';
  wrap.innerHTML = '<h3 class="certs__title">Certificates</h3><div class="certs__grid">' +
    certificates.map((c, i) =>
      '<button class="cert-card" type="button" data-i="' + i + '">' +
      '<img src="' + c.img + '" alt="Certificate: ' + c.title + '" loading="lazy">' +
      '<span class="cert-card__title">' + c.title + '</span>' +
      '<span class="cert-card__by">' + c.by + '</span>' +
      '<span class="cert-card__meta">' + c.meta + '</span></button>').join('') + '</div>';
  journey.appendChild(wrap);

  // Click a certificate to view it full size
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<img alt=""><button type="button" aria-label="Close">×</button>';
  document.body.appendChild(box);
  const boxImg = box.querySelector('img');
  wrap.addEventListener('click', e => {
    const card = e.target.closest('.cert-card');
    if (!card) return;
    const c = certificates[card.dataset.i];
    boxImg.src = c.img;
    boxImg.alt = c.title;
    box.classList.add('open');
  });
  box.addEventListener('click', () => box.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') box.classList.remove('open'); });
}

// 4. Scroll reveal
const revealSel = '.section__label, .section__title, .about__text, .highlight, .skill-card, .timeline__item, .project-card, .contact__text, .contact__link, .icon-btn, .certs__title, .cert-card';
document.querySelectorAll(revealSel).forEach(el => {
  el.classList.add('reveal');
  const index = Array.from(el.parentElement.children).indexOf(el);
  el.style.setProperty('--d', (index % 6) * 0.08 + 's');
});
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in-view'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. Highlight the nav link of the section on screen
const navLinks = Array.from(document.querySelectorAll('.nav__links a'));
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));
