const CACHE_NAME = 'painel-v1'

self.addEventListener('install', (event) => {
  console.log('📦 Service Worker instalado')
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker ativado')
  self.clients.claim()
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
