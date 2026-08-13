/* Hülle offline halten, Texte immer frisch versuchen. */
var CACHE = "reel-prompter-v3";
var SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;

  // Sprechtexte: erst Netz (damit neue Fassungen ankommen), sonst Speicher.
  if (url.pathname.indexOf("scripts.json") !== -1) {
    e.respondWith(
      fetch(e.request).then(function (r) {
        var copy = r.clone();
        caches.open(CACHE).then(function (c) { c.put("./scripts.json", copy); });
        return r;
      }).catch(function () {
        return caches.match("./scripts.json");
      })
    );
    return;
  }

  // Hülle: erst Speicher, sonst Netz.
  e.respondWith(caches.match(e.request).then(function (hit) { return hit || fetch(e.request); }));
});
