self.addEventListener('install', function(event) {
    console.log('Service Worker installing.');
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activating.');
});

self.addEventListener('push', function(event) {
    console.log('Push message received:', event);
    let notificationTitle = 'New Notification';
    let notificationOptions = {
        body: 'You have a new notification.',
        icon: 'icon-192x192.png',
        badge: 'icon-192x192.png'
    };

    if (event.data) {
        let data = event.data.json();
        notificationTitle = data.title;
        notificationOptions.body = data.body;
    }

    event.waitUntil(
        self.registration.showNotification(notificationTitle, notificationOptions)
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click received.');
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://your-site-url.com')
    );
});
