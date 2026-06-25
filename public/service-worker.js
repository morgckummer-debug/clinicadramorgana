const CACHE_NAME = 'painel-v1'

self.addEventListener('install', (event) => {
  console.log('📦 Service Worker instalado')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker ativado')
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Deixa passar todas as requisições normalmente
  // (não intercepta para evitar problemas com Response)
  if (request.method !== 'GET') {
    return
  }

  // Network first strategy com fallback para cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Não tenta fazer cache de requisições com erro
        if (!response || response.status !== 200 || response.type === 'error') {
          return response
        }

        // Cache apenas respostas bem-sucedidas
        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache).catch(() => {
            // Ignora erros de cache
          })
        })

        return response
      })
      .catch(() => {
        // Se offline, tenta usar cache
        return caches.match(request).catch(() => {
          return new Response('Offline', { status: 503 })
        })
      })
  )
})

// Notificações push
self.addEventListener('push', (event) => {
  if (!event.data) return

  try {
    const data = event.data.json()
    const options = {
      body: data.body || 'Novo pré-agendamento chegou!',
      icon: '/painel-icon.png',
      badge: '/painel-icon.png',
      tag: 'new-pre-agendamento',
      requireInteraction: true,
    }

    event.waitUntil(
      self.registration.showNotification(data.title || '🔔 Novo Paciente!', options)
    )
  } catch (e) {
    console.error('Erro ao processar push:', e)
  }
})

// Clique na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'close') return

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let client of clientList) {
        if (client.url.includes('/painel')) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/painel')
      }
    })
  )
})
