export const CLINICA = {
  nome: 'Clínica Dra. Morgana',
  telefone: '(31) 99391-0212',
  whatsappNumero: '5531993910212',
  site: 'dramorgana.com.br',
}

export const WHATSAPP_URL = `https://wa.me/${CLINICA.whatsappNumero}`

export const whatsappComMensagem = (mensagem: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}`

export const abrirWhatsAppComFallback = (mensagem: string) => {
  const msg = encodeURIComponent(mensagem)
  const tel = CLINICA.whatsappNumero
  const appUrl = `whatsapp://send?phone=${tel}&text=${msg}`
  const webUrl = `${WHATSAPP_URL}?text=${msg}`

  const time = Date.now()
  window.location.href = appUrl

  // Fallback para web apenas se o app não abrir (após 500ms)
  setTimeout(() => {
    if (Date.now() - time < 1000) {
      window.location.href = webUrl
    }
  }, 500)
}
