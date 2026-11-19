'use strict';

const C = window.CATALOG;
const SIZES = window.MODEL_SIZES || {};

// ---- Platform helpers ---------------------------------------------------
const ua = navigator.userAgent;
const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
// On iPhone only Safari (or the home-screen icon) can hand the model to Apple's AR viewer.
// Chrome, Firefox, Google app and in-app browsers (Facebook, Gmail, etc.) silently fail.
const isIOSNonSafari = isIOS && !isStandalone &&
  (/CriOS|FxiOS|EdgiOS|OPiOS|GSA\/|DuckDuckGo|FBAN|FBAV|Instagram|Line\/|LinkedInApp|Snapchat|GoogleApp/.test(ua) || !/Safari\//.test(ua));

function store(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (e) { return null; }
}

const app = document.getElementById('app');
const backBtn = document.getElementById('back');
backBtn.addEventListener('click', () => { location.hash = '#/'; });

const AR_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/></svg>';

function photoSteps() {
  if (isIOS) {
    return `<li>Tap <strong>View in your garage</strong> and slowly move your phone so it can see the floor.</li>
      <li>The tanks appear at real size. Drag to move them, twist two fingers to turn them.</li>
      <li>Tap the <strong>white shutter button</strong> at the bottom to save a photo, or press <strong>side button + volume up</strong> for a screenshot.</li>
      <li>Open <strong>Photos</strong> and share it by text or email.</li>`;
  }
  return `<li>Tap <strong>View in your garage</strong> and slowly move your phone so it can see the floor.</li>
    <li>When the tanks appear, tap the floor to place them. Drag to move, twist two fingers to turn.</li>
    <li>Press <strong>power + volume down</strong> to save a screenshot.</li>
    <li>Open <strong>Photos</strong> (or Gallery) and share it by text or email.</li>`;
}

// ---- Catalog helpers ----------------------------------------------------
const pipeById = (id) => C.PIPE_SIZES.find(p => p.id === id);
function currentPipe() { return pipeById(store('pipe')) || C.PIPE_SIZES[0]; }

// Everything in one system, as display rows.
function itemsFor(spec) {
  const f = C.FILTERS[spec.filter];
  const rows = [{ name: f.name, dim: f.dim, note: C.FILTER_NOTE }];
  if (spec.scale) rows.push({ name: C.SCALES[spec.scale].name, dim: C.SCALES[spec.scale].dim, note: C.SCALE_NOTE });
  if (spec.apa) rows.push({ name: C.APA.name + (spec.apa > 1 ? ` × ${spec.apa}` : ''), dim: C.APA.dim + (spec.apa > 1 ? ' each' : ''), note: C.APA.note });
  return rows;
}
function summary(spec) {
  const parts = [C.FILTERS[spec.filter].short.split(' ')[0] + ' Filter'];
  if (spec.scale) parts.push(spec.scale + ' ScaleSolver');
  if (spec.apa) parts.push('ApaPure12' + (spec.apa > 1 ? ' ×' + spec.apa : ''));
  return parts.join(' + ');
}

// ---- Screens ------------------------------------------------------------
function renderHome() {
  backBtn.hidden = true;
  document.title = 'LifeSource AR';
  const pipe = currentPipe();
  app.innerHTML = `
    <section class="intro">
      <h1>See it in your garage</h1>
      <p>Choose the home's main water line size, pick a system, then point your phone at the floor. It appears at real size.</p>
    </section>
    <div class="pipe-pick" role="radiogroup" aria-label="Main water line size">
      <span class="pipe-label">Pipe size</span>
      <div class="seg">
        ${C.PIPE_SIZES.map(p => `<button role="radio" data-pipe="${p.id}" aria-checked="${p.id === pipe.id}">${p.label}</button>`).join('')}
      </div>
    </div>
    ${pipe.filters.map(fid => `
      <section class="family">
        <h2 class="family-title">${C.FILTERS[fid].short} <span>${C.FILTERS[fid].dim} filter</span></h2>
        <div class="grid">
          ${C.PACKAGES.map(pkg => {
            const spec = C.specFor(pipe, fid, pkg);
            return `
            <a class="card" href="#/${pipe.id}/${fid}/${pkg.id}">
              ${pkg.badge ? `<span class="badge">${pkg.badge}</span>` : ''}
              <div class="thumb"><img src="img/${C.modelKey(spec)}.png" alt="" loading="lazy"></div>
              <h3>${pkg.name}</h3>
              <p>${summary(spec)}</p>
            </a>`;
          }).join('')}
        </div>
      </section>`).join('')}
    <section class="howto">
      <h3>Saving a photo for the customer</h3>
      <ol>${photoSteps()}</ol>
      <p class="note">Works best in a well-lit space with a plain floor. No signal needed once the app has loaded here once.</p>
    </section>`;
  app.querySelectorAll('[data-pipe]').forEach(b => b.addEventListener('click', () => {
    store('pipe', b.dataset.pipe);
    const y = window.scrollY; renderHome(); window.scrollTo(0, y);
  }));
}

function renderDetail(pipe, fid, pkg) {
  backBtn.hidden = false;
  const spec = C.specFor(pipe, fid, pkg);
  const key = C.modelKey(spec);
  const size = SIZES[key] || {};
  const title = `${pkg.full} | ${C.FILTERS[fid].short.split(' ')[0]}`;
  document.title = `${title} · LifeSource AR`;
  app.innerHTML = `
    <section class="detail">
      <h1>${title}</h1>
      <p class="sub">${summary(spec)} · for ${pipe.label} pipe</p>
      <div class="viewer">
        <model-viewer
          id="mv"
          src="models/${key}.glb"
          poster="img/${key}.png"
          alt="3D model of the LifeSource ${title}"
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-placement="floor"
          ar-scale="fixed"
          camera-controls
          touch-action="pan-y"
          camera-orbit="20deg 82deg auto"
          shadow-intensity="1"
          shadow-softness="0.8"
          environment-image="neutral"
          exposure="1.05"
          interaction-prompt="none">
          <button slot="ar-button" hidden></button>
        </model-viewer>
        <div class="hint">Drag to spin · pinch to zoom</div>
      </div>
      <label class="sizes-toggle">
        <input type="checkbox" id="sizes" checked>
        <span class="switch" aria-hidden="true"></span>
        <span>Show sizes on the tanks</span>
      </label>
      <p class="safari-warn" id="safari-warn" ${isIOSNonSafari ? '' : 'hidden'}>To use <strong>View in your garage</strong> on iPhone, open this page in <strong>Safari</strong> (or from the LifeSource home-screen icon).</p>
      <button class="ar-btn" id="ar-btn">${AR_ICON} View in your garage</button>
      <p class="no-ar" id="no-ar" hidden>Open this page on a phone to see it in a real room.</p>

      <div class="section">
        <div class="space"><span>Space needed:</span><strong>about ${size.w || '?'}" wide × ${size.h || '?'}" tall</strong></div>
      </div>
      ${spec.apa ? `<div class="section"><p class="placement">${C.APA_PLACEMENT}</p></div>` : ''}

      <div class="section">
        <h3>What's included</h3>
        <ul class="items">
          ${itemsFor(spec).map(it => `
            <li><span class="dim">${it.dim}</span><span class="name">${it.name}</span>
            <span class="note">${it.note}</span></li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <h3>How to save a photo</h3>
        <ol class="steps">${photoSteps()}</ol>
      </div>
    </section>`;
  window.scrollTo(0, 0);

  const mv = document.getElementById('mv');
  const arBtn = document.getElementById('ar-btn');
  const noAr = document.getElementById('no-ar');
  const safariWarn = document.getElementById('safari-warn');

  // Sizes on/off: each system has a version with floating size cards
  // built into the model, so they show in AR and in saved photos.
  const sizes = document.getElementById('sizes');
  const setSizes = (on) => {
    sizes.checked = on;
    const src = `models/${key}${on ? '-sizes' : ''}.glb`;
    if (mv.getAttribute('src') !== src) mv.setAttribute('src', src);
    store('sizes', on ? '1' : '0');
  };
  sizes.addEventListener('change', () => setSizes(sizes.checked));
  setSizes(store('sizes') !== '0');

  arBtn.addEventListener('click', () => {
    if (isIOSNonSafari) { safariWarn.hidden = false; safariWarn.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    if (mv.canActivateAR) mv.activateAR();
    else { noAr.hidden = false; }
  });
  // canActivateAR is only known after the element upgrades and loads.
  const checkAR = () => {
    if (!mv.canActivateAR && !isIOS && !isAndroid) { arBtn.hidden = true; noAr.hidden = false; }
  };
  mv.addEventListener('load', checkAR);
  customElements.whenDefined('model-viewer').then(() => setTimeout(checkAR, 300));
}

function route() {
  const [pipeId, fid, pkgId] = location.hash.replace(/^#\/?/, '').split('/');
  const pipe = pipeById(pipeId);
  const pkg = C.PACKAGES.find(p => p.id === pkgId);
  if (pipe && pkg && pipe.filters.includes(fid)) {
    store('pipe', pipe.id);
    renderDetail(pipe, fid, pkg);
  } else {
    renderHome();
    window.scrollTo(0, 0);
  }
}
window.addEventListener('hashchange', route);
route();

// ---- Add to home screen prompt -------------------------------------------
const install = document.getElementById('install');
const installText = document.getElementById('install-text');
const installBtn = document.getElementById('install-btn');
let deferredPrompt = null;

function showInstall(text, withButton) {
  if (isStandalone || store('installDismissed') === '1') return;
  installText.innerHTML = text;
  installBtn.hidden = !withButton;
  install.hidden = false;
}
document.getElementById('install-close').addEventListener('click', () => {
  install.hidden = true; store('installDismissed', '1');
});

if (isIOS) {
  showInstall('In Safari, tap <b>Share</b> &#8679; then <b>Add to Home Screen</b>.', false);
}
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); deferredPrompt = e;
  showInstall('Get the LifeSource icon on your phone.', true);
});
installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null; install.hidden = true;
});

// ---- Offline support ----------------------------------------------------
const status = document.getElementById('status');
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
  navigator.serviceWorker.addEventListener('message', (e) => {
    if (e.data === 'offline-ready') status.hidden = false;
  });
  navigator.serviceWorker.ready.then(async () => {
    try {
      const keys = await caches.keys();
      for (const k of keys) {
        const c = await caches.open(k);
        if (await c.match('models/4140-a3-sizes.glb')) { status.hidden = false; break; }
      }
    } catch (e) { /* ignore */ }
  });
}
