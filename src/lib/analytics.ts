// Envia eventos para o Google Analytics 4 (gtag é definido no index.html).
// Silencioso se o GA estiver bloqueado ou ainda não carregado.
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void }
    w.gtag?.('event', name, params)
  } catch {
    /* ignora */
  }
}
