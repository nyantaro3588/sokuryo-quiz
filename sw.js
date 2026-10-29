/* Offline-first practice app: versioned, same-origin cache only. */
const VERSION = "sokuryo-quiz-v9-20261029";
const CORE = ["./","./index.html","./intro20.html","./manifest.webmanifest","./data/chapters.js","./data/glossary-a.js","./data/glossary-b.js","./data/glossary-c.js","./data/affiliate.js","./icons/icon-192.png","./icons/icon-512.png","./guide/index.html","./guide/a1.html","./guide/a2.html","./guide/a3.html","./guide/a4.html","./guide/gnss.html","./tools/coordinates.html","./tools/pace.html","./privacy.html"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(CORE)));
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("sokuryo-quiz-") && k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith("/sokuryo-quiz/")) return;
  // Advertising configuration: obtain the newest approved settings online.
  // No third-party affiliate destination is intercepted or cached by this worker.
  if (url.pathname === "/sokuryo-quiz/data/affiliate.js") {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      try {
        const fresh = await fetch(req, {cache:"no-store"});
        if (!fresh.ok) throw new Error("affiliate config unavailable");
        await cache.put(req, fresh.clone());
        return fresh;
      } catch (_) {
        return (await cache.match(req)) || Response.error();
      }
    })());
    return;
  }
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(req);
        if (response.ok) {
          const cache = await caches.open(VERSION);
          await cache.put(req, response.clone());
        }
        return response;
      } catch (_) {
        const cache = await caches.open(VERSION);
        return (await cache.match(req, {ignoreSearch:true})) ||
          (await cache.match("./index.html")) ||
          Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const cached = await cache.match(req, {ignoreSearch:true});
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh.ok) await cache.put(req, fresh.clone());
      return fresh;
    } catch (_) { return Response.error(); }
  })());
});
