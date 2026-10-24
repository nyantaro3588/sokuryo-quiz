/* Offline-first practice app: versioned, same-origin cache only. */
const VERSION = "sokuryo-quiz-v6-20261024";
const CORE = ["./", "./index.html", "./intro20.html", "./manifest.webmanifest", "./data/chapters.js", "./data/glossary-a.js", "./data/glossary-b.js", "./data/glossary-c.js", "./data/affiliate.js", "./icons/icon-192.png", "./icons/icon-512.png"];
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
