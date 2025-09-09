import { useEffect } from 'react';

const ServiceWorkerManager = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      registerSW();
    }
  }, []);

  const registerSW = async () => {
    try {
      console.log('[SW] Registering service worker...');
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('[SW] Registration successful:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[SW] New service worker found');
        
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW] New content is available, refresh to update');
            // You could show a notification to the user here
            showUpdateNotification();
          }
        });
      });

      // Check for updates periodically
      setInterval(() => {
        registration.update();
      }, 60000); // Check every minute

    } catch (error) {
      console.error('[SW] Registration failed:', error);
    }
  };

  const showUpdateNotification = () => {
    // Optional: Show a subtle notification about available updates
    if (window.confirm('A new version is available. Refresh to update?')) {
      window.location.reload();
    }
  };

  // Listen for SW messages
  useEffect(() => {
    const messageHandler = (event) => {
      if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
        showUpdateNotification();
      }
    };

    navigator.serviceWorker?.addEventListener('message', messageHandler);
    
    return () => {
      navigator.serviceWorker?.removeEventListener('message', messageHandler);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ServiceWorkerManager;
