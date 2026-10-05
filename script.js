// Typewriter effect for hero intro
const typedText = "Hi, welcome to my profile. I'm Ali Huzaifa — BS IT Student, aspiring cybersecurity professional.";
const typedEl = document.getElementById('typed-text');
let charIndex = 0;

function typeWriter() {
  if (typedEl && charIndex < typedText.length) {
    typedEl.textContent += typedText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 35);
  }
}

window.addEventListener('DOMContentLoaded', typeWriter);