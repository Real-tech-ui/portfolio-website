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

// 3. Scroll reveal
const revealSel = '.section__label, .section__title, .about__text, .highlight, .skill-card, .timeline__item, .project-card, .contact__text, .contact__link, .icon-btn';
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

// 4. Highlight the nav link of the section on screen
const navLinks = Array.from(document.querySelectorAll('.nav__links a'));
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));
