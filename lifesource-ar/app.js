'use strict';

// ---- Product data -------------------------------------------------------
// Dimensions from the 1620S Ultimate Protection Package spec sheet.
const PRODUCTS = {
  filter: {
    name: '1620S Elite Water Filter',
    dim: '10" × 62.5"',
    note: 'Needs an outlet within 5 ft. Leave 4" above for the valve cover.',
  },
  scale: {
    name: '5544 ScaleSolver',
    dim: '10" × 59.75"',
    note: 'No backwash, no electricity needed.',
  },
  apa: {
    name: 'ApaPure12 Disinfection',
    dim: '3" × 10"',
    note: 'Mounts on the cold water main (20" of pipe).',
  },
};

// width = approx. floor width of the tanks, in inches (from the models)
const PACKAGES = [
  { id: 'ultimate', name: 'Ultimate', full: 'Ultimate Protection Package', items: ['filter', 'scale', 'apa'], width: 30, badge: 'Best' },
  { id: 'power', name: 'Power Package', full: 'Power Package', items: ['filter', 'scale'], width: 25 },
  { id: 'essential', name: 'Essential Package', full: 'Essential Package', items: ['filter', 'apa'], width: 18 },
  { id: 'filter', name: 'Filter Only', full: 'Filter Only', items: ['filter'], width: 11 },
];

const SHORT = { filter: 'Filter', scale: 'ScaleSolver', apa: 'ApaPure12' };

// ---- Platform helpers ---------------------------------------------------
const ua = navigator.userAgent;
const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

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

// ---- Screens ------------------------------------------------------------
function renderHome() {
  backBtn.hidden = true;
  document.title = 'LifeSource AR';
  app.innerHTML = `
    <section class="intro">
      <h1>See it in your garage</h1>
      <p>Pick a package, then point your phone at the floor. The system appears at its real size.</p>
    </section>
    <div class="grid">
      ${PACKAGES.map(p => `
        <a class="card" href="#/${p.id}">
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
          <div class="thumb"><img src="img/${p.id}.png" alt="" loading="lazy"></div>
          <h2>${p.name}</h2>
          <p>${p.items.map(i => SHORT[i]).join(' + ')}</p>
        </a>`).join('')}
    </div>
    <section class="howto">
      <h3>Saving a photo for the customer</h3>
      <ol>${photoSteps()}</ol>
      <p class="note">Works best in a well-lit space with a plain floor. No signal needed once the app has loaded here once.</p>
    </section>`;
  window.scrollTo(0, 0);
}

function renderDetail(pkg) {
  backBtn.hidden = false;
  document.title = `${pkg.full} · LifeSource AR`;
  app.innerHTML = `
    <section class="detail">
      <h1>${pkg.full}</h1>
      <p class="sub">${pkg.items.map(i => SHORT[i]).join(' + ')}</p>
      <div class="viewer">
        <model-viewer
          id="mv"
          src="models/${pkg.id}.glb"
          poster="img/${pkg.id}.png"
          alt="3D model of the LifeSource ${pkg.full}"
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
      <button class="ar-btn" id="ar-btn">${AR_ICON} View in your garage</button>
      <p class="no-ar" id="no-ar" hidden>Open this page on a phone to see it in a real room.</p>

      <div class="section">
        <div class="space"><span>Space needed:</span><strong>about ${pkg.width}" wide × 63" tall</strong></div>
      </div>

      <div class="section">
        <h3>What's included</h3>
        <ul class="items">
          ${pkg.items.map(i => `
            <li><span class="dim">${PRODUCTS[i].dim}</span><span class="name">${PRODUCTS[i].name}</span>
            <span class="note">${PRODUCTS[i].note}</span></li>`).join('')}
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

  // Sizes on/off: each package has a version with floating size cards
  // built into the model, so they show in AR and in saved photos.
  const sizes = document.getElementById('sizes');
  const setSizes = (on) => {
    sizes.checked = on;
    const src = `models/${pkg.id}${on ? '-sizes' : ''}.glb`;
    if (mv.getAttribute('src') !== src) mv.setAttribute('src', src);
    store('sizes', on ? '1' : '0');
  };
  sizes.addEventListener('change', () => setSizes(sizes.checked));
  setSizes(store('sizes') !== '0');

  arBtn.addEventListener('click', () => {
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
  const id = location.hash.replace(/^#\/?/, '');
  const pkg = PACKAGES.find(p => p.id === id);
  if (pkg) renderDetail(pkg); else renderHome();
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
        if (await c.match('models/ultimate.glb')) { status.hidden = false; break; }
      }
    } catch (e) { /* ignore */ }
  });
}
