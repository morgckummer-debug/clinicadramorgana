import { useEffect } from 'react'

export function useServiceWorker(scope?: string) {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    if (scope) {
      // Registra SW apenas com escopo restrito
      navigator.serviceWorker.register('/service-worker.js', { scope })
        .then((registration) => {
          console.log('✅ Service Worker registrado com escopo:', scope)
        })
        .catch((error) => {
          console.error('❌ Erro ao registrar Service Worker:', error)
        })
    } else {
      // Em páginas públicas, remove SWs antigos registrados globalmente
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
          registrations.forEach((reg) => {
            // Se encontrou SW registrado na raiz, desregistra
            if (reg.scope === window.location.origin + '/') {
              console.log('🗑️  Desregistrando SW antigo da raiz')
              reg.unregister()
            }
          })
        })
        .catch((error) => {
          console.error('Erro ao limpar SWs antigos:', error)
        })
    }
  }, [scope])
}
