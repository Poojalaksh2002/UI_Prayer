var CACHE_NAME = "pwa-task-manager";
var urlsToCache = [
  "/",
  //   "/PwaDemoApp/static/css/main.073c9b0a.css",
  //   "/PwaDemoApp/static/css/main.073c9b0a.css.map",
  //   "/PwaDemoApp/static/js/main.46c23252.js",
  //   "/PwaDemoApp/static/js/main.46c23252.js.LICENSE.txt",
  //   "/PwaDemoApp/static/js/main.46c23252.js.map",
  //   "/PwaDemoApp/static/media/logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg",
];

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});
// Cache and return requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      // If the file is not present in STATIC_CACHE,
      // it will be searched in DYNAMIC_CACHE
      return (
        cacheRes ||
        fetch(event.request).then((fetchRes) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("activated");
  var cacheWhitelist = ["pwa-task-manager"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
