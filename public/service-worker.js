const CACHE_NAME = 'painel-v2'
const ALLOWED_SCOPES = ['/painel']

self.addEventListener('install', (event) => {
  const scope = self.registration.scope || '/'

  // Se SW está sendo registrado fora de /painel, rejeita
  if (!ALLOWED_SCOPES.some(allowed => scope.includes(allowed))) {
    console.log('⛔ Service Worker rejeitado: escopo inválido', scope)
    return
  }

  console.log('📦 Service Worker instalado com escopo:', scope)
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  const scope = self.registration.scope || '/'

  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names
          .filter((name) => {
            // Remove caches antigos de versão anterior
            if (name !== CACHE_NAME && name.startsWith('painel-')) {
              console.log('🗑️  Removendo cache antigo:', name)
              return true
            }
            return false
          })
          .map((name) => caches.delete(name))
      )
    }).then(() => {
      console.log('🚀 Service Worker ativado com escopo:', scope)
      return self.clients.claim()
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
