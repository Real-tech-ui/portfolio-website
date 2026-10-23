// Moments section. Self-contained: adds its own styles and a new section before Projects.
// To add another photo, add one object to the list below (title, place, year, line, img, alt, pos).
(function () {
  var moments = [
    { img: 'images/event-hackathon-banner.jpg', w: 1200, h: 900, pos: '50% 50%',
      title: '5th Digital Pakistan Cybersecurity Hackathon', place: 'Sukkur IBA University', year: '2026',
      line: 'Hands-on workshop, 27–29 August 2026.',
      alt: 'Event board for the 5th Digital Pakistan Cybersecurity Hackathon hands-on workshop at Sukkur IBA University, 27 to 29 August 2026' },
    { img: 'images/event-kali-session.jpg', w: 960, h: 1280, pos: '50% 57%',
      title: 'OS Security & Kali Linux Session', place: 'Sukkur IBA University', year: '2026',
      line: 'Learning operating system security with Kali Linux.',
      alt: 'Laptop running Kali Linux in a lecture hall during the Operating Systems Security and Kali Linux session' },
    { img: 'images/event-openhack-github.jpg', w: 960, h: 1280, pos: '50% 12%',
      title: "Open Hack '26", place: "MUET SZAB Campus, Khairpur Mir's", year: '2026',
      line: '24-hour hybrid hackathon, with GitHub as a proud sponsor.',
      alt: "Open Hack '26 roll-up banner announcing GitHub as a proud sponsor" },
    { img: 'images/event-ctf-cyberrange.jpg', w: 720, h: 340, pos: '50% 50%',
      title: 'CTF Cyber Range Challenges', place: 'Sukkur IBA University', year: '2026',
      line: 'Crypto and networking challenges on the live CTF scoreboard.',
      alt: 'CTF Cyber Range scoreboard on a laptop showing crypto and networking challenges' },
    { img: 'images/event-workshop-hall.jpg', w: 1100, h: 825, pos: '50% 60%',
      title: 'Workshop Hall', place: 'Learning together', year: '2026',
      line: 'Students and laptops, building cybersecurity skills side by side.',
      alt: 'Students with laptops seated in a university workshop hall' }
  ];

  var projects = document.getElementById('projects');
  if (!projects) return;

  var style = document.createElement('style');
  style.textContent =
    '.m-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:18px}' +
    '.m-card{grid-column:span 6;display:flex;flex-direction:column;padding:0;overflow:hidden;text-align:left;cursor:pointer;color:inherit;font:inherit;background:linear-gradient(160deg,var(--bg2),#08080d);border:1px solid var(--line);opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease,border-color .3s,box-shadow .3s}' +
    '.m-card.show{opacity:1;transform:none}' +
    '.m-card.show:hover{transform:translateY(-6px);border-color:var(--red);box-shadow:0 14px 36px -14px var(--red)}' +
    '.m-card:focus-visible{outline:2px solid var(--red);outline-offset:3px}' +
    '.m-img{display:block;aspect-ratio:4/3;overflow:hidden}' +
    '.m-img img{display:block;width:100%;height:100%;object-fit:cover;object-position:var(--pos,50% 50%)}' +
    '.m-cap{display:block;padding:14px 16px 18px}' +
    '.m-title{display:block;font-size:15px;line-height:1.4}' +
    '.m-title i{font-style:normal;color:var(--red2);font-size:13px}' +
    '.m-line{display:block;margin-top:6px;color:var(--mut);font-size:14px;line-height:1.5}' +
    '@media(min-width:900px){.m-card{grid-column:span 2}.m-card:nth-child(n+4){grid-column:span 3}.m-card:nth-child(n+4) .m-img{aspect-ratio:16/10}}' +
    '.m-box{position:fixed;inset:0;z-index:9999;display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;background:rgba(0,0,0,.92);cursor:zoom-out}' +
    '.m-box.open{display:flex}' +
    '.m-box img{max-width:100%;max-height:80vh;border:1px solid var(--line)}' +
    '.m-box p{max-width:640px;text-align:center;color:var(--txt);font-size:14px}' +
    '.m-box button{position:absolute;top:14px;right:18px;width:44px;height:44px;background:#111;border:1px solid var(--line);color:#fff;font-size:1.4rem;cursor:pointer}' +
    '@media(prefers-reduced-motion:reduce){.m-card{opacity:1;transform:none;transition:none}}';
  document.head.appendChild(style);

  var sec = document.createElement('section');
  sec.id = 'moments';
  sec.innerHTML =
    '<span class="tag mono">&gt; 04 moments</span>' +
    '<h2>Learning in the field.</h2>' +
    '<p class="lead">Real moments from the hackathons, workshops and CTF sessions I attended.</p>' +
    '<div class="m-grid">' + moments.map(function (m, i) {
      return '<button class="m-card" type="button" data-i="' + i + '">' +
        '<span class="m-img"><img src="' + m.img + '" width="' + m.w + '" height="' + m.h + '" alt="' + m.alt + '" loading="lazy" decoding="async" style="--pos:' + m.pos + '"></span>' +
        '<span class="m-cap"><b class="m-title">' + m.title + ' <i class="mono">· ' + m.place + ' · ' + m.year + '</i></b>' +
        '<span class="m-line">' + m.line + '</span></span></button>';
    }).join('') + '</div>';
  projects.parentNode.insertBefore(sec, projects);

  // Fade cards in as they scroll into view
  var cards = sec.querySelectorAll('.m-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    cards.forEach(function (c) { io.observe(c); });
  } else {
    cards.forEach(function (c) { c.classList.add('show'); });
  }

  // Click a photo to view it large
  var box = document.createElement('div');
  box.className = 'm-box';
  box.innerHTML = '<img alt=""><p></p><button type="button" aria-label="Close">×</button>';
  document.body.appendChild(box);
  var boxImg = box.querySelector('img'), boxTxt = box.querySelector('p');
  sec.addEventListener('click', function (e) {
    var card = e.target.closest('.m-card');
    if (!card) return;
    var m = moments[card.dataset.i];
    boxImg.src = m.img; boxImg.alt = m.alt;
    boxTxt.textContent = m.title + ' · ' + m.place + ' · ' + m.year;
    box.classList.add('open');
  });
  box.addEventListener('click', function () { box.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') box.classList.remove('open'); });
})();
