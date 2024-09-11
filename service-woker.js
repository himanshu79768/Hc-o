const CACHE_NAME = 'my-pwa-cache-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/icon.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    // You can define actions to take when the notification is clicked
    // For now, we'll just log a message
    console.log('Notification clicked');
});
