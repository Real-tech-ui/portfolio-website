// Certificates for the Journey section. Self-contained: it adds its own styles and does not touch the rest of the site.
// To add another certificate, add one line to the list below.
(function () {
  var certs = [
    { img: 'certificates/ignite-cybersecurity-hackathon.jpg', title: '5th Digital Pakistan Cybersecurity Hackathon', by: 'Ignite · Ministry of IT &amp; Telecom', meta: 'Sukkur · 27–29 Aug 2026 · Participation' },
    { img: 'certificates/openhack26.jpg', title: "OpenHack'26, 24-hour hybrid hackathon", by: "Dept. of Software Engineering, MUET SZAB Campus Khairpur Mir's", meta: '13 Oct 2026 · Team Zerox · Participation' },
    { img: 'certificates/cgs-certificate.jpg', title: 'Cyber Guardians Society (CGS)', by: 'Cybersecurity community contribution', meta: 'Participation' }
  ];

  var journey = document.getElementById('journey');
  if (!journey) return;

  var mono = 'ui-monospace,Menlo,Consolas,monospace';
  var style = document.createElement('style');
  style.textContent =
    '.cert-block{margin-top:56px}' +
    '.cert-label{font-family:' + mono + ';color:#ee1c45;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;margin-bottom:18px}' +
    '.cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;align-items:start}' +
    '.cert-card{display:flex;flex-direction:column;gap:6px;text-align:left;cursor:pointer;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.12);border-radius:2px;padding:10px;color:inherit;font:inherit;opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease,border-color .25s,box-shadow .25s}' +
    '.cert-card.show{opacity:1;transform:none}' +
    '.cert-card.show:hover{transform:translateY(-5px);border-color:#ee1c45;box-shadow:0 10px 26px rgba(238,28,69,.2)}' +
    '.cert-card img{width:100%;height:auto;display:block;margin-bottom:6px}' +
    '.cert-card b{font-size:.95rem;font-weight:600}' +
    '.cert-card small{color:rgba(255,255,255,.62);font-size:.8rem}' +
    '.cert-card em{font-style:normal;color:#ee1c45;font-size:.75rem;font-family:' + mono + '}' +
    '.cert-box{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.9);cursor:zoom-out}' +
    '.cert-box.open{display:flex}' +
    '.cert-box img{max-width:100%;max-height:100%}' +
    '.cert-box button{position:absolute;top:14px;right:18px;width:40px;height:40px;background:#111;border:1px solid rgba(255,255,255,.25);color:#fff;font-size:1.4rem;cursor:pointer}' +
    '@media (prefers-reduced-motion:reduce){.cert-card{opacity:1;transform:none;transition:none}}';
  document.head.appendChild(style);

  var wrap = document.createElement('div');
  wrap.className = 'cert-block';
  wrap.innerHTML = '<p class="cert-label">&gt; certificates</p><div class="cert-grid">' +
    certs.map(function (c, i) {
      return '<button class="cert-card" type="button" data-i="' + i + '">' +
        '<img src="' + c.img + '" alt="Certificate: ' + c.title + '" loading="lazy">' +
        '<b>' + c.title + '</b><small>' + c.by + '</small><em>' + c.meta + '</em></button>';
    }).join('') + '</div>';

  // Place it under the timeline, inside the same container so the width matches
  var list = journey.querySelector('ul, ol');
  (list ? list.parentElement : journey).appendChild(wrap);

  // Fade cards in as they scroll into view
  var cards = wrap.querySelectorAll('.cert-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    cards.forEach(function (c) { io.observe(c); });
  } else {
    cards.forEach(function (c) { c.classList.add('show'); });
  }

  // Click a certificate to view it full size
  var box = document.createElement('div');
  box.className = 'cert-box';
  box.innerHTML = '<img alt=""><button type="button" aria-label="Close">×</button>';
  document.body.appendChild(box);
  var boxImg = box.querySelector('img');
  wrap.addEventListener('click', function (e) {
    var card = e.target.closest('.cert-card');
    if (!card) return;
    var c = certs[card.dataset.i];
    boxImg.src = c.img;
    boxImg.alt = c.title;
    box.classList.add('open');
  });
  box.addEventListener('click', function () { box.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') box.classList.remove('open'); });
})();
