// Saves the whole app on the phone so it works with no signal.
// Bump VERSION whenever any file changes so phones pick up the update.
const VERSION = 'lifesource-ar-v5';
const FILES = [
  './',
  'index.html',
  'styles.css',
  'catalog.js',
  'app.js',
  'manifest.webmanifest',
  'vendor/model-viewer.min.js',
  'models/sizes.js',
  'img/1620-5544-a1.png',
  'img/1620-5544.png',
  'img/1620-a1.png',
  'img/1620.png',
  'img/2250-5544-a1.png',
  'img/2250-5544.png',
  'img/2250-6633-a2.png',
  'img/2250-6633.png',
  'img/2250-a1.png',
  'img/2250-a2.png',
  'img/2250.png',
  'img/4140-6633-a2.png',
  'img/4140-6633-a3.png',
  'img/4140-6633.png',
  'img/4140-a2.png',
  'img/4140-a3.png',
  'img/4140.png',
  'img/apple-touch-icon.png',
  'img/icon-192.png',
  'img/icon-512.png',
  'img/icon-maskable-512.png',
  'img/logo.png',
  'models/1620-5544-a1-sizes.glb',
  'models/1620-5544-a1.glb',
  'models/1620-5544-sizes.glb',
  'models/1620-5544.glb',
  'models/1620-a1-sizes.glb',
  'models/1620-a1.glb',
  'models/1620-sizes.glb',
  'models/1620.glb',
  'models/2250-5544-a1-sizes.glb',
  'models/2250-5544-a1.glb',
  'models/2250-5544-sizes.glb',
  'models/2250-5544.glb',
  'models/2250-6633-a2-sizes.glb',
  'models/2250-6633-a2.glb',
  'models/2250-6633-sizes.glb',
  'models/2250-6633.glb',
  'models/2250-a1-sizes.glb',
  'models/2250-a1.glb',
  'models/2250-a2-sizes.glb',
  'models/2250-a2.glb',
  'models/2250-sizes.glb',
  'models/2250.glb',
  'models/4140-6633-a2-sizes.glb',
  'models/4140-6633-a2.glb',
  'models/4140-6633-a3-sizes.glb',
  'models/4140-6633-a3.glb',
  'models/4140-6633-sizes.glb',
  'models/4140-6633.glb',
  'models/4140-a2-sizes.glb',
  'models/4140-a2.glb',
  'models/4140-a3-sizes.glb',
  'models/4140-a3.glb',
  'models/4140-sizes.glb',
  'models/4140.glb',
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
