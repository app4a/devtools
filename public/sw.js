const CACHE_NAME = 'dev-tools-v1.0.0';
const STATIC_CACHE = 'dev-tools-static-v1.0.0';
const DYNAMIC_CACHE = 'dev-tools-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  // Tool pages
  '/json',
  '/base64',
  '/hash',
  '/jwt',
  '/color',
  '/regex',
  '/diff',
  '/multiline',
  '/url',
  '/timestamp',
  '/cron',
  '/worldtime',
  // Important pages
  '/faq',
  '/blog',
  '/tools-comparison'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[SW] Failed to cache static assets:', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker');
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys.map(key => {
            if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
              console.log('[SW] Removing old cache:', key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Skip external requests and analytics
  if (!url.origin.includes(self.location.origin) || 
      url.href.includes('google-analytics') ||
      url.href.includes('googletagmanager')) {
    return;
  }

  // Handle different types of requests
  if (STATIC_ASSETS.includes(url.pathname)) {
    // Static assets - cache first
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.startsWith('/_next/static/')) {
    // Next.js static assets - cache first with long expiry
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.includes('.')) {
    // Other assets (images, fonts, etc.) - cache first
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else {
    // Pages - network first with cache fallback
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy
async function cacheFirst(request, cacheName = STATIC_CACHE) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }

    console.log('[SW] Fetching and caching:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline content not available', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    console.log('[SW] Trying network first:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback for navigation requests
    if (request.mode === 'navigate') {
      const fallback = await cache.match('/');
      if (fallback) {
        return fallback;
      }
    }

    return new Response('Offline', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Handle background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(
      // Sync analytics data when back online
      syncAnalytics()
    );
  }
});

async function syncAnalytics() {
  try {
    // Implement analytics sync logic here
    console.log('[SW] Syncing analytics data');
  } catch (error) {
    console.error('[SW] Analytics sync failed:', error);
  }
}

// Handle push notifications (if implemented later)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/logo192.png',
      badge: '/favicon.ico',
      data: {
        url: data.url || '/'
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

console.log('[SW] Service Worker script loaded');
