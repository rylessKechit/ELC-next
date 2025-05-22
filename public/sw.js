// public/sw.js - Service Worker optimisé pour VTC Ballainvilliers
const CACHE_NAME = 'vtc-ballainvilliers-v1.2.0';
const STATIC_CACHE = 'vtc-static-v1.2.0';
const DYNAMIC_CACHE = 'vtc-dynamic-v1.2.0';
const IMAGE_CACHE = 'vtc-images-v1.2.0';

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/vtc-ballainvilliers',
  '/chauffeurs-prive-essonne',
  '/contact',
  '/flotte-vehicules',
  '/assets/images/logo.webp',
  '/assets/images/hero.webp',
  '/manifest.json',
  '/offline.html',
  // CSS et JS critiques seront ajoutés automatiquement par Next.js
];

// Ressources à précharger en arrière-plan
const PREFETCH_ASSETS = [
  '/experience-vip',
  '/services-evenements',
  '/services-longue-distance',
  '/services-affaires',
  '/a-propos'
];

// Patterns d'URL pour les différentes stratégies de cache
const CACHE_STRATEGIES = {
  // Cache First pour les assets statiques
  CACHE_FIRST: [
    /\/_next\/static\//,
    /\/assets\//,
    /\.(?:js|css|woff2?|png|jpe?g|webp|svg|ico)$/
  ],
  
  // Network First pour les pages HTML
  NETWORK_FIRST: [
    /\/api\//,
    /\/$/, // Page d'accueil
    /\/vtc-/,
    /\/chauffeurs-/,
    /\/contact/,
    /\/services-/
  ],
  
  // Stale While Revalidate pour les images
  STALE_WHILE_REVALIDATE: [
    /\.(?:png|jpe?g|webp|gif|svg)$/
  ]
};

// Installation du Service Worker
self.addEventListener('install', event => {
  console.log('[VTC SW] Installation...');
  
  event.waitUntil(
    Promise.all([
      // Cache des ressources statiques critiques
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[VTC SW] Cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Préchargement des ressources secondaires
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('[VTC SW] Préchargement des ressources secondaires');
        return Promise.allSettled(
          PREFETCH_ASSETS.map(url => 
            fetch(url)
              .then(response => response.ok ? cache.put(url, response) : null)
              .catch(() => null) // Ignore les erreurs de préchargement
          )
        );
      })
    ]).then(() => {
      console.log('[VTC SW] Installation terminée');
      return self.skipWaiting();
    })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  console.log('[VTC SW] Activation...');
  
  event.waitUntil(
    Promise.all([
      // Nettoyage des anciens caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName.startsWith('vtc-') && 
              ![CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE].includes(cacheName)
            )
            .map(cacheName => {
              console.log('[VTC SW] Suppression cache obsolète:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      
      // Prise de contrôle immédiate
      self.clients.claim()
    ]).then(() => {
      console.log('[VTC SW] Activation terminée');
    })
  );
});

// Stratégie Cache First
const cacheFirst = async (request, cacheName = STATIC_CACHE) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[VTC SW] Cache First - Erreur réseau:', error);
    throw error;
  }
};

// Stratégie Network First
const networkFirst = async (request, cacheName = DYNAMIC_CACHE) => {
  const cache = await caches.open(cacheName);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[VTC SW] Network First - Tentative cache:', request.url);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Page hors ligne pour les pages HTML
    if (request.destination === 'document') {
      const offlinePage = await cache.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    throw error;
  }
};

// Stratégie Stale While Revalidate
const staleWhileRevalidate = async (request, cacheName = IMAGE_CACHE) => {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  // Mise à jour en arrière-plan
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Retourner immédiatement le cache si disponible
  if (cached) {
    return cached;
  }
  
  // Sinon attendre la réponse réseau
  return fetchPromise;
};

// Gestionnaire principal des requêtes
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignorer les requêtes non-HTTP
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  // Ignorer les requêtes Chrome Extension
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Stratégie selon le type de ressource
  let strategy;
  let cacheName;
  
  // Cache First pour les assets statiques
  if (CACHE_STRATEGIES.CACHE_FIRST.some(pattern => pattern.test(request.url))) {
    strategy = cacheFirst;
    cacheName = request.url.includes('image') ? IMAGE_CACHE : STATIC_CACHE;
  }
  // Network First pour les pages HTML et API
  else if (CACHE_STRATEGIES.NETWORK_FIRST.some(pattern => pattern.test(request.url))) {
    strategy = networkFirst;
    cacheName = DYNAMIC_CACHE;
  }
  // Stale While Revalidate pour les images
  else if (CACHE_STRATEGIES.STALE_WHILE_REVALIDATE.some(pattern => pattern.test(request.url))) {
    strategy = staleWhileRevalidate;
    cacheName = IMAGE_CACHE;
  }
  // Par défaut Network First
  else {
    strategy = networkFirst;
    cacheName = DYNAMIC_CACHE;
  }
  
  event.respondWith(strategy(request, cacheName));
});

// Gestion des messages depuis l'app
self.addEventListener('message', event => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_URLS':
      if (payload && payload.urls) {
        caches.open(DYNAMIC_CACHE).then(cache => {
          payload.urls.forEach(url => {
            fetch(url).then(response => {
              if (response.ok) {
                cache.put(url, response);
              }
            }).catch(() => null);
          });
        });
      }
      break;
      
    case 'CLEAR_CACHE':
      if (payload && payload.cacheName) {
        caches.delete(payload.cacheName);
      } else {
        // Vider tous les caches VTC
        caches.keys().then(cacheNames => {
          cacheNames
            .filter(name => name.startsWith('vtc-'))
            .forEach(name => caches.delete(name));
        });
      }
      break;
      
    case 'GET_CACHE_SIZE':
      getCacheSize().then(size => {
        event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
      });
      break;
  }
});

// Fonction pour calculer la taille du cache
async function getCacheSize() {
  const cacheNames = await caches.keys();
  const vtcCaches = cacheNames.filter(name => name.startsWith('vtc-'));
  
  let totalSize = 0;
  
  for (const cacheName of vtcCaches) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return {
    bytes: totalSize,
    mb: (totalSize / (1024 * 1024)).toFixed(2),
    caches: vtcCaches.length
  };
}

// Nettoyage automatique du cache (limiter à 50MB)
async function cleanupCache() {
  const MAX_CACHE_SIZE = 50 * 1024 * 1024; // 50MB
  const size = await getCacheSize();
  
  if (size.bytes > MAX_CACHE_SIZE) {
    console.log('[VTC SW] Cache trop volumineux, nettoyage...');
    
    // Supprimer le cache d'images le plus ancien
    const cache = await caches.open(IMAGE_CACHE);
    const requests = await cache.keys();
    
    // Supprimer 25% des entrées les plus anciennes
    const toDelete = Math.floor(requests.length * 0.25);
    for (let i = 0; i < toDelete; i++) {
      await cache.delete(requests[i]);
    }
    
    console.log(`[VTC SW] ${toDelete} entrées supprimées du cache images`);
  }
}

// Synchronisation en arrière-plan
self.addEventListener('sync', event => {
  console.log('[VTC SW] Synchronisation:', event.tag);
  
  switch (event.tag) {
    case 'vtc-cache-cleanup':
      event.waitUntil(cleanupCache());
      break;
      
    case 'vtc-prefetch-pages':
      event.waitUntil(
        caches.open(DYNAMIC_CACHE).then(cache => {
          const pagesToPrefetch = [
            '/vtc-ballainvilliers',
            '/services-aeroport-gare',
            '/experience-vip'
          ];
          
          return Promise.allSettled(
            pagesToPrefetch.map(url => 
              fetch(url).then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              }).catch(() => null)
            )
          );
        })
      );
      break;
  }
});

// Gestion des notifications push (optionnel)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'Nouveau message de VTC Ballainvilliers',
    icon: '/icons/icon-192x192.webp',
    badge: '/icons/badge-72x72.webp',
    tag: 'vtc-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'Voir',
        icon: '/icons/action-view.webp'
      },
      {
        action: 'dismiss',
        title: 'Ignorer',
        icon: '/icons/action-close.webp'
      }
    ],
    data: {
      url: data.url || '/',
      timestamp: Date.now()
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'VTC Ballainvilliers', options)
  );
});

// Gestion des clics sur notifications
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'view' || !event.action) {
    const url = event.notification.data?.url || '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // Vérifier si la page est déjà ouverte
        for (const client of clientList) {
          if (client.url.includes(url) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Ouvrir une nouvelle fenêtre
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});

// Nettoyage périodique automatique
setInterval(() => {
  cleanupCache().catch(err => 
    console.log('[VTC SW] Erreur nettoyage automatique:', err)
  );
}, 60 * 60 * 1000); // Toutes les heures

console.log('[VTC SW] Service Worker VTC Ballainvilliers chargé et prêt !');