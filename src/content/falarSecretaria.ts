import type { StatusAtendimento } from '@/lib/atendimento'

export const falarSecretariaContent = {
  eyebrow: 'Fale conosco',
  title: 'Falar com a secretaria',
  subtitle:
    'Nossa equipe terá prazer em ajudar você. Selecione o assunto abaixo para iniciar uma conversa pelo WhatsApp.',
  ctaPadrao: 'Conversar pelo WhatsApp',
  horario: {
    titulo: 'Horário de atendimento',
    descricaoPadrao:
      'Nosso atendimento humano pelo WhatsApp funciona das 08:00 às 11:00 e das 12:30 às 17:30, em dias úteis. Mensagens enviadas fora desse período serão respondidas assim que possível. Lembramos que o pré-agendamento está disponível 24h.',
    mensagens: {
      disponivel: 'Atendimento disponível agora.',
      fora_horario:
        'No momento estamos fora do horário de atendimento. Responderemos assim que possível. O pré-agendamento está disponível 24h.',
      desconhecido: null,
    } as Record<StatusAtendimento, string | null>,
  },
}
