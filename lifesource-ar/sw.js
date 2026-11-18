// Saves the whole app on the phone so it works with no signal.
// Bump VERSION whenever any file changes so phones pick up the update.
const VERSION = 'lifesource-ar-v4';
const FILES = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.webmanifest',
  'vendor/model-viewer.min.js',
  'img/logo.png',
  'img/icon-192.png',
  'img/icon-512.png',
  'img/icon-maskable-512.png',
  'img/apple-touch-icon.png',
  'img/ultimate.png',
  'img/power.png',
  'img/essential.png',
  'img/filter.png',
  'models/ultimate.glb',
  'models/power.glb',
  'models/essential.glb',
  'models/filter.glb',
  'models/ultimate-sizes.glb',
  'models/power-sizes.glb',
  'models/essential-sizes.glb',
  'models/filter-sizes.glb',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key !== VERSION) await caches.delete(key);
    }
    await self.clients.claim();
    for (const client of await self.clients.matchAll()) client.postMessage('offline-ready');
  })());
});

// Cache first (instant + offline); fall back to network, then to the app shell.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    try {
      return await fetch(req);
    } catch (e) {
      if (req.mode === 'navigate') return caches.match('index.html');
      throw e;
    }
  })());
});
