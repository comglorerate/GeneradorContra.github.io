// En tu archivo de Service Worker (service-worker.js)

const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

self.addEventListener('install', function(event) {
  // Realizar la instalación del Service Worker
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Manejar las solicitudes de recursos
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - retornar respuesta del caché
        if (response) {
          return response;
        }
        // No hay match en el caché - retornar la solicitud de la red
        return fetch(event.request);
      })
  );
});
