const CACHE_NAME = 'painel-v1'
const STATIC_ASSETS = [
  '/',
  '/painel',
  '/painel-icon.png',
  '/logo-horiz.png',
  '/index.html',
]

self.addEventListener('install', (event) => {
  console.log('📦 Service Worker instalado')
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('💾 Cacheando assets estáticos')
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.log('⚠️ Erro ao cachear alguns assets:', err)
      })
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker ativado')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Removendo cache antigo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignora requisições POST e outras métodos (não faz cache)
  if (request.method !== 'GET') {
    return
  }

  // Para requisições da API, tenta network primeiro
  if (url.pathname.includes('/rest/') || url.pathname.includes('supabase')) {
    event.respondWith(
      fetch(request.clone())
        .then((response) => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone())
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(request).catch(() => {
            return new Response('Offline - sem cache disponível', { status: 503 })
          })
        })
    )
    return
  }

  // Para assets estáticos, usa cache primeiro
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) return response

      return fetch(request.clone()).then((response) => {
        if (!response || response.status !== 200) {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache)
        })

        return response
      }).catch(() => {
        return new Response('Offline', { status: 503 })
      })
    })
  )
})

// Suporte para notificações push
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()
  const options = {
    body: data.body || 'Novo pré-agendamento chegou!',
    icon: '/painel-icon.png',
    badge: '/painel-icon.png',
    tag: 'new-pre-agendamento',
    requireInteraction: true,
    actions: [
      { action: 'open', title: 'Abrir Painel' },
      { action: 'close', title: 'Fechar' },
    ],
  }

  event.waitUntil(
    self.registration.showNotification(data.title || '🔔 Novo Paciente!', options)
  )
})

// Ação de clique na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'close') return

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Se a janela já está aberta, traz para frente
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus()
        }
      }
      // Se não está aberta, abre uma nova
      if (clients.openWindow) {
        return clients.openWindow('/painel')
      }
    })
  )
})
