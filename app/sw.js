/* Tiango – fonctionnement hors ligne : garde une copie de l'application dans l'appareil.
   À déposer à côté de index.html. CHANGEZ LE NUMÉRO DE VERSION à chaque mise à jour d'un fichier. */
const V = 'tiango-v21';
const FILES = ['./', 'app.js', 'manifest.webmanifest', 'icon-32.png', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'logo.png', 'logo-dark.png'];
const good = r => r && r.ok && r.status === 200 && r.type === 'basic';   /* jamais de page d'erreur dans le cache */

self.addEventListener('install', e => {
  /* tous les fichiers ou aucun : une installation incomplète n'est pas activée */
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  /* on ne supprime que les anciennes versions de Tiango, pas les caches d'autres applications du même domaine */
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('tiango-') && x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const q = e.request;
  if (q.method !== 'GET' || new URL(q.url).origin !== location.origin) return;
  /* réseau d'abord, pour recevoir les mises à jour ; copie locale si le réseau manque ou répond par une erreur */
  e.respondWith(
    fetch(q).then(r => {
      if (good(r)) { const c = r.clone(); caches.open(V).then(k => k.put(q, c)).catch(() => {}); return r; }
      return caches.match(q, { ignoreSearch: true }).then(m => m || r);
    }).catch(() => caches.match(q, { ignoreSearch: true }).then(m => m || (q.mode === 'navigate' ? caches.match('./') : Response.error())))
  );
});
