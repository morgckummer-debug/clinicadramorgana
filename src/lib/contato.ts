export const CLINICA = {
  nome: 'Clínica Dra. Morgana',
  telefone: '(31) 99391-0212',
  whatsappNumero: '5531993910212',
  site: 'clinicadramorgana.com.br',
}

export const WHATSAPP_URL = `https://wa.me/${CLINICA.whatsappNumero}`

export const whatsappComMensagem = (mensagem: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}`

export const abrirWhatsAppComFallback = (mensagem: string) => {
  const msg = encodeURIComponent(mensagem)
  const tel = CLINICA.whatsappNumero
  const appUrl = `whatsapp://send?phone=${tel}&text=${msg}`
  const webUrl = `${WHATSAPP_URL}?text=${msg}`

  // Tenta abrir no app primeiro
  window.open(appUrl, 'whatsapp')

  // Fallback para web após 1.5s (se app não estiver instalado)
  setTimeout(() => {
    window.open(webUrl, 'whatsapp')
  }, 1500)
}
