import { useEffect } from 'react'

export function useServiceWorker(scope?: string) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const options = scope ? { scope } : undefined
      navigator.serviceWorker.register('/service-worker.js', options)
        .then((registration) => {
          console.log('✅ Service Worker registrado com sucesso', registration)
        })
        .catch((error) => {
          console.error('❌ Erro ao registrar Service Worker:', error)
        })
    }
  }, [scope])
}
