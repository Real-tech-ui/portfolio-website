// Photos for the About section. Self-contained: adds its own styles and leaves the rest of the site untouched.
(function () {
  var portrait = { img: 'images/portrait.jpg', alt: 'Portrait of Ali Huzaifa', cap: 'Ali Huzaifa · BS IT · Sukkur, Pakistan', note: 'Background AI-edited' };
  var gallery = [
    { img: 'images/ai-coding.jpg', cap: 'Coding session' },
    { img: 'images/ai-soc-room.jpg', cap: 'Security operations room' },
    { img: 'images/ai-red-desk.jpg', cap: 'At my desk' }
  ];

  var about = document.getElementById('about');
  if (!about) return;

  var mono = 'ui-monospace,Menlo,Consolas,monospace';
  var style = document.createElement('style');
  style.textContent =
    '.ph-block{margin-top:56px}' +
    '.ph-label{font-family:' + mono + ';color:#ee1c45;font-size:.8rem;letter-spacing:.18em;text-transform:uppercase;margin-bottom:18px}' +
    '.ph-wrap{display:grid;grid-template-columns:minmax(220px,300px) 1fr;gap:24px;align-items:start}' +
    '.ph-fig{margin:0;opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}' +
    '.ph-fig.show{opacity:1;transform:none}' +
    '.ph-fig img{width:100%;height:auto;display:block;border:1px solid rgba(255,255,255,.12);box-shadow:-8px 8px 0 rgba(238,28,69,.22)}' +
    '.ph-fig figcaption{font-size:.8rem;color:rgba(255,255,255,.62);margin-top:12px;line-height:1.5}' +
    '.ph-fig figcaption em{display:block;font-style:normal;color:#ee1c45;font-family:' + mono + ';font-size:.72rem}' +
    '.ph-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}' +
    '.ph-grid .ph-item:first-child{grid-column:1/-1}' +
    '.ph-item{position:relative;padding:0;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);cursor:pointer;overflow:hidden;opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease,border-color .25s,box-shadow .25s}' +
    '.ph-item.show{opacity:1;transform:none}' +
    '.ph-item.show:hover{transform:translateY(-5px);border-color:#ee1c45;box-shadow:0 10px 26px rgba(238,28,69,.2)}' +
    '.ph-item img{width:100%;height:auto;display:block}' +
    '.ph-badge{position:absolute;top:10px;left:10px;background:rgba(0,0,0,.72);color:#ee1c45;font-family:' + mono + ';font-size:.68rem;letter-spacing:.12em;padding:4px 8px;border:1px solid rgba(238,28,69,.5)}' +
    '.ph-cap{position:absolute;left:0;right:0;bottom:0;padding:22px 12px 10px;background:linear-gradient(transparent,rgba(0,0,0,.8));color:#fff;font-size:.82rem;text-align:left}' +
    '.ph-box{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.9);cursor:zoom-out}' +
    '.ph-box.open{display:flex}' +
    '.ph-box img{max-width:100%;max-height:100%}' +
    '.ph-box button{position:absolute;top:14px;right:18px;width:40px;height:40px;background:#111;border:1px solid rgba(255,255,255,.25);color:#fff;font-size:1.4rem;cursor:pointer}' +
    '@media(max-width:760px){.ph-wrap{grid-template-columns:1fr}.ph-fig{max-width:300px}}' +
    '@media(prefers-reduced-motion:reduce){.ph-fig,.ph-item{opacity:1;transform:none;transition:none}}';
  document.head.appendChild(style);

  var block = document.createElement('div');
  block.className = 'ph-block';
  block.innerHTML =
    '<p class="ph-label">&gt; photos</p><div class="ph-wrap">' +
    '<figure class="ph-fig"><img src="' + portrait.img + '" alt="' + portrait.alt + '" loading="lazy">' +
    '<figcaption>' + portrait.cap + '<em>' + portrait.note + '</em></figcaption></figure>' +
    '<div class="ph-grid">' + gallery.map(function (g, i) {
      return '<button class="ph-item" type="button" data-i="' + i + '">' +
        '<img src="' + g.img + '" alt="AI-generated image: ' + g.cap + '" loading="lazy">' +
        '<span class="ph-badge">AI-GENERATED</span><span class="ph-cap">' + g.cap + '</span></button>';
    }).join('') + '</div></div>';

  var h2 = about.querySelector('h2');
  (h2 ? h2.parentElement : about).appendChild(block);

  var items = block.querySelectorAll('.ph-fig, .ph-item');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('show'); });
  }

  // Click an image to view it large
  var box = document.createElement('div');
  box.className = 'ph-box';
  box.innerHTML = '<img alt=""><button type="button" aria-label="Close">×</button>';
  document.body.appendChild(box);
  var boxImg = box.querySelector('img');
  function open(src, alt) { boxImg.src = src; boxImg.alt = alt; box.classList.add('open'); }
  block.addEventListener('click', function (e) {
    var item = e.target.closest('.ph-item');
    if (item) { var g = gallery[item.dataset.i]; open(g.img, 'AI-generated image: ' + g.cap); return; }
    if (e.target.closest('.ph-fig img')) open(portrait.img, portrait.alt);
  });
  box.addEventListener('click', function () { box.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') box.classList.remove('open'); });
})();
