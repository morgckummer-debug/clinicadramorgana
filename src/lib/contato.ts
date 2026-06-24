export const CLINICA = {
  nome: 'Clínica Dra. Morgana',
  telefone: '(31) 99391-0212',
  whatsappNumero: '5531993910212',
  site: 'clinicadramorgana.com.br',
}

export const WHATSAPP_URL = `https://wa.me/${CLINICA.whatsappNumero}`

export const whatsappComMensagem = (mensagem: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(mensagem)}`
