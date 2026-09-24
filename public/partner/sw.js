const SHELL = "aimark-partner-shell-v1";
const PRECACHE = [
  "/partner/offline.html",
  "/partner/icon-192.png",
  "/partner/icon-512.png",
  "/partner/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== SHELL).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(SHELL);
        const offline = await cache.match("/partner/offline.html");
        return (
          offline ||
          new Response("Offline", {
            status: 503,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          })
        );
      }),
    );
    return;
  }

  const isShellAsset =
    url.pathname === "/partner/offline.html" ||
    url.pathname === "/partner/manifest.webmanifest" ||
    url.pathname === "/partner/icon-192.png" ||
    url.pathname === "/partner/icon-512.png";

  if (!isShellAsset) return;

  event.respondWith(
    caches.open(SHELL).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone());
      return response;
    }),
  );
});
