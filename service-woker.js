const CACHE_NAME = 'my-pwa-cache-v5';
const urlsToCache = [
    '/',
    '/index.html',
    'https://s3.ezgif.com/tmp/ezgif-3-092ebae015.png'
];

self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: All files cached');
            })
            .catch(error => {
                console.error('Service Worker: Error caching files:', error);
            })
    );
});

self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Service Worker: Returning cached file');
                    return response;
                }
                console.log('Service Worker: Fetching file from network');
                return fetch(event.request);
            })
    );
});

self.addEventListener('notificationclick', event => {
    console.log('Service Worker: Notification clicked', event);
    event.notification.close();
    // You can define actions to take when the notification is clicked
    console.log('Notification clicked');
});

self.addEventListener('push', event => {
    console.log('Service Worker: Push received', event);
    const title = 'Push Notification';
    const options = {
        body: event.data ? event.data.text() : 'Default notification message',
        icon: 'https://s3.ezgif.com/tmp/ezgif-3-092ebae015.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
